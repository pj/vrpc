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
