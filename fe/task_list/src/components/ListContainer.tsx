import type { List, Task } from '../__generated__/graphql.ts';
import { useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import useList from '../hooks/useList.ts';
import useReorderTasks from '../hooks/useReorderTasks.ts';
import TaskSortable from './TaskSortable.tsx';
import { Reference, useApolloClient } from '@apollo/client';
import TaskContainer from './TaskContainer.tsx';

export default function ListContainer ({ list }: { list: List }) {
    const [prevTaskIds, setPrevTaskIds] = useState("")
    const [mutateReorderTasks] = useReorderTasks()
    const client = useApolloClient()

    const { loading, error, data } = useList(list.id)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : { error.message }</p>;

    const tasks: Task[] = data?.list?.tasks || []
    const sortedTasks: Task[] = tasks.toSorted((a: Task, b: Task) => Number(a.done) - Number(b.done))
    const sortedTasksWithNew = sortedTasks.toSpliced(
        sortedTasks.findLastIndex(({ done }) => !Boolean(done)) + 1,
        0,
        {
            id: "",
            listId: Number(list.id),
            name: "",
            done: false,
            createdAt: null,
            updatedAt: null
        }
    )

    const taskIds = sortedTasks.map(({ id }) => id)
    if (prevTaskIds !== taskIds.join(",")) {
        mutateReorderTasks({ variables: { listId: list.id, taskIds } })
        setPrevTaskIds(() => taskIds.join(","))
    }

    const dragEndHandler = (event: DragEndEvent) => {
        const { active, over } = event
        if (over === null) return
        if (active.id === over.id) return
        const cache = client.cache
        cache.modify({
            id: cache.identify(list),
            fields: {
                tasks (existingTasks = [], { readField }) {
                    const newTasks = arrayMove(
                        existingTasks,
                        existingTasks.findIndex((taskRef: Reference) => readField("id", taskRef) === active.id),
                        existingTasks.findIndex((taskRef: Reference) => readField("id", taskRef) === over.id))
                    return newTasks
                }
            }
        })
    }

    const sortableTaskIds = tasks.filter(({ done }) => !Boolean(done)).map(({ id }) => id)
    return (
        <TaskSortable items={ sortableTaskIds } dragEndHandler={ dragEndHandler }>
            { sortedTasksWithNew.map(
                task => (
                    <TaskContainer
                        key={ task.id }
                        list={ list }
                        task={ task }
                    />
                )) }
        </TaskSortable>
    )
}

