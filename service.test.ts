import * as path from 'path';
import * as tmp from 'tmp';
import * as fs from 'fs';

import * as typeidea from './typeidea';
import * as service from './service';
import * as action from './action';
import * as generate from './generate';

tmp.setGracefulCleanup();

//const json_snapshot_tests = ([
//  ['Create a service', './tests/services/create_service.json', null],
//] as Array<[string, string, number | null]>);
//
//for (const [name, path, hashTo] of json_snapshot_tests) {
//  it.skip(name, () => {
//    const addField = service.loadActions(path);
//
//    const hashes = typeidea.hashActions(addField);
//    const hashedAddField = typeidea.addHashes(addField[0], hashes, hashTo);
//
//    const services = service.generateServices([hashedAddField]);
//    const typescript = service.generateTypescript(services);
//
//    expect(typescript[0][1]).toMatchSnapshot();
//  });
//}
//
const service_test_dirs = ([
  './tests/services/simple_service',
] as Array<string>);

for (const dir of service_test_dirs) {
  it(dir, () => {
    fs.mkdirSync(path.join('runtest', dir), {recursive: true});
    const actions = action.loadActionLog("./" + path.join(dir, 'actions.json'));
    console.log(actions)
    const hashes = typeidea.hashActions(actions);
    console.log(hashes);
    const hashedActions = typeidea.addHashes(actions, hashes, null);

    const [types, services] = generate.generateDefinitions(hashedActions);
    const [generatedTypes, generatedServices] = generate.generateTypescriptBoth(
      types,
      services
    );

    // Write files to temp dir
    //const testDir = tmp.dirSync({unsafeCleanup: true});
    //console.log(testDir.name);

    for (const [_type, contents] of generatedTypes) {
      const file = fs.writeFileSync(
        path.join('runtest', dir, _type.name + '.ts'),
        contents,
      );
    }

    for (const [_type, contents] of generatedServices) {
      const file = fs.writeFileSync(
        path.join('runtest', dir, _type.name + '.ts'),
        contents,
      );
    }

    // import service functions file

    // load functions into express

    // run express tests


    //const typescript = service.generateTypescript(services);
    //
    //expect(typescript[0][1]).toMatchSnapshot();
    //testDir.removeCallback();
  });
}

