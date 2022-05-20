// Fetch DOM Elements in a variable
const taskInputForm = document.querySelector('#adding_task'); // Input form
const taskInputValue = document.querySelector('#task_input'); // Input box in the form for getting the value provided 
const tabContentList = document.querySelector(`#tab_content_list`); // List of tasks
const navTabLinksList = document.querySelectorAll('.nav-link'); // Tab links 

let todoListDataContainerGlobal = [];
let editMode = false;
let editTaskId;

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

// Function definition for updating the status of the task
const updateTaskStatus = (currentTask) => {
    currentTask.addEventListener('dblclick', () => {
        if(!currentTask.children[0].classList.contains('task-checked')) {
            currentTask.children[0].classList.add('task-checked');
            todoListDataContainerGlobal[currentTask.dataset.id].isTaskChecked = true;
        } else {
            currentTask.children[0].classList.remove('task-checked');
            todoListDataContainerGlobal[currentTask.dataset.id].isTaskChecked = false;
        }
        setToLocalStorage();
    });
};

// Function definition for displaying task list
const displayTasks = () => {   
    let taskListHTML = ''; 
    todoListDataContainerGlobal.forEach((currentElement,index) => {
        let taskStatus = currentElement.isTaskChecked ? "task-checked" : "";
        taskListHTML = `
        <li class="list-group-item" data-id="${index}">
            <p class="task_text ${taskStatus}">
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
        ` + taskListHTML;
    });
    tabContentList.innerHTML = taskListHTML;
    actionBtnFunctionality();
};

// Letting all the DOM elements to be loaded first
document.addEventListener('DOMContentLoaded', function() {
    getFromLocalStorage();
    displayTasks();    

    // Event listner for input form to add and edit each task
    taskInputForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let taskEntered = String(taskInputValue.value);        
        if (taskEntered.length !== 0) {
            if(!editMode) {
                const taskData = {
                    text: taskEntered,
                    isTaskChecked: false,
                    uniqueTimeStamp: Date.now()
                };
                todoListDataContainerGlobal.push(taskData);
                setToLocalStorage();
                taskInputValue.value = "";
            } else {

            }
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
        let actionList = currentElement.nextElementSibling;
        currentElement.addEventListener('click', (event) => {
            event.stopPropagation();
            actionBtnAll.forEach((currentElement) => {
                if (event.target !== currentElement) {                    
                    currentElement.nextElementSibling.classList.remove('active');
                }
            });
            if (!actionList.classList.contains('active')) {
                actionList.classList.add('active');
            } else {
                actionList.classList.remove('active');
            }
        });
        updateTaskStatus(actionList.parentElement);
        actionList.addEventListener('click', (event) => {
            if(event.target === actionList.children[0]) {
                console.log("Clicked on Edit");
            } else if (event.target === actionList.children[2]) {
                console.log("Clicked on Delete");
            } 
        });
    });
    document.addEventListener('click', (event) => {
        actionBtnAll.forEach((currentElement) => {
            currentElement.nextElementSibling.classList.remove('active');
        });
    });
};

