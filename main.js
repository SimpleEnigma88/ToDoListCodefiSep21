class Task {
    constructor(taskName, taskOwner = "ALL", description, submittedDate, taskID) {
        this.taskName = taskName;
        this.taskOwner = taskOwner;
        this.description = description;
        this.dueDate = dueDate;
        this.submittedDate = submittedDate;
        this.complete = false; // will toggle on the checkmark on each note.
        this.taskID = taskID; // Not implemented
    }
}

let taskList = getListFromLocalStorage() === null ? new Array() : getListFromLocalStorage();

//Setting default values for testing purposes. Remove when testing done.
document.getElementById('dueDate').valueAsDate = new Date(); // May keep this one.
document.getElementById('taskName').value = 'Wash the dishes';
document.getElementById('taskOwner').value = 'Andy';
document.getElementById('taskDesc').value = "Why do today, what you can probably not do tomorrow?";

function refreshBoard() {
    let list = getListFromLocalStorage() === null ? [] : getListFromLocalStorage();
    console.log("Number of records in LocalStorage:", list.length);

    list.forEach(function (obj) {
        insertHTMLforNote(obj);
    });
}

refreshBoard();

let form = document.getElementById('noteForm');

form.addEventListener('submit', callbackFormData);

function callbackFormData(event) {
    event.preventDefault();
    const curTime = new Date();
    const taskID = (Math.floor(Math.random() * 1000));
    const taskName = document.getElementById('taskName').value;
    const taskOwner = document.getElementById('taskOwner').value || "Anyone";
    const description = document.getElementById('taskDesc').value || "n/a";
    const submittedDate = `${curTime.getFullYear()}-${(curTime.getMonth() + 1)}-${curTime.getDate()}`;
    let newTaskObj = new Task(taskName, taskOwner, description, submittedDate, taskID);
    addTaskToTaskList(newTaskObj);
    insertHTMLforNote(newTaskObj);
}

function insertHTMLforNote(task) {
    document.getElementById('content').innerHTML = document.getElementById('content').innerHTML +
        `<div class="stickyNote" id ="${task.taskID} "style="transform: rotate(${(Math.floor(Math.random() * 7) - 3)}deg);">
        <h5>${task.taskName}</h5>
        <p>${task.description}</p>
        <span class="close-btn" id="close-btn"><strong>X</strong></span>
        <span class="done-btn"><strong>&#x2713;</strong></span>
    </div>`;
}
const clearButton = document.getElementById('clear');
clearButton.addEventListener("click", () => {
    let answer = confirm("This will delete all sticky notes. Continue?");
    if (answer) {
        clearBoard();
    }
});
const deleteButton = document.getElementById('close-btn');
deleteButton.addEventListener("click", () => {
    deleteTask(deleteButton.parentElement.id);
});
function clearBoard() {
    document.getElementById('content').innerHTML = '';
    taskList = [];
    localStorage.removeItem("taskList");
}

function deleteTask(id) {
    document.getElementById(id).outerHTML = "";
    let list = getListFromLocalStorage();
    list.forEach((item, index) => {
        if (item.taskID === id) {
            arr.splice(index, 1);
        }
    });
    localStorage.setItem('taskList', JSON.stringify(list));
}

function addTaskToTaskList(obj) {
    console.log(taskList);
    taskList.push(obj);
    console.log(taskList);
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function getListFromLocalStorage() {
    return JSON.parse(localStorage.getItem('taskList'));
}


