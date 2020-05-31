import {BaseChangeAction, ChangeSet, GroupAction, NewTypeAction, NewTypeChangeAction, AddFieldTypeChangeAction, ReferenceFieldTypeChangeAction, OptionalFieldTypeChangeAction, RequiredFieldTypeChangeAction, RemoveDefaultFieldTypeChangeAction, SetDefaultFieldTypeChangeAction, UpdateFieldDescriptionTypeChangeAction, DeleteFieldTypeChangeAction, NewServiceChangeAction, AddVersionServiceChangeAction, UpdateDescriptionServiceChangeAction, DeleteMappingServiceChangeAction} from './action';
import {Type, Service, Version} from './generate';
import { TypeDefinition, Field } from './generated/type_definition';
import assert from 'assert';

export interface Backend {
  getLog(): Promise<GroupAction[]>;
  getCurrentServices(): Promise<Service[]>;
  getCurrentTypes(): Promise<Type[]>;
  commitTypeDefinition(definitions: TypeDefinition[]): Promise<void>;
};

function addField(
  versionsByType: Map<string, Map<number, Version>>, 
  newLog: BaseChangeAction[], 
  newTypeName: string, 
  newField: Field
) {
  if (newField._type) {
    newLog.push(
      new AddFieldTypeChangeAction(
        newField.changeLog,
        newTypeName,
        newField.name,
        newField._type,
        newField.description,
        newField.optional === undefined ? false : newField.optional,
        newField._default
      )
    );
  } else if (newField.reference) {
    const hash = versionsByType.get(newTypeName)?.get(newField.reference.version)?.hash;
    if (!hash) {
      throw new Error(`Version ${newField.reference.version} doesn't exist for type ${newTypeName}`)
    }
    newLog.push(
      new ReferenceFieldTypeChangeAction(
        newField.changeLog,
        newTypeName,
        newField.name,
        newField.description,
        newField.optional === undefined ? false : newField.optional,
        newField.reference._type,
        hash,
        newField.reference.version
      )
    );
  } else {
    throw new Error("No type or reference");
  }
}

function generateTypes(
  versionsByType: Map<string, Map<number, Version>>, 
  newLog: BaseChangeAction[], 
  oldTypes: Map<string, TypeDefinition>,
  newTypes: Map<string, TypeDefinition>
) {
  for (let [newTypeName, newTypeDefinition] of newTypes.entries()) {
    if (!oldTypes.has(newTypeName)) {
      newLog.push(
        new NewTypeChangeAction(
          "TODO add changelog", 
          newTypeName, 
          newTypeDefinition.description
        )
      );

      if (newTypeDefinition && newTypeDefinition.fields) {
        for (let field of newTypeDefinition.fields) {
          addField(versionsByType, newLog, newTypeName, field);
        }
      }
    } else {
      const oldFields = new Map<string, Field>();
      const newFields = new Map<string, Field>();

      const oldTypeDefinition = oldTypes.get(newTypeName);

      if (oldTypeDefinition && oldTypeDefinition.fields) {
        for (let field of oldTypeDefinition.fields) {
          oldFields.set(field.name, field);
        }
      }

      if (newTypeDefinition && newTypeDefinition.fields) {
        for (let field of newTypeDefinition.fields) {
          newFields.set(field.name, field);
        }
      }

      for (let [name, newField] of newFields) {
        if (!oldFields.has(name)) {
          addField(versionsByType, newLog, newTypeName, newField);
        } else {
          const oldField = oldFields.get(name);
          if (!oldField) {
            throw new Error("Satisfying typescript");
          }

          if (newField.optional !== oldField.optional) {
            if (newField.optional) {
              newLog.push(
                new OptionalFieldTypeChangeAction(
                  newField.changeLog,
                  newTypeName,
                  name
                )
              );
            } else {
              newLog.push(
                new RequiredFieldTypeChangeAction(
                  newField.changeLog,
                  newTypeName,
                  name
                )
              );
            }
          }

          if (newField._default !== oldField._default) {
            if (!newField._default) {
              newLog.push(
                new RemoveDefaultFieldTypeChangeAction(
                  newField.changeLog,
                  newTypeName,
                  name
                )
              );
            } else {
              newLog.push(
                new SetDefaultFieldTypeChangeAction(
                  newField.changeLog,
                  newTypeName,
                  name,
                  newField._default
                )
              );
            }
          }

          if (newField.description !== oldField.description) {
            newLog.push(
              new UpdateFieldDescriptionTypeChangeAction(
                newField.changeLog,
                newTypeName,
                name,
                newField.description
              )
            );
          }
        }
      }

      for (let [name, oldField] of oldFields) {
        if (!newFields.has(name)) {
          newLog.push(
            new DeleteFieldTypeChangeAction(
              "Field deleted",
              newTypeName,
              name
            )
          )
        }
      }
    }
  }
}

function generateServices(
  versionsByType: Map<string, Map<number, Version>>,
  newLog: BaseChangeAction[], 
  oldServices: Map<string, TypeDefinition>,
  newServices: Map<string, TypeDefinition>
) {
  for (let [newServiceName, newService] of newServices) {
    if (!oldServices.has(newServiceName)) {
      newLog.push(
        new NewServiceChangeAction(
          "FIXME",
          newServiceName,
          newService.description
        )
      );
      assert(newService.versions);

      for (let version of newService.versions) {
        const inputHash = versionsByType
          .get(version._from.name)?.get(version._from.version)?.hash;
        assert(inputHash);

        const outputHash = versionsByType
          .get(version.to.name)?.get(version.to.version)?.hash;
        assert(outputHash);

        newLog.push(
          new AddVersionServiceChangeAction(
            version.changeLog,
            newService.name,
            version.to.name,
            version._from.name,
            version._from.version,
            inputHash,
            version.to.version,
            outputHash
          )
        );
      }
    } else {
      const oldService = oldServices.get(newServiceName);
      assert(oldService);
      assert(newService.versions)
      assert(oldService.versions)

      if (newService.description !== oldService.description) {
        newLog.push(
          new UpdateDescriptionServiceChangeAction(
            "FIXME",
            newServiceName,
            newService.description
          )
        );
      }

      // TODO: Service deprecation, renaming and hard delete.
      const oldFromTo = new Set<string>();
      const newFromTo = new Set<string>();

      for (let version of oldService.versions) {
        oldFromTo.add(
          `${version._from.name}_${version._from.version}_${version.to.name}_ ${version.to.version}`
        );
      }

      for (let version of newService.versions) {
        newFromTo.add(
          `${version._from.name}_${version._from.version}_${version.to.name}_ ${version.to.version}`
        );
      }

      for (let version of newService.versions) {
        if (!oldFromTo.has(
          `${version._from.name}_${version._from.version}_${version.to.name}_ ${version.to.version}`
        )) {
          const inputHash = versionsByType
            .get(version._from.name)?.get(version._from.version)?.hash;
          assert(inputHash);

          const outputHash = versionsByType
            .get(version.to.name)?.get(version.to.version)?.hash;
          assert(outputHash);

          newLog.push(
            new AddVersionServiceChangeAction(
              version.changeLog,
              newService.name,
              version.to.name,
              version._from.name,
              version._from.version,
              inputHash,
              version.to.version,
              outputHash
            )
          );
        }
      }

      for (let version of oldService.versions) {
        if (!newFromTo.has(
          `${version._from.name}_${version._from.version}_${version.to.name}_ ${version.to.version}`
        )) {
          newLog.push(
            new DeleteMappingServiceChangeAction(
              version.changeLog,
              newService.name,
              version.to.name,
              version._from.name,
              version._from.version,
              version.to.version,
            )
          );
        }
      }
    }
  }
}

// Generate a change set from an old and new type definition
export function changeSetFromTypeDefintion(
  types: Type[],
  old: TypeDefinition[], 
  _new: TypeDefinition[]
): ChangeSet {
  const versionsByType = new Map<string, Map<number, Version>>();
  for (let _type of types) {
    const versions = new Map<number, Version>();
    for (let version of _type.versions) {
      versions.set(version.version, version);
    }
    versionsByType.set(_type.name, versions);
  }
  const oldTypes = new Map<string, TypeDefinition>();
  const newTypes = new Map<string, TypeDefinition>();
  const oldServices = new Map<string, TypeDefinition>();
  const newServices = new Map<string, TypeDefinition>();

  for (let existingDefintion of old) {
    if (existingDefintion.fields) {
      oldTypes.set(existingDefintion.name, existingDefintion);
    } else {
      oldServices.set(existingDefintion.name, existingDefintion);
    }
  }

  for (let existingDefintion of _new) {
    if (existingDefintion.fields) {
      newTypes.set(existingDefintion.name, existingDefintion);
    }
    if (existingDefintion.versions) {
      newServices.set(existingDefintion.name, existingDefintion);
    }
  }

  const newLog: BaseChangeAction[] = [];

  generateTypes(
    versionsByType,
    newLog, 
    oldTypes, 
    newTypes
  );

  generateServices(
    versionsByType,
    newLog, 
    oldServices, 
    newServices
  );

  return new ChangeSet("TODO: remove?", newLog, undefined, _new);
}