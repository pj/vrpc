import "reflect-metadata";
import { MemoryBackend } from "./memory_backend";
import {startServer} from "./server";

const backend = new MemoryBackend([], new Map());
startServer(backend);