import List from './List.tsx'
import type { List as ListType, Task } from '../__generated__/graphql.ts';
import { useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import useList from '../hooks/useList.ts';
import useReorderTasks from '../hooks/useReorderTasks.ts';
import TaskSortable from './TaskSortable.tsx';

export default function ListContainer ({ list }: { list: ListType }) {
    const [prevTaskIds, setPrevTaskIds] = useState("")
    const [mutateReorderTasks] = useReorderTasks()

    const { loading, error, data } = useList(list.id)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : { error.message }</p>;

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

    const taskIds = sortedTasks.map(({ id }) => id)
    if (prevTaskIds !== taskIds.join(",")) {
        mutateReorderTasks({ variables: { listId: list.id, taskIds } })
        setPrevTaskIds(() => taskIds.join(","))
    }

    const dragEndHandler = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return
        const newTaskIds = arrayMove(taskIds, taskIds.indexOf(String(active.id)), taskIds.indexOf(String(over.id)))
        mutateReorderTasks({ variables: { listId: list.id, taskIds: newTaskIds } })
    }
    const sortableTaskIds = tasks.filter(({ done }) => !Boolean(done)).map(({ id }) => id)
    return (
        <TaskSortable items={ sortableTaskIds } dragEndHandler={ dragEndHandler }>
            <List
                list={ list }
                tasks={ sortedTasksWithNew }
            />
        </TaskSortable>
    )
}

