"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(changeLog, hash) {
        this._action_type = this.constructor.name;
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
class AddVersionServiceAction extends Action {
    constructor(changeLog, hash, serviceName, inputType, outputType, inputVersion, outputVersion) {
        super(changeLog, hash);
        this.serviceName = serviceName;
        this.inputType = inputType;
        this.outputType = outputType;
        this.inputVersion = inputVersion;
        this.outputVersion = outputVersion;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.serviceName}_${this.inputType}_${this.outputType}_${this.inputVersion}_${this.outputVersion}`;
    }
    ;
    toString() {
        return `AddVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.inputType}, ${this.outputType}, ${this.inputVersion}, ${this.outputVersion})`;
    }
}
exports.AddVersionServiceAction = AddVersionServiceAction;
//export class AddInputVersionServiceAction extends Action {
//  serviceName: string;
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    serviceName: string,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.serviceName = serviceName;
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
//  };
//
//  toString(): string {
//    return `AddInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
//  }
//}
//
//export class RemoveInputVersionServiceAction extends Action {
//  serviceName: string;
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    serviceName: string,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.serviceName = serviceName;
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
//  };
//
//  toString(): string {
//    return `RemoveInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
//  }
//}
//
//export class DeprecateInputVersionServiceAction extends Action {
//  serviceName: string;
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    serviceName: string,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.serviceName = serviceName;
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
//  };
//
//  toString(): string {
//    return `DeprecateInputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
//  }
//}
//
//export class AddOutputVersionServiceAction extends Action {
//  serviceName: string;
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    serviceName: string,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.serviceName = serviceName;
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
//  };
//
//  toString(): string {
//    return `AddOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
//  }
//}
//
//export class RemoveOutputVersionServiceAction extends Action {
//  serviceName: string;
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    serviceName: string,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.serviceName = serviceName;
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
//  };
//
//  toString(): string {
//    return `RemoveOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
//  }
//}
//
//export class DeprecateOutputVersionServiceAction extends Action {
//  serviceName: string;
//  version: string;
//
//  constructor(
//    changeLog: string,
//    hash: string | null,
//    serviceName: string,
//    version: string,
//  ) {
//    super(changeLog, hash);
//    this.serviceName = serviceName;
//    this.version = version;
//  }
//
//  fieldsToHash(): string {
//    return `${super.fieldsToHash()}_${this.serviceName}_${this.version}`;
//  };
//
//  toString(): string {
//    return `DeprecateOutputVersionServiceAction(${this.changeLog}, ${this.hash}, ${this.serviceName}, ${this.version})`;
//  }
//}
function loadAction(action) {
    switch (action._action_type) {
        // Services
        case 'NewServiceAction':
            return new NewServiceAction(action.changeLog, action.hash, action.serviceName, action.description, action.inputType, action.outputType, action.inputVersion, action.outputVersion);
        case 'UpdateDescriptionServiceAction':
            return new UpdateDescriptionServiceAction(action.changeLog, action.hash, action.serviceName, action.description);
        case 'AddVersionServiceAction':
            return new AddVersionServiceAction(action.changeLog, action.hash, action.serviceName, action.inputType, action.outputType, action.inputVersion, action.outputVersion);
        //case 'AddInputVersionServiceAction':
        //  return new AddInputVersionServiceAction(
        //    action.changeLog,
        //    action.hash,
        //    action.serviceName,
        //    action.version
        //  );
        //case 'RemoveInputVersionServiceAction':
        //  return new RemoveInputVersionServiceAction(
        //    action.changeLog,
        //    action.hash,
        //    action.serviceName,
        //    action.version
        //  );
        //case 'DeprecateInputVersionServiceAction':
        //  return new DeprecateInputVersionServiceAction(
        //    action.changeLog,
        //    action.hash,
        //    action.serviceName,
        //    action.version
        //  );
        //case 'AddOutputVersionServiceAction':
        //  return new AddOutputVersionServiceAction(
        //    action.changeLog,
        //    action.hash,
        //    action.serviceName,
        //    action.version
        //  );
        //case 'RemoveOutputVersionServiceAction':
        //  return new RemoveOutputVersionServiceAction(
        //    action.changeLog,
        //    action.hash,
        //    action.serviceName,
        //    action.version
        //  );
        //case 'DeprecateOutputVersionServiceAction':
        //  return new DeprecateOutputVersionServiceAction(
        //    action.changeLog,
        //    action.hash,
        //    action.serviceName,
        //    action.version
        //  );
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
