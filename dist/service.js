"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeidea = require("./typeidea");
const action_1 = require("./action");
const ejs_1 = require("ejs");
const fs = require("fs");
const prettier = require("prettier");
const typescriptServiceFile = fs.readFileSync('./templates/service.ejs', {
    encoding: "utf8",
});
const typescriptServiceTemplate = ejs_1.compile(typescriptServiceFile, {
    filename: './templates/service.ejs'
});
class ServiceVersion {
    constructor(version, state) {
        this.version = version;
        this.state = state;
    }
}
exports.ServiceVersion = ServiceVersion;
class Service {
    constructor(name, description, inputType, outputType) {
        this.name = name;
        this.description = description;
        this.changeLog = [];
        this.inputType = inputType;
        this.outputType = outputType;
        this.inputVersions = [];
        this.outputVersions = [];
    }
}
exports.Service = Service;
function generateServices(services) {
    const generatedServices = [];
    for (const service of services) {
        let previousHash = null;
        const changeLog = [];
        let notHashed = false;
        for (let n = 0; n < service.length; n++) {
            const action = service[n];
            if (notHashed) {
                if (action.hash !== null) {
                    throw new Error(`Hashed action after unhashed action at ${n} ${action}`);
                }
            }
            else if (action.hash === null) {
                notHashed = true;
            }
            else {
                const expectedHash = typeidea.hashAction(action, previousHash);
                if (expectedHash !== action.hash) {
                    throw new Error(`Invalid hash at item ${n} ${action}, did you change something?`);
                }
                previousHash = expectedHash;
            }
        }
        const newAction = service[0];
        const newService = new Service(newAction.name, newAction.description, newAction.inputType, newAction.outputType);
        newService.inputVersions.push(new ServiceVersion(newAction.inputVersion, 'active'));
        newService.outputVersions.push(new ServiceVersion(newAction.outputVersion, 'active'));
        for (let n = 1; n < service.length; n++) {
            let action = service[n];
            if (action instanceof action_1.NewServiceAction) {
                throw new Error(`New Service action not at start!`);
            }
            else if (action instanceof action_1.UpdateDescriptionAction) {
                newService.description = action.description;
            }
            else if (action instanceof action_1.AddInputVersionAction) {
                newService.inputVersions.push(new ServiceVersion(action.version, 'active'));
            }
            else if (action instanceof action_1.RemoveInputVersionAction) {
                newService.inputVersions = newService.inputVersions.map(serviceVersion => {
                    if (serviceVersion.version === action.version) {
                        return new ServiceVersion(action.version, 'removed');
                    }
                    return serviceVersion;
                });
            }
            else if (action instanceof action_1.DeprecateInputVersionAction) {
                newService.inputVersions = newService.inputVersions.map(serviceVersion => {
                    if (serviceVersion.version === action.version) {
                        return new ServiceVersion(action.version, 'deprecated');
                    }
                    return serviceVersion;
                });
            }
            else if (action instanceof action_1.AddOutputVersionAction) {
                newService.outputVersions.push(new ServiceVersion(action.version, 'active'));
            }
            else if (action instanceof action_1.RemoveOutputVersionAction) {
                newService.outputVersions = newService.outputVersions.map(serviceVersion => {
                    if (serviceVersion.version === action.version) {
                        return new ServiceVersion(action.version, 'removed');
                    }
                    return serviceVersion;
                });
            }
            else if (action instanceof action_1.DeprecateOutputVersionAction) {
                newService.outputVersions = newService.outputVersions.map(serviceVersion => {
                    if (serviceVersion.version === action.version) {
                        return new ServiceVersion(action.version, 'deprecated');
                    }
                    return serviceVersion;
                });
            }
            newService.changeLog.push(action.changeLog);
        }
        generatedServices.push(newService);
    }
    return generatedServices;
}
exports.generateServices = generateServices;
function generateTypescript(services) {
    return services.map((service) => {
        return [
            service,
            prettier.format(typescriptServiceTemplate({
                service: service
            }), { parser: 'typescript' })
        ];
    });
}
exports.generateTypescript = generateTypescript;
function createActions(actions) {
    const log = [];
    for (const action of actions) {
        switch (action._action_type) {
            case 'NewServiceAction':
                log.push(new action_1.NewServiceAction(action.changeLog, action.hash, action.name, action.description, action.inputType, action.outputType, action.inputVersion, action.outputVersion));
                break;
            case 'UpdateDescriptionAction':
                log.push(new action_1.UpdateDescriptionAction(action.changeLog, action.hash, action.description));
                break;
            case 'AddInputVersionAction':
                log.push(new action_1.AddInputVersionAction(action.changeLog, action.hash, action.version));
                break;
            case 'RemoveInputVersionAction':
                log.push(new action_1.RemoveInputVersionAction(action.changeLog, action.hash, action.version));
                break;
            case 'DeprecateInputVersionAction':
                log.push(new action_1.DeprecateInputVersionAction(action.changeLog, action.hash, action.version));
                break;
            case 'AddOutputVersionAction':
                log.push(new action_1.AddOutputVersionAction(action.changeLog, action.hash, action.version));
                break;
            case 'RemoveOutputVersionAction':
                log.push(new action_1.RemoveOutputVersionAction(action.changeLog, action.hash, action.version));
                break;
            case 'DeprecateOutputVersionAction':
                log.push(new action_1.DeprecateOutputVersionAction(action.changeLog, action.hash, action.version));
                break;
        }
    }
    return log;
}
function loadActions(path) {
    const types = require(path);
    const outputTypes = [];
    for (const _type of types) {
        const log = createActions(_type);
        outputTypes.push(log);
    }
    return outputTypes;
}
exports.loadActions = loadActions;
