import { useMutation, gql } from '@apollo/client';
import { arrayMove } from '@dnd-kit/sortable';
import TaskSortable from './TaskSortable.tsx';
import Task from './Task.tsx';
import type { Task as TaskType } from './__generated__/graphql.ts';
import { useState } from 'react';

const REORDER_TASKS = gql`
   mutation ReorderTasks($listId: ID!, $taskIds: [ID!]!) { 
        reorderTasks(input: { listId: $listId, taskIds: $taskIds })
            { tasks { listId id } }
    }
`;

export default function Tasks({ listId, tasks, refetchTasks }: { listId: TaskType["listId"], tasks: TaskType[], refetchTasks: any }) {
    const [reorderTasks] = useMutation(REORDER_TASKS);
    const [taskIds, setTaskIds] = useState(tasks.map(task => task.id))
    const orderedTasks = taskIds.map(taskId => tasks.find(task => taskId === task.id)).filter(task => task !== undefined)
    const sortableTaskIds = orderedTasks.filter(task => (!Boolean(task.done) && task.id !== "newRecord")).map(task => task.id)

    const reorderTaskIds = (newTaskIds: TaskType["id"][]) => {
        setTaskIds(newTaskIds)
        reorderTasks({ variables: { listId, taskIds: newTaskIds.filter(task => task !== "newRecord") } })
    }
    const dragEndHandler = (event: any) => {
        const { active, over } = event
        if (active.id === over.id) return
        const newTaskIds = arrayMove(taskIds, taskIds.indexOf(active.id), taskIds.indexOf(over.id))
        reorderTaskIds(newTaskIds)
    }
    const addToTasks = (id: TaskType["id"]) => {
        const newTaskIds = taskIds.toSpliced(taskIds.findIndex(taskId => taskId === "newRecord"), 0, id)
        reorderTaskIds(newTaskIds)
        refetchTasks()
    }
    const deleteFromTasks = (id: TaskType["id"]) => {
        const newTaskIds = taskIds.toSpliced(taskIds.findIndex(taskId => taskId === id), 1)
        reorderTaskIds(newTaskIds)
    }
    const recalcOrders = (id: TaskType["id"], done: TaskType["done"]) => {
        const baseIds = taskIds.toSpliced(taskIds.findIndex(taskId => taskId === id), 1)
        const newRecordAt = taskIds.findIndex(taskId => taskId === "newRecord")
        const newTaskIds = baseIds.toSpliced(newRecordAt, 0, id)
        console.log(done, baseIds, newTaskIds)
        reorderTaskIds(newTaskIds)
    }

    return (
        <ul><TaskSortable items={sortableTaskIds} dragEndHandler={dragEndHandler}>
            {orderedTasks.map(
                task => (
                    <Task
                        key={task.id}
                        task={task}
                        addToTasks={addToTasks}
                        deleteFromTasks={deleteFromTasks}
                        recalcOrders={recalcOrders}
                    />
                ))}
        </TaskSortable></ul >
    )
}
