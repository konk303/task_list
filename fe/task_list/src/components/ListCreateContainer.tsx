
import { ChangeEvent, useState } from 'react';
import useUpsertList, { modifyCacheMutateUpsertList } from '../hooks/useUpsertList.ts';
import { useNavigate } from 'react-router';
import ListCreate from './ListCreate.tsx';

export default function ListCreateContainer () {
    const navigate = useNavigate()
    const [newName, setNewName] = useState("")
    const [mutateUpsertList] = useUpsertList()

    const changeNewNameHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setNewName(value)
    const createListHandler = async () => {
        const { data: { upsertList: { list } } } = await mutateUpsertList({
            variables: { id: "", name: newName },
            update (cache, { data: { upsertList: { list: newList } } }) {
                modifyCacheMutateUpsertList(cache, newList)
            }
        })
        setNewName("")
        navigate(`/lists/${ list.id }`)
    }

    return (
        <ListCreate
            newName={ newName }
            changeNewNameHandler={ changeNewNameHandler }
            createListHandler={ createListHandler } />
    )
}
