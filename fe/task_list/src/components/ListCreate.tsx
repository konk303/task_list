import { Flex, Input, PopoverTrigger } from '@chakra-ui/react';
import { Button } from './ui/button.tsx';
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTitle } from './ui/popover.tsx';
import { List } from '../__generated__/graphql.ts';
import { ChangeEvent } from 'react';
import ListEditDialog from './ListEditDialog.tsx';

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
        <PopoverRoot lazyMount unmountOnExit positioning={ { placement: "left-end" } }>
            <PopoverTrigger asChild>
                <Button colorPalette="blue" >
                    <span className={ "material-icons" }>add</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent zIndex="banner">
                <PopoverArrow />
                <PopoverBody>
                    <PopoverTitle fontWeight="medium">New List</PopoverTitle>
                    <Flex gap="1" align="baseline">
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
                    </Flex>
                </PopoverBody>
            </PopoverContent >
        </PopoverRoot >
    )
}
