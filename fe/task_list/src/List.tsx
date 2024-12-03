import { useQuery, gql } from '@apollo/client';
import Tasks from './Tasks.tsx'
import type { List, Task } from './__generated__/graphql.ts';
import { createContext } from 'react';

const GET_LIST = gql`
    query List($listId: ID!) { list(id: $listId)
        { tasks { id listId name order done } }
    }
`;

export const refetchListContext = createContext<() => void>(() => '')

export default function List({ list }: { list: List }) {
    const { loading, error, data, refetch } = useQuery(GET_LIST, { variables: { listId: list.id } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tasks = data.list.tasks
    .toSorted((a: Task, b: Task) => Number(a.order) - Number(b.order))
    .toSorted((a: Task, b: Task) => Number(a.done) - Number(b.done))
    return (
        <ul>
            <refetchListContext.Provider value={refetch}>
                <Tasks key={list.id} listId={list.id} tasks={tasks} />
            </refetchListContext.Provider>
        </ul>
    )
}
