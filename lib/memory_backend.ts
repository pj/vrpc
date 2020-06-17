import { Backend, changeSetFromTypeDefintion } from './backend';
import { GroupAction } from './action';
import { commitChangeSet, services, types } from './vrpc';
import { TypeDefinition } from './generated/type_definition';
import { Service, Type } from './generate';

export class MemoryBackend implements Backend {
  log: GroupAction[];
  currentTypeDefinition: TypeDefinition[]; 

  constructor(
      log: GroupAction[] | null, 
      currentTypeDefintion: TypeDefinition[] | null
    ) {
      this.log = log || [];
      this.currentTypeDefinition = currentTypeDefintion || [];
  }

  async getLog(): Promise<GroupAction[]> {
    return this.log;
  }

  async getCurrentServices(): Promise<Service[]> {
    return services(this.log, null);
  }

  async getCurrentTypes(): Promise<Type[]> {
    return types(this.log, null);
  }

  async commitTypeDefinition(definitions: TypeDefinition[]): Promise<void> {
    const types = await this.getCurrentTypes();
    const changeSet = changeSetFromTypeDefintion(
      types,
      this.currentTypeDefinition,
      definitions
    );

    const newLog = commitChangeSet(this.log, changeSet);
    this.log = newLog;
    this.currentTypeDefinition = definitions;
  }
}