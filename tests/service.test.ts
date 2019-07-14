import * as fs from 'fs';
import * as path from 'path';
import * as request from 'supertest';
import * as express from 'express';

import * as typeidea from '../lib/typeidea';
import * as action from '../lib/action';
import * as generate from '../lib/generate';

const test_dirs = fs.readdirSync('./tests/test_data/services');

for (const dir of test_dirs) {
  const stat = fs.statSync(path.join('./tests', 'test_data', 'services', dir));
  if (!stat.isDirectory()) {
    continue;
  }

  it(dir, async () => {
    fs.mkdirSync(path.join('./runtest', dir), {recursive: true});
    const actionLog = require('../tests/' + path.join('test_data', 'services', dir, 'actions.json'));
    const actions = action.loadActionLogFromList(actionLog);
    const hashes = typeidea.hashActions(actions, false);
    const hashedActions = typeidea.addHashes(actions, hashes, null);

    const [types, services] = generate.generateDefinitions(hashedActions);
    const [generatedTypes, generatedServices] = generate.generateTypescriptBoth(
      types,
      services
    );
    expect(generatedTypes).toMatchSnapshot();
    expect(generatedServices).toMatchSnapshot();
    const typesFile = fs.writeFileSync(
      path.join('runtest', dir, 'types.ts'),
      generatedTypes,
    );
    const servicesFile = fs.writeFileSync(
      path.join('runtest', dir, 'services.ts'),
      generatedServices,
    );

    // import service functions file
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
          'version': "TestInputType_V0",
          'hash': "716a611faeb9d2ddaa02e37a5d187183ff4d388f47c740bb2202109b3e3c8fc0"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => expect(response.text).toMatchSnapshot());
    }
  });
}

