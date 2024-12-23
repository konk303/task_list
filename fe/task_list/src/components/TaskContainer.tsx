import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { List, Task as TaskType } from '../__generated__/graphql';
import useUpsertTask, { modifyCacheMutateUpsertTask } from '../hooks/useUpsertTask';
import useDeleteTask, { modifyCacheMutateDeleteTask } from '../hooks/useDeleteTask';
import Task from './Task';
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
        update (cache, { data: { deleteTask: { task: oldTask } } }) {
            modifyCacheMutateDeleteTask(cache, list, oldTask)
        }
    })
    const upsertName = (name: TaskType["name"]) => mutateUpsertTask({
        variables: { ...task, name },
        update (cache, { data: { upsertTask: { task: newTask } } }) {
            if (task.id !== "") return
            setName('')
            modifyCacheMutateUpsertTask(cache, list, newTask)
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
