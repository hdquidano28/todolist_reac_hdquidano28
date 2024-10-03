import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";

const Home = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
        setTodos((oldValue) => [...oldValue, newTodo]);
    };

    useEffect(() => {
        getData();
    }, []);

    async function createUser() {
        const responseCreate = await fetch("https://playground.4geeks.com/todo/users/helen", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todos: [] }),
        });
        
        if (responseCreate.ok) {
            console.log("User created");
        } else {
            console.log("User not created");
        }
    }

    async function getData() {
        const response = await fetch("https://playground.4geeks.com/todo/users/helen", {
            method: "GET"
        });

        if (response.status === 200) {
            const data = await response.json();
            if (data && data.todos) {
                setTodos(data.todos);
            }
        } else if (response.status === 404) {
            console.log("User not found, you can create it while adding a todo.");
        }
    }

    const deleteTodo = async (index) => {
        const updateTodos = todos.filter((_, i) => i !== index);

        const response = await fetch("https://playground.4geeks.com/todo/users/helen", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todos: todos.filter((_, i) => i !== index) }),
        });
        
        if (response.ok) {
            setTodos(updateTodos);
        } else {
            console.log("Todo not deleted");
        }
    };

    return (
        <>
            <TodoForm addTodo={addTodo} setTodos={setTodos} todos={todos} deleteTodo={deleteTodo} createUser={createUser} />
        </>
    );
};

export default Home;