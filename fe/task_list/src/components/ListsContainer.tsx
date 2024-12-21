import { ChangeEvent, useState } from 'react';
import Lists from './Lists';
import useLists from '../hooks/useLists';
import { List } from '../__generated__/graphql';

export default function ListsContainer () {
    const { loading, error, data } = useLists()
    const [listId, setListId] = useState("")

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : { error.message }</p>;

    const lists: List[] = data.lists
    const list = lists.find(({ id }) => id === listId) || lists[0]
    const changeHandler = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setListId(value)

    return (
        <Lists lists={ lists } list={ list } changeHandler={ changeHandler }></Lists>
    );
}
