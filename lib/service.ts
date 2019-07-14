import * as typeidea from './typeidea';
import {
  Action,
  AddInputVersionAction,
  RemoveInputVersionAction,
  DeprecateInputVersionAction,
  AddOutputVersionAction,
  NewServiceAction,
  DeprecateOutputVersionAction,
  RemoveOutputVersionAction,
  UpdateDescriptionAction
} from './action';
import {compile} from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';

const typescriptServiceFile = fs.readFileSync(
  './templates/service.ejs',
  {
    encoding: "utf8",
  }
);
const typescriptServiceTemplate = compile(
  typescriptServiceFile,
  {
    filename: './templates/service.ejs'
  }
);

//export class ServiceAction {
//  changeLog: string;
//  hash: string | null;
//
//  constructor(changeLog: string, hash: string | null) {
//    this.changeLog = changeLog;
//    this.hash = hash;
//  }
//
//  fieldsToHash(): string {
//    throw new Error('NotImplemented');
//  };
//}
//
//export class NewServiceAction extends ServiceAction {
//  name: string;
//  description: string;
//  inputType: string;
//  outputType: string;
//  inputVersion: string;
//  outputVersion: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    name: string,
//    description: string,
//    inputType: string,
//    outputType: string,
//    inputVersion: string,
//    outputVersion: string,
//  ) {
//    super(changeLog, hash);
//    this.name = name;
//    this.description = description;
//    this.inputType = inputType;
//    this.outputType = outputType;
//    this.inputVersion = inputVersion;
//    this.outputVersion = outputVersion;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.name}_${this.description}_${this.inputType}_${this.outputType}_${this.inputVersion}_${this.outputVersion}`;
//  };
//}
//
//export class UpdateDescriptionAction extends ServiceAction {
//  description: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    description: string,
//  ) {
//    super(changeLog, hash);
//    this.description = description;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.description}`;
//  };
//}
//
//export class AddInputVersionAction extends ServiceAction {
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.version}`;
//  };
//}
//
//export class RemoveInputVersionAction extends ServiceAction {
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.version}`;
//  };
//}
//
//export class DeprecateInputVersionAction extends ServiceAction {
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.version}`;
//  };
//}
//
//export class AddOutputVersionAction extends ServiceAction {
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.version}`;
//  };
//}
//
//export class RemoveOutputVersionAction extends ServiceAction {
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.version}`;
//  };
//}
//
//export class DeprecateOutputVersionAction extends ServiceAction {
//  _type: string;
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${this.changeLog}_${this.version}`;
//  };
//}
//
type ServiceState = 'active' | 'deprecated' | 'removed';

export class ServiceVersion {
  version: string;
  state: ServiceState;

  constructor(
    version: string,
    state: ServiceState,
  ) {
    this.version = version;
    this.state = state;
  }
}

export class Service {
  name: string;
  changeLog: string[];
  description: string;
  inputType: string;
  outputType: string;
  inputVersions: ServiceVersion[];
  outputVersions: ServiceVersion[];

  constructor(
    name: string,
    description: string,
    inputType: string,
    outputType: string,
  ) {
    this.name = name;
    this.description = description;
    this.changeLog = [];
    this.inputType = inputType;
    this.outputType = outputType;
    this.inputVersions = [];
    this.outputVersions = [];
  }
}

export function generateServices(services: Array<Array<Action>>): Service[] {
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
      } else if (action.hash === null) {
        notHashed = true;
      } else {
        const expectedHash = typeidea.hashAction(action, previousHash);
        if (expectedHash !== action.hash) {
          throw new Error(`Invalid hash at item ${n} ${action}, did you change something?`)
        }
        previousHash = expectedHash;
      }
    }

    const newAction = (service[0] as NewServiceAction);
    const newService = new Service(
      newAction.name,
      newAction.description,
      newAction.inputType,
      newAction.outputType,
    );
    newService.inputVersions.push(new ServiceVersion(newAction.inputVersion, 'active'));
    newService.outputVersions.push(new ServiceVersion(newAction.outputVersion, 'active'));

    for (let n = 1; n < service.length; n++) {
      let action = service[n];
      if (action instanceof NewServiceAction) {
          throw new Error(`New Service action not at start!`);
      } else if (action instanceof UpdateDescriptionAction) {
          newService.description = action.description;
      } else if (action instanceof AddInputVersionAction) {
          newService.inputVersions.push(
            new ServiceVersion(action.version, 'active')
          );
      } else if (action instanceof RemoveInputVersionAction) {
        newService.inputVersions = newService.inputVersions.map(serviceVersion => {
          if (serviceVersion.version === (action as any).version) {
            return new ServiceVersion((action as any).version, 'removed');
          }
          return serviceVersion;
        });
      } else if (action instanceof DeprecateInputVersionAction) {
        newService.inputVersions = newService.inputVersions.map(serviceVersion => {
          if (serviceVersion.version === (action as any).version) {
            return new ServiceVersion((action as any).version, 'deprecated');
          }
          return serviceVersion;
        });
      } else if (action instanceof AddOutputVersionAction) {
        newService.outputVersions.push(
          new ServiceVersion(action.version, 'active')
        );
      } else if (action instanceof RemoveOutputVersionAction) {
        newService.outputVersions = newService.outputVersions.map(serviceVersion => {
          if (serviceVersion.version === (action as any).version) {
            return new ServiceVersion((action as any).version, 'removed');
          }
          return serviceVersion;
        });
      } else if (action instanceof DeprecateOutputVersionAction) {
        newService.outputVersions = newService.outputVersions.map(serviceVersion => {
          if (serviceVersion.version === (action as any).version) {
            return new ServiceVersion((action as any).version, 'deprecated');
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

export function generateTypescript(services: Service[]) {
  return services.map((service) => {
    return [
      service,
      prettier.format(
        typescriptServiceTemplate(
          {
            service: service
          }
        ),
        {parser: 'typescript'},
      )
    ];
  }
  );
}
function createActions(actions: any[]): Action[] {
  const log = [];

  for (const action of actions) {
    switch(action._action_type) {
      case 'NewServiceAction':
        log.push(new NewServiceAction(
          action.changeLog,
          action.hash,
          action.name,
          action.description,
          action.inputType,
          action.outputType,
          action.inputVersion,
          action.outputVersion,
        )
        );
        break;
      case 'UpdateDescriptionAction':
        log.push(new UpdateDescriptionAction(
          action.changeLog,
          action.hash,
          action.description)
        );
        break;
      case 'AddInputVersionAction':
        log.push(new AddInputVersionAction(
          action.changeLog,
          action.hash,
          action.version)
        );
        break;
      case 'RemoveInputVersionAction':
        log.push(new RemoveInputVersionAction(
          action.changeLog,
          action.hash,
          action.version)
        );
        break;
      case 'DeprecateInputVersionAction':
        log.push(new DeprecateInputVersionAction(
          action.changeLog,
          action.hash,
          action.version
        ));
        break;
      case 'AddOutputVersionAction':
        log.push(new AddOutputVersionAction(
          action.changeLog,
          action.hash,
          action.version
        ));
        break;
      case 'RemoveOutputVersionAction':
        log.push(new RemoveOutputVersionAction(
          action.changeLog,
          action.hash,
          action.version
        ));
        break;
      case 'DeprecateOutputVersionAction':
        log.push(new DeprecateOutputVersionAction(
          action.changeLog,
          action.hash,
          action.version
        ));
        break;
    }
  }

  return log;
}

export function loadActions(path: string): Array<Array<Action>> {
  const types = require(path);
  const outputTypes = [];

  for (const _type of types) {
    const log = createActions(_type);
    outputTypes.push(log);
  }

  return outputTypes;
}
