import { ApolloCache, gql, MutationFunction, MutationHookOptions, MutationResult, Reference, useMutation } from "@apollo/client";
import { List, Task } from "../__generated__/graphql";

const DELETE_TASK = gql`
    mutation MutateDeleteTask($id: ID!, $listId: ID!) { 
        deleteTask(input: { id: $id, listId: $listId }) { task { id } }
    }
`;

export default function useDeleteTask (option: MutationHookOptions = {}): [MutationFunction, MutationResult] {
    const [mutateDeleteTask, result] = useMutation(DELETE_TASK, option);
    return [mutateDeleteTask, result]
}

export function modifyCacheMutateDeleteTask (cache: ApolloCache<any>, list: List, task: Task) {
    cache.modify({
        id: cache.identify(list),
        fields: {
            tasks (existingTasks = [], { readField }) {
                return existingTasks.filter((taskRef: Reference) => readField("id", taskRef) !== task.id)
            }
        }
    })
}
