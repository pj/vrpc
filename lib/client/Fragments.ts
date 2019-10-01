import gql from 'graphql-tag';

export const ALL_DATA = `
  log {
    ...ActionsFragment
    ... on GroupAction {
      __typename
      changeLog
      groupedActions {
         ...ActionsFragment
      }
      versions {
        typeName,
        version
      }
    }
  }

  types {
    name
    versions {
      version
      fields {
        key
      }
    }
  }

  services {
    name
  }
`;

export const ACTIONS_FRAGMENT = gql`
fragment DataFragment on FieldData {
  ... on StringField {
    __typename
    stringValue: value
  }

  ... on IntField {
    __typename
    intValue: value
  }

  ... on FloatField {
    __typename
    floatValue: value
  }

  ... on BooleanField {
    __typename
    booleanValue: value
  }
}

fragment ActionsFragment on Action {
  __typename
  changeLog
  hash
  _id: hash
  version

  ... on NewServiceAction {
    serviceName
    description
  }

  ... on UpdateDescriptionServiceAction {
    serviceName
    description
  }

  ... on AddVersionServiceAction {
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }

  ... on RenameFieldTypeAction {
    typeName
    _from
    to
  }

  ... on RequiredFieldTypeAction {
    typeName
    name
  }

  ... on OptionalFieldTypeAction {
    typeName
    name
  }

  ... on DeleteFieldTypeAction {
    typeName
    name
  }

  ... on SetDefaultFieldTypeAction {
    typeName
    name
    _default {
      ...DataFragment
    }
  }

  ... on RemoveDefaultFieldTypeAction {
    typeName
    name
  }

  ... on AddFieldTypeAction {
    typeName
    name
    type
    description
    optional
    _default {
      ...DataFragment
    }
  }

  ... on UpdateDescriptionTypeAction {
    typeName
    name
    description
  }

  ... on ReferenceFieldTypeAction {
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }

  ... on NewTypeAction {
    typeName
    description
  }
}
`;

export const GET_LOG = gql`
query GetLog {
  ${ALL_DATA}
}
${ACTIONS_FRAGMENT}
`;

