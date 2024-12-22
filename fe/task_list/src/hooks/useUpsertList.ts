import { gql, MutationFunction, MutationHookOptions, MutationResult, useMutation } from "@apollo/client";

const UPSERT_LIST = gql`
    mutation MutateUpsertList($id: ID = "", $name: String) { 
        upsertList(input: { id: $id name: $name })
            { list { id name } }
    }
`;

export default function useUpsertList (options: MutationHookOptions = {}): [MutationFunction, MutationResult] {
    const [mutateUpsertList, result] = useMutation(UPSERT_LIST, options);
    return [mutateUpsertList, result]
}
