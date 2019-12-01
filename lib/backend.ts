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

  // addToLog(action: Action): Promise<void>;
  // truncateTo(to: number): Promise<void>;
  // hashTo(to: number): Promise<void>;
  // delete(to: number): Promise<void>;
  // groupAndHash(to: number): Promise<void>;

  // Latest and changesets
  getChangeSets(userId: string): Promise<ChangeSet[]>;
  getChangeSet(userId: string, changeSetId: string): Promise<ChangeSet>;
  updateChangeSet(userId: string, changeSetId: string, changeSet: ChangeSet): Promise<void>;
  commitChangeSet(userId: string, changeSetId: string): Promise<void>;
  validateChangeSet(userId: string, changeSetId: string): Promise<string | null>;
};
