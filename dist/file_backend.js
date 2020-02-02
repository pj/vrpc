"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const generate_1 = require("./generate");
const typeidea_1 = require("./typeidea");
const lockfile = __importStar(require("proper-lockfile"));
const json_object_mapper_1 = require("json-object-mapper");
class StoredData {
}
class FileBackend {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async doWithLock(func) {
        const release = await lockfile.lock(this.fileName);
        const rawData = await fs_1.promises.readFile(this.fileName, { encoding: 'utf8' });
        const storedData = JSON.parse(rawData);
        const result = await func(storedData);
        await release();
        return result;
    }
    async getLog() {
        return this.doWithLock(async (data) => {
            return data.log;
        });
    }
    async validateLog() {
        return this.doWithLock(async (data) => {
            return typeidea_1.validate(data.log);
        });
    }
    async getCurrentServices() {
        return this.doWithLock(async (data) => {
            const [_, services] = generate_1.generateDefinitions(data.log, null);
            return services;
        });
    }
    async getCurrentServicesWithChangeSet(userId, changeSetId) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData.get(userId);
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets.get(changeSetId);
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            const newLog = typeidea_1.commitChangeSet(data.log, changeSet);
            const [_, services] = generate_1.generateDefinitions(newLog, changeSet);
            return services;
        });
    }
    async getCurrentTypes() {
        return this.doWithLock(async (data) => {
            const [types, _] = generate_1.generateDefinitions(data.log, null);
            return types;
        });
    }
    async getCurrentTypesWithChangeSet(userId, changeSetId) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData.get(userId);
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets.get(changeSetId);
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            const newLog = typeidea_1.commitChangeSet(data.log, changeSet);
            const [types, _] = generate_1.generateDefinitions(newLog, changeSet);
            return types;
        });
    }
    async getChangeSets(userId) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData.get(userId);
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSets = Array.from(userSets.values());
            return changeSets;
        });
    }
    async getChangeSet(userId, changeSetId) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData.get(userId);
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets.get(changeSetId);
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            return changeSet;
        });
    }
    async updateChangeSet(userId, changeSetId, changeSet) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            let userSets = changeSetData.get(userId);
            if (!userSets) {
                userSets = new Map();
                changeSetData.set(userId, userSets);
            }
            userSets.set(changeSetId, changeSet);
        });
    }
    async validateChangeSet(userId, changeSetId) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData.get(userId);
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets.get(changeSetId);
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            return typeidea_1.validateWithChangeSet(data.log, changeSet);
        });
    }
    async commitChangeSet(userId, changeSetId) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData.get(userId);
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets.get(changeSetId);
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            const result = typeidea_1.commitChangeSet(data.log, changeSet);
            data.log = result;
            userSets.delete(changeSetId);
            const serialized = json_object_mapper_1.ObjectMapper.serialize(data);
            await fs_1.promises.writeFile(this.fileName, serialized);
        });
    }
    async deleteChangeSet(userId, changeSetId) {
        return this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData.get(userId);
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets.get(changeSetId);
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            userSets.delete(changeSetId);
            const serialized = json_object_mapper_1.ObjectMapper.serialize(data);
            await fs_1.promises.writeFile(this.fileName, serialized);
        });
    }
}
exports.FileBackend = FileBackend;
