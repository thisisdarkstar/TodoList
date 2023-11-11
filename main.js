let input = document.getElementById('the-task'); // this input for adding task
let task_list = document.querySelector(".task-list"); // pending task parent container
let header = document.querySelector('.pending'); // pending task header
let header2c = document.querySelector('.completed'); // completed task header
let completed = document.querySelector('.completed-tasks'); // completed task parent container



// checking for tasks name key exits if not then creating
if ((localStorage.getItem("tasks") == null) || (localStorage.tasks == "")) {
    localStorage.setItem("tasks", "[]")
}
// checking for completed key exists  if not then creating 
if ((localStorage.getItem("completed") == null) || (localStorage.completed == "")) {
    localStorage.setItem("completed", "[]")
    location.reload();
}

// add task to the task key in localstorage
const add_task = () => {
    let arr = JSON.parse(localStorage.getItem("tasks"));
    if (input.value != '') {
        arr.push(input.value);
        localStorage.setItem("tasks", JSON.stringify(arr));
        location.reload();
        input.value = '';
    }
}

// show tasks in the task list logic
let tasks = JSON.parse(localStorage.getItem("tasks"));
for (let i = 0; i < tasks.length; i++) {
    let div = document.createElement("div"); // task div 
    div.className = "task"; 

    let span = document.createElement("span"); // todo span for tasks
    span.className = "todo";

    let divNested = document.createElement("div"); // div classed buttons for the img used as button
    divNested.className = "buttons";

    header.style.display = 'block'; // pending task heaing

    // appending all of them on pending task parent container with innerHTML
    task_list.appendChild(div);
    div.appendChild(span);
    span.innerText = tasks[i];
    div.appendChild(divNested);
    divNested.innerHTML = `
    <div class="tooltip">
        <img class="icons complete" src="assets/approve.png" alt="done"><span
        class="tooltiptext">Completed</span>
    </div>
    <div class="tooltip">
        <img class="icons edit" src="assets/edit.png" alt="edit"><span class="tooltiptext">Edit</span>
    </div>
    <div class="tooltip">
        <img class="icons delete" src="assets/delete.png" alt="delete"><span
        class="tooltiptext">Delete</span>
    </div>`
}

// for finding indexes of pending tasks buttons
for (let i = 0; i < tasks.length; i++) {

    // delete button llistner
    document.querySelectorAll('.delete')[i].addEventListener('click', () => {
        delete_task(i);
    })

    // edit button listner
    document.querySelectorAll('.edit')[i].addEventListener('click', () => {
        edit_task(i);
    })

    // complete button listner
    document.querySelectorAll('.complete')[i].addEventListener('click', () => {
        completed_task(i);
    })

}


// reset tasks
const reset_tasks = () => {
    localStorage.removeItem("tasks"); // removing pending tasks
    localStorage.removeItem("completed"); // removing completed tasks
    location.reload();
}

// delete task
const delete_task = (i) => {
    // swapping the index i need to remove to the last and poping to delete it
    let taskl = JSON.parse(localStorage.getItem('tasks'));
    for (let j = i; j < (taskl.length - 1); j++) {
        let temp = taskl[j + 1];
        taskl[j + 1] = taskl[j];
        taskl[j] = temp;
    }
    taskl.pop();
    localStorage.setItem('tasks', JSON.stringify(taskl));
    location.reload();
}


// edit task
let index;
const edit_task = (i) => {
    // overwriting the task using the array index
    let taske = JSON.parse(localStorage.getItem('tasks'));
    let editButton = document.getElementById('edit');
    let addButton = document.querySelector('.add');
    editButton.style.display = "inline-block";
    addButton.style.display = "none";
    input.value = taske[i];
    index = i;
}

// edit task logic
document.getElementById('edit').addEventListener('click', () => {
    let tasked = JSON.parse(localStorage.getItem('tasks'));
    tasked[index] = input.value;
    localStorage.setItem('tasks', JSON.stringify(tasked));
    location.reload();
    let editButton = document.getElementById('edit');
    let addButton = document.querySelector('.add');
    editButton.style.display = "none";
    addButton.style.display = "inline-block";
})

// completed task logic
const completed_task = (i) => {
    let tasklist = JSON.parse(localStorage.getItem('tasks'));
    let new_arr = JSON.parse(localStorage.getItem('completed'));
    for (let j = i; j < (tasklist.length - 1); j++) {
        let temp = tasklist[j + 1];
        tasklist[j + 1] = tasklist[j];
        tasklist[j] = temp;
    }
    let completedt = tasklist.pop();
    new_arr.push(completedt);
    localStorage.setItem('completed', JSON.stringify(new_arr));
    localStorage.setItem('tasks', JSON.stringify(tasklist));
    location.reload();
}

// completed list loop 
let com_arr = JSON.parse(localStorage.getItem("completed"));
for (let i = 0; i < com_arr.length; i++) {
    // class task div 
    let div = document.createElement("div");
    div.className = "task";

    // class todo span where the completed task is shown
    let span = document.createElement("span");
    span.className = "todo";

    // this is the div for the images used as a icon
    let divNested = document.createElement("div");
    divNested.className = "buttons";

    // completed  header showing
    header2c.style.display = 'block';

    // appending all the element together and adding innerHTML
    completed.appendChild(div);
    div.appendChild(span);
    span.innerText = com_arr[i];
    div.appendChild(divNested);
    divNested.innerHTML = `
    <div class="buttons">
        <div class="tooltip">
            <img class="icons c-undo" src="assets/undo.png" alt="undo"><span class="tooltiptext">Undo</span>
        </div>
        <div class= tooltip">
            <img class="icons c-delete" src="assets/delete.png" alt="undo"><span class="tooltiptext">Delete</span>
        </div>
    </div>`
}

// loop for completed task list 
for (let i = 0; i < com_arr.length; i++) {
    // delete button listner of completed section
    document.querySelectorAll('.c-delete')[i].addEventListener('click', () => {
        com_delete(i);
    })
    // undo button listner of completed section
    document.querySelectorAll('.c-undo')[i].addEventListener('click', () => {
        com_undo(i);
    })


}

// delete function on completed section
const com_delete = (i) => {
    // deleting from completed key
    let taskl = JSON.parse(localStorage.getItem('completed'));
    for (let j = i; j < (taskl.length - 1); j++) {
        let temp = taskl[j + 1];
        taskl[j + 1] = taskl[j];
        taskl[j] = temp;
    }
    taskl.pop();
    localStorage.setItem('completed', JSON.stringify(taskl));
    location.reload();
}

// undo button on completed section
const com_undo = (i) => {
    // first delete then adding to pending list (tasks key)
    let com_list = JSON.parse(localStorage.getItem('completed'));
    let pending_list = JSON.parse(localStorage.getItem('tasks'));
    for (let j = i; j < (com_list.length - 1); j++) {
        let temp = com_list[j + 1];
        com_list[j + 1] = com_list[j];
        com_list[j] = temp;
    }
    let completedt = com_list.pop();
    pending_list.push(completedt);
    localStorage.setItem('completed', JSON.stringify(com_list));
    localStorage.setItem('tasks', JSON.stringify(pending_list));
    location.reload();
}