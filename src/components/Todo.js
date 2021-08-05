import { useState, useEffect } from 'react';
// import './todo.css';

function Todo() {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [editTodo, setEditTodo] = useState(null);
    const [editTodoText, setEditTodoText] = useState("");

    useEffect(() => {
        const temp = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(temp);

        if(loadedTodos) {
        setTodos(loadedTodos);
        }
    }, [])

    useEffect(() => {
        const temp = JSON.stringify(todos);
        localStorage.setItem("todos", temp);
    }, [todos])


    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
        }
        setTodos([...todos].concat(newTodo));
        setTodo('');
    }

    function deleteTodo(id) {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
    }

    function editingTodo(id) {
        const updatedTodos = [...todos].map((todo) => {
        if(todo.id === id) {
            todo.text = editTodoText
        }
        return todo;
        })
        setTodos(updatedTodos);
        setEditTodo(null);
        setEditTodoText("");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" className="task-input" placeholder="Add New Todo..." onChange={(e) => setTodo(e.target.value)} value={todo} />
                <button type="submit" className="button-add">Add Todo</button>
            </form>
            
            <div className="todo_list">
                {
                    todos.map((todo) => 
                    <div className="list-item" key={todo.id}>
                        {editTodo === todo.id ? 
                        ( <>
                            <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                className="task-input"
                                onChange={(e) => setEditTodoText(e.target.value)} 
                                value={editTodoText} 
                            />
                            <button  className="button-add" onClick={() => editingTodo(todo.id)}>Update</button>
                            </form>
                        </>
                        ) : (
                        <>
                            <div className="list">{todo.text}</div>
                            <button className="button-edit" onClick={() => setEditTodo(todo.id)}>Edit</button>
                            <button className="button-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </>
                        )}
                    </div>
                    )
                }
            </div>

        </>
    );
}

export default Todo;
