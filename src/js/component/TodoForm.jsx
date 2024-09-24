import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input){
            const newTodos = [...todos, input];
            setTodos(newTodos);
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
