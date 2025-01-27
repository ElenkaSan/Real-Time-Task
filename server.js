const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Initialize socket.io with the server and configure CORS settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Path to the JSON file that will allowed to load tasks from the file (if it exists)
const tasksFile = path.join(__dirname, 'tasks.json');
let tasks = [];
if (fs.existsSync(tasksFile)) {
  const data = fs.readFileSync(tasksFile, 'utf8');
  tasks = JSON.parse(data);
}
function saveTasksToFile() {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send current tasks to the new client
  socket.emit("updateTasks", tasks);

  // Handle adding a new task
  socket.on("addTask", (task) => {
    tasks.push(task);
    io.emit("updateTasks", tasks); // Broadcast updated task list
    console.log(`Task added: ${JSON.stringify(tasks, null, 2)}`);
  });

  // Toggling task to update
  socket.on("toggleTask", (id) => {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    io.emit("updateTasks", tasks); // Broadcast updated task list
    console.log(`Task updated: ${JSON.stringify(tasks, null, 2)}`);
  });

  // Deleting a task
  socket.on("deleteTask", (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    io.emit("updateTasks", tasks); // Broadcast updated task list
    console.log(`Task deleted and left: ${JSON.stringify(tasks, null, 2)}`);
  });

  // Client disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log("WebSocket server is running on http://localhost:4000");
});
