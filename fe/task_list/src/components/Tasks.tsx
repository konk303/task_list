import type { List, Task } from '../__generated__/graphql.ts';
import TaskContainer from './TaskContainer.tsx';

export default function Tasks ({
    list,
    tasks,
}: {
    list: List,
    tasks: Task[],
}) {
    return (
        <ul>
            { tasks.map(
                task => (
                    <TaskContainer
                        key={ task.id }
                        list={ list }
                        task={ task }
                    />
                )) }
        </ul >
    )
}
