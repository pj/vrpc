export type FieldTypes = 'string' | 'boolean' | 'number';

export type FieldDefaults = string | boolean | number;

export class Action {
  changeLog: string;
  hash: string | null;

  constructor(changeLog: string, hash: string | null) {
    this.changeLog = changeLog;
    this.hash = hash;
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

// Type Actions
export class NewTypeAction extends Action {
  name: string;
  description: string;

  constructor(
    changeLog: string,
    hash: string | null,
    name: string,
    description: string
  ) {
    super(changeLog, hash);
    this.name = name;
    this.description = description;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.name}_${this.description}`;
  };
}

export class RenameFieldTypeAction extends Action {
  typeName: string;
  _from: string;
  to: string;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    _from: string,
    to: string,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this._from = _from;
    this.to = to;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this._from}_${this.to}`;
  };
}

export class RequiredFieldTypeAction extends Action {
  typeName: string;
  name: string;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    name: string,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
  };
}

export class OptionalFieldTypeAction extends Action {
  typeName: string;
  name: string;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    name: string,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
  };
}

export class DeleteFieldTypeAction extends Action {
  typeName: string;
  name: string;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    name: string,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
  };
}

export class SetDefaultFieldTypeAction extends Action {
  typeName: string;
  name: string;
  _default: FieldDefaults;

  constructor(
    changeLog: string,
    hash: string | null,
    name: string,
    typeName: string,
    _default: FieldDefaults,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
    this._default = _default;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this._default}`;
  };
}

export class RemoveDefaultFieldTypeAction extends Action {
  typeName: string;
  name: string;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    name: string,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
  };
}

export class AddFieldTypeAction extends Action {
  typeName: string;
  name: string;
  type: FieldTypes;
  description: string;
  optional: boolean;
  _default: FieldDefaults | null;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    name: string,
    type: FieldTypes,
    description: string,
    optional: boolean,
    _default: FieldDefaults | null
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
    this.type = type;
    this.description = description;
    this.optional = optional;
    this._default = _default;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this.type}_${this.description}_${this.optional}_${this._default}`;
  };
}

export class UpdateDescriptionTypeAction extends Action {
  typeName: string;
  name: string;
  description: string;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    name: string,
    description: string,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
    this.description = description;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this.description}`;
  };
}

export class ReferenceFieldTypeAction extends Action {
  typeName: string;
  name: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;

  constructor(
    changeLog: string,
    hash: string | null,
    typeName: string,
    name: string,
    description: string,
    optional: boolean,
    referenceType: string,
    referenceHash: string,
  ) {
    super(changeLog, hash);
    this.typeName = typeName;
    this.name = name;
    this.description = description;
    this.optional = optional;
    this.referenceType = referenceType;
    this.referenceHash = referenceHash;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this.description}_${this.optional}_${this.referenceType}_${this.referenceHash}`;
  };
}

export class GroupAction extends Action {
  typeOrServiceName: string;
  actions: Action[];

  constructor(
    changeLog: string,
    hash: string | null,
    typeOrServiceName: string,
    actions: Action[],
  ) {
    super(changeLog, hash);
    this.typeOrServiceName = typeOrServiceName;
    this.actions = actions;
  }

  fieldsToHash(): string {
    const subHashes: string[] = [this.typeOrServiceName];
    for (const action of this.actions) {
      subHashes.push(action.fieldsToHash());
    }
    return subHashes.join('_');
  };
}

// Service Definitions
export class NewServiceAction extends Action {
  serviceName: string;
  description: string;
  inputType: string;
  outputType: string;
  inputVersion: string;
  outputVersion: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    description: string,
    inputType: string,
    outputType: string,
    inputVersion: string,
    outputVersion: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.description = description;
    this.inputType = inputType;
    this.outputType = outputType;
    this.inputVersion = inputVersion;
    this.outputVersion = outputVersion;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.description}_${this.inputType}_${this.outputType}_${this.inputVersion}_${this.outputVersion}`;
  };
}

export class UpdateDescriptionServiceAction extends Action {
  serviceName: string;
  description: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    description: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.description = description;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.description}`;
  };
}

export class AddInputVersionServiceAction extends Action {
  serviceName: string;
  version: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    version: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.version = version;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
  };
}

export class RemoveInputVersionServiceAction extends Action {
  serviceName: string;
  version: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    version: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.version = version;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
  };
}

export class DeprecateInputVersionServiceAction extends Action {
  serviceName: string;
  version: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    version: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.version = version;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
  };
}

export class AddOutputVersionServiceAction extends Action {
  serviceName: string;
  version: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    version: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.version = version;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
  };
}

export class RemoveOutputVersionServiceAction extends Action {
  serviceName: string;
  version: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    version: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.version = version;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
  };
}

export class DeprecateOutputVersionServiceAction extends Action {
  serviceName: string;
  version: string;

  constructor(
    changeLog: string,
    hash: string | null,
    serviceName: string,
    version: string,
  ) {
    super(changeLog, hash);
    this.serviceName = serviceName;
    this.version = version;
  }

  fieldsToHash(): string {
    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
  };
}

function loadAction(action: any): Action {
  switch(action._action_type) {
    // Services
    case 'NewServiceAction':
      return new NewServiceAction(
        action.changeLog,
        action.hash,
        action.name,
        action.description,
        action.inputType, action.outputType,
        action.inputVersion,
        action.outputVersion,
      );
    case 'UpdateDescriptionServiceAction':
      return new UpdateDescriptionServiceAction(
        action.changeLog,
        action.hash,
        action.serviceName,
        action.description
      );
    case 'AddInputVersionServiceAction':
      return new AddInputVersionServiceAction(
        action.changeLog,
        action.hash,
        action.serviceName,
        action.version
      );
    case 'RemoveInputVersionServiceAction':
      return new RemoveInputVersionServiceAction(
        action.changeLog,
        action.hash,
        action.serviceName,
        action.version
      );
    case 'DeprecateInputVersionServiceAction':
      return new DeprecateInputVersionServiceAction(
        action.changeLog,
        action.hash,
        action.serviceName,
        action.version
      );
    case 'AddOutputVersionServiceAction':
      return new AddOutputVersionServiceAction(
        action.changeLog,
        action.hash,
        action.serviceName,
        action.version
      );
    case 'RemoveOutputVersionServiceAction':
      return new RemoveOutputVersionServiceAction(
        action.changeLog,
        action.hash,
        action.serviceName,
        action.version
      );
    case 'DeprecateOutputVersionServiceAction':
      return new DeprecateOutputVersionServiceAction(
        action.changeLog,
        action.hash,
        action.serviceName,
        action.version
      );
    // Types
    case 'RenameFieldTypeAction':
      return new RenameFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action._from,
        action.to
      );
    case 'RequiredFieldTypeAction':
      return new RequiredFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name
      );
    case 'OptionalFieldTypeAction':
      return new OptionalFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name
      );
    case 'DeleteFieldTypeAction':
      return new DeleteFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name
      );
    case 'SetDefaultFieldTypeAction':
      return new SetDefaultFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name,
        action._default
      );
    case 'RemoveDefaultFieldTypeAction':
      return new RemoveDefaultFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name
      );
    case 'AddFieldTypeAction':
      return new AddFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name,
        action.type,
        action.description,
        action.optional,
        action._default
      );
    case 'UpdateDescriptionTypeAction':
      return new UpdateDescriptionTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name,
        action.description
      );
    case 'ReferenceFieldTypeAction':
      return new ReferenceFieldTypeAction(
        action.changeLog,
        action.hash,
        action.typeName,
        action.name,
        action.description,
        action.optional,
        action.referenceType,
        action.referenceHash
      );
    case 'NewTypeAction':
      return new NewTypeAction(
        action.changeLog,
        action.hash,
        action.name,
        action.description
      );
    case 'GroupAction':
      const groupedActions = [];
      for (const subAction in action.actions) {
        groupedActions.push(loadAction(subAction));
      }
      return new GroupAction(
        action.changeLog,
        action.hash,
        action.state,
        groupedActions
      );
    default:
      throw new Error(`Unknown Action: ${action}`)
  }
}

export function loadActionLog(path: string): Array<Action> {
  const actions = require(path);
  const outputActions = [];

  for (const action of actions) {
    const log = loadAction(action);
    outputActions.push(log);
  }

  return outputActions;
}
