"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("./generate");
const typeidea_1 = require("./typeidea");
class MemoryBackend {
    constructor(log, changeSets) {
        this.log = log || [];
        this.changeSets = changeSets || {};
    }
    async getLog() {
        return this.log;
    }
    async validateLog() {
        return typeidea_1.validate(this.log);
    }
    async getCurrentServices() {
        const [_, services] = generate_1.generateDefinitions(this.log, null);
        return services;
    }
    async getCurrentServicesWithChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets[changeSetId];
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        const newLog = typeidea_1.commitChangeSet(this.log, changeSet);
        const [_, services] = generate_1.generateDefinitions(newLog, changeSet);
        return services;
    }
    async getCurrentTypes() {
        const [types, _] = generate_1.generateDefinitions(this.log, null);
        return types;
    }
    async getCurrentTypesWithChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets[changeSetId];
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        const newLog = typeidea_1.commitChangeSet(this.log, changeSet);
        const [types, _] = generate_1.generateDefinitions(newLog, changeSet);
        return types;
    }
    async getChangeSets(userId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
            return [];
        }
        return Object.values(userSets);
    }
    async getChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets[changeSetId];
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        return changeSet;
    }
    async updateChangeSet(userId, changeSetId, changeSet) {
        const changeSetData = this.changeSets;
        let userSets = changeSetData[userId];
        if (!userSets) {
            userSets = {};
            changeSetData[userId] = userSets;
        }
        userSets[changeSetId] = changeSet;
    }
    async validateChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets[changeSetId];
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        return typeidea_1.validateWithChangeSet(this.log, changeSet);
    }
    async commitChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets[changeSetId];
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        const result = typeidea_1.commitChangeSet(this.log, changeSet);
        this.log = result;
        delete userSets[changeSetId];
    }
    async deleteChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets[changeSetId];
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        delete userSets[changeSetId];
    }
}
exports.MemoryBackend = MemoryBackend;
