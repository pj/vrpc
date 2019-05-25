import * as path from 'path';
import * as tmp from 'tmp';
import * as fs from 'fs';

import * as typeidea from './typeidea';
import * as service from './service';
import * as action from './action';
import * as generate from './generate';

tmp.setGracefulCleanup();

const test_dirs = fs.readdirSync('./tests/services');

for (const dir of test_dirs) {
  const stat = fs.statSync(path.join('./tests', 'services', dir));
  if (!stat.isDirectory()) {
    continue;
  }

  it(dir, () => {
    fs.mkdirSync(path.join('./runtest', dir), {recursive: true});
    const actions = action.loadActionLog('./tests/' + path.join('services', dir, 'actions.json'));
    const hashes = typeidea.hashActions(actions);
    const hashedActions = typeidea.addHashes(actions, hashes, null);

    const [types, services] = generate.generateDefinitions(hashedActions);
    const [generatedTypes, generatedServices] = generate.generateTypescriptBoth(
      types,
      services
    );
    const typesFile = fs.writeFileSync(
      path.join('runtest', dir, 'types.ts'),
      generatedTypes,
    );
    const servicesFile = fs.writeFileSync(
      path.join('runtest', dir, 'services.ts'),
      generatedServices,
    );

    // import service functions file
    const typesImport = require('./' + path.join('runtest', dir, 'types.ts'));
    const servicesImport = require('./' + path.join('runtest', dir, 'services.ts'));

    // load functions into express

    // run express tests

  });
}
