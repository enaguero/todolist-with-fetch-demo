import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [nickname, setNickName] = useState("enaguero4")
	const [newTask, setNewTask] = useState("")
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.1' } };

		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${nickname}`, options)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as JSON
				return response.json();
			})
			.then(data => {
				setTasks(data)
			})
			.catch(err => {
				if (err.message.includes("NOT FOUND")) {
					const options = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1' },
						body: JSON.stringify(tasks)
					};

					fetch(`https://playground.4geeks.com/apis/fake/todos/user/${nickname}`, options)
						.then(response => response.json())
						.then(response => console.log(response))
						.catch(err => console.error(err));
				}

				console.error(err)
			});
	}, [])

	const listTasks = tasks.map((t, index) => <li key={index}> {t.label} ({t.done ? "La tarea esta lista" : "La tarea no esta lista"}) </li>)

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Hello {nickname}</h1>
			<p>
				<img src={rigoImage} height={"100px"} />
			</p>
			<div className="container text-center">
				<div className="row align-items-start">
					<div className="col">
					</div>
					<div className="col">
						<input type="text" placeholder={"Add a task"} value={newTask}
							onChange={(event) => {
								setNewTask(event.target.value)
							}

							}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {

									let currentTask = tasks.map((t) => {
										return { label: t.label, done: t.done }
									})

									let newTasks = [...currentTask, { label: newTask, done: false }]

									const options = {
										method: 'PUT',
										headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1' },
										body: JSON.stringify(newTasks)
									};

									fetch(`https://playground.4geeks.com/apis/fake/todos/user/${nickname}`, options)
										.then(response => response.json())
										.then(data => {
											const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.1' } };

											fetch(`https://playground.4geeks.com/apis/fake/todos/user/${nickname}`, options)
												.then(response => response.json())
												.then(retrievedTasks => {
													setNewTask("")
													setTasks(retrievedTasks)
												})
												.catch(err => console.error(err));

										})
										.catch(err => console.error(err));
								}
							}}
						></input>
						<br />
						La nueva tarea es: {newTask}
						<br />
						{listTasks.length > 0 ? <ul>{listTasks}</ul> : "Agrega tu primera tarea"}
						{listTasks.length > 0 && <div>Number of tasks: {listTasks.length}</div>}
					</div>
					<div className="col">
					</div>
				</div>
			</div>
			<a href="#" className="btn btn-success">
				If you see this green button... bootstrap is working...
			</a>
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
		</div >
	);
};

export default Home;
