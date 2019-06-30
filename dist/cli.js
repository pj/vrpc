#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const typeidea = require("./typeidea");
const action = require("./action");
const generate = require("./generate");
const argv = yargs
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
    const testData = require(argv.source);
    const actions = action.loadActionLogFromList(testData);
    typeidea.hashActions(actions, true);
    const [types, services] = generate.generateDefinitions(actions);
    const [generatedTypes, generatedServices] = generate.generateTypescriptBoth(types, services);
    fs.writeFileSync(path.join(argv.dest, 'types.ts'), generatedTypes);
    fs.writeFileSync(path.join(argv.dest, 'services.ts'), generatedServices);
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
    const testData = require(argv.source);
    const actions = action.loadActionLogFromList(testData);
    const hashes = typeidea.hashActions(actions, false);
    const updatedLog = typeidea.addHashes(actions, hashes, null);
    if (argv.update) {
        fs.writeFileSync(argv.name, JSON.stringify(updatedLog, null, 2));
    }
    else {
        console.log(JSON.stringify(updatedLog), null, 2);
    }
}).argv;
