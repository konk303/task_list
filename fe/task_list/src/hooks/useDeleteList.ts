import { ApolloCache, gql, MutationFunction, MutationHookOptions, MutationResult, Reference, useMutation } from "@apollo/client";
import { List } from "../__generated__/graphql";

const DELETE_LIST = gql`
    mutation MutateDeleteLiest($id: ID!) { 
        deleteList(input: { id: $id }) { list { id } }
    }
`;

export default function useDeleteList (option: MutationHookOptions = {}): [MutationFunction, MutationResult] {
    const [mutateDeleteList, result] = useMutation(DELETE_LIST, option);
    return [mutateDeleteList, result]
}

export function modifyCacheMutateDeleteList (cache: ApolloCache<any>, list: List) {
    cache.modify({
        fields: {
            lists (existingLists = [], { readField }) {
                return existingLists.filter((listRef: Reference) => readField("id", listRef) !== list.id)
            }
        }
    })
}
