import Lists from './Lists';
import useLists from '../hooks/useLists';
import { List } from '../__generated__/graphql';
import { Outlet, useNavigate, useParams } from 'react-router';
import { SelectValueChangeDetails } from '@chakra-ui/react';

export default function ListsContainer () {
    const { listId } = useParams()
    const navigate = useNavigate()
    const { loading, error, data } = useLists()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : { error.message }</p>;

    const lists: List[] = data.lists
    const list = lists.find(({ id }) => id === listId) || null
    const changeSelectedListHandler = ({ value }: SelectValueChangeDetails) => navigate(`/lists/${ value }`)
    return (
        <>
            <Lists lists={ lists } list={ list } changeSelectedListHandler={ changeSelectedListHandler } />
            <Outlet />
        </>
    );
}
