import { ChangeEvent, useState } from 'react';
import { List } from '../__generated__/graphql.ts';
import ListEdit from './ListEdit.tsx';
import useUpsertList, { modifyCacheMutateUpsertList } from '../hooks/useUpsertList.ts';
import { useDebouncedCallback } from 'use-debounce';
import useDeleteList, { modifyCacheMutateDeleteList } from '../hooks/useDeleteList.ts';
import { SelectValueChangeDetails } from '@chakra-ui/react';

export default function ListEditContainer ({
    list,
    changeSelectedListHandler
}: {
    list: List,
    changeSelectedListHandler: (details: SelectValueChangeDetails) => void
}) {
    const [name, setName] = useState(list.name)
    const [newName, setNewName] = useState("")
    const [mutateUpsertList] = useUpsertList()
    const [mutateDeleteList] = useDeleteList()

    const upsertName = (name: List["name"]) => mutateUpsertList({ variables: { ...list, name } })
    const debouncedUpsertName = useDebouncedCallback(upsertName, 1000)
    const changeNameHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setName(value)
        debouncedUpsertName(value)
    }
    const deleteListHandler = () => {
        mutateDeleteList({
            variables: { id: list.id },
            update (cache, { data: { deleteList: { list: oldList } } }) {
                modifyCacheMutateDeleteList(cache, oldList)
            }
        })
        changeSelectedListHandler({ items: [], value: [""] })
    }
    const changeNewNameHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setNewName(value)
    const createListHandler = async () => {
        const result = await mutateUpsertList({
            variables: { id: "", name: newName },
            update (cache, { data: { upsertList: { list: newList } } }) {
                setNewName('')
                modifyCacheMutateUpsertList(cache, newList)
            }
        })
        changeSelectedListHandler({ items: [], value: [result.data.upsertList.list.id] })
    }

    return (
        <ListEdit name={ name }
            changeNameHandler={ changeNameHandler }
            deleteListHandler={ deleteListHandler }
            newName={ newName }
            changeNewNameHandler={ changeNewNameHandler }
            createListHandler={ createListHandler } />
    )
}
