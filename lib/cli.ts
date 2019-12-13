#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

import * as typeidea from './typeidea';
import * as action from './action';
import * as generate from './generate';
import {startServer} from './server/index';
import {FileBackend} from './file_backend';

const args = yargs
  .command(
    'generate <source> <dest>',
    'generate type and service definitions',
    (yargs: any): any => {
      yargs.positional('source', {
        describe: 'name of log file',
        type: 'string'
      });
      yargs.positional('dest', {
        describe: 'directory to put generated files in',
        type: 'string'
      });
    },
    async (argv: any) => {
      const backend = new FileBackend(argv.source);
      const log = await backend.getLog();
      const [types, services] = generate.generateDefinitions(log);
      const [
        generatedTypes,
        generatedServices,
        generatedClient,
      ] = generate.generateTypescriptBoth(types, services);

      fs.mkdirSync(argv.dest, {recursive: true});
      fs.writeFileSync(path.join(argv.dest, 'types.ts'), generatedTypes);
      fs.writeFileSync(path.join(argv.dest, 'services.ts'), generatedServices);
      fs.writeFileSync(path.join(argv.dest, 'client.ts'), generatedClient);
    }
  )
  .command(
    'add <name> <changeset>',
    'Add changeset',
    (yargs: any): any => {
      yargs.positional('name', {
        describe: 'name of file with actions to add',
        type: 'string'
      })
      .option('c',
        {
            alias: 'commit',
            type: 'boolean',
            default: true,
            describe: 'commit the changes after adding'
        }
      );
    },
    (argv: any) => {
      const testData = require(path.join(process.cwd(), argv.name));
      const actions = action.loadActionLogFromList(testData);
      const hashes = typeidea.hashActions(actions);
      const updatedLog = typeidea.addHashes(actions, hashes, null);
      if (argv.update) {
        fs.writeFileSync(argv.name, JSON.stringify(updatedLog, null, 2));
      } else {
        console.log(JSON.stringify(updatedLog, null, 2));
      }
    }
  )
  .command(
    'commit <name>',
    'add hashes to a log file',
    (yargs: any): any => {
      yargs.positional('name', {
        describe: 'name of file with actions to commit',
        type: 'string'
      })
      .option('u',
        {
            alias: 'update',
            type: 'boolean',
            default: false,
            describe: 'update log file in place (outputs to stdout otherwise)'
        }
      );
    },
    (argv: any) => {
      const testData = require(path.join(process.cwd(), argv.name));
      const actions = action.loadActionLogFromList(testData);
      const hashes = typeidea.hashActions(actions);
      const updatedLog = typeidea.addHashes(actions, hashes, null);
      if (argv.update) {
        fs.writeFileSync(argv.name, JSON.stringify(updatedLog, null, 2));
      } else {
        console.log(JSON.stringify(updatedLog, null, 2));
      }
    }
  )
  .command(
    'serve <backend_type>',
    'start graphql server for type interface',
    (yargs: any): any => {
      yargs.positional('backend_type', {
        describe: 'backend_type to serve',
        type: 'string'
      })
      .option('l',
        {
            alias: 'log-file',
            type: 'string',
            describe: 'filename for file backend'
        }
      );
    },
    (argv: any) => {
      let backend = null;
      console.log(argv);
      if (argv.backend_type === 'file') {
        backend = new FileBackend(argv.logFile);
      } else {
        throw new Error('Only file backends are valid at the moment.');
      }
      startServer(backend);
    }
  )
  .argv;
