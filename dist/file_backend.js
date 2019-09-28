"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const action_1 = require("./action");
const generate_1 = require("./generate");
const typeidea_1 = require("./typeidea");
class FileBackend {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async getLog() {
        return action_1.loadActionLog(path.join(process.cwd(), this.fileName));
    }
    async getCurrentServices() {
        const log = action_1.loadActionLog(path.join(process.cwd(), this.fileName));
        const [_, services] = generate_1.generateDefinitions(log);
        return services;
    }
    async getCurrentTypes() {
        const log = action_1.loadActionLog(path.join(process.cwd(), this.fileName));
        const [types, _] = generate_1.generateDefinitions(log);
        return types;
    }
    async addToLog(action) {
        const log = action_1.loadActionLog(path.join(process.cwd(), this.fileName));
        log.push(action);
        console.log(log);
        //await fs.promises.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
    async truncateTo(to) {
        let log = action_1.loadActionLog(path.join(process.cwd(), this.fileName));
        log = log.slice(0, to);
        console.log(log);
        //await fs.promises.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
    async hashTo(to) {
        let log = action_1.loadActionLog(path.join(process.cwd(), this.fileName));
        const hashes = typeidea_1.hashActions(log);
        log = typeidea_1.addHashes(log, hashes, to);
        console.log(log);
        //await fs.promises.writeFile(this.fileName, JSON.stringify(log, null, 2));
    }
}
exports.FileBackend = FileBackend;
