type ServiceState = 'active' | 'deprecated' | 'remove';

export class ServiceAction {
  changeLog: string;
  hash: string | null;
  state: ServiceState;

  constructor(changeLog: string, hash: string | null, state: ServiceState) {
    this.changeLog = changeLog;
    this.hash = hash;
    this.state = state;
  }

  fieldsToHash(): string {
    throw new Error('NotImplemented');
  };
}

export class NewServiceAction extends ServiceAction {
  description: string;
  name: string;

  constructor(
    changeLog: string,
    hash: string | null,
    state: ServiceState,
    description: string,
    name: string
  ) {
    super(changeLog, hash, state);
    this.description = description;
    this.name = name;
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class UpdateDescriptionAction extends ServiceAction {
  description: string;

  constructor(changeLog: string, hash: string | null, state: ServiceState, description: string) {
    super(changeLog, hash, state);
    this.description = description;
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class AddInputVersionAction extends ServiceAction {
  constructor(changeLog: string, hash: string | null, state: ServiceState) {
    super(changeLog, hash, state);
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class RemoveInputVersionAction extends ServiceAction {
  constructor(changeLog: string, hash: string | null, state: ServiceState) {
    super(changeLog, hash, state);
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class DeprecateInputVersionAction extends ServiceAction {
  constructor(changeLog: string, hash: string | null, state: ServiceState) {
    super(changeLog, hash, state);
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class AddOutputVersionAction extends ServiceAction {
  constructor(changeLog: string, hash: string | null, state: ServiceState) {
    super(changeLog, hash, state);
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class RemoveOutputVersionAction extends ServiceAction {
  constructor(changeLog: string, hash: string | null, state: ServiceState) {
    super(changeLog, hash, state);
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}

export class DeprecateOutputVersionAction extends ServiceAction {
  constructor(changeLog: string, hash: string | null, state: ServiceState) {
    super(changeLog, hash, state);
  }

  fieldsToHash(): string {
    return `${this.changeLog}`;
  };
}
