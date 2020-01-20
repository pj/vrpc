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
var GQLFieldTypes;
(function (GQLFieldTypes) {
    GQLFieldTypes["StringType"] = "stringType";
    GQLFieldTypes["BooleanType"] = "booleanType";
    GQLFieldTypes["IntType"] = "intType";
    GQLFieldTypes["FloatType"] = "floatType";
})(GQLFieldTypes = exports.GQLFieldTypes || (exports.GQLFieldTypes = {}));
exports.DataFragmentFragmentDoc = graphql_tag_1.default `
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
    `;
exports.ActionsFragmentFragmentDoc = graphql_tag_1.default `
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
    newDefault {
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
    ${exports.DataFragmentFragmentDoc}`;
exports.LogFieldsFragmentDoc = graphql_tag_1.default `
    fragment LogFields on LogAction {
  ...ActionsFragment
  ... on GroupAction {
    __typename
    changeLog
    hash
    _id: hash
    version
    groupedActions {
      ...ActionsFragment
    }
    versions {
      typeName
      version
    }
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
      key
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
            ... on IntField {
              intValue: value
            }
          }
          _type
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
  __typename
  changeLog
  ... on NewServiceChangeAction {
    serviceName
    description
  }
  ... on UpdateDescriptionServiceChangeAction {
    serviceName
    description
  }
  ... on AddVersionServiceChangeAction {
    serviceName
    inputType
    outputType
    inputVersion
    inputHash
    outputVersion
    outputHash
  }
  ... on RenameFieldTypeChangeAction {
    typeName
    _from
    to
  }
  ... on RequiredFieldTypeChangeAction {
    typeName
    name
  }
  ... on OptionalFieldTypeChangeAction {
    typeName
    name
  }
  ... on DeleteFieldTypeChangeAction {
    typeName
    name
  }
  ... on SetDefaultFieldTypeChangeAction {
    typeName
    name
    newDefault {
      ...DataFragment
    }
  }
  ... on RemoveDefaultFieldTypeChangeAction {
    typeName
    name
  }
  ... on AddFieldTypeChangeAction {
    typeName
    name
    type
    description
    optional
    _default {
      ...DataFragment
    }
  }
  ... on UpdateDescriptionTypeChangeAction {
    typeName
    name
    description
  }
  ... on ReferenceFieldTypeChangeAction {
    typeName
    name
    description
    optional
    referenceType
    referenceHash
    referenceVersion
  }
  ... on NewTypeChangeAction {
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
