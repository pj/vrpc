// export type FieldTypes = 'string' | 'boolean' | 'number';

// export type FieldDefaults = string | boolean | number;

// export type VersionState = 'active' | 'deprecated' | 'dont_generate';

// export class Action {
//   changeLog: string;
//   hash: string | null;
//   state: VersionState;

//   constructor(changeLog: string, hash: string | null, state: VersionState) {
//     this.changeLog = changeLog;
//     this.hash = hash;
//     this.state = state;
//   }

//   fieldsToHash(): string {
//     return `${this.changeLog}`;
//   };
// }

// export class NewAction extends Action {
//   name: string;
//   description: string;

//   constructor(
//     changeLog: string,
//     hash: string | null,
//     state: VersionState,
//     name: string,
//     description: string
//   ) {
//     super(changeLog, hash, state);
//     this.name = name;
//     this.description = description;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}`;
//   };
// }

// export class RenameAction extends Action {
//   _from: string;
//   to: string;

//   constructor(changeLog: string, hash: string | null, state: VersionState, _from: string, to: string) {
//     super(changeLog, hash, state);
//     this._from = _from;
//     this.to = to;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this._from}_${this.to}`;
//   };
// }

// export class RequiredAction extends Action {
//   name: string;

//   constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
//     super(changeLog, hash, state);
//     this.name = name;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}`;
//   };
// }

// export class OptionalAction extends Action {
//   name: string;

//   constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
//     super(changeLog, hash, state);
//     this.name = name;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}`;
//   };
// }

// export class DeleteAction extends Action {
//   name: string;

//   constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
//     super(changeLog, hash, state);
//     this.name = name;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}`;
//   };
// }

// export class SetDefaultAction extends Action {
//   name: string;
//   _default: FieldDefaults;

//   constructor(changeLog: string, hash: string | null, state: VersionState, name: string, _default: FieldDefaults) {
//     super(changeLog, hash, state);
//     this.name = name;
//     this._default = _default;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}_${this._default}`;
//   };
// }

// export class RemoveDefaultAction extends Action {
//   name: string;

//   constructor(changeLog: string, hash: string | null, state: VersionState, name: string) {
//     super(changeLog, hash, state);
//     this.name = name;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}`;
//   };
// }

// export class AddAction extends Action {
//   name: string;
//   type: FieldTypes;
//   description: string;
//   optional: boolean;
//   _default: FieldDefaults | null;

//   constructor(
//     changeLog: string, hash: string | null, state: VersionState, name: string, type: FieldTypes,
//     description: string, optional: boolean, _default: FieldDefaults | null
//   ) {
//     super(changeLog, hash, state);
//     this.name = name;
//     this.type = type;
//     this.description = description;
//     this.optional = optional;
//     this._default = _default;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}_${this.type}_${this.description}_${this.optional}_${this._default}`;
//   };
// }

// export class UpdateDescriptionAction extends Action {
//   name: string;
//   description: string;

//   constructor(changeLog: string, hash: string | null, state: VersionState, name: string, description: string) {
//     super(changeLog, hash, state);
//     this.name = name;
//     this.description = description;
//   }
// }

// export class ReferenceAction extends Action {
//   name: string;
//   description: string;
//   optional: boolean;
//   referenceType: string;
//   referenceHash: string;

//   constructor(
//     changeLog: string, hash: string | null, state: VersionState, name: string, description: string,
//     optional: boolean, referenceType: string, referenceHash: string
//   ) {
//     super(changeLog, hash, state);
//     this.name = name;
//     this.description = description;
//     this.optional = optional;
//     this.referenceType = referenceType;
//     this.referenceHash = referenceHash;
//   }

//   fieldsToHash(): string {
//     return `${super.fieldsToHash()}_${this.name}_${this.description}_${this.optional}_${this.referenceType}_${this.referenceHash}`;
//   };
// }

// export class GroupAction extends Action {
//   actions: Action[];

//   constructor(
//     changeLog: string, hash: string | null, state: VersionState, actions: Action[],
//   ) {
//     super(changeLog, hash, state);
//     this.actions = actions;
//   }

//   fieldsToHash(): string {
//     const subHashes: string[] = [];
//     for (const action of this.actions) {
//       subHashes.push(action.fieldsToHash());
//     }
//     return subHashes.join('_');
//   };
// }

