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
const action = __importStar(require("./action"));
class ValidationError extends Error {
}
function hashAction(logAction, previous) {
    if (logAction instanceof action.GroupAction) {
        for (let subHashable of logAction.actions) {
            previous = hashAction(subHashable, previous);
        }
        return previous;
    }
    const hash = crypto.createHash('sha256');
    if (previous !== null) {
        hash.update(previous);
    }
    const fieldsToHash = logAction.fieldsToHash();
    hash.update(fieldsToHash);
    return hash.digest('hex');
}
exports.hashAction = hashAction;
function getActionType(logAction) {
    if (logAction instanceof action.RenameFieldTypeAction ||
        logAction instanceof action.RequiredFieldTypeAction ||
        logAction instanceof action.OptionalFieldTypeAction ||
        logAction instanceof action.DeleteFieldTypeAction ||
        logAction instanceof action.SetDefaultFieldTypeAction ||
        logAction instanceof action.RemoveDefaultFieldTypeAction ||
        logAction instanceof action.AddFieldTypeAction ||
        logAction instanceof action.UpdateDescriptionTypeAction ||
        logAction instanceof action.ReferenceFieldTypeAction ||
        logAction instanceof action.NewTypeAction) {
        return logAction.typeName;
    }
    else if (logAction instanceof action.NewServiceAction ||
        logAction instanceof action.UpdateDescriptionServiceAction ||
        logAction instanceof action.AddVersionServiceAction) {
        return logAction.serviceName;
    }
    throw new ValidationError(`Unknown log action ${logAction}`);
}
exports.getActionType = getActionType;
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
function isNewAction(hashable) {
    return (hashable instanceof action.NewTypeAction
        || hashable instanceof action.NewServiceAction);
}
function validateAndHash(log, hash) {
    const versionNumbers = new Map();
    const newLog = [];
    let previousHash = null;
    for (let n = 0; n < log.length; n++) {
        let hashable = log[n];
        if (!hashable.hasHashAndVersion()) {
            if (hashable.hasVersion()) {
                throw new ValidationError(`Hash not present but version is: ${n} action: ${hashable}`);
            }
            if (hashable.hasHash()) {
                throw new ValidationError(`Version not present but hash is: ${n} action: ${hashable}`);
            }
            if (!hash) {
                throw new ValidationError(`Hash and Version required: ${n} action: ${hashable}`);
            }
            const newHash = hashAction(hashable, previousHash);
            hashable.hash = newHash;
            const actionName = getActionType(hashable);
            const currentVersion = versionNumbers.get(actionName);
            if (!currentVersion && !isNewAction(hashable)) {
                throw new ValidationError(`No current version for type ${actionName} and action is not 
          NewTypeAction or NewServiceAction: ${hashable}`);
            }
            hashable.version = currentVersion ? currentVersion + 1 : 0;
            versionNumbers.set(actionName, hashable.version);
            newLog.push(hashable);
        }
        else {
            const expectedHash = hashAction(hashable, previousHash);
            if (expectedHash !== hashable.hash) {
                throw new ValidationError(`Invalid hash at item ${n} expected ${expectedHash} 
          got ${hashable.hash} object: ${hashable}`);
            }
            previousHash = hashable.hash;
            if (hashable instanceof action.GroupAction) {
                const foundTypes = new Set();
                for (let subHashable of hashable.actions) {
                    const actionName = getActionType(subHashable);
                    foundTypes.add(actionName);
                }
                for (let foundType of foundTypes) {
                    const currentVersion = versionNumbers.get(foundType) || 0;
                    const hashableVersion = hashable.versions[foundType];
                    if (hashableVersion !== currentVersion) {
                        throw new ValidationError(`Group Version doesn't match at item ${n} expected 
              ${currentVersion} got ${hashableVersion} for type ${foundType} 
              object: ${hashable}`);
                    }
                    versionNumbers.set(foundType, currentVersion + 1);
                }
            }
            else {
                const actionName = getActionType(hashable);
                const currentVersion = versionNumbers.get(actionName) || 0;
                if (hashable.version !== currentVersion) {
                    throw new ValidationError(`Versions don't match at item ${n} 
             expected ${currentVersion} got ${hashable.version} 
             object: ${hashable}`);
                }
                versionNumbers.set(actionName, currentVersion + 1);
            }
            newLog.push(hashable);
        }
    }
    return newLog;
}
function validate(log) {
    try {
        validateAndHash(log, false);
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
    let newLog = [...log, ...changeSet.log];
    try {
        validateAndHash(newLog, true);
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
    let newLog = [...log, ...changeSet.log];
    return validateAndHash(newLog, true);
}
exports.commitChangeSet = commitChangeSet;
