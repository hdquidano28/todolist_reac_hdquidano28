import React, { useState, useEffect } from "react";

export const TodoForm = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [remainingTodo, setRemainingTodos] = useState(0);

    useEffect(() => {
        getData();
    }, []);

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
            await createUser()
        }
    }

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


    const addTodos = async (e) => {

        if (e.key === "Enter" && inputValue) {
            const newItem = {
                label: inputValue
            }
            try {
                const response = await fetch("https://playground.4geeks.com/todo/todos/helen", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
                if (response.ok) {
                    const data = await response.json();
                    setTodos([...todos, data]);
                    setInputValue("");
                    setRemainingTodos(remainingTodo + 1);
                }
            } catch (error) {
                console.error("Error", error)
            }
        }
    }



    const deleteTodo = async (index) => {

        const response = await fetch(`https://playground.4geeks.com/todo/todos/${index}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            getData();
            setRemainingTodos(remainingTodo - 1);
        } else {
            console.log("Todo not deleted");
        }
    };

    return (
        <div className="container text-center w-25">
            <h1 className="title">Todos</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <input type="text" className="form-control" placeholder="Whats need to be done?" value={inputValue} onKeyDown={(e) => addTodos(e)} onChange={(e) => setInputValue(e.target.value)} />
                </li>
                {todos.map((item, index) => (
                    <li className="list-group-item" key={index}>
                        {item.label}
                        <button type="button" className="btn delete-button justify-content-end" onClick={() => deleteTodo(item.id)}><i className="bi bi-x"></i></button>
                    </li>
                ))}
                <li className="list-group-item left-item-remain"><p>{remainingTodo} item left</p></li>
            </ul>

            <div className="background-box"> </div>
            <div className="background-box2"> </div>
        </div>
    );
};


export default TodoForm;