import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import type { Task } from '../__generated__/graphql.ts';

export default function TaskSortable ({ children, items, dragEndHandler }:
    { children: ReactNode, items: Task["id"][], dragEndHandler: (event: DragEndEvent) => void }) {
    return (
        <DndContext onDragEnd={ dragEndHandler }>
            <SortableContext items={ items }>
                { children }
            </SortableContext>
        </DndContext>
    );
}
