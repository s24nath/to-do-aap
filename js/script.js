// Fetch DOM Elements in a variable
const taskInputForm = document.querySelector('#adding_task');
const taskInputValue = document.querySelector('#task_input');
const tabContentList = document.querySelector(`#tab_content_list`);
const navTabLinksList = document.querySelectorAll('.nav-link');
const tasklist = document.querySelectorAll('.list-group-item');

let todoListDataContainerGlobal = [];

// Function definition to create task data in Local Storage
const setToLocalStorage = () => {
    localStorage.setItem('taskData', JSON.stringify(todoListDataContainerGlobal));
};

// Function definition to fetch task data from Local Storage
const getFromLocalStorage = () => {
    let fetchedFromLocalStorage = JSON.parse(localStorage.getItem('taskData'));
    if (fetchedFromLocalStorage) {
        todoListDataContainerGlobal = fetchedFromLocalStorage;
    } else {
        console.log("Empty List");
    }
};

// Function definition for displaying task list
const displayTasks = () => {   
    let currentTaskHTML = ''; 
    let taskListHTML = ''; 
    todoListDataContainerGlobal.forEach((currentElement) => {
        taskListHTML += `
        <li class="list-group-item">
            <p class="task_text">
                ${currentElement.text}
            </p>
            <button class="btn action-btn">
                <img src="./img/dots.png" alt="">
            </button>
            <ul class="action-list">
                <li>Edit</li>
                <hr>
                <li>Delete</li>
            </ul>
        </li>
        `;
    });
    tabContentList.innerHTML = taskListHTML;
    actionBtnFunctionality();
};

// Letting all the DOM elements to be loaded first
document.addEventListener('DOMContentLoaded', function() {
    getFromLocalStorage();
    displayTasks();    
    taskInputForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let taskEntered = String(taskInputValue.value);        
        if (taskEntered.length !== 0) {
            const taskData = {
                text: taskEntered,
                isPending: false,
                uniqueTimeStamp: Date.now()
            };
            todoListDataContainerGlobal.push(taskData);
            setToLocalStorage();
            taskInputValue.value = "";
            displayTasks();
        } else {
            console.log("No value");
        }
    });
});

// Function definition for action button for each task in the list
const actionBtnFunctionality = () => {
    const actionBtnAll = document.querySelectorAll('.action-btn');
    actionBtnAll.forEach((currentElement) => {
        currentElement.addEventListener('click', (event) => {
            event.stopPropagation();
            actionBtnAll.forEach((currentElement) => {
                if (currentElement !== event.target) {                    
                    currentElement.nextElementSibling.classList.remove('active');
                }
            });
            if (!currentElement.nextElementSibling.classList.contains('active')) {
                currentElement.nextElementSibling.classList.add('active');
            } else {
                currentElement.nextElementSibling.classList.remove('active');
            }
        });
    });
};

document.addEventListener('click', (event) => {
    actionBtnAll.forEach((currentElement) => {
        currentElement.nextElementSibling.classList.remove('active');
    });
});
