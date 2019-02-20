import * as fs from 'fs';

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

  toString(): string {
    return `NewTypeAction(${this.changeLog}, ${this.hash}, ${this.name}, ${this.description})`;
  }
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

  toString(): string {
    return `RenameFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this._from}, ${this.to})`;
  }
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

  toString(): string {
    return `RequiredFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
  }
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

  toString(): string {
    return `OptionalFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
  }
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

  toString(): string {
    return `DeleteFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
  }
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

  toString(): string {
    return `SetDefaultFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this._default})`;
  }
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

  toString(): string {
    return `RemoveDefaultFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
  }
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

  toString(): string {
    return `AddFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this.type}, ${this.description}, ${this.optional}, ${this._default})`;
  }
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

  toString(): string {
    return `UpdateDescriptionTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this.description})`;
  }
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

  toString(): string {
    return `ReferenceFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this.description}, ${this.optional}, ${this.referenceType}, ${this.referenceHash})`;
  }
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

  toString(): string {
    const formattedActions = this.actions.map(action => action.toString());
    return `GroupAction(${this.changeLog}, ${this.hash}, ${this.typeOrServiceName}, ${formattedActions})`;
  }
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

  toString(): string {
    return `NewServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.description}, ${this.inputType}, ${this.outputType}, ${this.inputVersion}, ${this.outputVersion})`;
  }
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

  toString(): string {
    return `UpdateDescriptionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.description})`;
  }
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

  toString(): string {
    return `AddInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
  }
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

  toString(): string {
    return `RemoveInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
  }
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

  toString(): string {
    return `DeprecateInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
  }
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

  toString(): string {
    return `AddOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
  }
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

  toString(): string {
    return `RemoveOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
  }
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

  toString(): string {
    return `DeprecateOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
  }
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
      for (const subAction of action.actions) {
        groupedActions.push(loadAction(subAction));
      }
      return new GroupAction(
        action.changeLog,
        action.hash,
        action.name,
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

function loadSimpleAction(fields: any): Action {
  var name, inputType, inputVersion, outputType, outputVersion, changeLog,
    description, hash, serviceName, version, typeName, _from, to, _default,
    type, optional, referenceType, referenceHash, _;
  switch(fields[0]) {
    // Services
    case 'new_service':
      [
        _,
        name,
        inputType,
        inputVersion,
        outputType,
        outputVersion,
        changeLog,
        description,
        hash
      ] = fields;
      return new NewServiceAction(
        changeLog,
        hash,
        name,
        description,
        inputType, outputType,
        inputVersion,
        outputVersion,
      );
    case 'update_service_description':
      [
        _,
        serviceName,
        changeLog,
        description,
        hash
      ] = fields;
      return new UpdateDescriptionServiceAction(
        changeLog,
        hash,
        serviceName,
        description
      );
    case 'add_service_input_version':
      [
        _,
        serviceName,
        version,
        changeLog,
        hash
      ] = fields;
      return new AddInputVersionServiceAction(
        changeLog,
        hash,
        serviceName,
        version
      );
    case 'remove_service_input_version':
      [
        _,
        serviceName,
        version,
        changeLog,
        hash
      ] = fields;
      return new RemoveInputVersionServiceAction(
        changeLog,
        hash,
        serviceName,
        version
      );
    case 'deprecate_service_input_version':
      [
        _,
        serviceName,
        version,
        changeLog,
        hash
      ] = fields;
      return new DeprecateInputVersionServiceAction(
        changeLog,
        hash,
        serviceName,
        version
      );
    case 'add_service_output_version':
      [
        _,
        serviceName,
        version,
        changeLog,
        hash
      ] = fields;
      return new AddOutputVersionServiceAction(
        changeLog,
        hash,
        serviceName,
        version
      );
    case 'remove_service_output_version':
      [
        _,
        serviceName,
        version,
        changeLog,
        hash
      ] = fields;
      return new RemoveOutputVersionServiceAction(
        changeLog,
        hash,
        serviceName,
        version
      );
    case 'deprecate_service_output_version':
      [
        _,
        serviceName,
        version,
        changeLog,
        hash
      ] = fields;
      return new DeprecateOutputVersionServiceAction(
        changeLog,
        hash,
        serviceName,
        version
      );
    // Types
    case 'rename_field':
      [
        _,
        typeName,
        _from,
        to,
        changeLog,
        hash
      ] = fields;
      return new RenameFieldTypeAction(
        changeLog,
        hash,
        typeName,
        _from,
        to
      );
    case 'required_field':
      [
        _,
        typeName,
        name,
        changeLog,
        hash
      ] = fields;
      return new RequiredFieldTypeAction(
        changeLog,
        hash,
        typeName,
        name
      );
    case 'optional_field':
      [
        _,
        typeName,
        name,
        changeLog,
        hash
      ] = fields;
      return new OptionalFieldTypeAction(
        changeLog,
        hash,
        typeName,
        name
      );
    case 'delete_field':
      [
        _,
        typeName,
        name,
        changeLog,
        hash
      ] = fields;
      return new DeleteFieldTypeAction(
        changeLog,
        hash,
        typeName,
        name
      );
    case 'set_field_default':
      [
        _,
        typeName,
        name,
        _default,
        changeLog,
        hash
      ] = fields;
      return new SetDefaultFieldTypeAction(
        changeLog,
        hash,
        typeName,
        name,
        _default
      );
    case 'remove_field_default':
      [
        _,
        typeName,
        name,
        changeLog,
        hash
      ] = fields;
      return new RemoveDefaultFieldTypeAction(
        changeLog,
        hash,
        typeName,
        name
      );
    case 'add_field':
      [
        _,
        typeName,
        name,
        type,
        optional,
        _default,
        description,
        changeLog,
        hash
      ] = fields;
      return new AddFieldTypeAction(
        changeLog,
        hash,
        typeName,
        name,
        type,
        description,
        optional,
        _default
      );
    case 'update_description':
      [
        _,
        typeName,
        name,
        description,
        changeLog,
        hash
      ] = fields;
      return new UpdateDescriptionTypeAction(
        changeLog,
        hash,
        typeName,
        name,
        description
      );
    case 'reference_field':
      [
        _,
        typeName,
        name,
        optional,
        referenceType,
        referenceHash,
        description,
        changeLog,
        hash
      ] = fields;
      return new ReferenceFieldTypeAction(
        changeLog,
        hash,
        typeName,
        name,
        description,
        optional,
        referenceType,
        referenceHash
      );
    case 'new_type':
      [
        _,
        name,
        description,
        changeLog,
        hash
      ] = fields;
      return new NewTypeAction(
        changeLog,
        hash,
        name,
        description
      );
    default:
      throw new Error(`Unknown Action: ${fields}`);
  }
}

export function loadSimpleActionLog(path: string): Array<Action> {
  const contents = fs.readFileSync(path, {'encoding': 'utf8'});
  const lines = contents.split('\n');
  const outputActions = [];
  let currentGroup = null;

  for (const line of lines) {
    if (line === '') {
      continue;
    }
    const action = loadSimpleAction(line.split(','));
    outputActions.push(action);
    //if (line[0] === 'start_group') {
    //  currentGroup = [];
    //} else if (line[0] === 'end_group') {
    //  outputActions.push(new GroupAction(
    //    "todo",
    //    ,
    //    action.state,
    //    currentGroup
    //  ));
    //  currentGroup = null;
    //} else {
    //  if (currentGroup !== null) {
    //    currentGroup.push(action);
    //  } else {
    //    outputActions.push(action);
    //  }
    //}
  }

  return outputActions;
}
