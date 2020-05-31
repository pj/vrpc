#!/usr/bin/env node
import "reflect-metadata";
import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

import * as generate from './generate';
import * as generate_typescript from './generate_typescript';
import {FileBackend} from './file_backend';
import { generateTypescript } from "./generate_typescript";
import { Convert } from "./generated/type_definition";

const args = yargs
  .command(
    'generate <source> <dest>',
    'generate type and service definitions',
    (yargs: any): any => {
      yargs.positional('source', {
        describe: 'name of backend file',
        type: 'string'
      });
      yargs.positional('dest', {
        describe: 'directory to put generated files in',
        type: 'string'
      });
    },
    async (argv: any) => {
      const backend = new FileBackend(argv.source);
      const types = await backend.getCurrentTypes();
      const services = await backend.getCurrentServices();

      const [
          generatedTypes,
          generatedServices,
          generatedClient
      ] = generateTypescript(types, services);

      fs.mkdirSync(argv.dest, {recursive: true});
      fs.writeFileSync(path.join(argv.dest, 'types.ts'), generatedTypes);
      fs.writeFileSync(path.join(argv.dest, 'services.ts'), generatedServices);
      fs.writeFileSync(path.join(argv.dest, 'client.ts'), generatedClient);
    }
  )
  .command(
    'update <backend> <definition>',
    'update backend with changes',
    (yargs: any): any => {
      yargs.positional('source', {
        describe: 'name of backend file',
        type: 'string'
      });
      yargs.positional('definition', {
        describe: 'type definition file to use to update the backend',
        type: 'string'
      });
    },
    async (argv: any) => {
      const backend = new FileBackend(argv.source);
      const typeDefinitionRaw = fs.readFileSync(
        argv.definition, 
        {encoding: 'utf8'}
      );
      const typeDefinition = Convert.toTypeDefinition(typeDefinitionRaw)
      await backend.commitTypeDefinition(typeDefinition);
    }
  )
  .argv;
