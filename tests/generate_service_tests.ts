import {promises as fs} from 'fs';
import { FileBackend } from '../lib/file_backend';
import { TypeDefinition } from '../lib/generated/type_definition';

async function generateServiceTests() {
    for (let directory of await fs.readdir('./tests/services/definitions')) {
        const definitionDirectory = `./tests/services/definitions/${directory}`;
        const testDirectory = `./tests/services/generated/${directory}`;

        await fs.mkdir(testDirectory, {recursive: true});
        const backend = new FileBackend(testDirectory);

        const definitionFiles = [];
        for (let definition of await fs.readdir(definitionDirectory)) {
            definitionFiles.push(`${definitionDirectory}/${definition}`);
        }
        definitionFiles.sort();

        for (let definitionFile of definitionFiles) {
            const definitionDataRaw = await fs.readFile(
                definitionFile, 
                {encoding: 'utf8'}
            );
            const definitionData = JSON.parse(definitionDataRaw) as TypeDefinition[];
            await backend.updateChangeSet('test', definitionFile, definitionData);
            await backend.commitChangeSet('test', definitionFile);
        }
    }
}

generateServiceTests()
    .then(result => console.log('done'))
    .catch((error) => console.log(error));
