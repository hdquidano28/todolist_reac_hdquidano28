import React, { useState, useEffect } from "react";

//include images into your bundles
import { TodoForm } from "./TodoForm";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (newTodo) => {
		setTodos([...todos, newTodo]);
	}

	useEffect(() => {
        getData()
    }, [])

    async function getData() {

        let response = await fetch("https://playground.4geeks.com/todo/user/helen", {
            method: "GET"
        });

        if (response.status == 404) {
            await createUser();
            response = await fetch("https://playground.4geeks.com/todo/user/helen");
        }
        let data = await response.json();
        console.log(data);
		if (data && data.todos) {
			setTodos(data.todos);
		} else {
			console.log("not found")
		}
    }

    
    
    async function createUser() {
        let responseCreate = await fetch("https://playground.4geeks.com/todo/user/helen", {
            method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ todos: [] }),
        });
		console.log("User created:", responseCreate)
        
        if (responseCreate.ok) {
            console.log("User created")
        } else {
            console.log("User not created")
        }
    } 

    // async function deleteUser() {
    //     let responseDelete = await fetch("https://playground.4geeks.com/todo/user/helen", {
    //         method: "DELETE"
    //     });
    //     if (responseDelete.ok) {
    //         console.log("User deleted")
    //     } else {
    //         console.log("User not deleted")
    //     }
        
    // }


	return (
		<>
		<TodoForm addTodo={addTodo} setTodos={setTodos} todos={todos}/>
		</>
	);
};

export default Home;
