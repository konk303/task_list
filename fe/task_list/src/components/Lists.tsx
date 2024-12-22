import { Center, createListCollection, SelectValueChangeDetails } from '@chakra-ui/react';
import { List } from '../__generated__/graphql';
import ListContainer from './ListContainer';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from './ui/select';

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
      <Center p="4">
        <SelectRoot
          size="lg"
          collection={ options }
          value={ [list.id] }
          onValueChange={ changeHandler }
        >
          <SelectLabel>List</SelectLabel>
          <SelectTrigger>
            <SelectValueText color="red.500" fontWeight="bold" fontSize="2xl" />
          </SelectTrigger>
          <SelectContent>
            { options.items.map(list => (
              <SelectItem item={ list } key={ list.value }>{ list.label }</SelectItem>
            )) }
          </SelectContent>
        </SelectRoot>
      </Center>
      <ListContainer list={ list } key={ list.id } />
    </>
  );
}
