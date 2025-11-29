'use strict';

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', () => {
	const taskText = taskInput.value.trim();

	if (!taskText) {
		alert('Please enter a task.');
		return;
	}

	const li = document.createElement('li');
	li.className = 'task-board__item';

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'task-board__checkbox';

	const span = document.createElement('span');
	span.className = 'task-board__text';
	span.textContent = taskText;

	const deleteBtn = document.createElement('button');
	deleteBtn.type = 'button';
	deleteBtn.className = 'task-board__delete-btn';
	deleteBtn.textContent = 'Delete';

	deleteBtn.addEventListener('click', () => {
		li.remove();
	});

	li.appendChild(checkbox);
	li.appendChild(span);
	li.appendChild(deleteBtn);

	taskList.appendChild(li);

	taskInput.value = '';
});