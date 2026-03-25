let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskList = document.getElementById("taskList");
const sortOption = document.getElementById("sortOption");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

function debounce(fn, delay = 300) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), delay);
  };
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  if (!title) return alert("Task cannot be empty");

  tasks.push({
    id: Date.now(),
    title,
    priority,
    deadline,
    completed: false
  });

  form.reset();
  saveTasks();
  renderTasks();
});


function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function priorityValue(p) {
  return { High: 3, Medium: 2, Low: 1 }[p];
}

function renderTasks() {
  let filtered = [...tasks];

  if (currentFilter === "completed") {
    filtered = filtered.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filtered = filtered.filter(t => !t.completed);
  }

  if (sortOption.value === "priority") {
    filtered.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
  } else if (sortOption.value === "deadline") {
    filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  taskList.innerHTML = "";

  filtered.forEach(task => {
    const isOverdue = task.deadline && new Date(task.deadline) < new Date();

    const div = document.createElement("div");
    div.className = `card mb-2 ${isOverdue ? "border-danger" : ""}`;

    div.innerHTML = `
      <div class="card-body d-flex justify-content-between">
        <div>
          <h5 class="${task.completed ? "text-decoration-line-through text-muted" : ""}">
            ${task.title}
          </h5>

          <span class="badge ${
            task.priority === "High" ? "bg-danger" :
            task.priority === "Medium" ? "bg-warning" :
            "bg-success"
          }">${task.priority}</span>

          <small class="ms-2">${task.deadline || ""}</small>
        </div>

        <div>
          <button class="btn btn-success btn-sm" onclick="toggleTask(${task.id})">✅</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      </div>
    `;

    taskList.appendChild(div);
  });

  updateCounters();
}

function updateCounters() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(t => t.completed).length;
  pendingCount.textContent = tasks.filter(t => !t.completed).length;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", debounce(() => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  }));
});

sortOption.addEventListener("change", debounce(renderTasks));

renderTasks();