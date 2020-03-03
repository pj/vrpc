"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const action_1 = require("./action");
class ValidationError extends Error {
}
function hashAction(logAction, previous) {
    if (logAction.actionType === 'GroupAction') {
        if (logAction.actions.length === 0) {
            throw new Error(`Can't hash group action because it has no sub actions`);
        }
        for (let subHashable of logAction.actions) {
            previous = hashAction(subHashable, previous);
        }
        // @ts-ignore
        return previous;
    }
    const hash = crypto.createHash('sha256');
    if (previous !== null) {
        hash.update(previous);
    }
    const hashFields = action_1.fieldsToHash(logAction);
    hash.update(hashFields);
    return hash.digest('hex');
}
exports.hashAction = hashAction;
function getActionType(logAction) {
    if (logAction.actionType === 'RenameFieldTypeAction' ||
        logAction.actionType === 'RequiredFieldTypeAction' ||
        logAction.actionType === 'OptionalFieldTypeAction' ||
        logAction.actionType === 'DeleteFieldTypeAction' ||
        logAction.actionType === 'SetDefaultFieldTypeAction' ||
        logAction.actionType === 'RemoveDefaultFieldTypeAction' ||
        logAction.actionType === 'AddFieldTypeAction' ||
        logAction.actionType === 'UpdateFieldDescriptionTypeAction' ||
        logAction.actionType === 'ReferenceFieldTypeAction' ||
        logAction.actionType === 'NewTypeAction') {
        return logAction.typeName;
    }
    else if (logAction.actionType === 'NewServiceAction' ||
        logAction.actionType === 'UpdateDescriptionServiceAction' ||
        logAction.actionType === 'AddVersionServiceAction') {
        return logAction.serviceName;
    }
    throw new ValidationError(`Unknown log action ${logAction}`);
}
exports.getActionType = getActionType;
function isNewAction(hashable) {
    return (hashable.actionType === 'NewTypeAction'
        || hashable.actionType === 'NewServiceAction');
}
// function validateAndHash(
//   log: Array<Action>,
//   changeSet: ChangeSet,
//   hash: boolean
// ): Action[] {
//   const versionNumbers = new Map<string, number>();
//   const newLog = [];
//   let previousHash = null;
//   for (let n = 0; n < log.length; n++) {
//     let hashable = log[n];
//     if (!hashable.hasHashAndVersion()) {
//       if (hashable.hasVersion()) {
//         throw new ValidationError(
//           `Hash not present but version is: ${n} action: ${hashable}`
//         );
//       }
//       if (hashable.hasHash()) {
//         throw new ValidationError(
//           `Version not present but hash is: ${n} action: ${hashable}`
//         );
//       }
//       if (!hash) {
//         throw new ValidationError(
//           `Hash and Version required: ${n} action: ${hashable}`
//         );
//       }
//       const newHash = hashAction(hashable, previousHash);
//       hashable.hash = newHash;
//       const actionName = getActionType(hashable);
//       const currentVersion = versionNumbers.get(actionName);
//       if (!currentVersion && !isNewAction(hashable)) {
//         throw new ValidationError(
//           `No current version for type ${actionName} and action is not 
//           NewTypeAction or NewServiceAction: ${hashable}`
//         );
//       }
//       hashable.version = currentVersion ? currentVersion + 1 : 0;
//       versionNumbers.set(actionName, hashable.version);
//       newLog.push(hashable);
//     } else {
//       const expectedHash = hashAction(hashable, previousHash);
//       if (expectedHash !== hashable.hash) {
//         throw new ValidationError(
//           `Invalid hash at item ${n} expected ${expectedHash} 
//           got ${hashable.hash} object: ${hashable}`
//         );
//       }
//       previousHash = hashable.hash;
//       if (hashable instanceof action.GroupAction) {
//         const foundTypes = new Set<string>();
//         for (let subHashable of hashable.actions) {
//           const actionName = getActionType(subHashable);
//           foundTypes.add(actionName);
//         }
//         for (let foundType of foundTypes) {
//           const currentVersion = versionNumbers.get(foundType) || 0;
//           const hashableVersion = hashable.versions[foundType];
//           if (hashableVersion !== currentVersion) {
//             throw new ValidationError(
//               `Group Version doesn't match at item ${n} expected 
//               ${currentVersion} got ${hashableVersion} for type ${foundType} 
//               object: ${hashable}`
//             );
//           }
//           versionNumbers.set(foundType, currentVersion + 1);
//         }
//       } else {
//         const actionName = getActionType(hashable);
//         const currentVersion = versionNumbers.get(actionName) || 0;
//         if (hashable.version !== currentVersion) {
//           throw new ValidationError(
//             `Versions don't match at item ${n} 
//              expected ${currentVersion} got ${hashable.version} 
//              object: ${hashable}`
//           );
//         }
//         versionNumbers.set(actionName, currentVersion + 1);
//       }
//       newLog.push(hashable);
//     }
//   }
// }
function stringNotNull(action, name) {
    const field = action[name];
    if (field === null || field === undefined) {
        throw new ValidationError(`Field ${name} must not be null or undefined. ${action}`);
    }
    if (typeof field === 'string') {
        return field;
    }
    throw new ValidationError(`Field ${name} must be a string. ${action}`);
}
function integerNotNull(action, name) {
    const field = action[name];
    if (field === null || field === undefined) {
        throw new ValidationError(`Field ${name} must not be null or undefined. ${action}`);
    }
    if (typeof field === 'number' && parseInt(field.toString())) {
        return field;
    }
    throw new ValidationError(`Field ${name} must be an integer. ${action}`);
}
function booleanNotNull(action, name) {
    const field = action[name];
    if (field === null || field === undefined) {
        throw new ValidationError(`Field ${name} must not be null or undefined. ${action}`);
    }
    if (typeof field === 'boolean') {
        return field;
    }
    throw new ValidationError(`Field ${name} must be a boolean. ${action}`);
}
function loadAction(rawAction) {
    const commonFields = {
        changeLog: stringNotNull(rawAction, 'changeLog'),
        hash: stringNotNull(rawAction, 'hash'),
        version: integerNotNull(rawAction, 'version'),
    };
    switch (rawAction.actionType) {
        // Services
        case 'NewServiceAction':
            return (Object.assign({ actionType: 'NewServiceAction', serviceName: stringNotNull(rawAction, 'serviceName'), description: stringNotNull(rawAction, 'description') }, commonFields));
        case 'UpdateDescriptionServiceAction':
            return (Object.assign({ actionType: 'UpdateDescriptionServiceAction', serviceName: stringNotNull(rawAction, 'serviceName'), description: stringNotNull(rawAction, 'description') }, commonFields));
        case 'AddVersionServiceAction':
            return (Object.assign({ actionType: 'AddVersionServiceAction', serviceName: stringNotNull(rawAction, 'serviceName'), inputType: stringNotNull(rawAction, 'inputType'), outputType: stringNotNull(rawAction, 'outputType'), inputVersion: integerNotNull(rawAction, 'inputVersion'), inputHash: stringNotNull(rawAction, 'inputHash'), outputVersion: integerNotNull(rawAction, 'outputVersion'), outputHash: stringNotNull(rawAction, 'outputHash') }, commonFields));
        // Types
        case 'RenameFieldTypeAction':
            return (Object.assign({ actionType: 'RenameFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), _from: stringNotNull(rawAction, '_from'), to: stringNotNull(rawAction, 'to') }, commonFields));
        case 'RequiredFieldTypeAction':
            return (Object.assign({ actionType: 'RequiredFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name') }, commonFields));
        case 'OptionalFieldTypeAction':
            return (Object.assign({ actionType: 'OptionalFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name') }, commonFields));
        case 'DeleteFieldTypeAction':
            return (Object.assign({ actionType: 'DeleteFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name') }, commonFields));
        case 'SetDefaultFieldTypeAction':
            return (Object.assign({ actionType: 'SetDefaultFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name'), _default: stringNotNull(rawAction, '_default') }, commonFields));
        case 'RemoveDefaultFieldTypeAction':
            return (Object.assign({ actionType: 'RemoveDefaultFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name') }, commonFields));
        case 'AddFieldTypeAction':
            if (action_1.FieldTypeValues.indexOf(rawAction.type) === -1) {
                throw new ValidationError('Unknown field type ${rawAction.type} in action ${rawAction}');
            }
            return (Object.assign({ actionType: 'AddFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name'), _type: rawAction._type, description: stringNotNull(rawAction, 'description'), optional: booleanNotNull(rawAction, 'optional'), _default: rawAction._default }, commonFields));
        case 'UpdateFieldDescriptionTypeAction':
            return (Object.assign({ actionType: 'UpdateFieldDescriptionTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name'), description: stringNotNull(rawAction, 'description') }, commonFields));
        case 'ReferenceFieldTypeAction':
            return (Object.assign({ actionType: 'ReferenceFieldTypeAction', typeName: stringNotNull(rawAction, 'typeName'), name: stringNotNull(rawAction, 'name'), description: stringNotNull(rawAction, 'description'), optional: booleanNotNull(rawAction, 'optional'), referenceType: stringNotNull(rawAction, 'referenceType'), referenceHash: stringNotNull(rawAction, 'referenceHash'), referenceVersion: integerNotNull(rawAction, 'referenceVersion') }, commonFields));
        case 'NewTypeAction':
            return (Object.assign({ actionType: 'NewTypeAction', typeName: stringNotNull(rawAction, 'typeName'), description: rawAction.description }, commonFields));
        default:
            throw new ValidationError(`Unknown Action: ${rawAction}`);
    }
}
function loadActions(log) {
    const loadedActions = [];
    for (let rawAction of log) {
        if (rawAction.actionType !== 'GroupAction') {
            throw new ValidationError(`Log entry must be GroupAction ${rawAction}`);
        }
        const groupedActions = [];
        for (const subAction of rawAction.actions) {
            groupedActions.push(loadAction(subAction));
        }
        const versions = {};
        Object.keys(rawAction.versions).forEach(key => {
            if (!(typeof key === 'string')) {
                throw new ValidationError(`version key must be a string key: ${key}, action: ${rawAction}`);
            }
            const version = rawAction.versions[key];
            if (!(typeof version !== 'number')) {
                throw new ValidationError(`version must be a number: key: ${key} version: ${version}, action: ${rawAction}`);
            }
            versions[key] = version;
        });
        loadedActions.push({
            actionType: 'GroupAction',
            actions: groupedActions,
            versions: versions,
            hash: stringNotNull(rawAction, 'hash'),
            version: integerNotNull(rawAction, 'version')
        });
    }
    return loadedActions;
}
exports.loadActions = loadActions;
function validateLog(log) {
    const versionNumbers = new Map();
    let previousHash = null;
    for (let n = 0; n < log.length; n++) {
        const groupAction = log[n];
        const typesIncremented = new Set();
        for (let subHashable of groupAction.actions) {
            const expectedHash = hashAction(subHashable, previousHash);
            if (expectedHash !== subHashable.hash) {
                throw new ValidationError(`Invalid hash at item ${n} expected ${expectedHash} got ${subHashable.hash} object: ${JSON.stringify(subHashable, null, 4)}`);
            }
            previousHash = expectedHash;
            const actionType = getActionType(subHashable);
            let currentVersion = versionNumbers.get(actionType);
            if (currentVersion === undefined && !isNewAction(subHashable)) {
                throw new ValidationError(`First action for a type must be new type, actionType: ${subHashable.actionType} object: ${subHashable}`);
            }
            if (currentVersion === undefined) {
                currentVersion = 0;
                typesIncremented.add(actionType);
            }
            else if (!typesIncremented.has(actionType)) {
                currentVersion = versionNumbers.get(actionType);
                if (currentVersion === undefined) {
                    throw new ValidationError('Should not happen');
                }
                currentVersion += 1;
                typesIncremented.add(actionType);
            }
            const actionVersion = groupAction.versions[actionType];
            if (actionVersion !== currentVersion) {
                throw new ValidationError(`Group Version doesn't match at item ${n} expected ${currentVersion} got ${actionVersion} for type ${actionType} object: ${JSON.stringify(subHashable, null, 4)}`);
            }
            versionNumbers.set(actionType, currentVersion);
        }
        if (groupAction.hash !== previousHash) {
            throw new ValidationError(`Invalid hash on group item expected ${groupAction.hash} got ${previousHash} object: ${JSON.stringify(groupAction, null, 4)}`);
        }
    }
    return versionNumbers;
}
exports.validateLog = validateLog;
function validate(log) {
    try {
        validateLog(log);
        return null;
    }
    catch (e) {
        if (e instanceof ValidationError) {
            return e.message;
        }
        throw e;
    }
}
exports.validate = validate;
function validateWithChangeSet(log, changeSet) {
    try {
        commitChangeSet(log, changeSet);
        return null;
    }
    catch (e) {
        if (e instanceof ValidationError) {
            return e.message;
        }
        throw e;
    }
}
exports.validateWithChangeSet = validateWithChangeSet;
function commitChangeSet(log, changeSet) {
    const currentVersions = validateLog(log);
    const newActions = log.slice();
    // TODO: Check if change can cleanly apply e.g. if someone else has touched 
    // the field or added an identical one.
    const versions = {};
    const groupActions = [];
    let previousHash = log.length > 0 ? log[log.length - 1].hash : null;
    const typesIncremented = new Set();
    for (let changeAction of changeSet.log) {
        const newHash = hashAction(changeAction, previousHash);
        const actionType = getActionType(changeAction);
        let currentVersion = currentVersions.get(actionType);
        if (currentVersion === undefined && !isNewAction(changeAction)) {
            throw new ValidationError(`First action for a type must be new type, actionType: ${changeAction.actionType} object: ${JSON.stringify(changeAction)}`);
        }
        if (currentVersion === undefined) {
            currentVersion = 0;
            typesIncremented.add(actionType);
        }
        else if (!typesIncremented.has(actionType)) {
            currentVersion = currentVersions.get(actionType);
            if (currentVersion === undefined) {
                throw new ValidationError('Should not happen');
            }
            currentVersion += 1;
            typesIncremented.add(actionType);
        }
        groupActions.push(Object.assign({ hash: newHash, version: currentVersion }, changeAction));
        versions[actionType] = currentVersion;
        currentVersions.set(actionType, currentVersion);
        previousHash = newHash;
    }
    if (groupActions.length === 0) {
        return newActions;
    }
    else {
        newActions.push({
            actionType: 'GroupAction',
            actions: groupActions,
            versions: versions,
            // @ts-ignore
            hash: previousHash
        });
        validateLog(newActions);
        return newActions;
    }
}
exports.commitChangeSet = commitChangeSet;
// export function validateActions(
//   hashables: Array<action.Action>,
//   complete: boolean
// ): number {
//   const versionNumbers = new Map<string, number>();
//   let previousHash = null;
//   let afterHashed = false;
//   let latestStart = 0;
//   for (let n = 0; n < hashables.length; n++) {
//     let hashable = hashables[n];
//     if (afterHashed) {
//       if (hashable.hasVersion() || hashable.hasHash()) {
//         throw new Error(`Hash or version present when there were previous items without hashes index: ${n} action: ${hashable}`);
//       }
//     } else if(!hashable.hasHashAndVersion()){
//       if (hashable.hasVersion() || hashable.hasHash()) {
//         throw new Error(`Hash or version present when neither should be: ${n} action: ${hashable}`);
//       }
//       if (complete) {
//         throw new Error(`Hash blank: ${n} action: ${hashable}`);
//       }
//       latestStart = n;
//       afterHashed = true;
//     } else {
//       const expectedHash = hashAction(hashable, previousHash);
//       if (expectedHash !== hashable.hash) {
//         throw new Error(`Invalid hash at item ${n} expected ${expectedHash} got ${hashable.hash} object: ${hashable}`)
//       }
//       previousHash = hashable.hash;
//       if (hashable instanceof action.GroupAction) {
//         const foundTypes = new Set();
//         for (let subHashable of hashable.actions) {
//           const actionName = getActionType(subHashable);
//           foundTypes.add(actionName);
//         }
//         for (let foundType of foundTypes) {
//           const currentVersion = versionNumbers.get(foundType) || 0;
//           const hashableVersion = hashable.versions[foundType];
//           if (hashableVersion !== currentVersion) {
//             throw new Error(`Group Version doesn't match at item ${n} expected ${currentVersion} got ${hashableVersion} for type ${foundType} object: ${hashable}`)
//           }
//           versionNumbers.set(foundType, currentVersion + 1);
//         }
//       } else {
//         const actionName = getActionType(hashable);
//         const currentVersion = versionNumbers.get(actionName) || 0;
//         if (hashable.version !== currentVersion) {
//           throw new Error(`Versions don't match at item ${n} expected ${currentVersion} got ${hashable.version} object: ${hashable}`)
//         }
//         versionNumbers.set(actionName, currentVersion + 1);
//       }
//     }
//   }
//   return latestStart;
// }
// function createHashAndVersion(
//   logAction: action.Action,
//   index: number,
//   previousHash: string | null,
//   newHashes: Array<[number, string, number | action.GroupVersions]>,
//   versionNumbers: Map<string, number>,
// ) {
//   if (logAction instanceof action.GroupAction) {
//       const foundTypes = new Set();
//       for (let subHashable of logAction.actions) {
//         const actionName = getActionType(subHashable);
//         foundTypes.add(actionName);
//         previousHash = hashAction(subHashable, previousHash);
//       }
//       const foundVersions: action.GroupVersions = {};
//       for (let foundType of foundTypes) {
//         const currentVersion = versionNumbers.get(foundType) || 0;
//         versionNumbers.set(foundType, currentVersion + 1);
//         foundVersions[foundType] = currentVersion;
//       }
//       if (previousHash === null) {
//         throw new Error(`GroupAction must have actions ${index} action: ${logAction}`);
//       }
//       newHashes.push([index, previousHash, foundVersions]);
//   } else {
//     const actionName = getActionType(logAction);
//     const currentVersion = versionNumbers.get(actionName) || 0;
//     previousHash = hashAction(logAction, previousHash);
//     if (previousHash === null) {
//       throw new Error(`Make typescript happy`);
//     }
//     newHashes.push([index, previousHash, currentVersion]);
//     versionNumbers.set(actionName, currentVersion + 1);
//   }
//   return previousHash;
// }
// /**
// * Take a list of types and verify the types and generate any empty types.
// */
// export function hashActions(
//   hashables: Array<action.Action>
// ): Array<[number, string, number | action.GroupVersions]> {
//   validateActions(hashables, false);
//   const newHashes: Array<[number, string, number | action.GroupVersions]> = [];
//   const versionNumbers = new Map<string, number>();
//   let previousHash = null;
//   let createHashes = false;
//   for (let n = 0; n < hashables.length; n++) {
//     let hashable = hashables[n];
//     if (createHashes) {
//       previousHash = createHashAndVersion(
//         hashable,
//         n,
//         previousHash,
//         newHashes,
//         versionNumbers,
//       );
//     } else {
//       if (hashable.hash === null || hashable.hash === undefined) {
//         previousHash = createHashAndVersion(
//           hashable,
//           n,
//           previousHash,
//           newHashes,
//           versionNumbers,
//         );
//         createHashes = true;
//       } else {
//         if (hashable instanceof action.GroupAction) {
//           const foundTypes = new Set();
//           for (let subHashable of hashable.actions) {
//             const actionName = getActionType(subHashable);
//             foundTypes.add(actionName);
//           }
//           for (let foundType of foundTypes) {
//             const currentVersion = versionNumbers.get(foundType) || 0;
//             versionNumbers.set(foundType, currentVersion + 1);
//           }
//           previousHash = hashable.hash;
//         } else {
//           const actionName = getActionType(hashable);
//           const currentVersion = versionNumbers.get(actionName) || 0;
//           versionNumbers.set(actionName, currentVersion + 1);
//           previousHash = hashable.hash;
//         }
//       }
//     }
//   }
//   return newHashes;
// }
// export function addHashes(
//   unhashedType: action.Action[],
//   hashes: Array<[number, string, number | action.GroupVersions]>,
//   hashTo: number | null
// ) {
//   if (hashes.length === 0) {
//     return unhashedType;
//   }
//   const hashed = unhashedType.slice();
//   if (hashTo === null) {
//     hashTo = unhashedType.length;
//   }
//   for (let i = 0; i < hashTo; i++) {
//     const logAction = hashed[i];
//     if (logAction.hash === null || logAction.hash === undefined) {
//       for (let [idx, hash, version] of hashes) {
//         if (idx === i) {
//           const newAction = Object.assign(
//             Object.create(Object.getPrototypeOf(logAction)),
//             logAction
//           );
//           newAction.hash = hash;
//           if (newAction instanceof action.GroupAction) {
//             newAction.versions = <action.GroupVersions>version;
//           } else {
//             newAction.version = version;
//           }
//           hashed[i] = newAction;
//         }
//       }
//     }
//   }
//   return hashed;
// }
