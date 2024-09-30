import React, { useState } from "react";
import PropTypes from "prop-types";

export const TodoForm = ({ todos, setTodos, addTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input){
            addTodo(input);
            setInput('');
        }
    };
    
    const handleDeleteButton = (index) => {
        const updateTodos = todos.filter((_, i) => i !== index);
        setTodos(updateTodos);
    };

        
    return (
        <div className="container text-center">
            <h1>Todo List</h1>
            <ul className="list-group">
                <form onSubmit={handleSubmit}>
                    <li className="list-group-item"><input type="text" className="form-control" placeholder="Enter a new todo" value={input} onChange={(e) => setInput(e.target.value)}/></li>
                </form>
                {todos.map((item, index) =>(
                    <li className="list-group-item" key={index}>{item}
                    <button type="button" className="btn btn-outline-danger delete-button justify-content-end" onClick={() => handleDeleteButton(index)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    
    )
};

TodoForm.propTypes = {
    todos: PropTypes.array.isRequired,
    setTodos: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired
}

export default TodoForm;