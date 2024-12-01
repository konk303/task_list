import { useQuery, gql } from '@apollo/client';
import Task from './Task.tsx'


const GET_LIST = (listId: number) => gql`
  { list(id: ${listId})
    { id name tasks { id name order done } }
  }
`;

export default function List({ list }) {
    const { loading, error, data } = useQuery(GET_LIST(list.id));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tasks = data.list.tasks.toSorted((a, b) => a.order - b.order).toSorted((a, b) => b.done - a.done)
    return (<div>{tasks.map(task => <Task key={task.id} task = {task} />)}</div>)
}
