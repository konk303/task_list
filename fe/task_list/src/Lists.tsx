import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import List from './List';
import { List as ListType } from './__generated__/graphql';

const GET_LISTS = gql`
  query { lists { id name } }
`;

export default function Lists() {
  const { loading, error, data } = useQuery(GET_LISTS);
  const [listIndex, setListIndex] = useState(0)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const lists: [ListType] = data.lists
  const options = lists.map(({ id, name }, i: number) => (<option key={i} value={i}>{name}({id})</option>))
  return (
    <div>
      <select value={listIndex} onChange={e => setListIndex(Number(e.target.value))}>{options}</select>
      <List list={data.lists[listIndex]}></List>
    </div>
  );
}
