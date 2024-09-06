
const addtBtn = document.getElementById("add-btn");
const taskInp = document.getElementById("task-inp");
const taskDate = document.getElementById("task-date");
const taskContainer = document.querySelector(".tasks");

let Alltasks = JSON.parse(localStorage.getItem('newTask')) || [];

addtBtn.addEventListener('click', () => {
  let newTask = {
    taskText: taskInp.value,
    date: taskDate.value,
    done: false, 
  };
  
  if (taskInp.value != '') {
    Alltasks.push(newTask);
    taskInp.value = "";
    taskDate.value = "";
  } else {
    alert(`No data Entered`);
  }

  localStorage.setItem('newTask', JSON.stringify(Alltasks));
  showTasks();
});

function showTasks() {
  let taskCard = "";

  Alltasks.forEach((newTask, index) => {
    taskCard += `
      <div class="task-group ${newTask.done ? 'done' : ''}" data-index="${index}">
          <span class="task-num">${index + 1}</span>
          <h3>${newTask.taskText}</h3>
          <div>
            <h4>Date: ${newTask.date}</h4>
            <h4><input type="checkbox" name="check" class="check" ${newTask.done ? 'checked' : ''} data-index="${index}"> Done</h4>
            <button class="btn delet-btn" type="button" data-index="${index}">Delete</button>
          </div>
      </div>`;
  });

  taskContainer.innerHTML = taskCard;

  // Attach event listeners to checkboxes
  const checkboxes = document.querySelectorAll('.check');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkTask);
  });

  // Attach event listeners to delete buttons
  const deleteBtns = document.querySelectorAll('.delet-btn');
  deleteBtns.forEach(button => {
    button.addEventListener('click', deleteTask);
  });
}

// Function to check/uncheck the task
function checkTask(event) {
  const index = event.target.getAttribute('data-index');
  Alltasks[index].done = event.target.checked;

  localStorage.setItem('newTask', JSON.stringify(Alltasks));
  showTasks();
}

// Function to delete a task
function deleteTask(event) {
  const index = event.target.getAttribute('data-index');
  Alltasks.splice(index, 1);

  localStorage.setItem('newTask', JSON.stringify(Alltasks));
  showTasks();
}

showTasks();
