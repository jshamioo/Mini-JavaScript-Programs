// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    // Add a task
    form.addEventListener('submit', addTask);

    // Delegation, removing a task
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
   
        // Append the li to ul
        taskList.appendChild(li);
    })
}

function addTask(e) {
     if(taskInput.value === ''){
         alert('Please Add a Task');
     }
     const li = document.createElement('li');
     li.className = 'collection-item';
     // Create text node and append to li
     li.appendChild(document.createTextNode(taskInput.value));
     // Create new link element
     const link = document.createElement('a');
     // Add class
     link.className = 'delete-item secondary-content';
     //Add icon html
     link.innerHTML = '<i class="fa fa-remove"></i>';
     // Append the link to li
     li.appendChild(link);

     // Append the li to ul
     taskList.appendChild(li);

     // Store task in local storage
     storeTaskInLS(taskInput.value);

     taskInput.value = '';
    e.preventDefault();
}

function storeTaskInLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        removeTaskFromLS(e.target.parentElement.parentElement);
    }
    e.preventDefault();
}

function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(task === taskItem.textContent){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLS();
    e.preventDefault();
}

function clearTasksFromLS() {
    if(localStorage.getItem('tasks')){
        localStorage.removeItem('tasks');
    }
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    // querySelectorAll returns a node list, so we can use a for each
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}
