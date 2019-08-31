#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

import * as typeidea from './typeidea';
import * as action from './action';
import * as generate from './generate';

const argv = yargs
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
    (argv: any) => {
      const testData = require(path.resolve(process.cwd(), argv.source));
      const actions = action.loadActionLogFromList(testData);
      typeidea.validateActions(actions, true)
      typeidea.hashActions(actions);

      const [types, services] = generate.generateDefinitions(actions);
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
    'hash <name>',
    'add hashes to a log file',
    (yargs: any): any => {
      yargs.positional('name', {
        describe: 'name of log file',
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
  //.command(
  //  'new-service <log_file> <name> <input_type> <output_type>',
  //  'create a new service',
  //  (yargs: any): any => {
  //    yargs.positional('log_file', {
  //      describe: 'name of log file',
  //      type: 'string'
  //    });
  //    yargs.positional('name', {
  //      describe: 'service name',
  //      type: 'string'
  //    });
  //    yargs.positional('input_type', {
  //      describe: 'input type name',
  //      type: 'string'
  //    });
  //    yargs.positional('output_type', {
  //      describe: 'output type name',
  //      type: 'string'
  //    });
  //  },
  //  (argv: any) => {
  //    const testData = require(argv.source);
  //    const actions = action.loadActionLogFromList(testData);
  //    const hashes = typeidea.hashActions(actions, false);
  //    const updatedLog = typeidea.addHashes(actions, hashes, null);
  //
  //    if (argv.update) {
  //      fs.writeFileSync(argv.name, JSON.stringify(updatedLog, null, 2));
  //    } else {
  //      console.log(JSON.stringify(updatedLog), null, 2);
  //    }
  //  }
  //)
  .argv;
    //case 'NewServiceAction':
    //case 'UpdateDescriptionServiceAction':
    //case 'AddInputVersionServiceAction':
    //case 'RemoveInputVersionServiceAction':
    //case 'DeprecateInputVersionServiceAction':
    //case 'AddOutputVersionServiceAction':
    //case 'RemoveOutputVersionServiceAction':
    //case 'DeprecateOutputVersionServiceAction':
    //// Types
    //case 'RenameFieldTypeAction':
    //case 'RequiredFieldTypeAction':
    //case 'OptionalFieldTypeAction':
    //case 'DeleteFieldTypeAction':
    //case 'SetDefaultFieldTypeAction':
    //case 'RemoveDefaultFieldTypeAction':
    //case 'AddFieldTypeAction':
    //case 'UpdateDescriptionTypeAction':
    //case 'ReferenceFieldTypeAction':
    //case 'NewTypeAction':
    //case 'GroupAction':
