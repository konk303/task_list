import { useMutation, gql } from '@apollo/client';

const UPDATE_TASK_NAME = gql`
    mutation UpdateTask($id: ID!, $name: String!) { 
        updateTask(input: { id: $id, name: $name })
            { task { id listId name order done } }
    }
`;
const UPDATE_TASK_DONE = gql`
    mutation UpdateTask($id: ID!, $done: Boolean!) { 
        updateTask(input: { id: $id, done: $done })
            { task { id listId name order done } }
    }
`;

const nameArea = (id, name) => {
    const [updateTaskName, { _, loading, error }] = useMutation(UPDATE_TASK_NAME);

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! {error.message}</p>;
    return (<input value={ name } onChange={ e => updateTaskName({ variables: { id: id, name: e.target.value } })  } />)
}
const doneArea = (id, done) => {
    const [updateTaskDone, { _, loading, error }] = useMutation(UPDATE_TASK_DONE);

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission error! {error.message}</p>;
    return (
        <input type="checkbox" checked={ done } onChange={ e=> updateTaskDone({ variables: { id: id, done: e.target.checked } }) } />
    )
}

export default function Task({ task }) {
   return (
    <div>
        (id: { task.id })
        { nameArea(task.id, task.name) }
        { doneArea(task.id, task.done) }
        (order: { task.order })
    </div>
    )
}
