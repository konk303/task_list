import { gql, MutationFunction, MutationHookOptions, MutationResult, useMutation } from "@apollo/client";

const UPSERT_TASK = gql`
    mutation MutateUpsertTask($id: ID = null, $listId: ID!, $name: String, $done: Boolean = false) { 
        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })
            { task { id listId name order done } }
    }
`;

export default function useUpsertTask (options: MutationHookOptions = {}): [MutationFunction, MutationResult] {
    const [mutateUpsertTask, result] = useMutation(UPSERT_TASK, options);
    return [mutateUpsertTask, result]
}
