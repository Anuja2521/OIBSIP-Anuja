let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks = storedTasks;
        updateTasksList();
        updateProgress();
    }
});

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = (event) => {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        updateTasksList();
        updateProgress();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <div class="task">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div>
                <span class="edit-icon" onclick="editTask(${index})">✏️</span>
                <span class="delete-icon" onclick="deleteTask(${index})">🗑️</span>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    updateTasksList();
    updateProgress();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    updateTasksList();
    updateProgress();
};

const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    document.getElementById("numbers").textContent = `${completedTasks} / ${totalTasks}`;
    document.getElementById("progress").style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : "0%";

    const statsContainer = document.getElementById("statsContainer");

    if (completedTasks === totalTasks && totalTasks > 0) {
        confetti();
        statsContainer.classList.add("glow");
    } else {
        statsContainer.classList.remove("glow");
    }
};

document.getElementById("taskForm").addEventListener("submit", addTask);
