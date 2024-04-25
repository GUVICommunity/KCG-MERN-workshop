import React from 'react';
import TodoItem from './TodoItem';

const headers = {
    'Content-Type': 'application/json',
};

function App() {
    const [todoText, setTodoText] = React.useState('');
    const [todos, setTodos] = React.useState([]);

    const fetchTodos = () => {
        fetch('http://localhost:3000/all-todos')
            .then((response) => response.json())
            .then((response) => {
                setTodos(response);
            });
    };

    const addTodos = () => {
        fetch('http://localhost:3000/add-todo', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                todo: todoText,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                fetchTodos();
                setTodoText('');
            });
    };

    const completeTodo = (id, completed) => {
        fetch('http://localhost:3000/update-todo', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                _id: id,
                completed: completed,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                fetchTodos();
            });
    };

    const deleteTodo = (id) => {
        fetch('http://localhost:3000/delete-todo/' + id, {
            method: 'DELETE',
            headers: headers,
        })
            .then((response) => response.json())
            .then(() => {
                fetchTodos();
            });
    };

    React.useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <input
                value={todoText}
                className='todo-input'
                type='text'
                placeholder='Enter your todo'
                onChange={(event) => {
                    setTodoText(event.target.value);
                }}
                name=''
                id=''
            />
            <button
                className='submit-btn'
                onClick={() => {
                    addTodos();
                }}>
                Add todo
            </button>
            <br />
            {todos?.length > 0 ? (
                <ul className='todo-list'>
                    {todos?.map((todo) => (
                        <TodoItem
                            todo={todo}
                            key={todo._id}
                            deleteTodo={deleteTodo}
                            completeTodo={completeTodo}
                        />
                    ))}
                </ul>
            ) : (
                <p className='info-text'>You have no todos</p>
            )}
        </>
    );
}

export default App;
