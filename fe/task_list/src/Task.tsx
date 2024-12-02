import { useMutation, gql } from '@apollo/client';
import { useCallback } from 'react';

const UPSERT_TASK = gql`
    mutation UpsertTask($id: ID = null, $listId: ID!, $name: String, $done: Boolean = false) { 
        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })
            { task { id listId name order done } }
    }
`;
const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) { 
        deleteTask(input: { id: $id }) { task { id } }
    }
`;

export default function Task({ task, refetch }) {
    const [upsertTask] = useMutation(UPSERT_TASK);
    const [deleteTask] = useMutation(DELETE_TASK);

    const upsertHandler = useCallback(task => {
        upsertTask({ variables: task }).then(() => { if (!task.id) refetch() })
    }, [])
    const deleteHandler = useCallback(() => {
        deleteTask({ variables: { id: task.id } }).then(refetch)
    }, [])

    return (
    <div>
        (id: { task.id })
        <input value={ task.name } onChange={ e => upsertHandler({ ...task, name: e.target.value }) } />
        <input type="checkbox" checked={ task.done } onChange={ e => upsertHandler({ ...task, done: e.target.checked }) } />
        <button type="button" onClick={ deleteHandler }>削除</button>
        (order: { task.order })
    </div>
    )
}
