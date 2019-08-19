import * as crypto from 'crypto';
import {compile} from 'ejs';
import * as fs from 'fs';
import * as prettier from 'prettier';
import * as action from './action';

type Hash = string | null;

export function hashAction(
  action: action.Action,
  previous: string | null
) {
  const hash = crypto.createHash('sha256');

  if (previous !== null) {
    hash.update(previous);
  }

  const fieldsToHash = action.fieldsToHash();
  hash.update(fieldsToHash);

  return hash.digest('hex');
}

export function getActionType(logAction: action.Action): string {
  if (
    logAction instanceof action.RenameFieldTypeAction ||
    logAction instanceof action.RequiredFieldTypeAction ||
    logAction instanceof action.OptionalFieldTypeAction ||
    logAction instanceof action.DeleteFieldTypeAction ||
    logAction instanceof action.SetDefaultFieldTypeAction ||
    logAction instanceof action.RemoveDefaultFieldTypeAction ||
    logAction instanceof action.AddFieldTypeAction ||
    logAction instanceof action.UpdateDescriptionTypeAction ||
    logAction instanceof action.ReferenceFieldTypeAction ||
    logAction instanceof action.NewTypeAction
  ) {
    return logAction.typeName;
  } else if (logAction instanceof action.GroupAction) {
    //throw new Error(`Not implemented yet :-(`);
  } else if (
    logAction instanceof action.NewServiceAction ||
    logAction instanceof action.UpdateDescriptionServiceAction ||
    logAction instanceof action.AddVersionServiceAction
  ) {
    return logAction.serviceName;
  }
  throw new Error(`Unknown log action ${logAction}`);
}

/**
* Take a list of types and verify the types and generate any empty types.
*/
export function hashActions(
  hashables: Array<action.Action>,
  requireHashes: boolean
): Array<[number, string, number]> {
  const newHashes: Array<[number, string, number]> = [];
  const versionNumbers = new Map<string, number>();
  let previousHash = null;
  let createHashes = false;
  for (let n = 0; n < hashables.length; n++) {
    let hashable = hashables[n];
    if (createHashes) {
      if (hashable.hash !== null && hashable.hash !== undefined) {
        throw new Error(`Hash entered when there were previous items without hashes index: ${n} action: ${hashable}`);
      }
      if (hashable.version !== null && hashable.version !== undefined) {
        throw new Error(`Version entered when there were previous items without hashes index: ${n} action: ${hashable}`);
      }
      const actionName = getActionType(hashable);
      const currentVersion = versionNumbers.get(actionName) || 0;
      previousHash = hashAction(hashable, previousHash);
      newHashes.push([n, previousHash, currentVersion]);
      versionNumbers.set(actionName, currentVersion + 1);
    } else {
      if (hashable.hash === null || hashable.hash === undefined) {
        if (requireHashes) {
          throw new Error(`Unhashed action found at item ${n} action: ${hashable}`);
        }
        if (hashable.version !== null && hashable.version !== undefined) {
          throw new Error(`Action hash not set, but has version at item ${n} action: ${hashable}`);
        }
        const actionName = getActionType(hashable);
        const currentVersion = versionNumbers.get(actionName) || 0;
        previousHash = hashAction(hashable, previousHash);
        newHashes.push([n, previousHash, currentVersion]);
        versionNumbers.set(actionName, currentVersion + 1);
        createHashes = true;
      } else {
        if (hashable.version === null || hashable.version === undefined) {
          throw new Error(`Action has hash but not version at item ${n} action: ${hashable}`);
        }
        const expectedHash = hashAction(hashable, previousHash);
        if (expectedHash !== hashable.hash) {
          throw new Error(`Invalid hash at item ${n} expected ${expectedHash} got ${hashable.hash} object: ${hashable}`)
        }
        const actionName = getActionType(hashable);
        const currentVersion = versionNumbers.get(actionName) || 0;
        if (hashable.version !== currentVersion) {
          throw new Error(`Versions don't match at item ${n} expected ${currentVersion} got ${hashable.version} object: ${hashable}`)
        }

        versionNumbers.set(actionName, currentVersion + 1);
        previousHash = hashable.hash;
      }
    }
  }

  return newHashes;
}

export function addHashes(
  unhashedType: action.Action[],
  hashes: Array<[number, string, number]>,
  hashTo: number | null
) {
  if (hashes.length === 0) {
    return unhashedType;
  }
  const hashed = unhashedType.slice();
  if (hashTo === null) {
    hashTo = unhashedType.length;
  }
  for (let i = 0; i < hashTo; i++) {
    const action = hashed[i];
    if (action.hash === null) {
      for (let [idx, hash, version] of hashes) {
        if (idx === i) {
          const newAction = Object.assign(
            Object.create(Object.getPrototypeOf(action)),
            action
          );
          newAction.hash = hash;
          newAction.version = version;
          hashed[i] = newAction;
        }
      }
    }
  }

  return hashed;
}
