// create note, add to array, change to JSON store to local.   

//store array to localStorage

function storeTaskList(taskList) {
    localStorage.setItem(taskList, JSON.stringify(taskList));
}



function getTaskList() {
    return JSON.parse(localStorage.getItem('taskList'));
}