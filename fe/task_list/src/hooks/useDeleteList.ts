import { gql, MutationFunction, MutationHookOptions, MutationResult, useMutation } from "@apollo/client";

const DELETE_LIST = gql`
    mutation MutateDeleteLiest($id: ID!) { 
        deleteList(input: { id: $id }) { list { id } }
    }
`;

export default function useDeleteList (option: MutationHookOptions = {}): [MutationFunction, MutationResult] {
    const [mutateDeleteList, result] = useMutation(DELETE_LIST, option);
    return [mutateDeleteList, result]
}
