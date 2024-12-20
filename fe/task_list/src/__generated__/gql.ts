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
    "\n    query List($listId: ID!) { list(id: $listId)\n        { tasks { id listId name order done } }\n    }\n": types.ListDocument,
    "\n    mutation UpsertTask($id: ID = null, $listId: ID!, $name: String, $done: Boolean = false) { \n        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })\n            { task { id listId name order done } }\n    }\n": types.UpsertTaskDocument,
    "\n    mutation DeleteTask($id: ID!, $listId: ID!) { \n        deleteTask(input: { id: $id, listId: $listId }) { task { id } }\n    }\n": types.DeleteTaskDocument,
    "\n   mutation ReorderTasks($listId: ID!, $taskIds: [ID!]!) { \n        reorderTasks(input: { listId: $listId, taskIds: $taskIds })\n            { tasks { listId id } }\n    }\n": types.ReorderTasksDocument,
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
export function gql(source: "\n    query List($listId: ID!) { list(id: $listId)\n        { tasks { id listId name order done } }\n    }\n"): (typeof documents)["\n    query List($listId: ID!) { list(id: $listId)\n        { tasks { id listId name order done } }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpsertTask($id: ID = null, $listId: ID!, $name: String, $done: Boolean = false) { \n        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })\n            { task { id listId name order done } }\n    }\n"): (typeof documents)["\n    mutation UpsertTask($id: ID = null, $listId: ID!, $name: String, $done: Boolean = false) { \n        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })\n            { task { id listId name order done } }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteTask($id: ID!, $listId: ID!) { \n        deleteTask(input: { id: $id, listId: $listId }) { task { id } }\n    }\n"): (typeof documents)["\n    mutation DeleteTask($id: ID!, $listId: ID!) { \n        deleteTask(input: { id: $id, listId: $listId }) { task { id } }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n   mutation ReorderTasks($listId: ID!, $taskIds: [ID!]!) { \n        reorderTasks(input: { listId: $listId, taskIds: $taskIds })\n            { tasks { listId id } }\n    }\n"): (typeof documents)["\n   mutation ReorderTasks($listId: ID!, $taskIds: [ID!]!) { \n        reorderTasks(input: { listId: $listId, taskIds: $taskIds })\n            { tasks { listId id } }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;