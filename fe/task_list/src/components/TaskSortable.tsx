import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import type { Scalars } from '../__generated__/graphql.ts';

export default function TaskSortable ({ children, items, dragEndHandler }:
    { children: ReactNode, items: Scalars['ID']['output'][], dragEndHandler: (event: any) => void }) {
    return (
        <DndContext onDragEnd={ dragEndHandler }>
            <SortableContext items={ items }>
                { children }
            </SortableContext>
        </DndContext>
    );
}
