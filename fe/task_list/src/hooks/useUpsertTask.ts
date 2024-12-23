import { ApolloCache, gql, MutationFunction, MutationHookOptions, MutationResult, useMutation } from "@apollo/client";
import { List, Task } from "../__generated__/graphql";

const UPSERT_TASK = gql`
    mutation MutateUpsertTask($id: ID = "", $listId: ID!, $name: String, $done: Boolean = false) { 
        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })
            { task { id listId name order done } }
    }
`;

export default function useUpsertTask (options: MutationHookOptions = {}): [MutationFunction, MutationResult] {
    const [mutateUpsertTask, result] = useMutation(UPSERT_TASK, options);
    return [mutateUpsertTask, result]
}

export function modifyCacheMutateUpsertTask (cache: ApolloCache<any>, list: List, task: Task) {
    cache.modify({
        id: cache.identify(list),
        fields: {
            tasks (existingTasks = []) {
                return [...existingTasks, { __ref: cache.identify(task) }]
            }
        }
    })
}
