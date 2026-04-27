const rows = 20;
const cols = 20;

let grid = [];
let mode = "wall";

let start = [0, 0];
let end = [19, 19];

const container = document.getElementById("grid");

// Initialize grid
function initGrid() {
  container.innerHTML = "";
  grid = [];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.addEventListener("click", () => handleClick(r, c, cell));

      container.appendChild(cell);
      row.push(0);
    }
    grid.push(row);
  }

  paintCell(start, "start");
  paintCell(end, "end");
}

// Handle user click
function handleClick(r, c, cell) {
  if (mode === "wall") {
    grid[r][c] = grid[r][c] === 1 ? 0 : 1;
    cell.classList.toggle("wall");
  }

  if (mode === "start") {
    clearClass("start");
    start = [r, c];
    cell.classList.add("start");
  }

  if (mode === "end") {
    clearClass("end");
    end = [r, c];
    cell.classList.add("end");
  }
}

// Utility
function paintCell([r, c], className) {
  const index = r * cols + c;
  container.children[index].classList.add(className);
}

function clearClass(className) {
  document.querySelectorAll("." + className)
    .forEach(el => el.classList.remove(className));
}

function setMode(m) {
  mode = m;
}

// BFS Algorithm
async function runBFS() {
  const queue = [start];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = {};

  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const [r, c] = queue.shift();

    if (r === end[0] && c === end[1]) break;

    for (let [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 && nc >= 0 &&
        nr < rows && nc < cols &&
        !visited[nr][nc] &&
        grid[nr][nc] === 0
      ) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
        parent[`${nr},${nc}`] = [r, c];

        markVisited(nr, nc);
        await sleep(10);
      }
    }
  }

  await drawPath(parent);
}

// Animate visited nodes
function markVisited(r, c) {
  const index = r * cols + c;
  const cell = container.children[index];

  if (!cell.classList.contains("start") &&
      !cell.classList.contains("end")) {
    cell.classList.add("visited");
  }
}

// Draw final path
async function drawPath(parent) {
  let cur = end;

  while (parent[`${cur[0]},${cur[1]}`]) {
    const [r, c] = cur;

    const index = r * cols + c;
    const cell = container.children[index];

    if (!cell.classList.contains("end")) {
      cell.classList.add("path");
    }

    cur = parent[`${cur[0]},${cur[1]}`];
    await sleep(30);
  }
}

// Reset
function resetGrid() {
  initGrid();
}

// Delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Init
initGrid();