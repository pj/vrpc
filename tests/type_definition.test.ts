import {generateDefinitions} from '../lib/generate';
import {generateTypescriptBoth} from '../lib/generate_typescript';
import {MemoryBackend} from '../lib/memory_backend';
import { promises as fs} from 'fs';
import { Convert } from "../lib/generated/type_definition";

const type_definition_tests = ([
  ['Basic Types', './tests/type_definition/basic_types.json'],
  ['Add Service', './tests/type_definition/add_service.json'],
  ['Add Type', './tests/type_definition/add_type.json'],
  ['Update Service', './tests/type_definition/update_service.json']
] as Array<[string, string]>);

const memoryStore = new MemoryBackend(null, null, null);
for (const [name, path] of type_definition_tests) {
  it(name, async () => {
    const rawDefinition = await fs.readFile(path, {encoding: "utf8"});

    const definition = Convert.toTypeDefinition(rawDefinition);
    await memoryStore.updateDefinitionChangeSet("test", name, definition);
    await memoryStore.commitDefinitionChangeSet("test", name);

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

