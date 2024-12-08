import { useQuery, gql } from '@apollo/client';
import Tasks from './Tasks.tsx'
import type { List, Task } from './__generated__/graphql.ts';

const GET_LIST = gql`
    query List($listId: ID!) { list(id: $listId)
        { tasks { id listId name order done } }
    }
`;

export default function List({ list }: { list: List }) {
    const { loading, error, data, refetch } = useQuery(GET_LIST, { variables: { listId: list.id } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tasks: Task[] = data.list.tasks
        .toSorted((a: Task, b: Task) => Number(a.order) - Number(b.order))
        .toSorted((a: Task, b: Task) => Number(a.done) - Number(b.done))
    const newTask: Task = { listId: Number(list.id), id: "newRecord", name: '', done: false, createdAt: null, updatedAt: null }
    const tasksWithNew = tasks.toSpliced(tasks.findIndex(task => Boolean(task.done)), 0, newTask)

    return (
        <Tasks key={list.id} listId={Number(list.id)} tasks={tasksWithNew} refetchTasks={refetch} />
    )
}
