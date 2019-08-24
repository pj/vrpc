import {
  Service,
  VersionType,
  Type,
  Version,
  BaseField,
  Field,
  ReferenceField,
  FieldObject,
} from './generate';

// Stuff to generate express js stuff.
const header = `/**
* **GENERATED CODE DO NOT EDIT!**
*/
import {Request, Response} from "express";`;

const serviceHeader = (service: Service) => `/*
* ${service.name}
*
* ${service.description}
*/`;

const changeLog =
  (changeLog: string[]) => changeLog.map((log, index) => `* ${index}. ${log}`).join('\n');

function imports(versions: Map<string, [VersionType, VersionType[]]>) {
  let allImports = [];

  for (let version of versions.values()) {
    const [outputVersion, inputVersions] = version;
    let versionImports = [];
    versionImports.push(outputVersion);
    versionImports.push(outputVersion._type);
    for (let inputVersion of inputVersions) {
      versionImports.push(inputVersion);
      versionImports.push(inputVersion._type);
    }

    allImports.push(versionImports.join(',\n'));
  }

  return `import {
  ${allImports.join(',\n')}
} from './types';`
}

function serviceBody(service: Service) {
  const allVersions = [];
  const allResponses = [];

  for (let version of service.versions.values()) {
    const [outputVersion, inputVersions] = version;
    const allInputs = inputVersions.join(' | ');
    allVersions.push(`func_${outputVersion}: (input: ${allInputs}) => ${outputVersion}`);

    for (let inputVersion of inputVersions) {
      allResponses.push(
`case '${inputVersion}':
  const inputMessage = ${inputVersion}.deserialize(body);
  const response = func_${outputVersion}(inputMessage);
  const outputMessage = ${outputVersion._type}.serialize(response);
  res.json(outputMessage);
  return;`);
    }
  }
  //const serviceName = "<%= service.name %>";
  return `
${serviceHeader(service)}
${imports(service.versions)}
function ${service.name}(
  app: any,
  ${allVersions.join(',\n')}
): void {
  app.post('/${service.name}', (req: Request, res: Response) => {
    const body = req.body;
    switch (body['type'] + '_' + body['version']) {
    ${allResponses.join('\n')}
    default:
      throw new Error("Unknown input type: " + body);
    }
  });
}

export {
  ${service.name},
  // <%= service.name %> as service,
  // serviceName
};`;
}

export function generateExpress(services: Service[]) {
  const allServices = [];

  for (let service of services) {
    allServices.push(serviceBody(service));
  }

  return `
${header}
${allServices.join('\n')}`;
}


// Generate Types
const typeHeader = (_type: Type) => `/*
* ${_type.name}
* ${_type.description}
* Change Log:
${changeLog(_type.changeLog)}
*/`;

function mapFields(
  fields: FieldObject,
  fieldMapper: (field: BaseField) => string,
) {
  const allFields = [];
  for (let key of Object.keys(fields)) {
    const field = fields[key];
    allFields.push(fieldMapper(field));
  }

  return allFields.join('\n');
}

function generateFieldDescription(fields: FieldObject): string {
  return mapFields(
    fields,
    (field) => `* @param ${field.name} ${field.description}`,
  );
}

function generateFieldTypes(fields: FieldObject): string {
  return mapFields(
    fields,
    (field) =>`  readonly ${field.name}: ${field.fieldType()};`,
  );
}

function generateFieldArgs(fields: FieldObject): string {
  return mapFields(
    fields,
    (field) => `${field.name}: ${field.fieldType()},`,
  );
}

function generateFieldSetters(fields: FieldObject): string {
  return mapFields(
    fields,
    (field) => {
      let setter = `this.${field.name} = ${field.name}`;
      if (field.formattedDefault()) {
        setter += ` || ${field.formattedDefault()}`;
      }
      setter += ';';
      return setter;
    },
  );
}

function generateFieldDeserialize(fields: FieldObject): string {
  return mapFields(
    fields,
    (field) => `message.${field.name},`
  );
}

function generateVersion(version: Version, _type: Type): string {
  const className = `${_type.name}_V${version.version}`;

  return `/**
${generateFieldDescription(version.fields)}
*
* @sealed
*/
class ${className} {
  readonly version: number;
  readonly hash: string;
  ${generateFieldTypes(version.fields)}

  constructor(
    ${generateFieldArgs(version.fields)}
  ){
    this.version = ${version.version};
    this.hash = "${version.hash}";
    ${generateFieldSetters(version.fields)}
  }

  static deserialize(message: any): ${className} {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return (
      new ${className}(
        ${generateFieldDeserialize(version.fields)}
      )
    );
  }

  static serialize(message: ${className}): string {
    if (message.version === null || message.version === undefined) {
      throw new Error("version not present: " + message);
    }
    return JSON.stringify(message);
  }
}

export {
  ${className},
  ${className} as ${_type.name}_H${version.hash},
}
`;
}

function generateDeserializeVersion(_type: Type, version: Version) {
  return `
    case "${version.formatVersion()}":
    case "${version.formatHash()}":
      return (
        new ${version.formatVersion()}(
        ${generateFieldDeserialize(version.fields)}
        )
      );
`;
}

function generateSerialization(_type: Type) {
  const allVersions = [];

  for (let version of _type.versions) {
    allVersions.push(generateDeserializeVersion(_type, version));
  }

  const allTypes = [];
  for (let version of _type.versions) {
    allTypes.push(`${_type.name}_V${version.version}`);
  }

  return `
export class ${_type.name} {
    static deserialize(message: any): ${allTypes.join(' | ')}
    {
      if (message.version === null || message.version === undefined) {
          throw new Error("version not present: " + message);
      }
      switch (message.version) {
      ${allVersions.join('\n')}
      default:
         throw new Error("Unknown version error or version not present: " + message);
      }
    }

    static serialize(message: ${allTypes.join(' | ')}): string {
      if (message.version === null || message.version === undefined) {
        throw new Error("version not present: " + message);
      }
      return JSON.stringify(message);
    }
  }
`;
}

function generateType(_type: Type): string {
  const allVersions = [];

  for (let version of _type.versions) {
    allVersions.push(generateVersion(version, _type));
  }

  return `${typeHeader(_type)}
${allVersions.join('\n')}

${generateSerialization(_type)}
`;
}

export function generateTypes(types: Type[]) {
  const allTypes = [];

  for (let _type of types) {
    allTypes.push(generateType(_type));
  }

  return `${header}
${allTypes.join('\n')}
`;
}


// Generate Client
