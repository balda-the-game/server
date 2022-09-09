const socket = io();

function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById("input");
  socket.emit("message", input.value);
}

document.getElementById("btn").addEventListener("click", sendMessage);

socket.on("message", msg => {
  console.log(msg);
  document.querySelector("h2").innerHTML = msg;
});