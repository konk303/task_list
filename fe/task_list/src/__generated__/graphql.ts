/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

/** Autogenerated input type of DeleteTask */
export type DeleteTaskInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Autogenerated return type of DeleteTask. */
export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  task: Task;
};

export type List = {
  __typename?: 'List';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Task>>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteTask?: Maybe<DeleteTaskPayload>;
  reorderTasks?: Maybe<ReorderTasksPayload>;
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
  upsertTask?: Maybe<UpsertTaskPayload>;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationReorderTasksArgs = {
  input: ReorderTasksInput;
};


export type MutationUpsertTaskArgs = {
  input: UpsertTaskInput;
};

export type Query = {
  __typename?: 'Query';
  list: List;
  lists: Array<List>;
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
};


export type QueryListArgs = {
  id: Scalars['ID']['input'];
};

/** Autogenerated input type of ReorderTasks */
export type ReorderTasksInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  listId: Scalars['ID']['input'];
  taskIds: Array<Scalars['ID']['input']>;
};

/** Autogenerated return type of ReorderTasks. */
export type ReorderTasksPayload = {
  __typename?: 'ReorderTasksPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  tasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['ISO8601DateTime']['output'];
  done?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  list?: Maybe<List>;
  listId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

/** Autogenerated input type of UpsertTask */
export type UpsertTaskInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  done?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  listId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of UpsertTask. */
export type UpsertTaskPayload = {
  __typename?: 'UpsertTaskPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  errors: Array<Scalars['String']['output']>;
  task: Task;
};

export type ListQueryVariables = Exact<{
  listId: Scalars['ID']['input'];
}>;


export type ListQuery = { __typename?: 'Query', list: { __typename?: 'List', tasks?: Array<{ __typename?: 'Task', id: string, listId: number, name?: string | null, order?: number | null, done?: boolean | null }> | null } };

export type UpsertTaskMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  listId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  done?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpsertTaskMutation = { __typename?: 'Mutation', upsertTask?: { __typename?: 'UpsertTaskPayload', task: { __typename?: 'Task', id: string, listId: number, name?: string | null, order?: number | null, done?: boolean | null } } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'DeleteTaskPayload', task: { __typename?: 'Task', id: string } } | null };

export type ReorderTasksMutationVariables = Exact<{
  listId: Scalars['ID']['input'];
  taskIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type ReorderTasksMutation = { __typename?: 'Mutation', reorderTasks?: { __typename?: 'ReorderTasksPayload', tasks: Array<{ __typename?: 'Task', id: string, listId: number, name?: string | null, order?: number | null, done?: boolean | null }> } | null };


export const ListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"List"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<ListQuery, ListQueryVariables>;
export const UpsertTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"NullValue"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"done"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"done"},"value":{"kind":"Variable","name":{"kind":"Name","value":"done"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertTaskMutation, UpsertTaskMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const ReorderTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReorderTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reorderTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"taskIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"listId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]}}]} as unknown as DocumentNode<ReorderTasksMutation, ReorderTasksMutationVariables>;