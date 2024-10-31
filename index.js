let userName = localStorage.getItem("userName");

if (!userName) {
  document.getElementById("messageInput").disabled = true;
  document.getElementById("sendButton").disabled = true;
}

document.getElementById("saveBtn").onclick = function () {
  const userInput = document.getElementById("userName").value.trim();
  if (userInput) {
    localStorage.setItem("userName", userInput);
    document.getElementById("messageInput").disabled = false;
    document.getElementById("sendButton").disabled = false;
    userName = userInput;
  }
};
const socket = new WebSocket(`ws:localhost:8080`);
socket.onopen = function (evant) {
  console.log("соединение установлено");
};

socket.onmessage = function (evant) {
  const data = JSON.parse(evant.data);
  const messageDiv = document.getElementById("messages");
  messageDiv.innerHTML += `<p><b>сообшение от ${data.user}:</b> ${data.content}</p>`;
  messageDiv.scrollTop = messageDiv.scrollHeight;
};

document.getElementById("sendButton").onclick = function (evant) {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  socket.send(JSON.stringify({ user: userName, content: message }));
  messageInput.value = "";
};
