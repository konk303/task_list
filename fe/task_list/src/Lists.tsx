import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import List from './List.tsx'

const GET_LISTS = gql`
  { lists
    { id name }
  }
`;

export default function Lists() {
    const { loading, error, data } = useQuery(GET_LISTS);
    const [listIndex, setListIndex] = useState(0)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const options = data.lists.map(({ name }, i: number) => (<option key={i} value={i}>{name}</option>))
    return (
        <div>
            <select value={listIndex} onChange={e => setListIndex(+ e.target.value) }>{options}</select>
            <List list={data.lists[listIndex]}></List>
        </div>
    );
}
