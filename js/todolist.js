const todos = [];

//selecting
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");

todoForm.addEventListener("submit", addNewTodo);

function addNewTodo(e) {
  e.preventDefault();

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  todos.push(newTodo);

  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
    <p class="todo__title">${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <button data-todo-id=${
      todo.id
    }><i class="todo__check far fa-check-square"></i></button>
    <button data-todo-id=${
      todo.id
    }><i class="todo__remove far fa-trash-alt"></i></button>
  </li>`;
  });
  todoList.innerHTML = result;
}
