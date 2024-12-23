import { Input } from '@chakra-ui/react';
import { Button } from './ui/button.tsx';
import { List } from '../__generated__/graphql.ts';
import { ChangeEvent } from 'react';
import ListEditDialog from './ListEditDialog.tsx';
import ListEditPopover from './ListEditPopover.tsx';

export default function ListEdit ({
    name,
    changeNameHandler,
    deleteListHandler,
}: {
    name: List["name"],
    changeNameHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteListHandler: () => void,
}) {
    return (
        <ListEditPopover
            buttonText="edit"
            label="Edit Title"
        >
            <Input
                value={ name || "" }
                onChange={ changeNameHandler }
                size="2xl"
            />
            <ListEditDialog
                text={ `リストを削除しますか？: ${ name }` }
                colorPalette="red"
                label="削除"
                executeHandler={ deleteListHandler }
            >
                <Button
                    size="sm"
                    colorPalette="red"
                >
                    <span className={ "material-icons" }>delete</span>
                </Button>
            </ListEditDialog>
        </ListEditPopover>
    )
}
