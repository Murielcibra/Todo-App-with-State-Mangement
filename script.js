"use strict";
/* 
1.Add an input field and a button that is used to add new Todos
 The any trailing spaces should be trimmed from the todo input

2.Each todo has a description and a done property

 3. Add an ID property to each todo item for easier identification of each todo item
Create the ID youself (i.e. with a counter variable or generate an id)

4.Display a list of all todos

5.Use a checkbox to show if a todo is done or open

6.When the checkbox of a todo is changed update the state of the corresponding todo
7.Do not allow duplicate todo descriptions (i.e. two todos with the description "Learn JavaScript")
 The duplicate check case-insensitive
8. Add a "Remove Done Todos" button which will remove all done todos from the state
9.Use the local storage to load and save the current state of the app
 
 
 */
const state = {
  todos: [],
};
// Local Storage state.todos
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}
function syncroLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  state.todos = todos;
}
syncroLocalStorage();
render(state.todos);
// @TODO render todos
// <li><input type="checkbox" />Learn HTML</li>

// @TODO Submit form to add Todo
const addToDoForm = document.querySelector("#add-todo-form");

addToDoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addNewTodo(); // first update state
  updateLocalStorage();
  render(state.todos);
});
// Obtain the value of the input radio to make the filter work
// Get the radio button element
const formRadioFilter = document.querySelector("#optionsFilters");
//const radioDoneEl = document.querySelector('input[name="category"]:checked');
formRadioFilter.addEventListener("change", (event) => {
  // Get the value of the selected radio button
  const selectedValue = event.target.value;
  switch (selectedValue) {
    case "all":
      render(state.todos);
      break;
    case "open":
      render(state.todos.filter((t) => t.done === false));
      break;
    case "done":
      render(state.todos.filter((t) => t.done === true));
      break;
    default:
      return;
  }
});
// Remove all Btn
const clearAllbtn = document.getElementById("removeAllBtn");
clearAllbtn.addEventListener("click", (event) => {
  event.preventDefault();
  // Filter of the tasks that are not done
  const notDoneTodos = state.todos.filter((task) => task.done === false);
  // After the filter the tasks remaining are the ones not done yet /open
  // Th original states Todo is now only the open task
  state.todos = notDoneTodos;
  updateLocalStorage();
  // Now in the screen will be render the open tasks
  render(state.todos);
  // This is to executed everything that is in state.todos one time
});

function renderItem(description, id, done) {
  // Li Element
  const newLi = document.createElement("li");
  // Set an Id attribute, to identify the li that is been check
  newLi.id = id;

  // Styling
  newLi.classList.add("todo-item");

  // Checkbox Element
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  // Styling Checkbox
  newCheckBox.classList.add("todo-item__checkbox");
  // done= true /done
  if (done) {
    newLi.classList.add("strike-through");
    newCheckBox.checked = true;
  }

  // create Text Node
  const text = document.createTextNode(description);

  newCheckBox.addEventListener("change", () => {
    newLi.classList.toggle("strike-through");
    // Search for  the To Do task that was click
    let foundToDo = state.todos.find((todo) => todo.id === parseInt(newLi.id));
    if (foundToDo != null) {
      foundToDo.done = !foundToDo.done;
    }
    updateLocalStorage();
  });

  // build everything together

  newLi.append(newCheckBox, text);
  // ^_____ same like two lines of appendChild
  // newLi.appendChild(newCheckBox)
  // newLi.appendChild(text)

  return newLi;
}
// @TODO Create Form to add new todo
function addNewTodo() {
  // Get input field
  const formInputNewTodo = document.getElementById("new-todo-input");
  //Findind the object description in my array
  if (formInputNewTodo.value === "") {
    alert("Sorry, the Todo you want to create to can not be empty :(");
    return;
  }
  let toDo = state.todos.find(
    (p) => p.description.toLowerCase() === formInputNewTodo.value.toLowerCase()
  );
  //Do not allow duplicate todo descriptions

  if (toDo === undefined) {
    // get todo list ul element - done

    state.todos.push({
      id: +new Date(),
      description: formInputNewTodo.value,
      done: false,
    });
  } else {
    alert("Sorry,the Todo you want to add already exist :(");
  }
}

function render(listToDo) {
  const todoListUl = document.getElementById("todo-list");
  todoListUl.innerHTML = "";

  for (let todo of listToDo) {
    const newTodItem = renderItem(todo.description, todo.id, todo.done);
    todoListUl.append(newTodItem);
  }
}
