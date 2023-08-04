//let todos = [];
let filterValue = "all";

//selecting
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectedfilter = document.querySelector(".filter-todos");
const editOk = document.querySelector(".edit-todo-input");
const closBtn = document.querySelector(".close-modal");

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

  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value.trim(),
    isCompleted: false,
  };
  // todos.push(newTodo);
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
    <button class="todo__edit" data-todo-id=${todo.id}>
                <i class="far fa-edit"></i>
              </button>
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

  const editBtn = [...document.querySelectorAll(".todo__edit")];
  editBtn.forEach((btn) => {
    btn.addEventListener("click", editTodo);
  });
}
function filterTodos(e) {
  //const selected = e.target.value;
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
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
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
function editTodo(e) {
  // document.querySelector(".backdrop").classList.remove("hidden");
  // document.querySelector(".modal").classList.remove("hidden");
  const todoId = Number(e.target.dataset.todoId);
  const todos = getAllTodos();
  const todo = todos.find((t) => t.id === todoId);
  createModal(todo);
  console.log(todo);
}
function createModal(todoEdit) {
  let result = `<div class="backdrop"></div>
  <div class="modal">
    <div
      style="display: flex; justify-content: space-between"
      class="modal__header"
    >
      <h2 style="display: inline; padding-bottom: 1.2rem">ویرایش</h2>
      <button class="close-modal">&times;</button>
    </div>
    <form style="display: flex; justify-content: center" class="todo-form">
      <input type="text" class="edit-todo-input" value=${todoEdit.title} />
      <button class="edit-ok-button" type="submit" data-todoedit-id=${todoEdit.id}>
        <i class="fas fa-edit"></i>
      </button>
    </form>
  </div>`;

  document.querySelector(".modal-container").innerHTML = result;
  const editBtn = document.querySelector(".edit-ok-button");
  editBtn.addEventListener("click", (e) => {
    console.log("clicked", e.target.dataset.todoeditId);
    const todoId = Number(e.target.dataset.todoeditId);
    const todos = getAllTodos();
    const todo = todos.find((t) => t.id === todoId);
    const newInput = document.querySelector(".edit-todo-input");
    todo.title = newInput.value;
    console.log(newInput.value);
    saveAllTodos(todos);
    filterTodos();
  });
  const closBtn = document.querySelector(".close-modal");
  closBtn.addEventListener("click", (e) => {
    document.querySelector(".modal-container").innerHTML = "";
  });
  const backdrop = document.querySelector(".backdrop");
  backdrop.addEventListener("click", (e) => {
    document.querySelector(".modal-container").innerHTML = "";
  });
}
function updateTodo(e) {
  e.preventDefault();
  console.log(newTodo);
  if (!editOk.value) return null;
  const newTodo = {
    id: e.id,
    createdAt: new Date().toISOString(),
    title: editOk.value.trim(),
    isCompleted: false,
  };
  console.log(newTodo);
  // todos.push(newTodo);
  saveTodo(newTodo);
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
