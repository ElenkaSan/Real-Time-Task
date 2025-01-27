const { Server } = require("socket.io");
const { createServer } = require("http");
const Client = require("socket.io-client");

describe("WebSocket Server", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should add a task and broadcast updated tasks", (done) => {
    const tasks = [];
    const newTask = { id: 1, text: "Task 1", completed: false };

    serverSocket.on("addTask", (task) => {
      tasks.push(task);
      io.emit("updateTasks", tasks);
    });

    clientSocket.emit("addTask", newTask);
    clientSocket.on("updateTasks", (updatedTasks) => {
      expect(updatedTasks).toEqual([newTask]);
      done();
    });
  });
  
});
