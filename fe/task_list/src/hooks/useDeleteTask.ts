import { gql, MutationFunction, MutationHookOptions, MutationResult, useMutation } from "@apollo/client";

const DELETE_TASK = gql`
    mutation MutateDeleteTask($id: ID!, $listId: ID!) { 
        deleteTask(input: { id: $id, listId: $listId }) { task { id } }
    }
`;

export default function useDeleteTask (option: MutationHookOptions = {}): [MutationFunction, MutationResult] {
    const [mutateDeleteTask, result] = useMutation(DELETE_TASK, option);
    return [mutateDeleteTask, result]
}
