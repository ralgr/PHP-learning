//=[GLOBAL VARIABLES]=
var map;
var markers = [];
var poiObject = [];
var geoJsonLayer;
var featureArray = [];

$(function(){
  $("#search").click(ajax);
  webMapping([50.908,-1.4], 14);
  geolocation();
  task10();
});

//==[PROMISE]==
function ajax() {
  var region = $("#region").val();
  var type = $("#type").val();
  var url = `task1And2.php?region=${region}&type=${type}`;

  //=[Promise code]=
  httpGet(url).then(ajaxOk).catch(ajaxFail);
};

//==[PROMISE FUNCTION]==
function httpGet(url) {
  return new Promise (
    function (resolve, reject) {
      var ajaxConn = new XMLHttpRequest(); //Ajax conn variable.
      ajaxConn.open('GET', url); //Opening connection to URL.
      ajaxConn.addEventListener("load", e=>{
        //=[VARIABLES]=
        var status = e.target.status; //HTTP code of the response.
        var response = e.target.responseText; //To make the results useable in javascript.

        if (status == 200) {
          resolve(JSON.parse(response));
        } else {
          reject(status);
        }//endIf
      });
      ajaxConn.send(); //Sending Ajax req.
    });
  };

//==[PROMISE: RESOLVE]==
function ajaxOk(poiFeature) {
  $(".searchResults").empty(); //Clears previous reslts.
  //For loop to show all results.
  for (var i = 0; i < poiFeature.length; i++) {
    var pos = [poiFeature[i].lat, poiFeature[i].lon];
    var poiEntity = $("<p></p>").html(`
        Name: ${poiFeature[i].name} <br>
        Type: ${poiFeature[i].type} <br>
        Region: ${poiFeature[i].region} <br>
        Country: ${poiFeature[i].country} <br>
        Longitude: ${poiFeature[i].lon} <br>
        Latitude: ${poiFeature[i].lat} <br>
        Description: ${poiFeature[i].description} <br>
        `);

    //Appending poi to the search results div.
    $(".searchResults").append(poiEntity);

    //==========[TASK 7 addition]===========
    if (!markers[poiFeature[i].ID]) {
      markers[poiFeature[i].ID] = L.marker(pos); //Saves poi marker into array.
    };

    //POI object to be indexed using its ID.
    //Used to bind proper information on markers.
    poiObject[poiFeature[i].ID] = {'name': poiFeature[i].name,
                                   'type': poiFeature[i].type,
                                   'region': poiFeature[i].region,
                                   'country': poiFeature[i].country,
                                   'lon': poiFeature[i].lon,
                                   'lat': poiFeature[i].lat,
                                   'description': poiFeature[i].description,
                                   'id': poiFeature[i].ID};
  };

  //Loop to display all markers in "markers" array.
  //Marker information comes from "poiObject" array.
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].addTo(map).bindPopup(`
        Name: ${poiObject[i].name} <br>
        Type: ${poiObject[i].type} <br>
        Region: ${poiObject[i].region} <br>
        Country: ${poiObject[i].country} <br>
        Longitude: ${poiObject[i].lon} <br>
        Latitude: ${poiObject[i].lat} <br>
        Description: ${poiObject[i].description} <br>
        <input type="hidden" id="poiId${poiObject[i].id}" value="${poiObject[i].id}">
        <input type="button" id="review${poiObject[i].id}" value="Give a review.">
        `); //Adds marker for every poi in array.
    };
  };
};

//==[PROMISE: REJECT]==
function ajaxFail(status) {
  var errMsg = {404:'Nothing found.'};
  $(".searchResults").html(errMsg[status]);
};

//=========================[TASK 7 and 9]==========================
//==[WEB MAPPING]==
function webMapping(mapPos, zoom) {
  //=[VARIABLES]=
  map = L.map("map1"); //Map object associated to div "map1".
  var attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence"; //Attrib. txt.

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: attrib}).addTo(map); //Setting the map layer.
  map.setView(mapPos, zoom); //Setting the initial map location.

  //=[TASK 9 addition]=
  //Async/await click event.
  //**[BUG] Pressing cancel on prompt will result in NULL but will still save the new POI.
  //**[STATUS] Not fixed.
  map.on("click", async e => {
    var url = "task3.php";
    var poiName = prompt("Name");
    var poiType = prompt("Type");
    var poiCountry = prompt("Country");
    var poiRegion = prompt("Region");
    var poiDesc = prompt("Description");
    var poiLat = e.latlng.lat;
    var poiLon = e.latlng.lng;
    var status = await addNewPoi(url, poiName, poiType, poiCountry, poiRegion, poiDesc, poiLat, poiLon); //await code to result in HTTP code.
    var errMsg = {400:'Missing data.', 200:'Location saved.'}; //Messages to be displayed depending on code.

    if (status == 200) {
      L.marker([poiLat, poiLon]).addTo(map).bindPopup(`
        Name: ${poiName} <br>
        Type: ${poiType} <br>
        Region: ${poiRegion} <br>
        Country: ${poiCountry} <br>
        Longitude: ${poiLon} <br>
        Latitude: ${poiLat} <br>
        Description: ${poiDesc} <br>
        `); //Binds a popup containing poi info.
      alert(errMsg[status]);
    } else {
      alert(errMsg[status] + " Please try again.");
    }
  });
};

//=[TASK 9 PROMISE]=
//Used in async/await click event on leaflet.
function addNewPoi(url, poiName, poiType, poiCountry, poiRegion, poiDesc, poiLat, poiLon) {
  return new Promise( function(resolve, reject) {
    var ajaxCon = new XMLHttpRequest(); //Ajax connection variable.
    var poiData = new FormData(); //Data to be sent to task3.php.
    poiData.append("name", poiName);
    poiData.append("type", poiType);
    poiData.append("country", poiCountry);
    poiData.append("region", poiRegion);
    poiData.append("desc", poiDesc);
    poiData.append("lat", poiLat);
    poiData.append("lon", poiLon);

    ajaxCon.open('POST', url); //Opening connection
    ajaxCon.addEventListener("load", e => {
      var status = e.target.status;
      resolve(status);
    });
    ajaxCon.send(poiData);
  });
};

//==[GEOLOCATION]==
function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (processPosition, handleError);
  } else {
    alert("Geolocation not available.");
  }
};

//==[GEOLOCATION: POS]==
function processPosition(gpspos) {
  var lat = gpspos.coords.latitude; //latitude.
  var lon = gpspos.coords.longitude; //Longitude.
  var zoom = 14; //Zoom level.

  map.setView([lat, lon], zoom); //Re-set the map position.
};

//==[GEOLOCATION: ERR]==
function handleError(err) {
  var errMsg = {1: 'Location access denied.', 2: 'Location unavailable.', 3: 'Network timeout.'};
  alert(errMsg[err.code]);
}

//==[TASK 10 addition]==
function task10() {
    //Map bounds on drag end.
  map.on("dragend", onDragEnd => {
    var west= map.getBounds().getSouthWest().lng;
    var south= map.getBounds().getSouthWest().lat;
    var east = map.getBounds().getNorthEast().lng;
    var north= map.getBounds().getNorthEast().lat;
    var url = `task10.php?bbox=${east}, ${south}, ${west}, ${north}`;
    geoJsonLayer = new L.GeoJSON(null, {onEachFeature: (feature,layer) => {
                        layer.bindPopup(`Name: ${feature.properties.name} <br>
                                         Type: ${feature.properties.type} <br>
                                         Region: ${feature.properties.region} <br>
                                         Country: ${feature.properties.country} <br>
                                         Longitude: ${feature.properties.lon} <br>
                                         Latitude: ${feature.properties.lat} <br>
                                         Description: ${feature.properties.desc} <br>
                                         <input type="hidden" id="poiId${feature.properties.id}" value="${feature.properties.id}">
                                         <input type="button" id="review${feature.properties.id}" value="Give a review.">
                                         `).addTo(map);
                      }
                    }); //GeoJson layer variable.

    //=[geoJson Promise]=
    geoJsonGet(url).then(geoJsonOk);
  });
};

//==[TASK10 GEOJSON PROMISE]==
function geoJsonGet(url) {
  return new Promise(function(resolve, reject) {
    var ajaxCon = new XMLHttpRequest();
    ajaxCon.open('GET', url);
    ajaxCon.addEventListener("load", e => {
      var feature = JSON.parse(e.target.responseText);
      var status = e.target.status;

      if (status == 200) {
        resolve(feature, status);
      }; //endIf
    });
    ajaxCon.send();
  });
};

//==[TASK10 GEOJSON PROMISE: RESOLVE]==
function geoJsonOk(feature, status) {
  for (var i = 0; i < feature.features.length; i++) {
    if (!featureArray[i]) {
      featureArray[i] = feature.features[i];
      geoJsonLayer.addData(feature.features[i]);
    }; //endIf
  };
};

//==[TASK 11 addition]==
//**[STATUS] Not working. Ironically.
function review() {
  console.log("Works");
};

function httpReview(url) {
  return new Promise (function(resolve, reject) {
    var ajaxCon = new XMLHttpRequest;
    var reviewData = new FormData();
    reviewData.append("poi_id", poiId);
    reviewData.append("review", review);

    ajaxCon.open("POST", url);
    ajaxCon.addEventListener("load", e=> {
      var status = e.target.status;
    });
    ajaxCon.send(reviewData);
  });
};
