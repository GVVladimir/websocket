const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", (ws) => {
  console.log("соединение установлено");
  ws.on("message", (message) => {
    console.log(`получено сообщение: ${message}`);


    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });
  ws.send("Добро пожаловать в наш чат!)))");
});
console.log("webSocket сервер запущен на localhost:8080");
