import List from './List.tsx'
import type { List as ListType, Task } from '../__generated__/graphql.ts';
import { createContext, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import useList from '../hooks/useList.ts';
import useReorderTasks from '../hooks/useReorderTasks.ts';
import TaskSortable from './TaskSortable.tsx';

export const SetNeedsReorderTasksContext = createContext(() => { })

export default function ListContainer ({ list }: { list: ListType }) {
    const [needsReorderTasks, setNeedsReorderTasks] = useState(false)
    const { loading, error, data } = useList(list.id)
    const [mutateReorderTasks] = useReorderTasks()
    const tasks: Task[] = data?.list?.tasks || []
    const sortedTasks: Task[] = tasks
        .toSorted((a: Task, b: Task) => (a.order ?? 0) - (b.order ?? 0))
        .toSorted((a: Task, b: Task) => Number(a.done) - Number(b.done))
    const sortedTasksWithNew = sortedTasks.toSpliced(sortedTasks.findIndex(({ done }) => Boolean(done)), 0, {
        id: "",
        listId: Number(list.id),
        name: "",
        done: false,
        createdAt: null,
        updatedAt: null
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : { error.message }</p>;

    if (needsReorderTasks) {
        const taskIds = sortedTasks.map(({ id }) => id)
        mutateReorderTasks({ variables: { listId: list.id, taskIds } })
        setNeedsReorderTasks(() => false)
    }
    const dragEndHandler = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return
        const taskIds = sortedTasks.map(({ id }) => id)
        const newTaskIds = arrayMove(taskIds, taskIds.indexOf(String(active.id)), taskIds.indexOf(String(over.id)))
        mutateReorderTasks({ variables: { listId: list.id, taskIds: newTaskIds } })
    }
    const sortableTaskIds = tasks.filter(({ done }) => !Boolean(done)).map(({ id }) => id)
    const setNeedsReorderTasksHOF = () => setNeedsReorderTasks(true)
    return (
        <SetNeedsReorderTasksContext.Provider value={ setNeedsReorderTasksHOF }>
            <TaskSortable items={ sortableTaskIds } dragEndHandler={ dragEndHandler }>
                <List
                    list={ list }
                    tasks={ sortedTasksWithNew }
                />
            </TaskSortable>
        </SetNeedsReorderTasksContext.Provider>
    )
}

