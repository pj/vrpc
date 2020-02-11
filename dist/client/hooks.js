"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const ApolloReactHooks = __importStar(require("@apollo/react-hooks"));
var FieldTypes;
(function (FieldTypes) {
    FieldTypes["String"] = "STRING";
    FieldTypes["Boolean"] = "BOOLEAN";
    FieldTypes["Integer"] = "INTEGER";
    FieldTypes["Float"] = "FLOAT";
})(FieldTypes = exports.FieldTypes || (exports.FieldTypes = {}));
exports.DataFragmentFragmentDoc = graphql_tag_1.default `
    fragment DataFragment on FieldDefaults {
  ... on StringField {
    __typename
    stringValue: value
  }
  ... on IntegerField {
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
    `;
exports.ActionsFragmentFragmentDoc = graphql_tag_1.default `
    fragment ActionsFragment on Action {
  ... on NewServiceAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    serviceName
    description
  }
  ... on UpdateDescriptionServiceAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    serviceName
    description
  }
  ... on AddVersionServiceAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }
  ... on RenameFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    _from
    to
  }
  ... on RequiredFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on OptionalFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on DeleteFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on SetDefaultFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    newDefault: _default {
      ...DataFragment
    }
  }
  ... on RemoveDefaultFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
  }
  ... on AddFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    _type
    description
    optional
    _default {
      ...DataFragment
    }
  }
  ... on UpdateDescriptionTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    description
  }
  ... on ReferenceFieldTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }
  ... on NewTypeAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    typeName
    description
  }
}
    ${exports.DataFragmentFragmentDoc}`;
exports.LogFieldsFragmentDoc = graphql_tag_1.default `
    fragment LogFields on GroupAction {
  hash
  actions {
    ...ActionsFragment
  }
}
    ${exports.ActionsFragmentFragmentDoc}`;
exports.TypeFieldsFragmentDoc = graphql_tag_1.default `
    fragment TypeFields on Type {
  name
  changeLog
  description
  versions {
    version
    hash
    _type
    fields {
      field {
        name
        description
        changeLog
        optional
        ... on ReferenceField {
          referenceType
          referenceHash
          referenceVersion
        }
        ... on Field {
          _default {
            ... on StringField {
              stringValue: value
            }
            ... on BooleanField {
              booleanValue: value
            }
            ... on FloatField {
              floatValue: value
            }
            ... on IntegerField {
              intValue: value
            }
          }
          type
        }
      }
    }
  }
}
    `;
exports.ServiceFieldsFragmentDoc = graphql_tag_1.default `
    fragment ServiceFields on Service {
  name
  description
  changeLog
  versions {
    inputs {
      version
      _type
      hash
    }
    output {
      version
      _type
      hash
    }
  }
}
    `;
exports.ChangeActionsFragmentFragmentDoc = graphql_tag_1.default `
    fragment ChangeActionsFragment on ChangeAction {
  ... on NewServiceChangeAction {
    __typename
    changeLog
    serviceName
    description
  }
  ... on UpdateDescriptionServiceChangeAction {
    __typename
    changeLog
    serviceName
    description
  }
  ... on AddVersionServiceChangeAction {
    __typename
    changeLog
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }
  ... on RenameFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    _from
    to
  }
  ... on RequiredFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on OptionalFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on DeleteFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on SetDefaultFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    newDefault: _default {
      ...DataFragment
    }
  }
  ... on RemoveDefaultFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
  }
  ... on AddFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    _type
    description
    optional
    _default {
      ...DataFragment
    }
  }
  ... on UpdateDescriptionTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    description
  }
  ... on ReferenceFieldTypeChangeAction {
    __typename
    changeLog
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }
  ... on NewTypeChangeAction {
    __typename
    changeLog
    typeName
    description
  }
}
    ${exports.DataFragmentFragmentDoc}`;
exports.ChangeSetFieldsFragmentDoc = graphql_tag_1.default `
    fragment ChangeSetFields on ChangeSet {
  id
  baseHash
  log {
    ...ChangeActionsFragment
  }
}
    ${exports.ChangeActionsFragmentFragmentDoc}`;
exports.ChangeSetFragmentFragmentDoc = graphql_tag_1.default `
    fragment ChangeSetFragment on ChangeSet {
  id
  baseHash
  log {
    ...ChangeActionsFragment
  }
}
    ${exports.ChangeActionsFragmentFragmentDoc}`;
exports.AllDataDocument = graphql_tag_1.default `
    query allData {
  log {
    ...LogFields
  }
  types {
    ...TypeFields
  }
  services {
    ...ServiceFields
  }
  changeSets {
    ...ChangeSetFields
  }
}
    ${exports.LogFieldsFragmentDoc}
${exports.TypeFieldsFragmentDoc}
${exports.ServiceFieldsFragmentDoc}
${exports.ChangeSetFieldsFragmentDoc}`;
/**
 * __useAllDataQuery__
 *
 * To run a query within a React component, call `useAllDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllDataQuery({
 *   variables: {
 *   },
 * });
 */
function useAllDataQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.AllDataDocument, baseOptions);
}
exports.useAllDataQuery = useAllDataQuery;
function useAllDataLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.AllDataDocument, baseOptions);
}
exports.useAllDataLazyQuery = useAllDataLazyQuery;
exports.UpdateChangeSetDocument = graphql_tag_1.default `
    mutation UpdateChangeSet($changeSet: ChangeSetInput!) {
  updateChangeSet(changeSet: $changeSet) {
    ...ChangeSetFragment
  }
}
    ${exports.ChangeSetFragmentFragmentDoc}`;
/**
 * __useUpdateChangeSetMutation__
 *
 * To run a mutation, you first call `useUpdateChangeSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChangeSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChangeSetMutation, { data, loading, error }] = useUpdateChangeSetMutation({
 *   variables: {
 *      changeSet: // value for 'changeSet'
 *   },
 * });
 */
function useUpdateChangeSetMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.UpdateChangeSetDocument, baseOptions);
}
exports.useUpdateChangeSetMutation = useUpdateChangeSetMutation;
exports.CommitChangeSetDocument = graphql_tag_1.default `
    mutation CommitChangeSet($changeSetId: String!) {
  commitChangeSet(changeSetId: $changeSetId) {
    log {
      ...LogFields
    }
    types {
      ...TypeFields
    }
    services {
      ...ServiceFields
    }
    changeSets {
      ...ChangeSetFields
    }
  }
}
    ${exports.LogFieldsFragmentDoc}
${exports.TypeFieldsFragmentDoc}
${exports.ServiceFieldsFragmentDoc}
${exports.ChangeSetFieldsFragmentDoc}`;
/**
 * __useCommitChangeSetMutation__
 *
 * To run a mutation, you first call `useCommitChangeSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommitChangeSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commitChangeSetMutation, { data, loading, error }] = useCommitChangeSetMutation({
 *   variables: {
 *      changeSetId: // value for 'changeSetId'
 *   },
 * });
 */
function useCommitChangeSetMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.CommitChangeSetDocument, baseOptions);
}
exports.useCommitChangeSetMutation = useCommitChangeSetMutation;
