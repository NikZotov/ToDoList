const input = document.getElementById('input-task');
const list = document.getElementById('task-list');
const ul = document.getElementById('task-list');

if(localStorage.getItem('task') === null) {
    let taskList = ["Email David", "Create ideal user persona guide", "Set up A/B test"];
    localStorage.setItem('task', JSON.stringify(taskList));
}

createTaskListFromStorage();
listnerAddButton();
listnerDeleteButton();
listnerCheckbox();

function createTaskListFromStorage() {
    ul.innerHTML = "";
    let ls = JSON.parse(localStorage.getItem('task'))||[];
    ls.forEach(text => {
        let inputTag = document.createElement('input');
        inputTag.type = 'checkbox';
        let spanTag = document.createElement('span');
        spanTag.className = 'task';
        spanTag.innerText = text;
        let buttonTag = document.createElement('button');
        buttonTag.className = 'delete-btn';
        buttonTag.innerText = 'Delete';
        let li = document.createElement('li');
        li.appendChild(inputTag);
        li.appendChild(spanTag);
        li.appendChild(buttonTag);
        list.appendChild(li);
    });
}

function addTaskToLocalStorage(value){
    let taskList = JSON.parse(localStorage.getItem('task'));
    taskList.push(value);
    localStorage.clear();
    localStorage.setItem('task', JSON.stringify(taskList));
    createTaskListFromStorage();
}

function deleteTaskFromLocalStorage(text) {
    let taskList = JSON.parse(localStorage.getItem('task'));
    taskList.splice(taskList.indexOf(text),1);
    localStorage.clear();
    localStorage.setItem('task', JSON.stringify(taskList));
    createTaskListFromStorage();
}

function listnerAddButton() {
    document.getElementById('add-task-button').addEventListener('click', function () {
        if(input.value != ""){
            let inputTag = document.createElement('input');
            inputTag.type = 'checkbox';
            let spanTag = document.createElement('span');
            spanTag.className = 'task';
            spanTag.innerText = input.value;
            let buttonTag = document.createElement('button');
            buttonTag.className = 'delete-btn';
            buttonTag.innerText = 'Delete';
            let li = document.createElement('li');
            li.appendChild(inputTag);
            li.appendChild(spanTag);
            li.appendChild(buttonTag);
            list.appendChild(li);
            addTaskToLocalStorage(input.value);
            input.value = "";
            listnerDeleteButton();
            listnerCheckbox();
        }
    });
}

function listnerDeleteButton() {
    const deleteButton = ul.querySelectorAll('.delete-btn');
    deleteButton.forEach(btn => {
        btn.addEventListener('click', function () {
            deleteTaskFromLocalStorage(btn.previousSibling.textContent);
            createTaskListFromStorage();
            listnerDeleteButton();
            btn.parentElement.remove();
        });
    });
}

function listnerCheckbox() {
    const checkBox = ul.querySelectorAll('input');
    checkBox.forEach(chB => {
        chB.addEventListener('change', function () {
            if (chB.checked) {
                chB.nextElementSibling.style.textDecoration = 'line-through';
            } else {
                chB.nextElementSibling.style.textDecoration = 'none';
            }
        });
    });
}
