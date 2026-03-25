# Tech Stack:
HTML
CSS (Bootstrap required)
JavaScript 
localStorage 

## Question 1: Smart To-Do Manager
**Objective**

Build a modern To-Do Web App where users can manage tasks efficiently with priority, deadline, filtering, and sorting.

Mandatory Requirement

👉 Use Bootstrap (v5) for styling
👉 Use Debounce technique for input/search/filter operations

🧱 1. HTML Structure

Create the following UI:

App Title (e.g., Smart To-Do Manager)
Input field → Task Name
Dropdown → Priority (Low, Medium, High)
Date input → Deadline
Add Task Button
Filter Buttons:
All
Completed
Pending
Sorting Options:
Priority (High → Low)
Deadline (Nearest first)
Task Counter Section:
Total Tasks
Completed Tasks
Pending Tasks
Task List Container

2. CSS (Using Bootstrap)

Use Bootstrap components + utilities:

Centered layout using container, row, col
Use card for each task
Use badge for priority:
🟢 Low → bg-success
🟡 Medium → bg-warning
🔴 High → bg-danger
Completed task:
text-decoration-line-through
text-muted
Buttons:
btn btn-primary, btn btn-danger, etc.
Responsive design (mobile friendly)

3. JavaScript Functionality
🔹 Task Creation
Add task with:
Title
Priority
Deadline
 Prevent empty task
🔹 Task Actions

Each task must have:

 Complete Toggle
🗑 Delete Button
🔹 Filtering (WITH DEBOUNCE)
All Tasks
Completed Tasks
Pending Tasks

👉 Use debounce (300ms) when filtering/searching

🔹 Sorting
By Priority (High → Low)
By Deadline (Nearest first)
🔹 Task Counter

Display:

Total tasks
Completed tasks
Pending tasks
🔹 Overdue Highlight
If deadline < today → highlight task (e.g., red border)


