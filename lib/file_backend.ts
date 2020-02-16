import {promises as fs} from 'fs';
import { Backend } from './backend';
import {Action, ChangeSet, GroupAction} from './action';
import {generateDefinitions, Type, Service} from './generate';
import {commitChangeSet, validate, validateWithChangeSet} from './typeidea';
import * as lockfile from 'proper-lockfile';
import {JsonProperty, ObjectMapper} from 'json-object-mapper';
import {MapDeserializer} from './utils';

type StoredChangeSets = {
  [key: string]: {
    [key: string]: ChangeSet
  }
};

class StoredData {
  changeSets: StoredChangeSets;
  log: GroupAction[];
}

export class FileBackend implements Backend {
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }

  private async doWithLock<A>(func: (data: StoredData) => Promise<A>): Promise<A> {
    const release = await lockfile.lock(this.fileName);
    const rawData = await fs.readFile(this.fileName, {encoding: 'utf8'});
    const storedData = JSON.parse(rawData) as StoredData;
    const result = await func(storedData);
    await release();
    return result;
  }

  async getLog(): Promise<GroupAction[]> {
    return this.doWithLock(
      async (data: StoredData) => {
        return data.log;
      }
    );
  }

  async validateLog(): Promise<string | null> {
    return this.doWithLock(
      async (data: StoredData) => {
        return validate(data.log);
      }
    )
  }

  async getCurrentServices(): Promise<Service[]> {
    return this.doWithLock(
      async (data: StoredData) => {
        const [_, services] = generateDefinitions(data.log, null);
        return services;
      }
    );
  }

  async getCurrentServicesWithChangeSet(userId: string, changeSetId: string): Promise<Service[]> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
          throw new Error(`No changesets found for user: ${userId}`)
        }

        const changeSet = userSets[changeSetId];
        if (!changeSet) {
          throw new Error(`Changeset not found for id: ${changeSet}`)
        }
        
        const newLog = commitChangeSet(data.log, changeSet);
        
        const [_, services] = generateDefinitions(newLog, changeSet);
        return services;
      }
    );
  }

  async getCurrentTypes(): Promise<Type[]> {
    return this.doWithLock(
      async (data: StoredData) => {
        const [types, _] = generateDefinitions(data.log, null);
        return types;
      }
    );
  }

  async getCurrentTypesWithChangeSet(userId: string, changeSetId: string): Promise<Type[]> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
          throw new Error(`No changesets found for user: ${userId}`)
        }

        const changeSet = userSets[changeSetId];
        if (!changeSet) {
          throw new Error(`Changeset not found for id: ${changeSet}`)
        }
        
        const newLog = commitChangeSet(data.log, changeSet);
        
        const [types, _] = generateDefinitions(newLog, changeSet);
        return types;
      }
    );
  }

  async getChangeSets(userId: string): Promise<ChangeSet[]> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
          throw new Error(`No changesets found for user: ${userId}`)
        }

        return Object.values(userSets);
      }
    );
  }

  async getChangeSet(userId: string, changeSetId: string): Promise<ChangeSet> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
          throw new Error(`No changesets found for user: ${userId}`)
        }

        const changeSet = userSets[changeSetId];
        if (!changeSet) {
          throw new Error(`Changeset not found for id: ${changeSet}`)
        }

        return changeSet;
      }
    );
  }

  async updateChangeSet(userId: string, changeSetId: string, changeSet: ChangeSet): Promise<void> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        let userSets = changeSetData[userId];
        if (!userSets) {
          userSets = {};
          changeSetData[userId] = userSets;
        }

        userSets[changeSetId] = changeSet;
      }
    );
  }

  async validateChangeSet(userId: string, changeSetId: string): Promise<string | null> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
          throw new Error(`No changesets found for user: ${userId}`)
        }

        const changeSet = userSets[changeSetId];
        if (!changeSet) {
          throw new Error(`Changeset not found for id: ${changeSet}`)
        }

        return validateWithChangeSet(data.log, changeSet);
      }
    );
  }

  async commitChangeSet(userId: string, changeSetId: string): Promise<void> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
          throw new Error(`No changesets found for user: ${userId}`)
        }

        const changeSet = userSets[changeSetId];
        if (!changeSet) {
          throw new Error(`Changeset not found for id: ${changeSet}`)
        }

        const result = commitChangeSet(data.log, changeSet);
        data.log = result;
        delete userSets[changeSetId];
        const serialized = ObjectMapper.serialize(data);
        await fs.writeFile(this.fileName, serialized);
      }
    );
  }

  async deleteChangeSet(userId: string, changeSetId: string): Promise<void> {
    return this.doWithLock(
      async (data: StoredData) => {
        const changeSetData = data.changeSets;
        const userSets = changeSetData[userId];
        if (!userSets) {
          throw new Error(`No changesets found for user: ${userId}`)
        }

        const changeSet = userSets[changeSetId];
        if (!changeSet) {
          throw new Error(`Changeset not found for id: ${changeSet}`)
        }

        delete userSets[changeSetId];
        const serialized = ObjectMapper.serialize(data);
        await fs.writeFile(this.fileName, serialized);
      }
    );
  }
}