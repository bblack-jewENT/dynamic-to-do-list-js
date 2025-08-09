

// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper: Get tasks from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Helper: Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task to the list and optionally save to Local Storage
    function addTask(taskText, save = true) {
        // If called from button/Enter, get value from input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Check if the input is empty
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button to remove the li from taskList
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            // Remove from Local Storage
            let tasks = getStoredTasks();
            // Remove only the first matching occurrence
            const idx = tasks.indexOf(taskText);
            if (idx > -1) {
                tasks.splice(idx, 1);
                saveTasks(tasks);
            }
        };

        // Append the remove button to the li element
        li.appendChild(removeBtn);
        // Append the li to taskList
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }

        // Clear the task input field
        taskInput.value = '';

        // Clear the input field
        taskInput.value = '';
    }

    // Function to load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add event listener to allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
