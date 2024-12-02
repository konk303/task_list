import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';
import { Scalars } from './__generated__/graphql';

export default function TaskDraggable({ id, children }: { id: Scalars['ID']['output'], children: ReactNode }) {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <i
                ref={setActivatorNodeRef}
                className="mdi mdi-drag"
                style={{
                    cursor: isDragging ? "grabbing" : "grab"
                }}
                {...attributes}
                {...listeners}
            >drag</i>
            {children}
        </div>
    );
}
