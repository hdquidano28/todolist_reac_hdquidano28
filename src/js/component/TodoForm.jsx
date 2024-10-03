import React, { useState } from "react";
import PropTypes from "prop-types";

export const TodoForm = ({ todos, setTodos, addTodo, deleteTodo, createUser }) => {
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input) {
            addTodo(input);
            await createUser();
            setInput('');
        }
    };

    return (
        <div className="container text-center w-25">
            <h1>Todo List</h1>
            <ul className="list-group">
                <form onSubmit={handleSubmit}>
                    <li className="list-group-item">
                        <input type="text" className="form-control" placeholder="Enter a new todo" value={input} onChange={(e) => setInput(e.target.value)} />
                    </li>
                </form>
                {todos.map((item, index) => (
                        <li className="list-group-item" key={index}>
                            {item}
                            <button type="button" className="btn btn-outline-danger delete-button justify-content-end" onClick={() => deleteTodo(index)}>X</button>
                        </li>
                ))};
            </ul>
            <div className="background-box">back1</div>
			<div className="background-box2">back2</div>
        </div>
    );
};

TodoForm.propTypes = {
    todos: PropTypes.array.isRequired,
    setTodos: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired, // Add this prop
};

export default TodoForm;