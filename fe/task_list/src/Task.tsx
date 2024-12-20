import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import TaskDraggable from './TaskDraggable';
import type { Task } from './__generated__/graphql';

const UPSERT_TASK = gql`
    mutation UpsertTask($id: ID = null, $listId: ID!, $name: String, $done: Boolean = false) { 
        upsertTask(input: { id: $id, listId: $listId, name: $name done: $done })
            { task { id listId name order done } }
    }
`;
const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!, $listId: ID!) { 
        deleteTask(input: { id: $id, listId: $listId }) { task { id } }
    }
`;

export default function Task ({ task, addToTasks, deleteFromTasks, recalcOrders }:
    { task: Task, addToTasks: any, deleteFromTasks: any, recalcOrders: any }) {
    const [upsertTask] = useMutation(UPSERT_TASK);
    const [deleteTask] = useMutation(DELETE_TASK);
    const [nameInput, setNameInput] = useState(String(task.name))

    const deleteHandler = () => {
        deleteTask({ variables: { id: task.id, listId: String(task.listId) } })
        deleteFromTasks(task.id)
    }
    const upsertDoneHandler = (done: Task["done"]) => {
        upsertTask({ variables: { ...task, done } })
        recalcOrders(task.id, done)
    }
    const upsertNameHandler = (name: Task["name"]) => {
        upsertTask({ variables: { ...task, name } })
            .then((result) => {
                if (task.id === "newRecord") {
                    setNameInput('')
                    addToTasks(result.data.upsertTask.task.id)
                }

            })
    }
    const debouncedUpsert = useDebouncedCallback(upsertNameHandler, 1000)

    return (

        <li><TaskDraggable id={ task.id }>
            <input
                value={ nameInput }
                disabled={ Boolean(task.done) }
                onChange={ e => {
                    setNameInput(e.target.value)
                    debouncedUpsert(e.target.value)
                } }
                className={ task.done ? "done" : "" }
            />
            <input
                type="checkbox"
                checked={ Boolean(task.done) }
                disabled={ task.id === "newRecord" }
                onChange={ e => upsertDoneHandler(e.target.checked) }
            />
            <button type="button" onClick={ deleteHandler } disabled={ task.id === 'newRecord' }>
                <span className={ "material-icons" }>delete</span>
            </button>
            <span className={ "info" }>(id: { task.id }, order: { task.order })</span>
        </TaskDraggable></li>
    )
}
