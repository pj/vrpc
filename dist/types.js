"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(changeLog, hash, state) {
        this.changeLog = changeLog;
        this.hash = hash;
        this.state = state;
    }
    fieldsToHash() {
        return `${this.changeLog}`;
    }
    ;
}
exports.Action = Action;
class NewAction extends Action {
    constructor(changeLog, hash, state, name, description) {
        super(changeLog, hash, state);
        this.name = name;
        this.description = description;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}`;
    }
    ;
}
exports.NewAction = NewAction;
class RenameAction extends Action {
    constructor(changeLog, hash, state, _from, to) {
        super(changeLog, hash, state);
        this._from = _from;
        this.to = to;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this._from}_${this.to}`;
    }
    ;
}
exports.RenameAction = RenameAction;
class RequiredAction extends Action {
    constructor(changeLog, hash, state, name) {
        super(changeLog, hash, state);
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}`;
    }
    ;
}
exports.RequiredAction = RequiredAction;
class OptionalAction extends Action {
    constructor(changeLog, hash, state, name) {
        super(changeLog, hash, state);
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}`;
    }
    ;
}
exports.OptionalAction = OptionalAction;
class DeleteAction extends Action {
    constructor(changeLog, hash, state, name) {
        super(changeLog, hash, state);
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}`;
    }
    ;
}
exports.DeleteAction = DeleteAction;
class SetDefaultAction extends Action {
    constructor(changeLog, hash, state, name, _default) {
        super(changeLog, hash, state);
        this.name = name;
        this._default = _default;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}_${this._default}`;
    }
    ;
}
exports.SetDefaultAction = SetDefaultAction;
class RemoveDefaultAction extends Action {
    constructor(changeLog, hash, state, name) {
        super(changeLog, hash, state);
        this.name = name;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}`;
    }
    ;
}
exports.RemoveDefaultAction = RemoveDefaultAction;
class AddAction extends Action {
    constructor(changeLog, hash, state, name, type, description, optional, _default) {
        super(changeLog, hash, state);
        this.name = name;
        this.type = type;
        this.description = description;
        this.optional = optional;
        this._default = _default;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}_${this.type}_${this.description}_${this.optional}_${this._default}`;
    }
    ;
}
exports.AddAction = AddAction;
class UpdateDescriptionAction extends Action {
    constructor(changeLog, hash, state, name, description) {
        super(changeLog, hash, state);
        this.name = name;
        this.description = description;
    }
}
exports.UpdateDescriptionAction = UpdateDescriptionAction;
class ReferenceAction extends Action {
    constructor(changeLog, hash, state, name, description, optional, referenceType, referenceHash) {
        super(changeLog, hash, state);
        this.name = name;
        this.description = description;
        this.optional = optional;
        this.referenceType = referenceType;
        this.referenceHash = referenceHash;
    }
    fieldsToHash() {
        return `${super.fieldsToHash()}_${this.name}_${this.description}_${this.optional}_${this.referenceType}_${this.referenceHash}`;
    }
    ;
}
exports.ReferenceAction = ReferenceAction;
class GroupAction extends Action {
    constructor(changeLog, hash, state, actions) {
        super(changeLog, hash, state);
        this.actions = actions;
    }
    fieldsToHash() {
        const subHashes = [];
        for (const action of this.actions) {
            subHashes.push(action.fieldsToHash());
        }
        return subHashes.join('_');
    }
    ;
}
exports.GroupAction = GroupAction;
