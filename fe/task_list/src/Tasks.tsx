import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { arrayMove } from '@dnd-kit/sortable';
import TaskSortable from './TaskSortable.tsx';
import Task from './Task.tsx';
import type { Scalars } from './__generated__/graphql.ts';
import type { Task as TaskType } from './__generated__/graphql.ts';

const REORDER_TASKS = gql`
   mutation ReorderTasks($listId: ID!, $taskIds: [ID!]!) { 
        reorderTasks(input: { listId: $listId, taskIds: $taskIds })
            { tasks { id listId name order done } }
    }
`;

export default function Tasks({ listId, tasks }: { listId: Scalars['ID']['output'], tasks: TaskType[] }) {
    const [reorderTasks] = useMutation(REORDER_TASKS);
    const [taskIds, setTaskIds] = useState(tasks.map(task => task.id))
    const setTaskIdsAndReorderTasks = (newTaskIds: Scalars['ID']['output'][]) => {
        setTaskIds(newTaskIds)
        reorderTasks({ variables: { listId, taskIds: newTaskIds } })
    }
    useEffect(() => {
        const newTaskIds = taskIds
            .toSorted((a, b) => Number(tasks.find(task => task.id === a)?.done) - Number(tasks.find(task => task.id === b)?.done))
        console.log('effect', taskIds, newTaskIds)
        setTaskIdsAndReorderTasks(newTaskIds)
    }, [tasks])
    const dragEndHandler = (event) => {
        const { active, over } = event

        if (active.id === over.id) return
        const oldIndex = taskIds.indexOf(active.id)
        const newIndex = taskIds.indexOf(over.id)
        const newTaskIds = arrayMove(taskIds, oldIndex, newIndex)
        console.log('drag', taskIds, newTaskIds)
        setTaskIdsAndReorderTasks(newTaskIds)
    }

    const sortedTasks = tasks.toSorted((a, b) => taskIds.indexOf(a.id) - taskIds.indexOf(b.id))
    const sortableTaskIds = sortedTasks.filter(task => !Boolean(task.done)).map(task => task.id)
    const newTask: TaskType = { listId: Number(listId), id: "newRecord", name: '', done: false }
    const sortedTaskswithNewTask = sortedTasks.toSpliced(sortedTasks.findIndex(task => Boolean(task.done)), 0, newTask)
    return (
        <ul><TaskSortable items={sortableTaskIds} handleDragEnd={dragEndHandler}>
            {sortedTaskswithNewTask.map(task => <Task key={task.id} task={task} />)}
        </TaskSortable></ul>
    )
}
