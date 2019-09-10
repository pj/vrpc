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
}
exports.FileBackend = FileBackend;
