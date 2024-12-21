import { useQuery, gql } from '@apollo/client';
import type { List } from '../__generated__/graphql.ts';

export const GET_LIST = gql`
    query QueryList($listId: ID!) { list(id: $listId)
        { id tasks { id listId name order done } }
    }
`;

export default function useList (listId: List["id"]) {
    const { loading, error, data, refetch } = useQuery(GET_LIST, { variables: { listId: listId } });
    return { loading, error, data, refetch }
}
