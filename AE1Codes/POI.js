window.onload = function() {
  init();
};

function init() {
  var submitInput = document.querySelector("#submitInput");
  submitInput.addEventListener("click", sendAjax);
};

function sendAjax() {
  var regionInput = document.querySelector("#regionInput").value;
  var typeInput = document.querySelector("#typeInput").value;
  console.log(regionInput + " and " + typeInput);

  //Connection.
  var ajaxConnection = new XMLHttpRequest();

  //Callback function.
  ajaxConnection.addEventListener("load", e => {
    //Web service response. Parsed and contained in a variable.
    var poiResults = JSON.parse(e.target.responseText);

    poiResults.forEach(poi=>{
      //Variable containing the "p" element.
      var pElement = document.createElement("p");

      //[NOTE**]The text below is separated into multiple variables of text nodes
      //to implement <br> between them.
      //[NOTE**]The process below is repeated for all 4 text nodes.

      //Variable containing song title.
      var createTextTitle = document.createTextNode(`Desc: ${poi.description}`);
      //1. Adding the text node to createP variable.
      createP.appendChild(createTextTitle);
      //2. Adding <br> after the text node.
      createP.appendChild(document.createElement("br"));

      //Variable containing song artist.
      var createTextArtist = document.createTextNode(`Type: ${poi.type}`);
      createP.appendChild(createTextArtist);
      createP.appendChild(document.createElement("br"));

      //Variable containing song price.
      var createTextPrice = document.createTextNode(`Lat: ${poi.lat}`);
      createP.appendChild(createTextPrice);
      createP.appendChild(document.createElement("br"));

      //Variable containing song downloads.
      var createTextDownloads = document.createTextNode(`Lon: ${poi.lon}`);
      createP.appendChild(createTextDownloads);
      createP.appendChild(document.createElement("br"));

      var box = document.querySelector("#responseBox");
      box.appendChild(createP);
    }
    );
  });

  ajaxConnection.open("GET", `https://edward2.solent.ac.uk/~ktorres/TestDir/sample.php?type=${typeInput}&region=${regionInput}`);

  ajaxConnection.send();
};
