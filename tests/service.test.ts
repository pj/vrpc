import "reflect-metadata";
import * as fs from 'fs';
import * as path from 'path';
import request from 'supertest';
import express from 'express';

import * as typeidea from '../lib/typeidea';
import * as action from '../lib/action';
import * as generate from '../lib/generate';
import { MemoryBackend } from "../lib/memory_backend";
import { generateDefinitions } from "../lib/generate";
import { generateTypescriptBoth } from "../lib/generate_typescript";

const test_dirs = fs.readdirSync('./tests/test_data/services');

for (const dir of test_dirs) {
  const stat = fs.statSync(path.join('./tests', 'test_data', 'services', dir));
  if (!stat.isDirectory()) {
    continue;
  }

  it(dir, async () => {
    fs.mkdirSync(path.join('./runtest', dir), {recursive: true});
    const changeSets = require('../tests/' + path.join('test_data', 'services', dir, 'actions.json'));
    const memoryStore = new MemoryBackend(null, null);
    for (let rawChangeSet of changeSets) {
      const changeSet = {log: rawChangeSet, id: "test"};
      await memoryStore.updateChangeSet("test", "test", changeSet);
      await memoryStore.commitChangeSet("test", "test")
    }

    const newLog = await memoryStore.getLog();
    const [typeDefinitions, serviceDefinitions] = generateDefinitions(
      newLog, 
      null
    );
    const [
      generatedTypes, 
      generatedServices, 
      _] = 
    generateTypescriptBoth(
      typeDefinitions, 
      serviceDefinitions
    );

    expect(generatedTypes).toMatchSnapshot();
    fs.writeFileSync(
      path.join('runtest', dir, 'types.ts'),
      generatedTypes,
    );
    expect(generatedServices).toMatchSnapshot();
    fs.writeFileSync(
      path.join('runtest', dir, 'services.ts'),
      generatedServices,
    );

    // import service functions file to test that they've generated correctly
    const typesImport = require('../' + path.join('runtest', dir, 'types.ts'));
    const servicesImport = require('../' + path.join('runtest', dir, 'services.ts'));

    const testData = require('../tests/' + path.join('test_data', 'services', dir, 'ServiceImpl.ts'));
    // run express tests
    for (const implementation of testData.implementations) {
      const app = express();
      app.use(express.json());
      implementation[1](app);
      await request(app)
        .post('/' + implementation[0])
        .send({
          'a_field': 'world',
          '_type': "TestInputType",
          'version': "0",
          'hash': "c503f8a6a87dcd268e82e6cffa2e58db72866839a676faa2df84f470f889ae80"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.text).toMatchSnapshot();
        });
    }
  });
}

