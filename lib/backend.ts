import {Action, ChangeSet, GroupAction} from './action';
import {Type, Service} from './generate';
import { TypeDefinition } from './generated/type_definition';

export interface Backend {
  getLog(): Promise<GroupAction[]>;
  // mostly for testing I guess?
  validateLog(): Promise<string | null>;
  getCurrentServices(): Promise<Service[]>;
  getCurrentServicesWithChangeSet(userId: string, changeSetId: string): Promise<Service[]>
  getCurrentTypes(): Promise<Type[]>;
  getCurrentTypesWithChangeSet(userId: string, changeSetId: string): Promise<Type[]>;

  // Latest and changesets
  getChangeSets(userId: string): Promise<ChangeSet[]>;
  getChangeSet(userId: string, changeSetId: string): Promise<ChangeSet>;
  updateChangeSet(userId: string, changeSetId: string, changeSet: ChangeSet): Promise<void>;
  commitChangeSet(userId: string, changeSetId: string): Promise<void>;
  validateChangeSet(userId: string, changeSetId: string): Promise<string | null>;
  deleteChangeSet(userId: string, changeSetId: string): Promise<void>;

  // Update from type definition
  updateDefinitionChangeSet(userId: string, changeSetId: string, definition: TypeDefinition[]): Promise<void>;
  commitDefinitionChangeSet(userId: string, changeSetId: string): Promise<void>;
};

// Generate a change set from an old and new type definition
export function changeSetFromTypeDefintion(
  old: TypeDefinition[], 
  _new: TypeDefinition[]
): ChangeSet {
  const oldTypes = new Map<string, TypeDefinition>();
  const newTypes = new Map<string, TypeDefinition>();
  const oldServices = new Map<string, TypeDefinition>();
  const newServices = new Map<string, TypeDefinition>();

  for (let existingDefintion of old) {
    if (existingDefintion.fields) {
      oldTypes.set(existingDefintion.name, existingDefintion);
    }
    if (existingDefintion.services) {
      oldServices.set(existingDefintion.name, existingDefintion);
    }
  }

  for (let existingDefintion of _new) {
    if (existingDefintion.fields) {
      newTypes.set(existingDefintion.name, existingDefintion);
    }
    if (existingDefintion.services) {
      newServices.set(existingDefintion.name, existingDefintion);
    }
  }

  const 
}
