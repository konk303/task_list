import { Flex, Input, PopoverTrigger, Tabs } from '@chakra-ui/react';
import { Button } from './ui/button.tsx';
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTitle } from './ui/popover.tsx';
import { List } from '../__generated__/graphql.ts';
import { ChangeEvent } from 'react';
import ListEditDialog from './ListEditDialog.tsx';

export default function ListEdit ({
    name,
    changeNameHandler,
    deleteListHandler,
    newName,
    changeNewNameHandler,
    createListHandler
}: {
    name: List["name"],
    changeNameHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteListHandler: () => void,
    newName: List["name"],
    changeNewNameHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    createListHandler: () => void
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
                    <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
                        <Tabs.List>
                            <Tabs.Trigger value="tab-1">Edit</Tabs.Trigger>
                            <Tabs.Trigger value="tab-2">Create New List</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="tab-1">
                            <PopoverTitle fontWeight="medium">Title</PopoverTitle>
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
                        </Tabs.Content>
                        <Tabs.Content value="tab-2">
                            <PopoverTitle fontWeight="medium">Title</PopoverTitle>
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
                        </Tabs.Content>
                    </Tabs.Root>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    )
}
