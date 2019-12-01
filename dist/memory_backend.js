"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("./generate");
const typeidea_1 = require("./typeidea");
class MemoryBackend {
    constructor(log, changeSets) {
        this.log = log || [];
        this.changeSets = changeSets || new Map();
    }
    async getLog() {
        return this.log;
    }
    async validateLog() {
        return typeidea_1.validate(this.log);
    }
    async getCurrentServices() {
        const [_, services] = generate_1.generateDefinitions(this.log);
        return services;
    }
    async getCurrentServicesWithChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData.get(userId);
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets.get(changeSetId);
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        const newLog = typeidea_1.commitChangeSet(this.log, changeSet);
        const [_, services] = generate_1.generateDefinitions(newLog);
        return services;
    }
    async getCurrentTypes() {
        const [types, _] = generate_1.generateDefinitions(this.log);
        return types;
    }
    async getCurrentTypesWithChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData.get(userId);
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets.get(changeSetId);
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        const newLog = typeidea_1.commitChangeSet(this.log, changeSet);
        const [types, _] = generate_1.generateDefinitions(newLog);
        return types;
    }
    async getChangeSets(userId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData.get(userId);
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSets = Array.from(userSets.values());
        return changeSets;
    }
    async getChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData.get(userId);
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets.get(changeSetId);
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        return changeSet;
    }
    async updateChangeSet(userId, changeSetId, changeSet) {
        const changeSetData = this.changeSets;
        let userSets = changeSetData.get(userId);
        if (!userSets) {
            userSets = new Map();
            changeSetData.set(userId, userSets);
        }
        userSets.set(changeSetId, changeSet);
    }
    async validateChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData.get(userId);
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets.get(changeSetId);
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        return typeidea_1.validateWithChangeSet(this.log, changeSet);
    }
    async commitChangeSet(userId, changeSetId) {
        const changeSetData = this.changeSets;
        const userSets = changeSetData.get(userId);
        if (!userSets) {
            throw new Error(`No changesets found for user: ${userId}`);
        }
        const changeSet = userSets.get(changeSetId);
        if (!changeSet) {
            throw new Error(`Changeset not found for id: ${changeSet}`);
        }
        const result = typeidea_1.commitChangeSet(this.log, changeSet);
        this.log = result;
        userSets.delete(changeSetId);
    }
}
exports.MemoryBackend = MemoryBackend;
