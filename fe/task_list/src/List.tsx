import { useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Task from './Task.tsx'


const GET_LIST = gql`
    query List($listId: ID!) { list(id: $listId)
        { tasks { id listId name order done } }
    }
`;
const REORDER_TASKS = gql`
   mutation ReorderTasks($listId: ID!, $taskIds: [ID!]!) { 
        reorderTasks(input: { listId: $listId, taskIds: $taskIds })
            { tasks { id listId name order done } }
    }
`;

export default function List({ list }) {
    const prevListId = useRef(list.id)
    const prevTaskIds = useRef([])
    const { loading, error, data, refetch } = useQuery(GET_LIST, { variables: { listId: list.id } });
    const [reorderTasks] = useMutation(REORDER_TASKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tasks = data.list.tasks.toSorted((a, b) => a.order - b.order).toSorted((a, b) => a.done - b.done)
    const listId = list.id
    const taskIds =  tasks.map((task) => task.id)
    if (prevListId.current === listId && prevTaskIds.current.some((taskId, i) => taskId !== taskIds[i])) {
        reorderTasks({ variables: { listId, taskIds } })
    }
    prevListId.current = list.id
    prevTaskIds.current = taskIds

    return (
        <div>
            {tasks.toSpliced(tasks.findIndex(task => task.done), 0, { listId: list.id, id: null })
                .map(task => <Task key={ task.id } task={task} refetch={refetch} />)}
        </div>
    )
}
