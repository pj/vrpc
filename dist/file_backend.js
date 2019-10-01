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
const path = __importStar(require("path"));
const action_1 = require("./action");
const generate_1 = require("./generate");
const typeidea_1 = require("./typeidea");
class FileBackend {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async getLog() {
        return (await action_1.loadActionAsync(path.join(process.cwd(), this.fileName)));
    }
    async getCurrentServices() {
        const log = await action_1.loadActionAsync(path.join(process.cwd(), this.fileName));
        const [_, services] = generate_1.generateDefinitions(log);
        return services;
    }
    async getCurrentTypes() {
        const log = await action_1.loadActionAsync(path.join(process.cwd(), this.fileName));
        const [types, _] = generate_1.generateDefinitions(log);
        return types;
    }
    async addToLog(action) {
        const log = await action_1.loadActionAsync(path.join(process.cwd(), this.fileName));
        log.push(action);
        await fs_1.promises.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
    async truncateTo(to) {
        let log = await action_1.loadActionAsync(path.join(process.cwd(), this.fileName));
        log = log.slice(0, to);
        await fs_1.promises.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
    async hashTo(to) {
        let log = await action_1.loadActionAsync(path.join(process.cwd(), this.fileName));
        const hashes = typeidea_1.hashActions(log);
        log = typeidea_1.addHashes(log, hashes, to + 1);
        await fs_1.promises.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
    async _delete(to) {
        let log = await action_1.loadActionAsync(path.join(process.cwd(), this.fileName));
        log = log.splice(to, 1);
        await fs_1.promises.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
    async groupAndHash(to) {
        console.log(to);
        //let log = loadActionAsync(path.join(process.cwd(), this.fileName));
        //const hashes = hashActions(log);
        //log = addHashes(log, hashes, to);
        //console.log(log);
        //await fs.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
}
exports.FileBackend = FileBackend;
