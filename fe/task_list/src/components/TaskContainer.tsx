import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { List, Task as TaskType } from '../__generated__/graphql';
import useUpsertTask from '../hooks/useUpsertTask';
import useDeleteTask from '../hooks/useDeleteTask';
import Task from './Task';
import { Reference } from '@apollo/client';
import { SwitchCheckedChangeDetails } from '@chakra-ui/react';

export default function TaskContainer ({
    list,
    task
}: {
    list: List,
    task: TaskType,
}) {
    const [mutateUpsertTask] = useUpsertTask()
    const [mutateDeleteTask] = useDeleteTask()
    const [name, setName] = useState(task.name || "")
    const deleteHandler = () => mutateDeleteTask({
        variables: { id: task.id, listId: list.id },
        update (cache) {
            cache.modify({
                id: cache.identify(list),
                fields: {
                    tasks (existingTasks = [], { readField }) {
                        return existingTasks.filter((taskRef: Reference) => readField("id", taskRef) !== task.id)
                    }
                }
            })
        }
    })
    const upsertName = (name: TaskType["name"]) => mutateUpsertTask({
        variables: { ...task, name },
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
        }
    })
    const debouncedUpsertName = useDebouncedCallback(upsertName, 1000)
    const changeNameHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setName(value)
        debouncedUpsertName(value)
    }
    const changeDoneHandler = ({ checked }: SwitchCheckedChangeDetails) => {
        mutateUpsertTask({ variables: { ...task, done: checked } })
    }

    return (
        <Task
            task={ task }
            name={ name }
            changeNameHandler={ changeNameHandler }
            changeDoneHandler={ changeDoneHandler }
            deleteHandler={ deleteHandler }
        />
    )
}
