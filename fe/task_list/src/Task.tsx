import { useMutation, gql } from '@apollo/client';

const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $name: String!, $order: Int!, $done: Boolean!) { 
        updateTask(input: { id: $id, name: $name, order: $order, done: $done })
            { task { id listId name order done } }
    }
`;

export default function Task({ task }) {
    const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK);

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! {error.message}</p>;

   return (
    <div>
        (id: { task.id })
        <input value={ task.name } onChange={ e => updateTask({ variables: { ...task, name: e.target.value } })  } />
        <input type="checkbox" checked={ task.done } onChange={ e=> updateTask({ variables: { ...task, done: e.target.checked } }) } />
        (order: { task.order })
    </div>
    )
}
