import "reflect-metadata";
import { startServer } from "./server";
import { FileBackend } from "./file_backend";

const backend = new FileBackend('./test_data.json');
// const backend = new MemoryBackend([], new Map());
startServer(backend);