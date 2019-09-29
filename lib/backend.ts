import {Action} from './action';
import {Type, Service} from './generate';

export interface Backend {
  getLog(): Promise<Action[]>;
  getCurrentServices(): Promise<Service[]>;
  getCurrentTypes(): Promise<Type[]>;
  addToLog(action: Action): Promise<void>;
  truncateTo(to: number): Promise<void>;
  hashTo(to: number): Promise<void>;
  _delete(to: number): Promise<void>;
  groupAndHash(to: number): Promise<void>;
};
