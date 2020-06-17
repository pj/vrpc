import {promises as fs} from 'fs';
import { FileBackend } from '../lib/file_backend';
import { TypeDefinition, Convert } from '../lib/generated/type_definition';

async function generateServiceTests() {
    for (let directory of await fs.readdir('./tests/services/definitions')) {
        const definitionDirectory = `./tests/services/definitions/${directory}`;
        const generatedDirectory = `./tests/services/generated/${directory}`;

        try {
            await fs.stat(generatedDirectory);
            await fs.rmdir(generatedDirectory, {recursive: true});
        } catch {
        }

        await fs.mkdir(generatedDirectory, {recursive: true});
        const backendFile = `${generatedDirectory}/backend.json`;
        const backend = new FileBackend(backendFile);

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
            const definitionData = Convert.toTypeDefinition(definitionDataRaw);
            await backend.commitTypeDefinition(definitionData);
        }
    }
}

generateServiceTests()
    .then(result => console.log('done'))
    .catch((error) => console.log(error));
