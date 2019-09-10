import * as path from 'path';
import { Backend } from './backend';
import {Action, loadActionLog} from './action';
import {generateDefinitions, Type, Service} from './generate';

export class FileBackend implements Backend {
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }

  async getLog(): Promise<Action[]> {
    return loadActionLog(path.join(process.cwd(), this.fileName));
  }

  async getCurrentServices(): Promise<Service[]> {
    const log = loadActionLog(path.join(process.cwd(), this.fileName));
    const [_, services] = generateDefinitions(log);
    return services;
  }

  async getCurrentTypes(): Promise<Type[]> {
    const log = loadActionLog(path.join(process.cwd(), this.fileName));
    const [types, _] = generateDefinitions(log);
    return types;
  }
}
