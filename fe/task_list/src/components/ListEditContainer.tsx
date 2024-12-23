import { ChangeEvent, useState } from 'react';
import { List } from '../__generated__/graphql.ts';
import ListEdit from './ListEdit.tsx';
import useUpsertList from '../hooks/useUpsertList.ts';
import { useDebouncedCallback } from 'use-debounce';
import useDeleteList, { modifyCacheMutateDeleteList } from '../hooks/useDeleteList.ts';
import { useNavigate } from 'react-router';

export default function ListEditContainer ({
    list,
}: {
    list: List,
}) {
    const navigate = useNavigate()
    const [name, setName] = useState(list?.name || "")
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
        navigate(`/lists`)
    }

    return (
        <ListEdit
            name={ name }
            changeNameHandler={ changeNameHandler }
            deleteListHandler={ deleteListHandler }
        />
    )
}
