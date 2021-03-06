import {promises as fs} from 'fs';
import * as fsSync from 'fs';
import { Backend, changeSetFromTypeDefintion } from './backend';
import {ChangeSet, GroupAction} from './action';
import {
    commitChangeSet, 
    validate, 
    validateWithChangeSet, 
    services, 
    types
} from './vrpc';
import * as lockfile from 'proper-lockfile';
import { Service, Type } from './generate';
import { TypeDefinition, Convert } from './generated/type_definition';
import { deserialize, serialize } from './serialization';

class StoredData {
  log: GroupAction[];
  currentTypeDefinition: TypeDefinition[];
}

export class FileBackend implements Backend {
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
    if (!fsSync.existsSync(fileName)) {
        const defaultStoredData = {
            log: [],
            currentTypeDefinition: []
        }
        fsSync.writeFileSync(fileName, JSON.stringify(defaultStoredData));
    }

    if (lockfile.checkSync(this.fileName)) {
      lockfile.unlockSync(this.fileName);
    }
  }

  private async doWithLock<A>(func: (data: StoredData) => Promise<A>): Promise<A> {
    const release = await lockfile.lock(this.fileName, {
      retries: {
        retries: 10,
        minTimeout: 1000,
      },
    });
    const rawData = await fs.readFile(this.fileName, {encoding: 'utf8'});
    const jsonData = JSON.parse(rawData);
    const log = deserialize(jsonData.log);
    const currentTypeDefinition = Convert.toTypeDefinition(
      JSON.stringify(jsonData.currentTypeDefinition)
    );
    const result = await func({log, currentTypeDefinition});
    await release();
    return result;
  }

  async getLog(): Promise<GroupAction[]> {
    return await this.doWithLock(
      async (data: StoredData) => {
        return data.log;
      }
    );
  }

  async getCurrentServices(): Promise<Service[]> {
    return await this.doWithLock(
      async (data: StoredData) => {
        return services(data.log, null);
      }
    );
  }

  async getCurrentTypes(): Promise<Type[]> {
    return await this.doWithLock(
      async (data: StoredData) => {
        return types(data.log, null);
      }
    );
  }

  async commitTypeDefinition(definitions: TypeDefinition[]): Promise<void> {
    return await this.doWithLock(
      async (data: StoredData) => {
        const generatedTypes = types(data.log, null);
        const changeSet = changeSetFromTypeDefintion(
            generatedTypes,
            data.currentTypeDefinition,
            definitions
        );
        const log = JSON.stringify(
          serialize(
            commitChangeSet(
              data.log, 
              changeSet
            )
          )
        );
        const currentTypeDefinition = Convert.typeDefinitionToJson(definitions);
        await fs.writeFile(
          this.fileName, 
          `{"log": ${log}, "currentTypeDefinition": ${currentTypeDefinition}}`
        );
      }
    );
  }
}