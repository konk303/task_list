import { createListCollection, Flex, SelectValueChangeDetails } from '@chakra-ui/react';
import { List } from '../__generated__/graphql';
import ListContainer from './ListContainer';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from './ui/select';
import ListEditContainer from './ListEditContainer';

export default function Lists ({
  lists,
  list,
  changeHandler
}: {
  lists: List[],
  list: List,
  changeHandler: (details: SelectValueChangeDetails) => void
}) {
  const options = createListCollection({ items: lists.map(({ id, name }) => ({ label: name, value: id })) })
  return (
    <>
      <Flex gap="4" align="center" p="4">
        <SelectRoot
          size="lg"
          collection={ options }
          value={ [list.id] }
          onValueChange={ changeHandler }
        >
          <SelectTrigger>
            <SelectValueText color="red.500" fontWeight="bold" fontSize="2xl" />
          </SelectTrigger>
          <SelectContent>
            { options.items.map(list => (
              <SelectItem item={ list } key={ list.value }>{ list.label }</SelectItem>
            )) }
          </SelectContent>
        </SelectRoot>
        <ListEditContainer list={ list } key={ list.id } changeHandler={ changeHandler } />
      </Flex>
      <ListContainer list={ list } key={ list.id } />
    </>
  );
}
