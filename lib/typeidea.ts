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

/**
* Take a list of types and verify the types and generate any empty types.
*/
export function hashActions(
  hashables: Array<action.Action>,
  requireHashes: boolean
): Array<[number, string]> {
  const newHashes: Array<[number, string]> = [];
  let previousHash = null;
  let createHashes = false;
  for (let n = 0; n < hashables.length; n++) {
    let hashable = hashables[n];
    if (createHashes) {
      if (hashable.hash !== null && hashable.hash !== undefined) {
        throw new Error(`Hash entered when there were previous items without hashes index: ${n} action: ${hashable}`);
      }
      previousHash = hashAction(hashable, previousHash);
      newHashes.push([n, previousHash]);
    } else {
      if (hashable.hash === null || hashable.hash === undefined) {
        if (requireHashes) {
          throw new Error(`Unhashed action found at item ${n} action: ${hashable}`);
        }
        previousHash = hashAction(hashable, previousHash);
        newHashes.push([n, previousHash]);
        createHashes = true;
      } else {
        const expectedHash = hashAction(hashable, previousHash);
        if (expectedHash !== hashable.hash) {
          throw new Error(`Invalid hash at item ${n} expected ${expectedHash} got ${hashable.hash} object: ${hashable}`)
        }
        previousHash = hashable.hash;
      }
    }
  }

  return newHashes;
}

export function addHashes(
  unhashedType: action.Action[],
  hashes: Array<[number, string]>,
  hashTo: number | null
) {
  if (hashes.length === 0) {
    return unhashedType;
  }
  const hashed = unhashedType.slice();
  if (hashTo === null) {
    hashTo = unhashedType.length;
  }
  //for (let i = hashes[0][0]; i < hashTo; i++) {
  //  const hash = hashes[i][1];
  //  const action = unhashedType[i];
  //  const newAction = Object.assign(
  //    Object.create(Object.getPrototypeOf(action)),
  //    action
  //  );
  //  newAction.hash = hash
  //  hashed[i] = newAction;
  //}

  for (let i = 0; i < hashTo; i++) {
    const action = hashed[i];
    if (action.hash === null) {
      for (let [idx, hash] of hashes) {
        if (idx === i) {
          const newAction = Object.assign(
            Object.create(Object.getPrototypeOf(action)),
            action
          );
          newAction.hash = hash
          hashed[i] = newAction;
        }
      }
    }
  }

  return hashed;
}
