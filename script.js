const API_URL = "https://techbridge-task-1-5.onrender.com/api/tasks";

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const tasks = await response.json();
        console.log("Tasks loaded from backend:", tasks);
        displayTasks(tasks);
    } catch (error) {
        console.error("Error connecting to backend:", error);
    }
}

function displayTasks(tasks) {
    // Checking for common container IDs used in your HTML templates
    const container = document.getElementById("task-container") || document.querySelector(".task-container") || document.getElementById("tasks-list");
    if (!container) {
        console.warn("Task container element not found in DOM");
        return;
    }
    
    container.innerHTML = "";
    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task-card";
        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <span class="status ${task.status ? task.status.toLowerCase().replace(/\s+/g, '-') : ''}">${task.status}</span>
        `;
        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);
