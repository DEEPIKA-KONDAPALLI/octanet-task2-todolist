let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let a = localStorage.getItem("todoList");
    let b = JSON.parse(a);
    if (b === null) {
        return [];
    } else {
        return b;
    }
}
let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


function todoStatus(checkBoxId, labelId, todoId) {
    let checkBoxElement = document.getElementById(checkBoxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function todoDelete(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedTodoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedTodoItemIndex, 1);
}

function createAndAppendTodo(todoList) {
    let checkBoxId = "checkbox" + todoList.uniqueNo;
    let labelId = "label" + todoList.uniqueNo;
    let todoId = "todo" + todoList.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement('input');
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.checked = todoList.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        todoStatus(checkBoxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute("for", checkBoxId);
    labelElement.id = labelId;
    labelElement.textContent = todoList.text;
    labelElement.classList.add("checkbox-label");
    if (todoList.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        todoDelete(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

for (let i of todoList) {
    createAndAppendTodo(i);
}

function onAddButton() {
    let userInputElement = document.getElementById("todoUserInput");
    let userValue = userInputElement.value;
    if (userValue === "") {
        alert("Enter Valid Text");
        return; //not to execute other down lines
    }

    todoCount = todoCount + 1;
    let newTodo = {
        text: userValue,
        uniqueNo: todoCount,
        isChecked: false,
    };
    todoList.push(newTodo);
    console.log(todoList);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddButton();
}