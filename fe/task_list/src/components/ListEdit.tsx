import { Flex, Input, PopoverTrigger, Tabs } from '@chakra-ui/react';
import { Button } from './ui/button.tsx';
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTitle } from './ui/popover.tsx';
import { List } from '../__generated__/graphql.ts';
import { ChangeEvent } from 'react';

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
        <PopoverRoot lazyMount unmountOnExit positioning={ { placement: "left-end" } } >
            <PopoverTrigger asChild>
                <Button colorPalette="blue">
                    <span className={ "material-icons" }>edit</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
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
                                <Button
                                    size="sm"
                                    colorPalette="red"
                                    onClick={ deleteListHandler }
                                >
                                    <span className={ "material-icons" }>delete</span>
                                </Button>
                            </Flex>
                        </Tabs.Content>
                        <Tabs.Content value="tab-2">
                            <PopoverTitle fontWeight="medium">Title</PopoverTitle>
                            <Flex gap="1" align="baseline">
                                <Input
                                    value={ newName || "" }
                                    onChange={ changeNewNameHandler }
                                    placeholder="新規登録" size="2xl" />
                                <Button
                                    size="sm"
                                    colorPalette="blue"
                                    onClick={ createListHandler }
                                >
                                    <span className={ "material-icons" }>add</span>
                                </Button>
                            </Flex>
                        </Tabs.Content>
                    </Tabs.Root>
                </PopoverBody>
            </PopoverContent>
        </PopoverRoot>
    )
}
