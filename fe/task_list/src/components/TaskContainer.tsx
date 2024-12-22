import { ChangeEvent, useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { List, Task as TaskType } from '../__generated__/graphql';
import useUpsertTask from '../hooks/useUpsertTask';
import useDeleteTask from '../hooks/useDeleteTask';
import Task from './Task';
import TaskDraggable from './TaskDraggable';
import { SetNeedsReorderTasksContext } from './ListContainer';

export default function TaskContainer ({
    list,
    task
}: {
    list: List,
    task: TaskType,
}) {
    const [mutateUpsertTask] = useUpsertTask({
        update (cache, { data: { upsertTask } }) {
            if (task.id !== "") return
            setName('')
            cache.modify({
                id: cache.identify(list),
                fields: {
                    tasks (existingTasks = []) {
                        return [...existingTasks, { __ref: cache.identify(upsertTask.task) }]
                    }
                }
            })
            SetNeedsReorderTasks()
        }
    })
    const [mutateDeleteTask] = useDeleteTask({
        update (cache) {
            cache.modify({
                id: cache.identify(list),
                fields: {
                    tasks (existingTasks = [], { readField }) {
                        return existingTasks.filter((taskRef: any) => readField("id", taskRef) !== task.id)
                    }
                }
            })
        }
    })
    const [name, setName] = useState(task.name || "")
    const SetNeedsReorderTasks = useContext(SetNeedsReorderTasksContext)

    const deleteHandler = () => {
        mutateDeleteTask({ variables: { id: task.id, listId: list.id } })
        SetNeedsReorderTasks()
    }
    const upsertName = (name: TaskType["name"]) => {
        mutateUpsertTask({ variables: { ...task, name } })
    }
    const debouncedUpsertName = useDebouncedCallback(upsertName, 1000)
    const changeNameHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setName(value)
        debouncedUpsertName(value)
    }
    const changeDoneHandler = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
        mutateUpsertTask({ variables: { ...task, done: checked } })
        SetNeedsReorderTasks()
    }

    return (
        <TaskDraggable id={ task.id }>
            <Task
                task={ task }
                name={ name }
                changeNameHandler={ changeNameHandler }
                changeDoneHandler={ changeDoneHandler }
                deleteHandler={ deleteHandler }
            />
        </TaskDraggable>
    )
}
