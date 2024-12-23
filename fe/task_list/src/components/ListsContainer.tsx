import { useState } from 'react';
import Lists from './Lists';
import useLists from '../hooks/useLists';
import { List } from '../__generated__/graphql';
import { SelectValueChangeDetails } from '@chakra-ui/react';

export default function ListsContainer () {
    const { loading, error, data } = useLists()
    const [listId, setListId] = useState("")

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : { error.message }</p>;

    const lists: List[] = data.lists
    const list = lists.find(({ id }) => id === listId) || lists[0]
    const changeSelectedListHandler = ({ value }: SelectValueChangeDetails) => setListId(value[0])

    return (
        <Lists lists={ lists } list={ list } changeSelectedListHandler={ changeSelectedListHandler }></Lists>
    );
}
