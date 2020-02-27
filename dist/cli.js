#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yargs = __importStar(require("yargs"));
const generate = __importStar(require("./generate"));
const generate_typescript = __importStar(require("./generate_typescript"));
const server_1 = require("./server");
const file_backend_1 = require("./file_backend");
const args = yargs
    .command('generate <source> <dest>', 'generate type and service definitions', (yargs) => {
    yargs.positional('source', {
        describe: 'name of log file',
        type: 'string'
    });
    yargs.positional('dest', {
        describe: 'directory to put generated files in',
        type: 'string'
    });
}, async (argv) => {
    const backend = new file_backend_1.FileBackend(argv.source);
    const log = await backend.getLog();
    const [types, services] = generate.generateDefinitions(log, null);
    const [generatedTypes, generatedServices, generatedClient,] = generate_typescript.generateTypescriptBoth(types, services);
    fs.mkdirSync(argv.dest, { recursive: true });
    fs.writeFileSync(path.join(argv.dest, 'types.ts'), generatedTypes);
    fs.writeFileSync(path.join(argv.dest, 'services.ts'), generatedServices);
    fs.writeFileSync(path.join(argv.dest, 'client.ts'), generatedClient);
})
    .command('serve <backend_type>', 'start graphql server for type interface', (yargs) => {
    yargs.positional('backend_type', {
        describe: 'backend_type to serve',
        type: 'string'
    })
        .option('l', {
        alias: 'log-file',
        type: 'string',
        describe: 'filename for file backend'
    });
}, (argv) => {
    let backend = null;
    console.log(argv);
    if (argv.backend_type === 'file') {
        backend = new file_backend_1.FileBackend(argv.logFile);
    }
    else {
        throw new Error('Only file backends are valid at the moment.');
    }
    server_1.startServer(backend);
})
    .argv;
