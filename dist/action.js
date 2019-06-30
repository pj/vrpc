"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(changeLog, hash) {
        this.changeLog = changeLog;
        this.hash = hash;
    }
    fieldsToHash() {
        return `${this.changeLog}`;
    }
    ;
}
exports.Action = Action;
// Type Actions
class NewTypeAction extends Action {
    constructor(changeLog, hash, name, description) {
        super(changeLog, hash);
        this.name = name;
        this.description = description;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}_${this.description}`;
    }
    ;
    toString() {
        return `NewTypeAction(${this.changeLog}, ${this.hash}, ${this.name}, ${this.description})`;
    }
}
exports.NewTypeAction = NewTypeAction;
class RenameFieldTypeAction extends Action {
    constructor(changeLog, hash, typeName, _from, to) {
        super(changeLog, hash);
        this.typeName = typeName;
        this._from = _from;
        this.to = to;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this._from}_${this.to}`;
    }
    ;
    toString() {
        return `RenameFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this._from}, ${this.to})`;
    }
}
exports.RenameFieldTypeAction = RenameFieldTypeAction;
class RequiredFieldTypeAction extends Action {
    constructor(changeLog, hash, typeName, name) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
    }
    ;
    toString() {
        return `RequiredFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
    }
}
exports.RequiredFieldTypeAction = RequiredFieldTypeAction;
class OptionalFieldTypeAction extends Action {
    constructor(changeLog, hash, typeName, name) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
    }
    ;
    toString() {
        return `OptionalFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
    }
}
exports.OptionalFieldTypeAction = OptionalFieldTypeAction;
class DeleteFieldTypeAction extends Action {
    constructor(changeLog, hash, typeName, name) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
    }
    ;
    toString() {
        return `DeleteFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
    }
}
exports.DeleteFieldTypeAction = DeleteFieldTypeAction;
class SetDefaultFieldTypeAction extends Action {
    constructor(changeLog, hash, name, typeName, _default) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
        this._default = _default;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this._default}`;
    }
    ;
    toString() {
        return `SetDefaultFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this._default})`;
    }
}
exports.SetDefaultFieldTypeAction = SetDefaultFieldTypeAction;
class RemoveDefaultFieldTypeAction extends Action {
    constructor(changeLog, hash, typeName, name) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}`;
    }
    ;
    toString() {
        return `RemoveDefaultFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name})`;
    }
}
exports.RemoveDefaultFieldTypeAction = RemoveDefaultFieldTypeAction;
class AddFieldTypeAction extends Action {
    constructor(changeLog, hash, typeName, name, type, description, optional, _default) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
        this.type = type;
        this.description = description;
        this.optional = optional;
        this._default = _default;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this.type}_${this.description}_${this.optional}_${this._default}`;
    }
    ;
    toString() {
        return `AddFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this.type}, ${this.description}, ${this.optional}, ${this._default})`;
    }
}
exports.AddFieldTypeAction = AddFieldTypeAction;
class UpdateDescriptionTypeAction extends Action {
    constructor(changeLog, hash, typeName, name, description) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
        this.description = description;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this.description}`;
    }
    ;
    toString() {
        return `UpdateDescriptionTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this.description})`;
    }
}
exports.UpdateDescriptionTypeAction = UpdateDescriptionTypeAction;
class ReferenceFieldTypeAction extends Action {
    constructor(changeLog, hash, typeName, name, description, optional, referenceType, referenceHash) {
        super(changeLog, hash);
        this.typeName = typeName;
        this.name = name;
        this.description = description;
        this.optional = optional;
        this.referenceType = referenceType;
        this.referenceHash = referenceHash;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.typeName}_${this.name}_${this.description}_${this.optional}_${this.referenceType}_${this.referenceHash}`;
    }
    ;
    toString() {
        return `ReferenceFieldTypeAction(${this.changeLog}, ${this.hash}, ${this.typeName}, ${this.name}, ${this.description}, ${this.optional}, ${this.referenceType}, ${this.referenceHash})`;
    }
}
exports.ReferenceFieldTypeAction = ReferenceFieldTypeAction;
class GroupAction extends Action {
    constructor(changeLog, hash, typeOrServiceName, actions) {
        super(changeLog, hash);
        this.typeOrServiceName = typeOrServiceName;
        this.actions = actions;
    }
    fieldsToHash() {
        const subHashes = [this.typeOrServiceName];
        for (const action of this.actions) {
            subHashes.push(action.fieldsToHash());
        }
        return subHashes.join('_');
    }
    ;
    toString() {
        const formattedActions = this.actions.map(action => action.toString());
        return `GroupAction(${this.changeLog}, ${this.hash}, ${this.typeOrServiceName}, ${formattedActions})`;
    }
}
exports.GroupAction = GroupAction;
// Service Definitions
class NewServiceAction extends Action {
    constructor(changeLog, hash, serviceName, description, inputType, outputType, inputVersion, outputVersion) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.description = description;
        this.inputType = inputType;
        this.outputType = outputType;
        this.inputVersion = inputVersion;
        this.outputVersion = outputVersion;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.description}_${this.inputType}_${this.outputType}_${this.inputVersion}_${this.outputVersion}`;
    }
    ;
    toString() {
        return `NewServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.description}, ${this.inputType}, ${this.outputType}, ${this.inputVersion}, ${this.outputVersion})`;
    }
}
exports.NewServiceAction = NewServiceAction;
class UpdateDescriptionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, description) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.description = description;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.description}`;
    }
    ;
    toString() {
        return `UpdateDescriptionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.description})`;
    }
}
exports.UpdateDescriptionServiceAction = UpdateDescriptionServiceAction;
class AddInputVersionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, version) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.version = version;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
    }
    ;
    toString() {
        return `AddInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
    }
}
exports.AddInputVersionServiceAction = AddInputVersionServiceAction;
class RemoveInputVersionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, version) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.version = version;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
    }
    ;
    toString() {
        return `RemoveInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
    }
}
exports.RemoveInputVersionServiceAction = RemoveInputVersionServiceAction;
class DeprecateInputVersionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, version) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.version = version;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
    }
    ;
    toString() {
        return `DeprecateInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
    }
}
exports.DeprecateInputVersionServiceAction = DeprecateInputVersionServiceAction;
class AddOutputVersionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, version) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.version = version;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
    }
    ;
    toString() {
        return `AddOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
    }
}
exports.AddOutputVersionServiceAction = AddOutputVersionServiceAction;
class RemoveOutputVersionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, version) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.version = version;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
    }
    ;
    toString() {
        return `RemoveOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
    }
}
exports.RemoveOutputVersionServiceAction = RemoveOutputVersionServiceAction;
class DeprecateOutputVersionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, version) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.version = version;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
    }
    ;
    toString() {
        return `DeprecateOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
    }
}
exports.DeprecateOutputVersionServiceAction = DeprecateOutputVersionServiceAction;
function loadAction(action) {
    switch (action._action_type) {
        // Services
        case 'NewServiceAction':
            return new NewServiceAction(action.changeLog, action.hash, action.serviceName, action.description, action.inputType, action.outputType, action.inputVersion, action.outputVersion);
        case 'UpdateDescriptionServiceAction':
            return new UpdateDescriptionServiceAction(action.changeLog, action.hash, action.serviceName, action.description);
        case 'AddInputVersionServiceAction':
            return new AddInputVersionServiceAction(action.changeLog, action.hash, action.serviceName, action.version);
        case 'RemoveInputVersionServiceAction':
            return new RemoveInputVersionServiceAction(action.changeLog, action.hash, action.serviceName, action.version);
        case 'DeprecateInputVersionServiceAction':
            return new DeprecateInputVersionServiceAction(action.changeLog, action.hash, action.serviceName, action.version);
        case 'AddOutputVersionServiceAction':
            return new AddOutputVersionServiceAction(action.changeLog, action.hash, action.serviceName, action.version);
        case 'RemoveOutputVersionServiceAction':
            return new RemoveOutputVersionServiceAction(action.changeLog, action.hash, action.serviceName, action.version);
        case 'DeprecateOutputVersionServiceAction':
            return new DeprecateOutputVersionServiceAction(action.changeLog, action.hash, action.serviceName, action.version);
        // Types
        case 'RenameFieldTypeAction':
            return new RenameFieldTypeAction(action.changeLog, action.hash, action.typeName, action._from, action.to);
        case 'RequiredFieldTypeAction':
            return new RequiredFieldTypeAction(action.changeLog, action.hash, action.typeName, action.name);
        case 'OptionalFieldTypeAction':
            return new OptionalFieldTypeAction(action.changeLog, action.hash, action.typeName, action.name);
        case 'DeleteFieldTypeAction':
            return new DeleteFieldTypeAction(action.changeLog, action.hash, action.typeName, action.name);
        case 'SetDefaultFieldTypeAction':
            return new SetDefaultFieldTypeAction(action.changeLog, action.hash, action.typeName, action.name, action._default);
        case 'RemoveDefaultFieldTypeAction':
            return new RemoveDefaultFieldTypeAction(action.changeLog, action.hash, action.typeName, action.name);
        case 'AddFieldTypeAction':
            return new AddFieldTypeAction(action.changeLog, action.hash, action.typeName, action.name, action.type, action.description, action.optional, action._default);
        case 'UpdateDescriptionTypeAction':
            return new UpdateDescriptionTypeAction(action.changeLog, action.hash, action.typeName, action.name, action.description);
        case 'ReferenceFieldTypeAction':
            return new ReferenceFieldTypeAction(action.changeLog, action.hash, action.typeName, action.name, action.description, action.optional, action.referenceType, action.referenceHash);
        case 'NewTypeAction':
            return new NewTypeAction(action.changeLog, action.hash, action.name, action.description);
        case 'GroupAction':
            const groupedActions = [];
            for (const subAction of action.actions) {
                groupedActions.push(loadAction(subAction));
            }
            return new GroupAction(action.changeLog, action.hash, action.name, groupedActions);
        default:
            throw new Error(`Unknown Action: ${action}`);
    }
}
function loadActionLog(path) {
    const actions = require(path);
    const outputActions = [];
    for (const action of actions) {
        const log = loadAction(action);
        outputActions.push(log);
    }
    return outputActions;
}
exports.loadActionLog = loadActionLog;
function loadActionLogFromList(actions) {
    const outputActions = [];
    for (const action of actions) {
        const log = loadAction(action);
        outputActions.push(log);
    }
    return outputActions;
}
exports.loadActionLogFromList = loadActionLogFromList;
//function loadArrayAction(fields: any): Action {
//  var name, inputType, inputVersion, outputType, outputVersion, changeLog,
//    description, hash, serviceName, version, typeName, _from, to, _default,
//    type, optional, referenceType, referenceHash, _;
//  switch(fields[0]) {
//    // Services
//    case 'new_service':
//      [
//        _,
//        name,
//        inputType,
//        inputVersion,
//        outputType,
//        outputVersion,
//        changeLog,
//        description,
//        hash
//      ] = fields;
//      return new NewServiceAction(
//        changeLog,
//        hash,
//        name,
//        description,
//        inputType, outputType,
//        inputVersion,
//        outputVersion,
//      );
//    case 'update_service_description':
//      [
//        _,
//        serviceName,
//        changeLog,
//        description,
//        hash
//      ] = fields;
//      return new UpdateDescriptionServiceAction(
//        changeLog,
//        hash,
//        serviceName,
//        description
//      );
//    case 'add_service_input_version':
//      [
//        _,
//        serviceName,
//        version,
//        changeLog,
//        hash
//      ] = fields;
//      return new AddInputVersionServiceAction(
//        changeLog,
//        hash,
//        serviceName,
//        version
//      );
//    case 'remove_service_input_version':
//      [
//        _,
//        serviceName,
//        version,
//        changeLog,
//        hash
//      ] = fields;
//      return new RemoveInputVersionServiceAction(
//        changeLog,
//        hash,
//        serviceName,
//        version
//      );
//    case 'deprecate_service_input_version':
//      [
//        _,
//        serviceName,
//        version,
//        changeLog,
//        hash
//      ] = fields;
//      return new DeprecateInputVersionServiceAction(
//        changeLog,
//        hash,
//        serviceName,
//        version
//      );
//    case 'add_service_output_version':
//      [
//        _,
//        serviceName,
//        version,
//        changeLog,
//        hash
//      ] = fields;
//      return new AddOutputVersionServiceAction(
//        changeLog,
//        hash,
//        serviceName,
//        version
//      );
//    case 'remove_service_output_version':
//      [
//        _,
//        serviceName,
//        version,
//        changeLog,
//        hash
//      ] = fields;
//      return new RemoveOutputVersionServiceAction(
//        changeLog,
//        hash,
//        serviceName,
//        version
//      );
//    case 'deprecate_service_output_version':
//      [
//        _,
//        serviceName,
//        version,
//        changeLog,
//        hash
//      ] = fields;
//      return new DeprecateOutputVersionServiceAction(
//        changeLog,
//        hash,
//        serviceName,
//        version
//      );
//    // Types
//    case 'rename_field':
//      [
//        _,
//        typeName,
//        _from,
//        to,
//        changeLog,
//        hash
//      ] = fields;
//      return new RenameFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        _from,
//        to
//      );
//    case 'required_field':
//      [
//        _,
//        typeName,
//        name,
//        changeLog,
//        hash
//      ] = fields;
//      return new RequiredFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name
//      );
//    case 'optional_field':
//      [
//        _,
//        typeName,
//        name,
//        changeLog,
//        hash
//      ] = fields;
//      return new OptionalFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name
//      );
//    case 'delete_field':
//      [
//        _,
//        typeName,
//        name,
//        changeLog,
//        hash
//      ] = fields;
//      return new DeleteFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name
//      );
//    case 'set_field_default':
//      [
//        _,
//        typeName,
//        name,
//        _default,
//        changeLog,
//        hash
//      ] = fields;
//      return new SetDefaultFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name,
//        _default
//      );
//    case 'remove_field_default':
//      [
//        _,
//        typeName,
//        name,
//        changeLog,
//        hash
//      ] = fields;
//      return new RemoveDefaultFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name
//      );
//    case 'add_field':
//      [
//        _,
//        typeName,
//        name,
//        type,
//        optional,
//        _default,
//        description,
//        changeLog,
//        hash
//      ] = fields;
//      return new AddFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name,
//        type,
//        description,
//        optional,
//        _default
//      );
//    case 'update_description':
//      [
//        _,
//        typeName,
//        name,
//        description,
//        changeLog,
//        hash
//      ] = fields;
//      return new UpdateDescriptionTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name,
//        description
//      );
//    case 'reference_field':
//      [
//        _,
//        typeName,
//        name,
//        optional,
//        referenceType,
//        referenceHash,
//        description,
//        changeLog,
//        hash
//      ] = fields;
//      return new ReferenceFieldTypeAction(
//        changeLog,
//        hash,
//        typeName,
//        name,
//        description,
//        optional,
//        referenceType,
//        referenceHash
//      );
//    case 'new_type':
//      [
//        _,
//        name,
//        description,
//        changeLog,
//        hash
//      ] = fields;
//      return new NewTypeAction(
//        changeLog,
//        hash,
//        name,
//        description
//      );
//    default:
//      throw new Error(`Unknown Action: ${fields}`);
//  }
//}
//
//function loadSimpleAction(action: any): Action {
//  switch(action.action) {
//    // Services
//    case 'new_service_action':
//      return new NewServiceAction(
//        action.changeLog,
//        action.hash,
//        action.name,
//        action.description,
//        action.inputType, action.outputType,
//        action.input_version,
//        action.output_version,
//      );
//    case 'update_description_service_action':
//      return new UpdateDescriptionServiceAction(
//        action.changeLog,
//        action.hash,
//        action.serviceName,
//        action.description
//      );
//    case 'add_input_version_service_action':
//      return new AddInputVersionServiceAction(
//        action.changeLog,
//        action.hash,
//        action.serviceName,
//        action.version
//      );
//    case 'remove_input_version_service_action':
//      return new RemoveInputVersionServiceAction(
//        action.changeLog,
//        action.hash,
//        action.serviceName,
//        action.version
//      );
//    case 'deprecate_input_version_service_action':
//      return new DeprecateInputVersionServiceAction(
//        action.changeLog,
//        action.hash,
//        action.serviceName,
//        action.version
//      );
//    case 'add_output_version_service_action':
//      return new AddOutputVersionServiceAction(
//        action.changeLog,
//        action.hash,
//        action.serviceName,
//        action.version
//      );
//    case 'remove_output_version_service_action':
//      return new RemoveOutputVersionServiceAction(
//        action.changeLog,
//        action.hash,
//        action.serviceName,
//        action.version
//      );
//    case 'deprecate_output_version_service_action':
//      return new DeprecateOutputVersionServiceAction(
//        action.changeLog,
//        action.hash,
//        action.serviceName,
//        action.version
//      );
//    // Types
//    case 'rename_field_type_action':
//      return new RenameFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action._from,
//        action.to
//      );
//    case 'required_field_type_action':
//      return new RequiredFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name
//      );
//    case 'optional_field_type_action':
//      return new OptionalFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name
//      );
//    case 'delete_field_type_action':
//      return new DeleteFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name
//      );
//    case 'set_default_field_type_action':
//      return new SetDefaultFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name,
//        action._default
//      );
//    case 'remove_default_field_type_action':
//      return new RemoveDefaultFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name
//      );
//    case 'add_field_type_action':
//      return new AddFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name,
//        action.type,
//        action.description,
//        action.optional,
//        action._default
//      );
//    case 'update_description_type_action':
//      return new UpdateDescriptionTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name,
//        action.description
//      );
//    case 'reference_field_type_action':
//      return new ReferenceFieldTypeAction(
//        action.changeLog,
//        action.hash,
//        action.typeName,
//        action.name,
//        action.description,
//        action.optional,
//        action.referenceType,
//        action.referenceHash
//      );
//    case 'new_type_action':
//      return new NewTypeAction(
//        action.changeLog,
//        action.hash,
//        action.name,
//        action.description
//      );
//    case 'group_action':
//      const groupedActions = [];
//      for (const subAction of action.actions) {
//        groupedActions.push(loadAction(subAction));
//      }
//      return new GroupAction(
//        action.changeLog,
//        action.hash,
//        action.name,
//        groupedActions
//      );
//    default:
//      throw new Error(`Unknown Action: ${action}`)
//  }
//}
//
//const rowRegex = /(([a-z]):.+(?<=\\),)/g;
//function parseRow(row: string) {
//  let matches;
//  while ((matches = rowRegex.exec(row)) !== null) {
//    console.log(matches);
//    // expected output: "Found foo. Next starts at 9."
//    // expected output: "Found foo. Next starts at 19."
//  }
//}
//
//export function loadSimpleActionLog(path: string): Array<Action> {
//  const contents = fs.readFileSync(path, {'encoding': 'utf8'});
//  const lines = contents.split('\n');
//  const outputActions = [];
//  let currentGroup = null;
//
//  for (const line of lines) {
//    if (line === '') {
//      continue;
//    }
//    const action = loadSimpleAction(parseRow(line));
//    outputActions.push(action);
//    //if (line[0] === 'start_group') {
//    //  currentGroup = [];
//    //} else if (line[0] === 'end_group') {
//    //  outputActions.push(new GroupAction(
//    //    "todo",
//    //    ,
//    //    action.state,
//    //    currentGroup
//    //  ));
//    //  currentGroup = null;
//    //} else {
//    //  if (currentGroup !== null) {
//    //    currentGroup.push(action);
//    //  } else {
//    //    outputActions.push(action);
//    //  }
//    //}
//  }
//
//  return outputActions;
//}
