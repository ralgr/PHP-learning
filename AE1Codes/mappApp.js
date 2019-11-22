//Global variabes.
var map;
var mapResponseBox;
var responseBox;
var poiId;

//Executes functions on-load.
window.onload = function() {
  map = L.map("map1");
  mapResponseBox = document.querySelector("#mapBox");
  responseBox = document.querySelector("#responseBox");
  init()
};

function init() {
  poiSearch();
  poiGeolocation();
  webMapping([51, -1.4], 14);
};

//==========================[WEB MAPPING]=============================
function webMapping(mapPos, zLevel) {

  //==[VARIABLES]==
  //Variable containing the attribution text shown in the map.
  var attribution = "Map data copyright OpenStreetMap contributors, Open Database License";

  //Sets up the map layer.
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: attribution}
  ).addTo(map);

  map.setView(mapPos, zLevel);
};

//==========================[WEB MAPPING: MARKERS ON MAP ON SEARCH]=============================
function localMarker(lat, lon, type, desc) {
  var poiCoords = [lat, lon];

  var marker = L.marker(poiCoords).addTo(map);
  marker.bindPopup(
    "Type: " + type + "<br>" +
    "Description: " + desc + "<br>" +
    "Latitude: " + lat + "<br>" +
    "Longitude: " + lon
  );
};

//==========================[POI SEARCH]=============================
function poiSearch() {
  var submitInput = document.querySelector("#submitInput");
  submitInput.addEventListener("click", sendAjax);
};

//==========================[POI SEARCH: SEND AJAX]=============================
function sendAjax() {
  var indexedPoi = [];
  var regionInput = document.querySelector("#regionInput").value;
  var typeInput = document.querySelector("#typeInput").value;
  console.log(regionInput + " and " + typeInput);

  //Clear previous results if any.
  //Variable to select all <p> elements.
  var children = responseBox.querySelectorAll("p");
  //Code to recursively delete them.
  for (var i = 0; i < children.length; i++) {
    responseBox.removeChild(children[i]);
  };

  //Connection.
  var ajaxConnection = new XMLHttpRequest();

  //Callback function.
  ajaxConnection.addEventListener("load", e => {
    //Web service response. Parsed and contained in a variable.
    var poiResults = JSON.parse(e.target.responseText);

    for (var i = 0; i < poiResults.length; i++) {
      //==[VARIABLES]==
      //Response <div>.
      var box = document.querySelector("#responseBox");
      //<p> element.
      var pElement = document.createElement("p");
      //Hidden field.
      var hField = document.createElement("input");
      hField.type = "hidden";
      hField.id = `poiId${poiResults[i].id}`;
      hField.value = poiResults[i].id;
      //Text nodes.
      var createTextDesc = document.createTextNode(`Desc: ${poiResults[i].description}`);
      var createTextType = document.createTextNode(`Type: ${poiResults[i].type}`);
      var createTextLat = document.createTextNode(`Lat: ${poiResults[i].lat}`)
      var createTextLon = document.createTextNode(`Lon: ${poiResults[i].lon}`);
      //Review button.
      var reviewBtn = document.createElement("input");
      reviewBtn.id = `reviewBtn${poiResults[i].id}`;
      reviewBtn.value = "Give a review";
      reviewBtn.type = "button";

      //[NOTE**]The process below is repeated for all text nodes.
      //1. Adding the text node to pElement variable.
      //2. Adding <br> after the text node.

      //==[APPENDING CHILDREN]==
      pElement.appendChild(hField);
      pElement.appendChild(createTextDesc);
      pElement.appendChild(document.createElement("br"));
      pElement.appendChild(createTextType);
      pElement.appendChild(document.createElement("br"));
      pElement.appendChild(createTextLat);
      pElement.appendChild(document.createElement("br"));
      pElement.appendChild(createTextLon);
      pElement.appendChild(document.createElement("br"));
      pElement.appendChild(reviewBtn);
      box.appendChild(pElement);

      //Show marker on map.
      localMarker(poiResults[i].lat, poiResults[i].lon, poiResults[i].type, poiResults[i].description);
      //Opens review window.
      indexedPoi[i] = poiResults[i].id;
    }//endFOr
    poiRev(indexedPoi);
  });

  ajaxConnection.open(
    "GET",
    `https://edward2.solent.ac.uk/~ktorres/TestDir/sample.php?type=${typeInput}&region=${regionInput}`
  );

  ajaxConnection.send();
};

//==========================[REVIEW FUNCTION]=============================
function poiRev (indexedPoi) {
  if (mapResponseBox.querySelector("#formContent")) {
    var reviewForm = mapResponseBox.querySelector("#formContent");
    mapResponseBox.removeChild(reviewForm);
  };

  indexedPoi.forEach (poiId=>{
    document.querySelector(`#reviewBtn${poiId}`).addEventListener("click", reviewPoi=> {
      //==[VARIABLES]==
      //POI id taken from hFIeld.
      //poiId = document.querySelector(`#poiId${poiId}`).value;
      //#mapBox div.
      var mapBox = document.querySelector("#mapBox");
      //Create <div>.
      var formContent = document.createElement("div");
      formContent.style.cssText = "z-index: -9999; background-color: silver; margin: 10% auto; padding: 1em; border: 1px solid black; width: 20%;";
      formContent.id = "formContent";
      //Create button.
      var spanBtn = document.createElement("span");
      spanBtn.style.cssText = "font-size: 2em; float: right;";
      var closeBtn = document.createTextNode("\u00D7");
      //Create instruction text.
      var pElement = document.createElement("p");
      var pText = document.createTextNode("Review Form");
      var pText2 = document.createTextNode(`POI # ${poiId}`);
      //Input elements.
      var inputDetails = document.createElement("input");
      inputDetails.id = `review${poiId}`;
      inputDetails.type = "text";
      inputDetails.placeholder = "POI review";
      var formSubmit = document.createElement("input");
      formSubmit.type = "button";
      formSubmit.value = "Submit";
      formSubmit.id = `submitPoi${poiId}`;



      //==[APPEND CHILDREN]==
      mapBox.appendChild(formContent);
      spanBtn.appendChild(closeBtn);
      formContent.appendChild(spanBtn);
      pElement.appendChild(pText);
      pElement.appendChild(document.createElement("br"));
      pElement.appendChild(pText2);
      formContent.appendChild(spanBtn);
      formContent.appendChild(pElement);
      formContent.appendChild(inputDetails);
      formContent.appendChild(formSubmit);

      spanBtn.addEventListener("click", close=>{
        var reviewForm = mapResponseBox.querySelector("#formContent");
        mapResponseBox.removeChild(reviewForm);
      });

      var revFormSubmit = document.querySelector(`#submitPoi${poiId}`);
      revFormSubmit.addEventListener("click", sendRevFormAjax=> {
        var user = "TimWilson";
        var pass = "egg882";
        var poiReview = document.querySelector(`#review${poiId}`).value;
        var reviewData = new FormData();
        reviewData.append("id", poiId);
        reviewData.append("review", poiReview);

        console.log("poiId: " + poiId + "Rev: " + poiReview);

        var ajaxConnection = new XMLHttpRequest();

        ajaxConnection.addEventListener("load", e=>{
          var httpResponse = {401: "Unauthorized", 200: "OK"}
          alert(httpResponse[e.target.status]);
        });

        ajaxConnection.open("POST", `https://edward2.solent.ac.uk/~ktorres/TestDir/review.php`);

        ajaxConnection.setRequestHeader("Authorization","Basic " + btoa(user+":"+pass));

        ajaxConnection.send(reviewData);
      });
    });
});
};

//==========================[GEOLOCATION]=============================
function poiGeolocation() {
  var geolocation = navigator.geolocation;

  if (geolocation) {
    geolocation.getCurrentPosition(
      processPosition,
      handleError
    );
  } else {
    alert("Geolocation is not available on this device.");
  }//endIF
};

function processPosition(gpsPos) {
  webMapping([gpsPos.coords.latitude, gpsPos.coords.longitude], 14);
};

function handleError(err) {
  alert(`Error code: ${err.code}`);
};


// //Username and Password.
// var username = "TimWilson";
// var password = "egg882";
// //AJAX for reviewBtn.
// var reviewAjax = new XMLHttpRequest();
//
// //Review callback function.
// reviewAjax.addEventListener("load", e=> {
//
// }
// );
//
// var idData = new FormData();
// data.append("id", poi.id);
// data.append("review", poi.id);
//
// reviewAjax.open("POST", `https://edward2.solent.ac.uk/~ktorres/TestDir/review.php`);
//
// reviewAjax.setRequestHeader("Authorization","Basic " + btoa(username+":"+password));
//
// reviewAjax.send(idData);
