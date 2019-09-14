"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result = {
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
exports.default = result;
