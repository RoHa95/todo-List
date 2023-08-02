//let todos = [];
let filterValue = "all";
//selecting
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectedfilter = document.querySelector(".filter-todos");

//events
todoForm.addEventListener("submit", addNewTodo);
selectedfilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});
function addNewTodo(e) {
  e.preventDefault();

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value.trim(),
    isCompleted: false,
  };

  //todos.push(newTodo);
  saveTodo(newTodo);
  filterTodos();
}
function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
    <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <button class="todo__check" data-todo-id=${
      todo.id
    }><i class=" far fa-check-square"></i></button>
    <button class="todo__remove" data-todo-id=${
      todo.id
    }><i class=" far fa-trash-alt"></i></button>
  </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
  const removedBtn = [...document.querySelectorAll(".todo__remove")];
  removedBtn.forEach((btn) => {
    btn.addEventListener("click", removeTodo);
  });

  const checkBtn = [...document.querySelectorAll(".todo__check")];
  checkBtn.forEach((btn) => {
    btn.addEventListener("click", checkTodo);
  });
}
function filterTodos(e) {
  // const selected = e.target.value;
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((todo) => todo.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((todo) => !todo.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default:
      createTodos(todos);
  }
}
function removeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  let todos = getAllTodos();
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todos = getAllTodos();
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}
//local storage
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}
function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
