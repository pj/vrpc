
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "Action",
        "possibleTypes": [
          {
            "name": "NewTypeAction"
          },
          {
            "name": "RenameFieldTypeAction"
          },
          {
            "name": "RequiredFieldTypeAction"
          },
          {
            "name": "OptionalFieldTypeAction"
          },
          {
            "name": "DeleteFieldTypeAction"
          },
          {
            "name": "SetDefaultFieldTypeAction"
          },
          {
            "name": "RemoveDefaultFieldTypeAction"
          },
          {
            "name": "AddFieldTypeAction"
          },
          {
            "name": "UpdateDescriptionTypeAction"
          },
          {
            "name": "ReferenceFieldTypeAction"
          },
          {
            "name": "NewServiceAction"
          },
          {
            "name": "UpdateDescriptionServiceAction"
          },
          {
            "name": "AddVersionServiceAction"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "FieldDefaults",
        "possibleTypes": [
          {
            "name": "StringField"
          },
          {
            "name": "BooleanField"
          },
          {
            "name": "FloatField"
          },
          {
            "name": "IntegerField"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "FieldUnion",
        "possibleTypes": [
          {
            "name": "ReferenceField"
          },
          {
            "name": "ScalarField"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "BaseField",
        "possibleTypes": [
          {
            "name": "ReferenceField"
          },
          {
            "name": "ScalarField"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "ChangeAction",
        "possibleTypes": [
          {
            "name": "NewTypeChangeAction"
          },
          {
            "name": "RenameFieldTypeChangeAction"
          },
          {
            "name": "RequiredFieldTypeChangeAction"
          },
          {
            "name": "OptionalFieldTypeChangeAction"
          },
          {
            "name": "DeleteFieldTypeChangeAction"
          },
          {
            "name": "SetDefaultFieldTypeChangeAction"
          },
          {
            "name": "RemoveDefaultFieldTypeChangeAction"
          },
          {
            "name": "AddFieldTypeChangeAction"
          },
          {
            "name": "UpdateDescriptionTypeChangeAction"
          },
          {
            "name": "ReferenceFieldTypeChangeAction"
          },
          {
            "name": "NewServiceChangeAction"
          },
          {
            "name": "UpdateDescriptionServiceChangeAction"
          },
          {
            "name": "AddVersionServiceChangeAction"
          }
        ]
      }
    ]
  }
};
      export default result;
    