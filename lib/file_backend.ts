import {promises as fs} from 'fs';
import * as path from 'path';
import { Backend } from './backend';
import {Action, loadActionAsync} from './action';
import {generateDefinitions, Type, Service} from './generate';
import {hashActions, addHashes} from './typeidea';

export class FileBackend implements Backend {
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }

  async getLog(): Promise<Action[]> {
    return (await loadActionAsync(path.join(process.cwd(), this.fileName)));
  }

  async getCurrentServices(): Promise<Service[]> {
    const log = await loadActionAsync(path.join(process.cwd(), this.fileName));
    const [_, services] = generateDefinitions(log);
    return services;
  }

  async getCurrentTypes(): Promise<Type[]> {
    const log = await loadActionAsync(path.join(process.cwd(), this.fileName));
    const [types, _] = generateDefinitions(log);
    return types;
  }

  async addToLog(action: Action): Promise<void> {
    const log = await loadActionAsync(path.join(process.cwd(), this.fileName));
    log.push(action);
    await fs.writeFile(this.fileName, JSON.stringify(log, null, 2));
  }

  async truncateTo(to: number): Promise<void> {
    let log = await loadActionAsync(path.join(process.cwd(), this.fileName));
    log = log.slice(0, to);
    await fs.writeFile(this.fileName, JSON.stringify(log, null, 2));
  }

  async hashTo(to: number): Promise<void> {
    let log = await loadActionAsync(path.join(process.cwd(), this.fileName));
    const hashes = hashActions(log);
    log = addHashes(log, hashes, to+1);
    await fs.writeFile(this.fileName, JSON.stringify(log, null, 2));
  }

  async _delete(to: number): Promise<void> {
    let log = await loadActionAsync(path.join(process.cwd(), this.fileName));
    log = log.splice(to, 1);
    await fs.writeFile(this.fileName, JSON.stringify(log, null, 2));
  }

  async groupAndHash(to: number): Promise<void> {
    console.log(to);
    //let log = loadActionAsync(path.join(process.cwd(), this.fileName));
    //const hashes = hashActions(log);
    //log = addHashes(log, hashes, to);
    //console.log(log);
    //await fs.writeFile(this.fileName, JSON.stringify(log, null, 2));
  }
}
