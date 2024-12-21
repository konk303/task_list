import type { Task as TaskType } from '../__generated__/graphql';
import { ChangeEvent } from 'react';

export default function Task ({
    task,
    name,
    changeNameHandler,
    changeDoneHandler,
    deleteHandler
}: {
    task: TaskType,
    name: string,
    changeNameHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    changeDoneHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteHandler: () => void
}) {

    return (

        <li>
            <input
                value={ name }
                disabled={ Boolean(task.done) }
                onChange={ changeNameHandler }
                placeholder='新規登録'
                className={ task.done ? "done" : "" }
            />
            <input
                type="checkbox"
                checked={ Boolean(task.done) }
                disabled={ task.id === "" }
                onChange={ changeDoneHandler }
            />
            <button
                type="button"
                onClick={ deleteHandler }
                disabled={ task.id === "" }
            >
                <span className={ "material-icons" }>delete</span>
            </button>
            <span className={ "info" }>(id: { task.id }, order: { task.order })</span>
        </li >
    )
}
