"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const prettier = __importStar(require("prettier"));
// Stuff to generate express js stuff.
const header = `/**
* **GENERATED CODE DO NOT EDIT!**
*/
import {Request, Response} from "express";`;
const serviceHeader = (service) => `/*
* ${service.name}
*
* ${service.description}
*/`;
const changeLog = (changeLog) => changeLog.map((log, index) => `* ${index}. ${log}`).join('\n');
function imports(versions) {
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
} from './types';`;
}
function serviceVersion(service, inputs, output) {
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
function serviceBody(service) {
    const allVersions = [];
    const allResponses = [];
    const allDefines = [];
    for (let version of service.versions.values()) {
        const [outputVersion, inputVersions] = version;
        //const allInputs = inputVersions.join(' | ');
        allDefines.push(serviceVersion(service, inputVersions, outputVersion));
        for (let inputVersion of inputVersions) {
            allResponses.push(`case '${inputVersion}':
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
function generateExpress(services) {
    const allServices = [];
    for (let service of services) {
        allServices.push(serviceBody(service));
    }
    return `
${header}
${allServices.join('\n')}`;
}
exports.generateExpress = generateExpress;
// Generate Types
const typeHeader = (_type) => `/*
* ${_type.name}
* ${_type.description}
* Change Log:
${changeLog(_type.changeLog)}
*/`;
function mapFields(fields, fieldMapper) {
    const allFields = [];
    for (let key of Object.keys(fields)) {
        const field = fields[key];
        allFields.push(fieldMapper(field));
    }
    return allFields.join('\n');
}
function generateFieldDescription(fields) {
    return mapFields(fields, (field) => `* @param ${field.name} ${field.description}`);
}
function generateFieldTypes(fields) {
    return mapFields(fields, (field) => `  readonly ${field.name}: ${field.fieldType()};`);
}
function generateFieldArgs(fields) {
    return mapFields(fields, (field) => `${field.name}: ${field.fieldType()},`);
}
function generateFieldSetters(fields) {
    return mapFields(fields, (field) => {
        let setter = `this.${field.name} = ${field.name}`;
        if (field.formattedDefault()) {
            setter += ` || ${field.formattedDefault()}`;
        }
        setter += ';';
        return setter;
    });
}
function generateFieldDeserialize(fields) {
    return mapFields(fields, (field) => `message.${field.name},`);
}
function generateVersion(version, _type) {
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
function generateDeserializeVersion(_type, version) {
    let hashCase = `case "${version.formatHash()}":`;
    if (_type.latest !== null && _type.latest !== undefined) {
        hashCase = "";
    }
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
function generateSerialization(_type) {
    const allVersions = [];
    for (let version of _type.versions) {
        allVersions.push(generateDeserializeVersion(_type, version));
    }
    const allTypes = [];
    for (let version of _type.versions) {
        allTypes.push(version.formatVersion());
    }
    if (_type.latest !== null && _type.latest !== undefined) {
        allVersions.push(generateDeserializeVersion(_type, _type.latest));
        allTypes.push(_type.latest.formatVersion());
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
function generateType(_type) {
    const allVersions = [];
    for (let version of _type.versions) {
        allVersions.push(generateVersion(version, _type));
    }
    if (_type.latest !== null && _type.latest !== undefined) {
        allVersions.push(generateVersion(_type.latest, _type));
    }
    return `${typeHeader(_type)}
${allVersions.join('\n')}

${generateSerialization(_type)}
`;
}
function generateTypes(types) {
    const allTypes = [];
    for (let _type of types) {
        allTypes.push(generateType(_type));
    }
    return `${header}
${allTypes.join('\n')}
`;
}
exports.generateTypes = generateTypes;
// Generate Client
function generateClientVersion(service, version) {
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
function generateServiceClient(service) {
    const allVersions = [];
    for (let [_, versions] of service.versions) {
        allVersions.push(generateClientVersion(service, versions));
    }
    return `
  ${allVersions.join('\n')}
`;
}
function generateClientImports(types) {
    const allTypes = [];
    for (let _type of types) {
        allTypes.push(_type.name);
        for (let version of _type.versions) {
            allTypes.push(version.formatVersion());
        }
        if (_type.latest !== null && _type.latest !== undefined) {
            allTypes.push(_type.latest.formatVersion());
        }
    }
    return `import {
  ${allTypes.join(',\n')}
} from './types';`;
}
function generateClient(types, services) {
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
exports.generateClient = generateClient;
function generateTypescript(types) {
    return (prettier.format(generateTypes(types), { parser: 'typescript' }));
}
exports.generateTypescript = generateTypescript;
function generateTypescriptServices(services) {
    return (prettier.format(generateExpress(services), { parser: 'typescript' }));
}
exports.generateTypescriptServices = generateTypescriptServices;
function generateTypescriptClient(types, services) {
    return (prettier.format(generateClient(types, services), { parser: 'typescript' }));
}
exports.generateTypescriptClient = generateTypescriptClient;
function generateTypescriptBoth(types, services) {
    const generatedTypes = generateTypescript(types);
    const generatedServices = generateTypescriptServices(services);
    const generatedClient = generateTypescriptClient(types, services);
    return [generatedTypes, generatedServices, generatedClient];
}
exports.generateTypescriptBoth = generateTypescriptBoth;
