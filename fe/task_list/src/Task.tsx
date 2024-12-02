import { useMutation, gql } from '@apollo/client';
import { useCallback, useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import TaskDraggable from './TaskDraggable';
import { refetchListContext } from './List'
import type { Task } from './__generated__/graphql';

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

export default function Task({ task }: { task: Task }) {
    const [upsertTask] = useMutation(UPSERT_TASK);
    const [deleteTask] = useMutation(DELETE_TASK);
    const [nameInput, setNameInput] = useState(String(task.name))
    const refetch = useContext(refetchListContext)

    const deleteHandler = useCallback(() => {
        deleteTask({ variables: { id: task.id } }).then(refetch)
    }, [])
    const upsertHandler = (task: Task) => (upsertTask({ variables: task }))
        .then(() => { if (task.id === "newRecord") refetch() })
    const debouncedUpsert = useDebouncedCallback(upsertHandler, 1000)

    return (
        <li><TaskDraggable id={task.id}>
            (id: {task.id})
            <input
                value={nameInput}
                disabled={Boolean(task.done)}
                onChange={e => {
                    setNameInput(e.target.value)
                    debouncedUpsert({ ...task, name: e.target.value })
                }}
            />
            <input
                type="checkbox"
                checked={Boolean(task.done)}
                disabled={task.id === null}
                onChange={e => {
                    upsertHandler({ ...task, done: e.target.checked })
                }} />
            <button type="button" onClick={deleteHandler} disabled={task.id === null}>削除</button>
            (order: {task.order})
        </TaskDraggable></li>
    )
}
