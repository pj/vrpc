"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const memory_backend_1 = require("./memory_backend");
const server_1 = require("./server");
// const backend = new FileBackend('./test_data.json');
const backend = new memory_backend_1.MemoryBackend([], new Map());
server_1.startServer(backend);
