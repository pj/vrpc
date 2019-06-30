"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const ejs_1 = require("ejs");
const fs = require("fs");
const typescriptTypeFile = fs.readFileSync('./templates/typescript.ejs', {
    encoding: "utf8",
});
const typescriptTypeTemplate = ejs_1.compile(typescriptTypeFile, {
    filename: './templates/typescript.ejs'
});
function hashAction(action, previous) {
    const hash = crypto.createHash('sha256');
    if (previous !== null) {
        hash.update(previous);
    }
    const fieldsToHash = action.fieldsToHash();
    hash.update(fieldsToHash);
    return hash.digest('hex');
}
exports.hashAction = hashAction;
/**
* Take a list of types and verify the types and generate any empty types.
*/
function hashActions(hashables, requireHashes) {
    const newHashes = [];
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
        }
        else {
            if (hashable.hash === null || hashable.hash === undefined) {
                if (requireHashes) {
                    throw new Error(`Unhashed action found at item ${n} action: ${hashable}`);
                }
                previousHash = hashAction(hashable, previousHash);
                newHashes.push([n, previousHash]);
                createHashes = true;
            }
            else {
                const expectedHash = hashAction(hashable, previousHash);
                if (expectedHash !== hashable.hash) {
                    throw new Error(`Invalid hash at item ${n} expected ${expectedHash} got ${hashable.hash} object: ${hashable}`);
                }
                previousHash = hashable.hash;
            }
        }
    }
    return newHashes;
}
exports.hashActions = hashActions;
function addHashes(unhashedType, hashes, hashTo) {
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
                    const newAction = Object.assign(Object.create(Object.getPrototypeOf(action)), action);
                    newAction.hash = hash;
                    hashed[i] = newAction;
                }
            }
        }
    }
    return hashed;
}
exports.addHashes = addHashes;
