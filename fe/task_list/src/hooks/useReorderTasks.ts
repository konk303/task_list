import { gql, MutationFunction, MutationResult, useMutation } from "@apollo/client";

const REORDER_TASKS = gql`
   mutation MutateReorderTasks($listId: ID!, $taskIds: [ID!]!) { 
        reorderTasks(input: { listId: $listId, taskIds: $taskIds })
            { list { tasks { id order } } }
    }
`;

export default function useReorderTasks (): [MutationFunction, MutationResult] {
    const [mutateReorderTasks, result] = useMutation(REORDER_TASKS);
    return [mutateReorderTasks, result]
}
