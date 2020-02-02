import {promises as fs} from 'fs';

export type FieldTypes = 'string' | 'boolean' | 'integer' | 'float';

export const FieldTypeValues = ['string', 'boolean', 'integer', 'float'];

export type FieldDefaults = string | boolean | number;

export type HashedAction = {
  hash: string;
  version: number;
}

export type ActionDefaults = {
  actionType: string;
  changeLog: string;
}

// Types
export type NewTypeActionCommon = {
  actionType: 'NewTypeAction',
  typeName: string;
  description: string;
}
export type NewTypeAction = HashedAction & ActionDefaults & NewTypeActionCommon;
export type NewTypeChangeAction = NewTypeActionCommon & ActionDefaults;

export type RenameFieldTypeActionCommon = {
  actionType: 'RenameFieldTypeAction',
  typeName: string;
  _from: string;
  to: string;
}
export type RenameFieldTypeAction = HashedAction & ActionDefaults & RenameFieldTypeActionCommon;
export type RenameFieldTypeChangeAction = ActionDefaults & RenameFieldTypeActionCommon;

export type RequiredFieldTypeActionCommon = {
  actionType: 'RequiredFieldTypeAction',
  typeName: string;
  name: string;
}
export type RequiredFieldTypeAction = HashedAction & ActionDefaults & RequiredFieldTypeActionCommon;
export type RequiredFieldTypeChangeAction = ActionDefaults & RequiredFieldTypeActionCommon;

export type OptionalFieldTypeActionCommon = {
  actionType: 'OptionalFieldTypeAction',
  typeName: string;
  name: string;
}
export type OptionalFieldTypeAction = HashedAction & ActionDefaults & OptionalFieldTypeActionCommon;
export type OptionalFieldTypeChangeAction = ActionDefaults & OptionalFieldTypeActionCommon;

export type DeleteFieldTypeActionCommon = {
  actionType: 'DeleteFieldTypeAction',
  typeName: string;
  name: string;
}
export type DeleteFieldTypeAction = HashedAction & ActionDefaults & DeleteFieldTypeActionCommon;
export type DeleteFieldTypeChangeAction = ActionDefaults & DeleteFieldTypeActionCommon;

export type SetDefaultFieldTypeActionCommon = {
  actionType: 'SetDefaultFieldTypeAction',
  typeName: string;
  name: string;
  _default: FieldDefaults;
}
export type SetDefaultFieldTypeAction = HashedAction & ActionDefaults & SetDefaultFieldTypeActionCommon;
export type SetDefaultFieldTypeChangeAction = ActionDefaults & SetDefaultFieldTypeActionCommon;

export type RemoveDefaultFieldTypeActionCommon = {
  actionType: 'RemoveDefaultFieldTypeAction',
  typeName: string;
  name: string;
}
export type RemoveDefaultFieldTypeAction = HashedAction & ActionDefaults & RemoveDefaultFieldTypeActionCommon;
export type RemoveDefaultFieldTypeChangeAction = ActionDefaults & RemoveDefaultFieldTypeActionCommon;

export type AddFieldTypeActionCommon = {
  actionType: 'AddFieldTypeAction',
  typeName: string;
  name: string;
  type: FieldTypes;
  description: string;
  optional: boolean;
  _default: FieldDefaults | null;
}
export type AddFieldTypeAction = HashedAction & ActionDefaults & AddFieldTypeActionCommon;
export type AddFieldTypeChangeAction = ActionDefaults & AddFieldTypeActionCommon;

export type UpdateDescriptionTypeActionCommon = {
  actionType: 'UpdateDescriptionTypeAction',
  typeName: string;
  name: string;
  description: string;
}
export type UpdateDescriptionTypeAction = HashedAction & ActionDefaults & UpdateDescriptionTypeActionCommon;
export type UpdateDescriptionTypeChangeAction = ActionDefaults & UpdateDescriptionTypeActionCommon;

export type ReferenceFieldTypeActionCommon = {
  actionType: 'ReferenceFieldTypeAction',
  typeName: string;
  name: string;
  description: string;
  optional: boolean;
  referenceType: string;
  referenceHash: string;
  referenceVersion: number;
}
export type ReferenceFieldTypeAction = HashedAction & ActionDefaults & ReferenceFieldTypeActionCommon;
export type ReferenceFieldTypeChangeAction = ActionDefaults & ReferenceFieldTypeActionCommon;

// Service Definitions
export type NewServiceActionCommon = {
  actionType: 'NewServiceAction',
  serviceName: string;
  description: string;
}
export type NewServiceAction = HashedAction & ActionDefaults & NewServiceActionCommon;
export type NewServiceChangeAction = ActionDefaults & NewServiceActionCommon;

export type UpdateDescriptionServiceActionCommon = {
  actionType: 'UpdateDescriptionServiceAction',
  serviceName: string;
  description: string;
}
export type UpdateDescriptionServiceAction = HashedAction & ActionDefaults & UpdateDescriptionServiceActionCommon;
export type UpdateDescriptionServiceChangeAction = ActionDefaults & UpdateDescriptionServiceActionCommon;

export type AddVersionServiceActionCommon = {
  actionType: 'AddVersionServiceAction',
  serviceName: string;
  inputType: string;
  outputType: string;
  inputVersion: number;
  inputHash: string;
  outputVersion: number;
  outputHash: string;
}
export type AddVersionServiceAction = HashedAction & ActionDefaults & AddVersionServiceActionCommon;
export type AddVersionServiceChangeAction = ActionDefaults & AddVersionServiceActionCommon;

export type Action = NewTypeAction | RenameFieldTypeAction 
  | RequiredFieldTypeAction | OptionalFieldTypeAction | DeleteFieldTypeAction 
  | SetDefaultFieldTypeAction | RemoveDefaultFieldTypeAction | AddFieldTypeAction 
  | UpdateDescriptionTypeAction | ReferenceFieldTypeAction | NewServiceAction
  | UpdateDescriptionServiceAction | AddVersionServiceAction;

export type ChangeAction = NewTypeChangeAction | RenameFieldTypeChangeAction 
  | RequiredFieldTypeChangeAction | OptionalFieldTypeChangeAction 
  | DeleteFieldTypeChangeAction | SetDefaultFieldTypeChangeAction 
  | RemoveDefaultFieldTypeChangeAction | AddFieldTypeChangeAction 
  | UpdateDescriptionTypeChangeAction | ReferenceFieldTypeChangeAction 
  | NewServiceChangeAction | UpdateDescriptionServiceChangeAction 
  | AddVersionServiceChangeAction;

export type GroupVersions = {
  [key: string]: number;
};

export type GroupActionCommon = {
  actionType: 'GroupAction';
  actions: Action[];
  versions: GroupVersions;
};
export type GroupAction = HashedAction & GroupActionCommon;
export type GroupChangeAction = GroupActionCommon;

export function fieldsToHash(action: ChangeAction | GroupChangeAction) {
  switch (action.actionType) {
  case 'AddVersionServiceAction':
    return `${action.changeLog}_${action.serviceName}_${action.inputType}_${action.outputType}_${action.inputVersion}_${action.outputVersion}`;
  case 'UpdateDescriptionServiceAction':
    return `${action.changeLog}_${action.serviceName}_${action.description}`;
  case 'NewServiceAction':
    return `${action.changeLog}_${action.serviceName}_${action.description}`;
  case 'ReferenceFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}_${action.description}_${action.optional}_${action.referenceType}_${action.referenceHash}_${action.referenceVersion}`;
  case 'UpdateDescriptionTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.description}`;
  case 'AddFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}_${action.type}_${action.description}_${action.optional}_${action._default}`;
  case 'RemoveDefaultFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`;
  case 'SetDefaultFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}_${action._default}`;
  case 'DeleteFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`; 
  case 'OptionalFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`;
  case 'RequiredFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.name}`;
  case 'RenameFieldTypeAction':
    return `${action.changeLog}_${action.typeName}_${action._from}_${action.to}`;
  case 'NewTypeAction':
    return `${action.changeLog}_${action.typeName}_${action.description}`;
  case 'GroupAction':
    const subHashes: string[] = [];
    for (const subAction of action.actions) {
      subHashes.push(fieldsToHash(subAction));
    }
    return subHashes.join('_');
  default:
    throw new Error(`Can't hash ${JSON.stringify(action, null, 4)}`)
  }
};

export type ChangeSet = {
  id: string;
  log: ChangeAction[];
  baseHash: string | null 
};

// function loadAction(action: any): Action {
//   switch(action.actionType) {
//     // Services
//     case 'NewServiceAction':
//       return new NewServiceAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.serviceName,
//         action.description,
//       );
//     case 'UpdateDescriptionServiceAction':
//       return new UpdateDescriptionServiceAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.serviceName,
//         action.description
//       );
//     case 'AddVersionServiceAction':
//       return new AddVersionServiceAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.serviceName,
//         action.inputType,
//         action.outputType,
//         action.inputVersion,
//         action.inputHash,
//         action.outputVersion,
//         action.outputHash,
//       );
//     // Types
//     case 'RenameFieldTypeAction':
//       return new RenameFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action._from,
//         action.to
//       );
//     case 'RequiredFieldTypeAction':
//       return new RequiredFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name
//       );
//     case 'OptionalFieldTypeAction':
//       return new OptionalFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name
//       );
//     case 'DeleteFieldTypeAction':
//       return new DeleteFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name
//       );
//     case 'SetDefaultFieldTypeAction':
//       return new SetDefaultFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name,
//         action._default
//       );
//     case 'RemoveDefaultFieldTypeAction':
//       return new RemoveDefaultFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name
//       );
//     case 'AddFieldTypeAction':
//       return new AddFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name,
//         action.type,
//         action.description,
//         action.optional,
//         action._default
//       );
//     case 'UpdateDescriptionTypeAction':
//       return new UpdateDescriptionTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name,
//         action.description
//       );
//     case 'ReferenceFieldTypeAction':
//       return new ReferenceFieldTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.name,
//         action.description,
//         action.optional,
//         action.referenceType,
//         action.referenceHash,
//         action.referenceVersion
//       );
//     case 'NewTypeAction':
//       return new NewTypeAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.typeName,
//         action.description
//       );
//     case 'GroupAction':
//       const groupedActions = [];
//       for (const subAction of action.actions) {
//         groupedActions.push(loadAction(subAction));
//       }
//       return new GroupAction(
//         action.changeLog,
//         action.hash,
//         action.version,
//         action.name,
//         groupedActions,
//         action.versions,
//       );
//     default:
//       throw new Error(`Unknown Action: ${action}`)
//   }
// }

// export function loadActionLog(path: string): Array<Action | GroupAction> {
//   const actions = require(path);
//   // const outputActions = [];

//   // for (const action of actions) {
//   //   const log = loadAction(action);
//   //   outputActions.push(log);
//   // }

//   return actions as Array<Action | GroupAction>;
// }

// export async function loadActionAsync(path: string): Promise<Array<Action | GroupAction>> {
//   const data = await fs.readFile(path, 'utf-8');
//   const actions = JSON.parse(data.toString());
//   // const outputActions = [];

//   // for (const action of actions) {
//   //   const log = loadAction(action);
//   //   outputActions.push(log);
//   // }

//   return actions as Array<Action | GroupAction>;
// }

// export function loadActionLogFromList(actions: any[]): Array<Action | GroupAction> {
//   // const outputActions = [];

//   // for (const action of actions) {
//   //   const log = loadAction(action);
//   //   outputActions.push(log);
//   // }

//   // return outputActions;
//   return (actions as Array<Action | GroupAction>);
// }
