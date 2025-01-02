document.addEventListener("DOMContentLoaded", () => {
  const storedtasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedtasks) {
    storedtasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});

let tasks = [];

const savetasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("task-input");
  const descriptionInput = document.getElementById("description-input");
  const text = taskInput.value.trim();
  const description = descriptionInput.value.trim();

  if (text) {
    tasks.push({ text, description, completed: false });
    taskInput.value = "";
    descriptionInput.value = "";

    updateTaskList();
    updateStats();
    savetasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  savetasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  savetasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("task-input");
  const descriptionInput = document.getElementById("description-input");
  taskInput.value = tasks[index].text;
  descriptionInput.value = tasks[index].description;

  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  savetasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progrsss");
  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTaskList = (filter = "all") => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filter === "incomplete") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${
                      task.completed ? "checked" : ""
                    } />
                    <p>${task.text}</p>
                    <span>${task.description}</span>
                </div>
                <div class="icons">
                    <img src="./editicon.png" onclick="editTask(${index})" />
                    <img src="./bin.png" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;
    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

// Filter buttons
document
  .getElementById("all-tasks")
  .addEventListener("click", () => updateTaskList("all"));
document
  .getElementById("completed-tasks")
  .addEventListener("click", () => updateTaskList("completed"));
document
  .getElementById("incomplete-tasks")
  .addEventListener("click", () => updateTaskList("incomplete"));

// Add task event
document.getElementById("newtask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
