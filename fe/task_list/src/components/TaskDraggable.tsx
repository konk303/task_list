import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';
import { Task } from '../__generated__/graphql';

export default function TaskDraggable ({ id, children }: { id: Task["id"], children: ReactNode }) {
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
        touchAction: "none",
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={ setNodeRef } style={ style }>
            <i
                ref={ setActivatorNodeRef }
                className="mdi mdi-drag"
                style={ {
                    cursor: isDragging ? "grabbing" : "grab"
                } }
                { ...attributes }
                { ...listeners }
            >
                <span className={ "material-icons" }>reorder</span>
            </i>
            { children }
        </div>
    );
}
