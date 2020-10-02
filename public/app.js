$(function () {
  let websocket = new WebSocket("wss://" + window.location.host + "/websocket");
  let room = $("#chat-text");

  websocket.addEventListener("message", function (e) {
    let data = JSON.parse(e.data);
    let chatContent = `<p><strong>${data.username}</strong>: ${data.text}</p>`;

    room.append(chatContent);
    room.scrollTop = room.scrollHeight; // Auto scroll to the bottom
  });

  $("#input-form").on("submit", function (event) {
    event.preventDefault();
    let username = $("#input-username")[0].value;
    let text = $("#input-text")[0].value;
    websocket.send(
      JSON.stringify({
        username: username,
        text: text,
      })
    );
    $("#input-text")[0].value = "";
  });
});
