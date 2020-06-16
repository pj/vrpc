import * as prettier from 'prettier';

import {
  Service,
  Type,
  Version,
  BaseField,
  FieldObject,
  ServiceVersion,
  ServiceMapping,
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

function imports(versions: ServiceVersion[]) {
  let allImports = new Set();

  for (let version of versions) {
    for (let outputs of version.mappings.values()) {
      for (let mapping of outputs.values()) {
        allImports.add(mapping.inputType);
        allImports.add(`${mapping.inputType}_V${mapping.inputVersion}`);
        allImports.add(mapping.outputType);
        allImports.add(`${mapping.outputType}_V${mapping.outputVersion}`);
      }
    }
  }

  return `import {
  ${Array.from(allImports).join(',\n')}
} from './types';`
}

function* rawMappings(mappings: Map<string, Map<string, ServiceMapping>>) {
  for (let x of mappings.values()) {
    for (let y of x.values()) {
      yield y;
    }
  }
}

function mappingKey(mapping: ServiceMapping) {
  return `${mapping.inputType}_${mapping.inputVersion}_${mapping.outputType}_${mapping.outputVersion}`;
}

function serviceExternalDefinition(service: Service) {
  const allVersions = [];
  const prevMappings = new Set();
  for (let version of service.versions) {
    const allMappings = [];
    const versionMappings = new Set();
    for (let mapping of rawMappings(version.mappings)) {
      const key = mappingKey(mapping);
      let optional = prevMappings.has(key) ? '?' : '';
      versionMappings.add(key);
      allMappings.push(
        `${mapping.name}_V${mapping.version}${optional}: (input: ${mapping.inputType}_V${mapping.inputVersion}): ${mapping.outputType}_V${mapping.outputVersion};`
      );
    }

    for (let key of versionMappings) {
      if (!prevMappings.has(key)) {
        prevMappings.add(key);
      }
    }

    for (let key of prevMappings) {
      if (!versionMappings.has(key)) {
        prevMappings.delete(key);
      }
    }

    allVersions.push(
      `V${version.version}: {
        ${allMappings.join('\n')}
      }`
    );
  }

  return `export type ${service.name} = {
    ${allVersions.join('\n')}
};`;
}

function serviceInternalDefinitionMappings(mappings: Iterable<ServiceMapping>) {
  const allMappings = [];
  for (const mapping of mappings) {
    allMappings.push(
      `${mapping.inputType}_V${mapping.inputVersion}: (input: ${mapping.inputType}_V${mapping.inputVersion}): ${mapping.outputType}_V${mapping.outputVersion};`
    );
  }

  return allMappings.join('\n');
}

function serviceInternalDefinition(service: Service) {
  const allVersions = [];
  for (let version of service.versions) {
    allVersions.push(
      `V${version.version}: {
        ${serviceInternalDefinitionMappings(rawMappings(version.mappings))}
      }`
    );
  }

  return `type ${service.name}Internal = {
    ${allVersions.join('\n')}
};`;
}

function serviceTypeTable(service: Service) {
  const allVersions = [];
  for (let version of service.versions) {
    const allMappings = [];
    for (let mapping of rawMappings(version.mappings)) {
      allMappings.push(
        `"${mapping.inputType}_V${mapping.inputVersion}": [
          ${mapping.inputType},
          ${mapping.outputType}
        ],`
      );
    }
    allVersions.push(
      `"V${version.version}": {
        ${allMappings.join('\n')}
      },`
    );
  }

  return `const ${service.name}TypeMapping = {
    ${allVersions.join('\n')}
};`;
}

function serviceBody(service: Service) {
  return `
${serviceHeader(service)}
${imports(service.versions)}

${serviceExternalDefinition(service)}
${serviceInternalDefinition(service)}
${serviceTypeTable(service)}

function ${service.name}Express(
  app: any,
  definition: ${service.name}
): void {
  // convert External definition
  const internalDefinition: ${service.name}Internal = convertInternalDefinition(definition);

  app.post('/${service.name}', (req: Request, res: Response) => {
    const body = req.body;

    const serviceVersion = body['serviceVersion'];
    if (!serviceVersion) {
      throw new Error("Please provide service version");
    }
    const serviceVersionDefinition = internalDefinition[serviceVersion];
    if (!serviceVersionDefinition) {
      throw new Error("Unknown service version, please use the client.");
    }
    
    const inputType = body['inputType'];
    if (!inputType) {
      throw new Error("Please provide input type");
    }
    const inputVersion = body['inputVersion'];
    if (!inputVersion) {
      throw new Error("Please provide input version");
    }
    
    const serviceFunction = serviceVersionDefinition[inputType + "_V" + inputVersion];
    if (!serviceFunction) {
      throw new Error('Unable to locate input type: ' + inputType + "_V" + inputVersion);
    }

    const mappingTableVersion = ${service.name}TypeMapping[serviceVersionDefinition];
    if (!mappingTableVersion) {
      throw new Error('Invalid service version');
    }

    const mappingClasses = mappingTableVersion[inputType + "_V" + inputVersion];
    if (!mappingClasses) {
      throw new Error('Invalid input type or version');
    }

    const [inputTypeClass, outputTypeClass] = mappingClasses;

    const inputMessage = inputTypeClass.deserialize(body.input);
    const response = serviceFunction(inputMessage);
    const outputMessage = outputTypeClass.serialize(response);
    res.json(outputMessage);
    return;
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

function convertInternalDefinition<E, I>(definition: E): I {
  const externalDefinition: any = {};
  for (let [version, ] of Object.entries(definition)) {

  }

  return externalDefinition
}

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
function generateClientMappings(version: ServiceVersion) {
  const allMappings = [];

  for (let mapping of rawMappings(version.mappings)) {
    allMappings.push(
      `${mapping.inputType}_V${mapping.inputVersion}: async (input: ${mapping.inputType}_V${mapping.inputVersion}): Promise<${mapping.outputType}_V${mapping.outputVersion}> => {
        const response = await request.post(
          {
            url: this.host + "/${version.name}",
            json: true,
            body: input,
            serviceVersion: "V${version.version}",
            inputType: "${mapping.inputType}",
            inputVersion: "${mapping.inputVersion}",
          }
        );

        const body = JSON.parse(response);

        return ${mapping.outputType}.deserialize(body);
      },`
    );
  }
  
  return `${allMappings.join('\n')}`;
}

function generateClientService(service: Service): string {
  const allVersions = [];
  for (let version of service.versions) {
    allVersions.push(
      `export const ${version.name}ClientV${version.version} = {
        ${generateClientMappings(version)}
      };
      `
    );
  }
  return `${allVersions.join('\n')}`;
}

function generateClientImports(services: Service[]): string {
  let allImports = new Set();

  for (let service of services) {
    for (let version of service.versions) {
      for (let outputs of version.mappings.values()) {
        for (let mapping of outputs.values()) {
          allImports.add(mapping.inputType);
          allImports.add(`${mapping.inputType}_V${mapping.inputVersion}`);
          allImports.add(mapping.outputType);
          allImports.add(`${mapping.outputType}_V${mapping.outputVersion}`);
        }
      }
    }
  }

  return `import {
  ${Array.from(allImports).join(',\n')}
} from './types';`
}

function generateClient(types: Type[], services: Service[]): string {
  const allClients = [];

  for (let service of services) {

    allClients.push(generateClientService(service));
  }

  return `${header}
import * as request from 'request-promise-native';

${generateClientImports(services)}

${allClients.join('\n')}`;
}

export function generateTypescriptTypes(types: Type[]): string {
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

export function generateTypescript(
  types: Type[],
  services: Service[],
): [string, string, string] {
  const generatedTypes = generateTypescriptTypes(types);
  const generatedServices = generateTypescriptServices(services);
  const generatedClient = generateTypescriptClient(types, services);

  return [generatedTypes, generatedServices, generatedClient];
}
