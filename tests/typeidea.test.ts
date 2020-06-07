import "reflect-metadata";
import {ChangeAction} from '../lib/action';
import {generateDefinitions} from '../lib/generate';
import {generateTypescript, generateTypescriptBoth} from '../lib/generate_typescript';
import {MemoryBackend} from '../lib/memory_backend';
import { Type } from "../lib/generated/type_definition";

it('Changing an action makes hashing invalid', async () => {
  const addField: ChangeAction[] = [
    {
      changeLog: 'Creating a new type',
      typeName: 'Test',
      description: 'a useful type'
    },
    {
      changeLog: 'Adding a field',
      typeName: 'Test',
      name: 'test_field',
      _type: Type.String,
      description: 'A field that helps testing',
      optional: true
    }
  ];
  const memoryStore = new MemoryBackend(null, null, null);
  const changeSet = {id: 'Test change set', log: addField};
  await memoryStore.updateChangeSet("test", "test", changeSet);
  await memoryStore.commitChangeSet("test", "test")

  memoryStore.log[0].actions[0].changeLog = "Don't do this!";
  const valid = await memoryStore.validateLog();
  expect(valid).not.toBeNull();
  expect(valid).toMatch(/Invalid hash at item \d+ .*/);
});

it('Deleting version causes error', async () => {
  const addField: ChangeAction[] = [
    {
      changeLog: 'Creating a new type',
      typeName: 'Test',
      description: 'a useful type'
    },
    {
      changeLog: 'Adding a field',
      typeName: 'Test',
      name: 'test_field',
      _type: Type.String,
      description: 'A field that helps testing',
      optional: true,
    }
  ];

  const memoryStore = new MemoryBackend(null, null, null);
  const changeSet = {id: 'Test change set', log: addField};
  await memoryStore.updateChangeSet("test", "test", changeSet);
  await memoryStore.commitChangeSet("test", "test")

  // @ts-ignore
  memoryStore.log[0].versions['Test'] = null;
  const valid = await memoryStore.validateLog();
  expect(valid).not.toBeNull();
  expect(valid).toMatch(/Group Version doesn't match at item/);
});

it('Deleting hash causes error', async () => {
  const addField: ChangeAction[] = [
    {
      changeLog: 'Creating a new type',
      typeName: 'Test',
      description: 'a useful type'
    },
    {
      changeLog: 'Adding a field',
      typeName: 'Test',
      name: 'test_field',
      _type: Type.String,
      description: 'A field that helps testing',
      optional: true,
    }
  ];

  const memoryStore = new MemoryBackend(null, null, null);
  const changeSet = {id: 'Test change set', log: addField};
  await memoryStore.updateChangeSet("test", "test", changeSet);
  await memoryStore.commitChangeSet("test", "test")
  await memoryStore.getLog();

  // @ts-ignore
  memoryStore.log[0].hash = null;
  const valid = await memoryStore.validateLog();
  expect(valid).not.toBeNull();
  expect(valid).toMatch(/Invalid hash on group item expected/);
});

it('Multiple types with type reference', async () => {
  const basicTypes: ChangeAction[] = [
    {
      changeLog: 'Creating a new type',
      typeName: 'Test',
      description: 'a useful type'
    },
    {
      changeLog: 'Adding a field',
      typeName: 'Test',
      name: 'test_field',
      _type: Type.String,
      description: 'A field that helps testing',
      optional: true,
    },
    {
      changeLog: 'Creating a new type',
      typeName: 'Test2',
      description: 'a useful type'
    }]
   
  const memoryStore = new MemoryBackend(null, null, null);
  const changeSet = {
    log: basicTypes, 
    id: 'Test multiple types 1', 
  };
  await memoryStore.updateChangeSet("test", "test", changeSet);
  await memoryStore.commitChangeSet("test", "test")
  const commitedTypes = await memoryStore.getCurrentTypes();
  const referenceChange: ChangeAction = 
    {
      changeLog: 'asdf',
      typeName: 'Test2',
      name: 'test_field2',
      description: 'A reference',
      optional: true,
      referenceType: 'Test',
      referenceHash: commitedTypes[0].versions[0].hash,
      referenceVersion: commitedTypes[0].versions[0].version
    };
  const changeSet2 = {
    log: [referenceChange], 
    id: 'Test multiple types 2'
  };
  await memoryStore.updateChangeSet("test", "test2", changeSet2);
  await memoryStore.commitChangeSet("test", "test2")
  const log = await memoryStore.getLog();

  const [generatedTypes, generatedServices] = generateDefinitions(
    log,
    null
  );
  const typescript = generateTypescript(generatedTypes);

  expect(typescript).toMatchSnapshot();
});

const json_snapshot_tests = ([
  ['Add a field', '../tests/test_data/add_field.json', null],
  [
    'Add a field with a default value',
    '../tests/test_data/add_field_with_default_value.json',
    null
  ],
  ['Rename a field', '../tests/test_data/rename_field.json', null],
  ['Make a field optional', '../tests/test_data/optional_field.json', null],
  ['Delete a field', '../tests/test_data/delete_field.json', null],
  // ['Type with latest', '../tests/test_data/type_with_latest.json', 3],
  // ['Type with GroupAction', '../tests/test_data/type_with_group.json', null],
  // [
  //   'Type with deprecated and dont generate',
  //   '../tests/test_data/deprecated_and_dont_generated.json',
  //   null
  // ],
] as Array<[string, string, number | null]>);

for (const [name, path, hashTo] of json_snapshot_tests) {
  it(name, async () => {
    const changeSets = require(path);
    const memoryStore = new MemoryBackend(null, null, null);
    for (let rawChangeSet of changeSets) {
      const changeSet = {log: rawChangeSet, id: name};
      await memoryStore.updateChangeSet("test", "test", changeSet);
      await memoryStore.commitChangeSet("test", "test")
    }

    const newLog = await memoryStore.getLog();
    const [generatedTypes, generatedServices] = generateDefinitions(
      newLog, 
      null
    );
    const [types, services, client] = generateTypescriptBoth(
      generatedTypes, 
      generatedServices
    );

    expect(types).toMatchSnapshot();
    expect(services).toMatchSnapshot();
    expect(client).toMatchSnapshot();
  });
}

