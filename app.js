// ---------------Selectors ---------------
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

// ---------------Events ---------------
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", buttonEvent);
filterOptions.addEventListener("change", filterTodo);
// ---------------Functions ---------------
function addTodo(event) {
  event.preventDefault();
  // Todo div ( contains the buttons and the li)
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Li ( contains the text)
  const newTodo = document.createElement("li");
  // check if the input is empty and show a message
  if (todoInput.value === "") {
    const errorMessage = document.createElement("h2");
    errorMessage.innerText = "error empty field";
    errorMessage.classList.toggle("error");
    document.querySelector(".errorDiv").appendChild(errorMessage);
    errorMessage.addEventListener("transitionend", function () {
      errorMessage.remove();
    });
    return;
  }
  //
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todoItem");
  // Add our Li to the div
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodos(todoInput.value);
  // Complete button

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  // Appends to list
  todoList.appendChild(todoDiv);
  // Clear the input
  todoInput.value = "";
}

function buttonEvent(e) {
  const btn = e.target;
  // delete todo
  if (btn.classList[0] === "delete-btn") {
    const todo = btn.parentElement;
    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // checkmark
  else if (btn.classList[0] === "complete-btn") {
    const todo = btn.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todo = todoList.childNodes;
  todo.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// ------ Local storage

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Li ( contains the text)
    const newTodo = document.createElement("li");
    // check if the input is empty and show a message
    //
    newTodo.innerText = todo;
    newTodo.classList.add("todoItem");
    // Add our Li to the div
    todoDiv.appendChild(newTodo);
    // Complete button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Appends to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
