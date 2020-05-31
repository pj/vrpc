import {promises as fs} from 'fs';
import { FileBackend } from '../lib/file_backend';
import { TypeDefinition, Convert } from '../lib/generated/type_definition';
import rmfr from 'rmfr';
import {generateTypescript} from '../lib/generate_typescript';

async function generateServiceTests() {
    for (let directory of await fs.readdir('./tests/services')) {
        const definitionDirectory = `./tests/services/${directory}/definitions`;
        const generatedDirectory = `./tests/services/${directory}/generated`;

        try {
            await fs.stat(generatedDirectory);
            await rmfr(generatedDirectory);
        } catch (error) {
            console.dir(error);
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

        const types = await backend.getCurrentTypes();
        const services = await backend.getCurrentServices();

        const [
            generatedTypes,
            generatedServices,
            generatedClient
        ] = generateTypescript(types, services);

        await fs.writeFile(`${generatedDirectory}/types.ts`, generatedTypes);
        await fs.writeFile(`${generatedDirectory}/services.ts`, generatedServices);
        await fs.writeFile(`${generatedDirectory}/client.ts`, generatedClient);
    }
}

generateServiceTests()
    .then(result => console.log('done'))
    .catch((error) => console.log(error));
