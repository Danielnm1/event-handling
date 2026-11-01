// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];



// Select the ul element from HTML
const todoUl = document.querySelector('ul');

// Select dialog elements
const dialog = document.querySelector('dialog');
const addButton = document.querySelector('.add-btn');
const form = document.querySelector('form');
const todoInput = document.querySelector('input[type="text"]');

// Function to create and display one todo item
function addTodoToDOM(item) {
  // Create a list item
  const li = document.createElement('li');

  // Create a checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `todo-${item.id}`;
  checkbox.checked = item.completed;

  // Create a label
  const label = document.createElement('label');
  label.htmlFor = checkbox.id;
  label.textContent = item.task;

  // Listen for checkbox changes
  checkbox.addEventListener('change', () => {
    item.completed = checkbox.checked;
    console.log(todoList);
  });

  // Create a Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';

  // Listen for Delete button clicks
  deleteButton.addEventListener('click', () => {
    const itemIndex = todoList.findIndex((todo) => todo.id === item.id);

    todoList.splice(itemIndex, 1);
    todoUl.removeChild(li);

    console.log(todoList);
  });

  // Add elements to the list item
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteButton);

  // Add the list item to the ul
  todoUl.appendChild(li);
}

// Display the original todo items
todoList.forEach((item) => {
  addTodoToDOM(item);
});

// Open the dialog when Add Todo Item is clicked
addButton.addEventListener('click', () => {
  dialog.showModal();
});

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the new task
  const newTask = todoInput.value.trim();

  // Do not add an empty task
  if (newTask === '') {
    return;
  }

  // Create a new todo object
  const newTodo = {
    id: Math.max(0, ...todoList.map((item) => item.id)) + 1,
    task: newTask,
    completed: false,
  };

  // Add the new object to the array
  todoList.push(newTodo);

  // Display the new todo item
  addTodoToDOM(newTodo);

  // Log the updated array
  console.log(todoList);

  // Clear the input
  todoInput.value = '';

  // Close the dialog
  dialog.close();
});


