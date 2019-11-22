window.onload = function() {
  init();
};

function init() {
  var btn1 = document.querySelector("#btn1");
  btn1.addEventListener("click", sendAjax);
};

function sendAjax() {
  var artist = "abba";
  var user = "TimWilson";
  var pass = "egg882";
  var conn = new XMLHttpRequest();

  conn.addEventListener("load", e => {
    var messages = {401:"Unauthorized", 200: "OK"};
    var output = e.target.status;
    console.log(messages[output]);
  }
  );

  var data = new FormData();
  data.append("id", "2");

  conn.open("POST", `https://edward2.solent.ac.uk/~ktorres/week2php/downloadWebService.php`);

  conn.setRequestHeader("Authorization","Basic " + btoa(user+":"+pass));

  conn.send(data);
};
