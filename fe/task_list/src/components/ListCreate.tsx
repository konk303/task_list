import { Input } from '@chakra-ui/react';
import { Button } from './ui/button.tsx';
import { List } from '../__generated__/graphql.ts';
import { ChangeEvent } from 'react';
import ListEditDialog from './ListEditDialog.tsx';
import ListEditPopover from './ListEditPopover.tsx';

export default function ListCreate ({
    newName,
    changeNewNameHandler,
    createListHandler
}: {
    newName: List["name"],
    changeNewNameHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    createListHandler: () => void
}) {
    return (
        <ListEditPopover
            buttonText="add"
            label="New List"
        >
            <Input
                value={ newName || "" }
                onChange={ changeNewNameHandler }
                placeholder="新規登録" size="2xl" />
            <ListEditDialog
                text={ `リストを追加しますか？: ${ newName }` }
                colorPalette="blue"
                label="追加"
                executeHandler={ createListHandler }
            >
                <Button
                    size="sm"
                    colorPalette="blue"
                >
                    <span className={ "material-icons" }>add</span>
                </Button>
            </ListEditDialog>
        </ListEditPopover>
    )
}
