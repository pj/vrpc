import * as typeidea from './typeidea';
import * as service from './service';

const json_snapshot_tests = ([
  ['Create a service', './tests/services/create_service.json', null],
] as Array<[string, string, number | null]>);

for (const [name, path, hashTo] of json_snapshot_tests) {
  it(name, () => {
    const addField = service.loadActions(path);

    const hashes = typeidea.hashActions(addField);
    const hashedAddField = typeidea.addHashes(addField[0], hashes[0], hashTo);

    const services = service.generateServices([hashedAddField]);
    const typescript = service.generateTypescript(services);

    expect(typescript[0][1]).toMatchSnapshot();
  });
}

