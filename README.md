## Getting Started with Real-Time-Task_websocket-server

```
├── Real-Time-Task_websocket-server/    # Contains WebSocket server
│   ├── server.js                       # Node.js WebSocket server
│   ├── package.json                    # Dependencies for the WebSocket server
|   |── package-lock.json 
│   └── node_modules/                   # Installed Node.js packages

```

### Project Setup
In the project directory, you run:

```
npm install
# or
yarn install
```

In two terminals:
Run the WebSocket server 

```
node server.js
```
The WebSocket server is running on http://localhost:4000 - you will see `Cannot GET /` -> it's correct, the WebSocket server logs a message like Client connected: <socket-id> you will see in the terminal after adding task will see `Task added: { text: "New Task", completed: false }` and etc.

Second terminal -> [Real-Time-Task Collaboration React App](https://github.com/ElenkaSan/Real-Time-Task_ReactApp)
Start your React app 

```
npm start
```

You should see once everything is running in the shell
<img width="927" alt="Screenshot 2025-01-27 at 1 26 45 AM" src="https://github.com/user-attachments/assets/bed565f3-5e19-4cc3-b290-7e4cbbcb0b9a" />
