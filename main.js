'use strict';

// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Task Array
let tasks = [];

// Functions to save in localStorage
function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Functions to load from localStorage
function loadTasks() {
	const saved = localStorage.getItem('tasks');

	if (!saved) {
		return;
	}

	tasks = JSON.parse(saved);
	tasks.forEach((task) => renderTask(task));
}

// Function to render a task in the DOM
function renderTask(task) {
	const li     = document.createElement('li');
	li.className = 'task-board__item';

	const checkbox     = document.createElement('input');
	checkbox.type      = 'checkbox';
	checkbox.className = 'task-board__checkbox';
	checkbox.checked   = task.completed;

	checkbox.addEventListener('change', () => {
		task.completed = checkbox.checked;
		saveTasks();
	});

	const span       = document.createElement('span');
	span.className   = 'task-board__text';
	span.textContent = task.text;

	const deleteBtn       = document.createElement('button');
	deleteBtn.type        = 'button';
	deleteBtn.className   = 'task-board__delete-btn';
	deleteBtn.textContent = 'Delete';

	deleteBtn.addEventListener('click', () => {
		li.remove();
		tasks = tasks.filter((t) => t !== task);
		saveTasks();
	});

	const checklistItem     = document.createElement('label');
	checklistItem.className = 'task-board__checklist-item';

	checklistItem.appendChild(checkbox);
	checklistItem.appendChild(span);

	li.appendChild(checklistItem);
	li.appendChild(deleteBtn);

	taskList.appendChild(li);
}

// Add a new task
addBtn.addEventListener('click', () => {
	const taskText = taskInput.value.trim();

	if (!taskText) {
		alert('Please enter a task.');
		return;
	}

	const newTask = { text: taskText, completed: false };

	tasks.push(newTask);
	saveTasks();

	renderTask(newTask);

	taskInput.value = '';
});

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', loadTasks);
