import { GroupAction, NewServiceAction, BaseAction, UpdateDescriptionServiceAction, AddVersionServiceAction, RenameFieldTypeAction, RequiredFieldTypeAction, OptionalFieldTypeAction, DeleteFieldTypeAction, SetDefaultFieldTypeAction, RemoveDefaultFieldTypeAction, FieldTypeValues, AddFieldTypeAction, UpdateFieldDescriptionTypeAction, ReferenceFieldTypeAction, NewTypeAction, DeleteMappingServiceAction } from "./action";
import { ValidationError } from "./vrpc";

export function deserializeAction(
  action: any,
): BaseAction {
    switch (action.actionType) {
    case 'AddVersionServiceAction':
      return new AddVersionServiceAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.inputType,
        action.outputType,
        action.inputVersion,
        action.inputHash,
        action.outputVersion,
        action.outputHash
      );
    case 'UpdateDescriptionServiceAction':
      return new UpdateDescriptionServiceAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.description
      );
    case 'NewServiceAction':
      return new NewServiceAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.description
      );
    case 'ReferenceFieldTypeAction':
      return new ReferenceFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName,
        action.description,
        action.optional,
        action.referenceType,
        action.referenceHash,
        action.referenceVersion
      );
    case 'UpdateFieldDescriptionTypeAction':
      return new UpdateFieldDescriptionTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName,
        action.description
      );
    case 'AddFieldTypeAction':
      return new AddFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName,
        action._type,
        action.description,
        action.optional,
        action._default
      );
    case 'RemoveDefaultFieldTypeAction':
      return new RemoveDefaultFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName
      );
    case 'SetDefaultFieldTypeAction':
      return new SetDefaultFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName,
        action._default
      );
    case 'DeleteFieldTypeAction':
      return new DeleteFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName
      );
    case 'OptionalFieldTypeAction':
      return new OptionalFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName
      );
    case 'RequiredFieldTypeAction':
      return new RequiredFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.fieldName
      );
    case 'RenameFieldTypeAction':
      return new RenameFieldTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action._from,
        action.to
      );
    case 'NewTypeAction':
      return new NewTypeAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.description
      );
    case 'DeleteMappingServiceAction':
      return new DeleteMappingServiceAction(
        action.hash,
        action.version,
        action.changeLog,
        action.name,
        action.inputType,
        action.outputType,
        action.inputVersion,
        action.outputVersion,
      );
    default:
        throw new Error(`Unknown Action: ${JSON.stringify(action, null, 4)}`)
    }
};

export function serialize(log: GroupAction[]): any {
    const output = [];
    for (let group of log) {
        const outputGroup: any[] = [];
        for (let action of group.actions) {
            outputGroup.push(
                {
                    actionType: action.constructor.name,
                    ...action
                }
            );
        }
        output.push(
            {
                actions: outputGroup,
                hash: group.hash
            }
        )
    }
    
    return output;
}

export function deserialize(log: any): GroupAction[] {
    const output = [];

    for (let rawGroup of log) {
        const outputLog = [];
        for (let rawAction of rawGroup.actions) {
            outputLog.push(deserializeAction(rawAction));
        }

        output.push(new GroupAction(rawGroup.hash, outputLog));
    }
    return output;
}