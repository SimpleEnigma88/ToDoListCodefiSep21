class Task {
    constructor(taskName, taskOwner = "All", description, dueDate, submittedDate) {
        this.taskName = taskName;
        this.taskOwner = taskOwner;
        this.description = description;
        this.dueDate = dueDate;
        this.submittedDate = submittedDate;
        this.complete = false; // will toggle on the checkmark on each note.
        this.priority = 1; // Not implemented
    }
}

let taskList = new Array();

//Setting default values for testing purposes. Remove when testing done.
document.getElementById('dueDate').valueAsDate = new Date(); // May keep this one, makes sense.
document.getElementById('taskName').value = 'Wash the dishes';
document.getElementById('taskOwner').value = 'Andy';
document.getElementById('taskDesc').value = "Why do today, what you can probably not do tomorrow?";

let form = document.getElementById('noteForm');

form.addEventListener('submit', callbackFormData);

function callbackFormData(event) {
    event.preventDefault();
    const curTime = new Date();
    const taskName = document.getElementById('taskName').value;
    const taskOwner = document.getElementById('taskOwner').value || "Anyone";
    const description = document.getElementById('taskDesc').value || "n/a";
    const submittedDate = `${curTime.getFullYear()}-${(curTime.getMonth() + 1)}-${curTime.getDate()}`;
    let newTaskObj = new Task(taskName, taskOwner, description,/*  dueDate, */ submittedDate);
}


function storeTaskList(taskList) {
    localStorage.setItem(taskList, JSON.stringify(taskList));
}

function getTaskList() {
    return JSON.parse(localStorage.getItem('taskList'));
}



















//const dueDate = document.getElementById('dueDate').value || "ASAP";


/* function checkIfDuplicate() {
    //Do we need this? Might complicate repeat reminders
} */

/* function sortByDueDate() {

}

function sortBySubDate() {

} */