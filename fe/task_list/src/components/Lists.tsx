import { createListCollection, Flex, SelectValueChangeDetails } from '@chakra-ui/react';
import { List } from '../__generated__/graphql';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from './ui/select';
import ListEditContainer from './ListEditContainer';
import ListCreateContainer from './ListCreateContainer';
import { Button } from './ui/button';

export default function Lists ({
  lists,
  list,
  changeSelectedListHandler
}: {
  lists: List[],
  list: List | null,
  changeSelectedListHandler: (details: SelectValueChangeDetails) => void
}) {
  const options = createListCollection({ items: lists.map(({ id, name }) => ({ label: name, value: id })) })
  return (
    <Flex gap="4" align="center" p="4">
      <SelectRoot
        size="lg"
        collection={ options }
        value={ [String(list?.id)] }
        onValueChange={ changeSelectedListHandler }
      >
        <SelectTrigger>
          <SelectValueText color="red.500" fontWeight="bold" fontSize="2xl" placeholder="--" />
        </SelectTrigger>
        <SelectContent>
          { options.items.map(list => (
            <SelectItem item={ list } key={ list.value }>{ list.label }</SelectItem>
          )) }
        </SelectContent>
      </SelectRoot>
      { list === null ? (
        <Button colorPalette="blue" disabled={ true }>
          <span className={ "material-icons" }>edit</span>
        </Button>
      ) : (
        <ListEditContainer list={ list } key={ `Edit${ list.id }` } />
      ) }
      <ListCreateContainer key={ `Create${ list?.id }` } />
    </Flex>
  );
}
