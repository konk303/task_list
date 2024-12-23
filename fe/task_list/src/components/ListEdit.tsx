import { Flex, Input, PopoverTrigger } from '@chakra-ui/react';
import { Button } from './ui/button.tsx';
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTitle } from './ui/popover.tsx';
import { List } from '../__generated__/graphql.ts';
import { ChangeEvent } from 'react';
import ListEditDialog from './ListEditDialog.tsx';

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
        <PopoverRoot lazyMount unmountOnExit positioning={ { placement: "left-end" } }>
            <PopoverTrigger asChild>
                <Button colorPalette="blue">
                    <span className={ "material-icons" }>edit</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent zIndex="banner">
                <PopoverArrow />
                <PopoverBody>
                    <PopoverTitle fontWeight="medium">Edit Title</PopoverTitle>
                    <Flex gap="5" align="baseline">
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
                    </Flex>
                </PopoverBody>
            </PopoverContent >
        </PopoverRoot >
    )
}
