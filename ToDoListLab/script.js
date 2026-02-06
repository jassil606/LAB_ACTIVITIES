const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) { 
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskText, false);
    saveTasks();

    taskInput.value = '';
}

function createTaskElement(text, completed) {
    const li = document.createElement('li');

    if (completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.addEventListener('click', function(e) {
        if(e.target.tagName === 'BUTTON') return;
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
        saveTasks();
    });

    taskList.appendChild(li);
}    

function saveTasks() {
    const tasks = [];

    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').innerText,
            completed: li.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks) {
        savedTasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}
    