/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    mutation MutateDeleteTask($id: ID!, $listId: ID!) { \n        deleteTask(input: { id: $id, listId: $listId }) { task { id } }\n    }\n": types.MutateDeleteTaskDocument,
    "\n    query QueryList($listId: ID!) { list(id: $listId)\n        { id tasks { id listId name order done } }\n    }\n": types.QueryListDocument,
    "\n  query QueryLists { lists { id name } }\n": types.QueryListsDocument,
    "\n   mutation MutateReorderTasks($listId: ID!, $taskIds: [ID!]!) { \n        reorderTasks(input: { listId: $listId, taskIds: $taskIds })\n            { list { tasks { id order } } }\n    }\n": types.MutateReorderTasksDocument,
    "\n    mutation MutateUpsertTask($id: ID = \"\", $listId: ID!, $name: String, $done: Boolean = false) { \n        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })\n            { task { id listId name order done } }\n    }\n": types.MutateUpsertTaskDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation MutateDeleteTask($id: ID!, $listId: ID!) { \n        deleteTask(input: { id: $id, listId: $listId }) { task { id } }\n    }\n"): (typeof documents)["\n    mutation MutateDeleteTask($id: ID!, $listId: ID!) { \n        deleteTask(input: { id: $id, listId: $listId }) { task { id } }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query QueryList($listId: ID!) { list(id: $listId)\n        { id tasks { id listId name order done } }\n    }\n"): (typeof documents)["\n    query QueryList($listId: ID!) { list(id: $listId)\n        { id tasks { id listId name order done } }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryLists { lists { id name } }\n"): (typeof documents)["\n  query QueryLists { lists { id name } }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n   mutation MutateReorderTasks($listId: ID!, $taskIds: [ID!]!) { \n        reorderTasks(input: { listId: $listId, taskIds: $taskIds })\n            { list { tasks { id order } } }\n    }\n"): (typeof documents)["\n   mutation MutateReorderTasks($listId: ID!, $taskIds: [ID!]!) { \n        reorderTasks(input: { listId: $listId, taskIds: $taskIds })\n            { list { tasks { id order } } }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation MutateUpsertTask($id: ID = \"\", $listId: ID!, $name: String, $done: Boolean = false) { \n        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })\n            { task { id listId name order done } }\n    }\n"): (typeof documents)["\n    mutation MutateUpsertTask($id: ID = \"\", $listId: ID!, $name: String, $done: Boolean = false) { \n        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })\n            { task { id listId name order done } }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;