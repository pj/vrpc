import { Backend } from './backend';
import {Action, ChangeSet} from './action';
import {generateDefinitions, Type, Service} from './generate';
import {validate, validateWithChangeSet, commitChangeSet} from './typeidea';

export class MemoryBackend implements Backend {
  log: Action[];
  changeSets: Map<string, Map<string, ChangeSet>>;

  constructor(
      log: Action[] | null, 
      changeSets: Map<string, Map<string, ChangeSet>> | null
    ) {
      this.log = log || [];
      this.changeSets = changeSets || new Map();
  }

  async getLog(): Promise<Action[]> {
    return this.log;
  }

  async validateLog(): Promise<string | null> {
    return validate(this.log);
  }

  async getCurrentServices(): Promise<Service[]> {
    const [_, services] = generateDefinitions(this.log);
    return services;
  }

  async getCurrentServicesWithChangeSet(
      userId: string, 
      changeSetId: string
    ): Promise<Service[]> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData.get(userId);
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets.get(changeSetId);
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }
    
    const newLog = commitChangeSet(this.log, changeSet);
    
    const [_, services] = generateDefinitions(newLog);
    return services;
  }

  async getCurrentTypes(): Promise<Type[]> {
    const [types, _] = generateDefinitions(this.log);
    return types;
  }

  async getCurrentTypesWithChangeSet(
      userId: string,
      changeSetId: string
    ): Promise<Type[]> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData.get(userId);
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets.get(changeSetId);
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }
    
    const newLog = commitChangeSet(this.log, changeSet);
    
    const [types, _] = generateDefinitions(newLog);
    return types;
  }

  async getChangeSets(userId: string): Promise<ChangeSet[]> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData.get(userId);
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSets = Array.from(userSets.values());
    return changeSets;
  }

  async getChangeSet(userId: string, changeSetId: string): Promise<ChangeSet> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData.get(userId);
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets.get(changeSetId);
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }

    return changeSet;
  }

  async updateChangeSet(
      userId: string,
      changeSetId: string, changeSet: ChangeSet
    ): Promise<void> {
    const changeSetData = this.changeSets;
    let userSets = changeSetData.get(userId);
    if (!userSets) {
        userSets = new Map();
        changeSetData.set(userId, userSets);
    }

    userSets.set(changeSetId, changeSet);
  }

  async validateChangeSet(
      userId: string,
      changeSetId: string
    ): Promise<string | null> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData.get(userId);
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets.get(changeSetId);
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }

    return validateWithChangeSet(this.log, changeSet);
  }

  async commitChangeSet(userId: string, changeSetId: string): Promise<void> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData.get(userId);
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets.get(changeSetId);
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }

    const result = commitChangeSet(this.log, changeSet);
    this.log = result;
    userSets.delete(changeSetId);
  }
}