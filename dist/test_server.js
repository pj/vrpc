"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("./server");
const file_backend_1 = require("./file_backend");
const backend = new file_backend_1.FileBackend('./test_data.json');
// const backend = new MemoryBackend([], new Map());
server_1.startServer(backend);
