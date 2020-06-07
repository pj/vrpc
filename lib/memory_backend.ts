import { Backend, changeSetFromTypeDefintion } from './backend';
import {Action, ChangeSet, GroupAction} from './action';
import {generateDefinitions, Type, Service} from './generate';
import {validate, commitChangeSet, validateWithChangeSet} from './typeidea';
import { TypeDefinition } from './generated/type_definition';

type StoredChangeSets = {
  [key: string]: {
    [key: string]: ChangeSet
  }
};

export class MemoryBackend implements Backend {
  log: GroupAction[];
  changeSets: StoredChangeSets;
  currentTypeDefinition: TypeDefinition[]; 

  constructor(
      log: GroupAction[] | null, 
      changeSets: StoredChangeSets | null,
      currentTypeDefintion: TypeDefinition[] | null
    ) {
      this.log = log || [];
      this.changeSets = changeSets || {};
      this.currentTypeDefinition = currentTypeDefintion || [];
  }

  async getLog(): Promise<GroupAction[]> {
    return this.log;
  }

  async validateLog(): Promise<string | null> {
    return validate(this.log);
  }

  async getCurrentServices(): Promise<Service[]> {
    const [_, services] = generateDefinitions(this.log, null);
    return services;
  }

  async getCurrentServicesWithChangeSet(
      userId: string, 
      changeSetId: string
    ): Promise<Service[]> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData[userId];
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets[changeSetId];
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }
    
    const newLog = commitChangeSet(this.log, changeSet);
    
    const [_, services] = generateDefinitions(newLog, changeSet);
    return services;
  }

  async getCurrentTypes(): Promise<Type[]> {
    const [types, _] = generateDefinitions(this.log, null);
    return types;
  }

  async getCurrentTypesWithChangeSet(
      userId: string,
      changeSetId: string
    ): Promise<Type[]> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData[userId];
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets[changeSetId];
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }
    
    const newLog = commitChangeSet(this.log, changeSet);
    
    const [types, _] = generateDefinitions(newLog, changeSet);
    return types;
  }

  async getChangeSets(userId: string): Promise<ChangeSet[]> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData[userId];
    if (!userSets) {
      return [];
    }

    return Object.values(userSets);
  }

  async getChangeSet(userId: string, changeSetId: string): Promise<ChangeSet> {
    const changeSetData = this.changeSets;
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

  async updateChangeSet(
      userId: string,
      changeSetId: string, 
      changeSet: ChangeSet
    ): Promise<void> {
    const changeSetData = this.changeSets;
    let userSets = changeSetData[userId];
    if (!userSets) {
      userSets = {}
      changeSetData[userId] = userSets;
    }

    userSets[changeSetId] = changeSet;
  }

  async validateChangeSet(
      userId: string,
      changeSetId: string
    ): Promise<string | null> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData[userId];
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets[changeSetId];
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }

    return validateWithChangeSet(this.log, changeSet);
  }

  async commitChangeSet(userId: string, changeSetId: string): Promise<void> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData[userId];
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets[changeSetId];
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }

    const result = commitChangeSet(this.log, changeSet);
    this.log = result;
    delete userSets[changeSetId];
  }

  async deleteChangeSet(userId: string, changeSetId: string): Promise<void> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData[userId];
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets[changeSetId];
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }
    delete userSets[changeSetId];
  }

  async updateDefinitionChangeSet(
    userId: string, 
    changeSetId: string, 
    definitions: TypeDefinition[]
  ): Promise<void> {
    const changeSetData = this.changeSets;
    let userSets = changeSetData[userId];
    if (!userSets) {
      userSets = {}
      changeSetData[userId] = userSets;
    }

    const types = await this.getCurrentTypes();
    const changeSet = changeSetFromTypeDefintion(
      types,
      this.currentTypeDefinition,
      definitions
    );

    userSets[changeSetId] = changeSet;
  }

  async commitDefinitionChangeSet(
    userId: string, 
    changeSetId: string
  ): Promise<void> {
    const changeSetData = this.changeSets;
    const userSets = changeSetData[userId];
    if (!userSets) {
        throw new Error(`No changesets found for user: ${userId}`)
    }

    const changeSet = userSets[changeSetId];
    if (!changeSet) {
        throw new Error(`Changeset not found for id: ${changeSet}`)
    }

    const result = commitChangeSet(this.log, changeSet);
    this.log = result;
    if (!changeSet.typeDefinition) {
      throw new Error('Should not happen');
    }
    this.currentTypeDefinition = changeSet.typeDefinition;
    delete userSets[changeSetId];
  }
}