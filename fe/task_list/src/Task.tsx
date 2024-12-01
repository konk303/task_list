export default function Task({ task }) {
    return (
    <div>
        { task.id }
        <input value={task.name} onChange={ e=> (console.log(e.target.value))}/>
        <input type="checkbox" checked={task.done} onChange = { e=> (console.log(e.target.checked))} />
        { task.order }
    </div>
    )
}
