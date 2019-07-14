import * as typeidea from '../lib/typeidea';
import * as action from '../lib/action';
import * as generate from '../lib/generate';

it('hashActions generates hashes for types', () => {
  const addField = [
    new action.NewTypeAction(
      'Creating a new type',
      null,
      'Test',
      'A useful type'
    ),
    new action.AddFieldTypeAction(
      'Adding a field',
      null,
      'Test',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    ),
    new action.NewTypeAction(
      'Creating a new type',
      null,
      'Test2',
      'Another useful type'
    ),
    new action.AddFieldTypeAction(
      'asdf',
      null,
      'Test2',
      'test_field2',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];
  const hashes = typeidea.hashActions(addField, false);
  expect(hashes).toHaveLength(4);

  const hashedAddField = typeidea.addHashes(addField, hashes, null);
  expect(hashedAddField).toHaveLength(4);

  for (const hashedAction of hashedAddField) {
    expect(hashedAction.hash).not.toBeNull();
  }
});

it('Changing an action makes hashing invalid', () => {
  const addField = [
    new action.NewTypeAction(
      'Creating a new type',
      null,
      'Test',
      'a useful type'
    ),
    new action.AddFieldTypeAction(
      'Adding a field',
      null,
      'Test',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];

  const hashes = typeidea.hashActions(addField, false);
  const hashedAddField = typeidea.addHashes(addField, hashes, null);
  hashedAddField[0].changeLog = "Don't do this!";
  expect(() => {
    typeidea.hashActions(hashedAddField, true);
  }).toThrow(/Invalid hash at item \d+ .*/);
});

it('Changing a hash makes hashing invalid', () => {
  const addField = [
    new action.NewTypeAction(
      'Creating a new type',
      null,
      'Test',
      'a useful type'
    ),
    new action.AddFieldTypeAction(
      'Adding a field',
      null,
      'Test',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];

  const hashedAddField = typeidea.addHashes(
    addField,
    typeidea.hashActions(addField, false),
    null
  );
  hashedAddField[0].hash = "Don't do this!";
  expect(() => {
    typeidea.hashActions(hashedAddField, true);
  }).toThrow(/Invalid hash at item \d+ .*/);
});

it('Multiple types with type reference', () => {
  const addField = [
    new action.NewTypeAction(
      'Creating a new type',
      null,
      'Test',
      'A useful type'
    ),
    new action.AddFieldTypeAction(
      'Adding a field',
      null,
      'Test',
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    ),
    new action.NewTypeAction(
      'Creating a new type',
      null,
      'Test2',
      'a useful type'
    ),
    new action.ReferenceFieldTypeAction(
      'asdf',
      null,
      'Test2',
      'test_field2',
      'A reference',
      true,
      'Test',
      // @ts-ignore
      null
    )
  ];

  let hashes = typeidea.hashActions(addField, false);
  let hashedAddField = typeidea.addHashes(addField, hashes, 2);

  addField[3].referenceHash = hashedAddField[1].hash;

  // Now that we have the correct hash, generate all
  hashes = typeidea.hashActions(addField, false);
  hashedAddField = typeidea.addHashes(addField, hashes, null);

  const [generatedTypes, generatedServices] = generate.generateDefinitions(
    hashedAddField,
  );
  const typescript = generate.generateTypescript(
    generatedTypes,
  );

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
  ['Type with latest', '../tests/test_data/type_with_latest.json', 3],
  ['Type with GroupAction', '../tests/test_data/type_with_group.json', null],
  [
    'Type with deprecated and dont generate',
    '../tests/test_data/deprecated_and_dont_generated.json',
    null
  ],
] as Array<[string, string, number | null]>);

for (const [name, path, hashTo] of json_snapshot_tests) {
  it(name, () => {
    const addField = action.loadActionLog(path);

    const hashes = typeidea.hashActions(addField, false);
    const hashedAddField = typeidea.addHashes(addField, hashes, hashTo);

    const [generatedTypes, generatedServices] = generate.generateDefinitions(
      hashedAddField
    );
    const typescript = generate.generateTypescript(generatedTypes);

    expect(typescript).toMatchSnapshot();
  });
}

