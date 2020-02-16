"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const generate_1 = require("./generate");
const typeidea_1 = require("./typeidea");
class StoredData {
}
class FileBackend {
    constructor(fileName) {
        this.fileName = fileName;
        // if (lockfile.checkSync(this.fileName)) {
        //   console.log('asdfasdfasdf');
        //   lockfile.unlockSync(this.fileName);
        //   console.log('qewrqwerqwer');
        // }
    }
    async doWithLock(func) {
        // const release = await lockfile.lock(this.fileName);
        const rawData = await fs_1.promises.readFile(this.fileName, { encoding: 'utf8' });
        const storedData = JSON.parse(rawData);
        const result = await func(storedData);
        // await release();
        return result;
    }
    async getLog() {
        return await this.doWithLock(async (data) => {
            return data.log;
        });
    }
    async validateLog() {
        return await this.doWithLock(async (data) => {
            return typeidea_1.validate(data.log);
        });
    }
    async getCurrentServices() {
        return await this.doWithLock(async (data) => {
            const [_, services] = generate_1.generateDefinitions(data.log, null);
            return services;
        });
    }
    async getCurrentServicesWithChangeSet(userId, changeSetId) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData[userId];
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets[changeSetId];
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            const newLog = typeidea_1.commitChangeSet(data.log, changeSet);
            const [_, services] = generate_1.generateDefinitions(newLog, changeSet);
            return services;
        });
    }
    async getCurrentTypes() {
        return await this.doWithLock(async (data) => {
            const [types, _] = generate_1.generateDefinitions(data.log, null);
            return types;
        });
    }
    async getCurrentTypesWithChangeSet(userId, changeSetId) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData[userId];
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets[changeSetId];
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            const newLog = typeidea_1.commitChangeSet(data.log, changeSet);
            const [types, _] = generate_1.generateDefinitions(newLog, changeSet);
            return types;
        });
    }
    async getChangeSets(userId) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData[userId];
            if (!userSets) {
                return [];
            }
            return Object.values(userSets);
        });
    }
    async getChangeSet(userId, changeSetId) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData[userId];
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets[changeSetId];
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            return changeSet;
        });
    }
    async updateChangeSet(userId, changeSetId, changeSet) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            let userSets = changeSetData[userId];
            if (!userSets) {
                userSets = {};
                changeSetData[userId] = userSets;
            }
            userSets[changeSetId] = changeSet;
            await fs_1.promises.writeFile(this.fileName, JSON.stringify(data));
        });
    }
    async validateChangeSet(userId, changeSetId) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData[userId];
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets[changeSetId];
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            return typeidea_1.validateWithChangeSet(data.log, changeSet);
        });
    }
    async commitChangeSet(userId, changeSetId) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData[userId];
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets[changeSetId];
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            const result = typeidea_1.commitChangeSet(data.log, changeSet);
            data.log = result;
            delete userSets[changeSetId];
            await fs_1.promises.writeFile(this.fileName, JSON.stringify(data));
        });
    }
    async deleteChangeSet(userId, changeSetId) {
        return await this.doWithLock(async (data) => {
            const changeSetData = data.changeSets;
            const userSets = changeSetData[userId];
            if (!userSets) {
                throw new Error(`No changesets found for user: ${userId}`);
            }
            const changeSet = userSets[changeSetId];
            if (!changeSet) {
                throw new Error(`Changeset not found for id: ${changeSet}`);
            }
            delete userSets[changeSetId];
            await fs_1.promises.writeFile(this.fileName, JSON.stringify(data));
        });
    }
}
exports.FileBackend = FileBackend;
