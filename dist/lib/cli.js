#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const typeidea = require("./typeidea");
const action = require("./action");
const generate = require("./generate");
const index_1 = require("../server/index");
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
}, (argv) => {
    const testData = require(path.resolve(process.cwd(), argv.source));
    const actions = action.loadActionLogFromList(testData);
    typeidea.validateActions(actions, true);
    typeidea.hashActions(actions);
    const [types, services] = generate.generateDefinitions(actions);
    const [generatedTypes, generatedServices, generatedClient,] = generate.generateTypescriptBoth(types, services);
    fs.mkdirSync(argv.dest, { recursive: true });
    fs.writeFileSync(path.join(argv.dest, 'types.ts'), generatedTypes);
    fs.writeFileSync(path.join(argv.dest, 'services.ts'), generatedServices);
    fs.writeFileSync(path.join(argv.dest, 'client.ts'), generatedClient);
})
    .command('hash <name>', 'add hashes to a log file', (yargs) => {
    yargs.positional('name', {
        describe: 'name of log file',
        type: 'string'
    })
        .option('u', {
        alias: 'update',
        type: 'boolean',
        default: false,
        describe: 'update log file in place (outputs to stdout otherwise)'
    });
}, (argv) => {
    const testData = require(path.join(process.cwd(), argv.name));
    const actions = action.loadActionLogFromList(testData);
    const hashes = typeidea.hashActions(actions);
    const updatedLog = typeidea.addHashes(actions, hashes, null);
    if (argv.update) {
        fs.writeFileSync(argv.name, JSON.stringify(updatedLog, null, 2));
    }
    else {
        console.log(JSON.stringify(updatedLog, null, 2));
    }
})
    .command('server <backend_type>', 'add hashes to a log file', (yargs) => {
    yargs.positional('backend_type', {
        describe: 'backend_type to serve',
        type: 'string'
    })
        .option('l', {
        alias: 'log_file',
        type: 'string',
        describe: 'filename for file backend'
    });
}, (argv) => {
    let backend = null;
    if (argv.backend_type === 'file') {
        backend = new file_backend_1.FileBackend(argv.log_file);
    }
    else {
        throw new Error('Only file backends are valid at the moment.');
    }
    index_1.startServer(backend);
})
    .argv;
