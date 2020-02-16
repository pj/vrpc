import * as generate_typescript from './generate_typescript';
import * as prettier from 'prettier';

import {
  Service,
  VersionType,
  Type,
  Version,
  BaseField,
  ScalarField,
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

function serviceVersion(
  service: Service,
  inputs: VersionType[],
  output: VersionType,
) {
  const allInputs = inputs.join(' | ');
  const allDefines = [];

  for (let input of inputs) {
    allDefines.push(`${service.name}Definitions.set("${input}", func);`);
  }

  return `
function ${service.name}(
  func: (input: ${allInputs}) => ${output}
): void {
  ${allDefines.join('n')}
}
`;
}

function serviceBody(service: Service) {
  const allVersions = [];
  const allResponses = [];
  const allDefines = [];

  for (let version of service.versions.values()) {
    const [outputVersion, inputVersions] = version;
    //const allInputs = inputVersions.join(' | ');
    allDefines.push(serviceVersion(service, inputVersions, outputVersion));

    for (let inputVersion of inputVersions) {
      allResponses.push(
`case '${inputVersion}':
  const inputMessage = ${inputVersion}.deserialize(body);
  const func = ${service.name}Definitions.get("${inputVersion}");
  const response = func(inputMessage);
  const outputMessage = ${outputVersion._type}.serialize(response);
  res.json(outputMessage);
  return;`);
      allVersions.push(`"${inputVersion}"`);
    }
  }

  return `
${serviceHeader(service)}
${imports(service.versions)}

const ${service.name}Definitions = new Map();

${allDefines.join('\n')}

function ${service.name}Express(
  app: any
): void {
  for (let inputVersion of [${allVersions.join(', ')}]) {
    if (!${service.name}Definitions.has(inputVersion)) {
      throw new Error(
        "Service definition required for input version: " + inputVersion
      );
    }
  }

  app.post('/${service.name}', (req: Request, res: Response) => {
    const body = req.body;
    switch (body['_type'] + '_V' + body['version']) {
    ${allResponses.join('\n')}
    default:
      throw new Error("Unknown input type: " + body);
    }
  });
}

export {
  ${service.name},
  ${service.name}Express,
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
  const className = version.formatVersion();

  let hashAlias = `, ${className} as ${version.formatHash()}`;
  if (version.version === null || version.version === undefined) {
    hashAlias = '';
  }

  return `/**
${generateFieldDescription(version.fields)}
*
* @sealed
*/
class ${className} {
  readonly _type: string;
  readonly version: number;
  readonly hash: string;
  ${generateFieldTypes(version.fields)}

  constructor(
    ${generateFieldArgs(version.fields)}
  ){
    this._type = "${version._type}";
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
  ${className}
  ${hashAlias}
}
`;
}

function generateDeserializeVersion(
  _type: Type, version: Version
) {
  let hashCase = `case "${version.formatHash()}":`;

  return `
    case "${version.formatVersion()}":
    ${hashCase}
      return (
        new ${version.formatVersion()}(
        ${generateFieldDeserialize(version.fields)}
        )
      );
`;
}

function generateSerialization(_type: Type) {
  const allVersions = [];
  const allTypes = [];

  for (let version of _type.versions) {
    allVersions.push(generateDeserializeVersion(_type, version));
    allTypes.push(version.formatVersion());
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
function generateClientVersion(
  service: Service,
  version: [VersionType, VersionType[]]
): string {
  const [outputVersion, inputVersions] = version;

  return `
async ${service.name}(
  input: ${inputVersions.join(" | ")}
): Promise<${outputVersion}> {
  const response = await request.post(
    {
      url: this.host + "/${service.name}",
      json: true,
      body: input,
    }
  );

  const body = JSON.parse(response);

  return ${outputVersion}.deserialize(body);
}`;
}

function generateServiceClient(service: Service): string {
  const allVersions = [];

  for (let [_, versions] of service.versions) {
    allVersions.push(generateClientVersion(service, versions));
  }

  return `
  ${allVersions.join('\n')}
`;
}

function generateClientImports(types: Type[]): string {
  const allTypes = [];
  for (let _type of types) {
    allTypes.push(_type.name);
    for (let version of _type.versions) {
      allTypes.push(version.formatVersion());
    }
  }

  return `import {
  ${allTypes.join(',\n')}
} from './types';`;
}

export function generateClient(types: Type[], services: Service[]): string {
  const allClients = [];

  for (let service of services) {
    allClients.push(generateServiceClient(service));
  }

  return `${header}
import * as request from 'request-promise-native';

${generateClientImports(types)}

export class Client {
  host: string;
  constructor(host: string) {
    this.host = host;
  }

${allClients.join('\n')}
}
`;
}

export function generateTypescript(types: Type[]): string {
  return (
    prettier.format(
      generateTypes(types),
      {parser: 'typescript'},
    )
  );
}

export function generateTypescriptServices(
  services: Service[],
): string {
  return (
    prettier.format(
      generateExpress(services),
      {parser: 'typescript'},
    )
  );
}

export function generateTypescriptClient(
  types: Type[],
  services: Service[]
): string {
  return (
    prettier.format(
      generateClient(types, services),
      {parser: 'typescript'},
    )
  );
}

export function generateTypescriptBoth(
  types: Type[],
  services: Service[],
): [string, string, string] {
  const generatedTypes = generateTypescript(types);
  const generatedServices = generateTypescriptServices(services);
  const generatedClient = generateTypescriptClient(types, services);

  return [generatedTypes, generatedServices, generatedClient];
}
