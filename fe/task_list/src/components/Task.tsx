import type { Task as TaskType } from '../__generated__/graphql';
import { ChangeEvent } from 'react';
import TaskDraggable from './TaskDraggable';
import { Float, Input, SwitchCheckedChangeDetails, Text } from '@chakra-ui/react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

export default function Task ({
    task,
    name,
    changeNameHandler,
    changeDoneHandler,
    deleteHandler
}: {
    task: TaskType,
    name: string,
    changeNameHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    changeDoneHandler: (event: SwitchCheckedChangeDetails) => void,
    deleteHandler: () => void
}) {

    return (
        <TaskDraggable id={ task.id }>
            <Input
                size="2xl"
                fontWeight="bold"
                value={ name }
                disabled={ Boolean(task.done) }
                onChange={ changeNameHandler }
                placeholder='新規登録'
                className={ task.done ? "done" : "" }
            >
            </Input>
            <Switch
                label="Done"
                colorPalette="blue"
                checked={ Boolean(task.done) }
                disabled={ task.id === "" }
                onCheckedChange={ changeDoneHandler }
            >
                Done
            </Switch>
            <Button
                colorPalette="red"
                variant="surface"
                onClick={ deleteHandler }
                disabled={ task.id === "" }
            >
                <span className={ "material-icons" }>delete</span>
            </Button>
            <Float placement="top-start">
                <Text textStyle="xs" color="fg.subtle">(id: { task.id }, order: { task.order })</Text>
            </Float>
        </TaskDraggable>
    )
}
