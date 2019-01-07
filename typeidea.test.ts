import * as typeidea from './typeidea';
import * as types from './types';

it('hashActions generates hashes for types', () => {
  const addField = [
    new types.NewAction(
      'Creating a new type',
      null,
      'active',
      'Test',
      'A useful type'
    ),
    new types.AddAction(
      'Adding a field',
      null,
      'active',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];
  const addField2 = [
    new types.NewAction(
      'Creating a new type',
      null,
      'active',
      'Test2',
      'Another useful type'
    ),
    new types.AddAction(
      'asdf',
      null,
      'active',
      'test_field2',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];
  const hashes = typeidea.hashActions([addField, addField2]);
  expect(hashes).toHaveLength(2);

  const hashedAddField = typeidea.addHashes(addField, hashes[0], null);
  expect(hashedAddField).toHaveLength(2);
  const hashedAddField2 = typeidea.addHashes(addField2, hashes[1], null);
  expect(hashedAddField2).toHaveLength(2);

  for (const hashedAction of hashedAddField) {
    expect(hashedAction.hash).not.toBeNull();
  }
  for (const hashedAction of hashedAddField2) {
    expect(hashedAction.hash).not.toBeNull();
  }

});

it('Changing an action makes hashing invalid', () => {
  const addField = [
    new types.NewAction(
      'Creating a new type',
      null,
      'active',
      'Test',
      'a useful type'
    ),
    new types.AddAction(
      'Adding a field',
      null,
      'active',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];

  const hashes = typeidea.hashActions([addField]);
  const hashedAddField = typeidea.addHashes(addField, hashes[0], null);
  hashedAddField[0].changeLog = "Don't do this!";
  expect(() => {
    typeidea.hashActions([hashedAddField]);
  }).toThrow(/Invalid hash at item \d+ .*, did you change something\?/);
});

it('Changing a hash makes hashing invalid', () => {
  const addField = [
    new types.NewAction(
      'Creating a new type',
      null,
      'active',
      'Test',
      'a useful type'
    ),
    new types.AddAction(
      'Adding a field',
      null,
      'active',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];

  const hashedAddField = typeidea.addHashes(
    addField,
    typeidea.hashActions([addField])[0],
    null
  );
  hashedAddField[0].hash = "Don't do this!";
  expect(() => {
    typeidea.hashActions([hashedAddField]);
  }).toThrow(/Invalid hash at item \d+ .*, did you change something\?/);
});

it('Multiple types with type reference', () => {
  const addField = [
    new types.NewAction(
      'Creating a new type',
      null,
      'active',
      'Test',
      'A useful type'
    ),
    new types.AddAction(
      'Adding a field',
      null,
      'active',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];
  const addField2 = [
    new types.NewAction(
      'Creating a new type',
      null,
      'active',
      'Test2',
      'a useful type'
    ),
    new types.ReferenceAction(
      'asdf',
      null,
      'active',
      'test_field2',
      'A reference',
      true,
      'Test',
      // @ts-ignore
      null
    )
  ];

  const hashes = typeidea.hashActions([addField]);
  const hashedAddField = typeidea.addHashes(addField, hashes[0], null);

  addField2[1].referenceHash = hashedAddField[1].hash;

  const hashes2 = typeidea.hashActions([addField2]);
  const hashedAddField2 = typeidea.addHashes(addField2, hashes2[0], null);

  const generatedTypes = typeidea.generateTypes([hashedAddField, hashedAddField2], []);
  const typescript = typeidea.generateTypescript(generatedTypes);

  expect(typescript[0][1]).toMatchSnapshot();
  expect(typescript[1][1]).toMatchSnapshot();
});

const json_snapshot_tests = ([
  ['Add a field', './tests/add_field.json', null],
  ['Add a field with a default value', './tests/add_field_with_default_value.json', null],
  ['Rename a field', './tests/rename_field.json', null],
  ['Make a field optional', './tests/optional_field.json', null],
  ['Delete a field', './tests/delete_field.json', null],
  ['Type with latest', './tests/type_with_latest.json', 3],
  ['Type with GroupAction', './tests/type_with_group.json', null],
  ['Type with deprecated and dont generate', './tests/deprecated_and_dont_generated.json', null],
] as Array<[string, string, number | null]>);

for (const [name, path, hashTo] of json_snapshot_tests) {
  it(name, () => {
    const addField = typeidea.loadActions(path);

    const hashes = typeidea.hashActions(addField);
    const hashedAddField = typeidea.addHashes(addField[0], hashes[0], hashTo);

    const types = typeidea.generateTypes([hashedAddField], []);
    const typescript = typeidea.generateTypescript(types);

    expect(typescript[0][1]).toMatchSnapshot();
  });
}

