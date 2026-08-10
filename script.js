const API_URL = "http://127.0.0.1:8000/tasks";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", fetchTasks);

async function fetchTasks() {
	const response = await fetch(API_URL);

	const tasks = await response.json();
	renderTasks(tasks);
}

function renderTasks(tasks) {
	taskList.innerHTML = "";
	tasks.forEach(task => {
		const li = document.createElement("li");
		if (task.completed) li.classList.add("completed");

		li.innerHTML = `
            <span class="task-title" onclick="toggleTask(${task.id})">${task.title}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Изтрий</button>
        `;
        taskList.appendChild(li);
	});
}

addBtn.addEventListener("click", async () => {
	const title = taskInput.value.trim();
	if (!title) return;

	await fetch(API_URL, {
		method: "POST", 
		headers: {"Content-Type": "application/json"}, 
		body: JSON.stringify({ title: title })
	});

	taskInput.value = "";
	fetchTasks();
});

async function toggleTask(id) {
	await fetch(`${API_URL}/${id}`, { method: "PUT" });
	fetchTasks();
}

async function deleteTask(id) {
	await fetch(`${API_URL}/${id}`, { method: "DELETE" });
	fetchTasks();
}
