
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
        "name": "LogAction",
        "possibleTypes": [
          {
            "name": "NewServiceAction"
          },
          {
            "name": "UpdateDescriptionServiceAction"
          },
          {
            "name": "AddVersionServiceAction"
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
            "name": "NewTypeAction"
          },
          {
            "name": "GroupAction"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Action",
        "possibleTypes": [
          {
            "name": "NewServiceAction"
          },
          {
            "name": "UpdateDescriptionServiceAction"
          },
          {
            "name": "AddVersionServiceAction"
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
            "name": "NewTypeAction"
          },
          {
            "name": "GroupAction"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "FieldData",
        "possibleTypes": [
          {
            "name": "StringField"
          },
          {
            "name": "IntField"
          },
          {
            "name": "FloatField"
          },
          {
            "name": "BooleanField"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "BaseField",
        "possibleTypes": [
          {
            "name": "Field"
          },
          {
            "name": "ReferenceField"
          }
        ]
      }
    ]
  }
};

      export default result;
    