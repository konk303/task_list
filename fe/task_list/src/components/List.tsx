import type { List as ListType, Task } from '../__generated__/graphql.ts';

import TaskContainer from './TaskContainer.tsx';

export default function List ({
    list,
    tasks,
}: {
    list: ListType,
    tasks: Task[],
}) {
    return (
        <>
            { tasks.map(
                task => (
                    <TaskContainer
                        key={ task.id }
                        list={ list }
                        task={ task }
                    />
                )) }
        </>
    )
}
