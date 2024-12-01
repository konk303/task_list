import { useMutation, gql } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

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
    const [nameInput, setNameInput] = useState(task.name)

    const deleteHandler = useCallback(() => {
        deleteTask({ variables: { id: task.id } }).then(refetch)
    }, [])
    const upsertHandler = (task) => upsertTask({ variables: task }).then(() => { if (!task.id) refetch() })
    const debouncedUpsert = useDebouncedCallback(upsertHandler, 1000)

    return (
    <div>
        (id: { task.id })
        <input value={ nameInput } onChange={ e => {
            setNameInput(e.target.value)
            debouncedUpsert({ ...task, name: e.target.value })
        } } />
        <input
         type="checkbox"
         checked={ task.done }
         disabled={ task.id === null }
         onChange={ e => upsertHandler({ ...task, done: e.target.checked }) }
         />
        <button type="button" onClick={ deleteHandler } disabled={ task.id === null }>削除</button>
        (order: { task.order })
    </div>
    )
}
