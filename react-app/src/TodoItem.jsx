/* eslint-disable react/prop-types */

const TodoItem = (props) => {
    const { todo, completeTodo, deleteTodo } = props;

    return (
        <li
            style={{
                textDecoration: todo?.completed ? 'line-through' : '',
            }}
            className='todo-item'>
            {todo?.todo}
            <button
                className='action-btn'
                onClick={() => {
                    completeTodo(todo?._id, !todo?.completed);
                }}>
                complete
            </button>
            <button
                className='action-btn'
                onClick={() => {
                    deleteTodo(todo?._id);
                }}>
                delete
            </button>
        </li>
    );
};

export default TodoItem;
