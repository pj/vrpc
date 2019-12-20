import {Action, ChangeSet} from './action';
import {Type, Service} from './generate';

export interface Backend {
  getLog(): Promise<Action[]>;
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
};
