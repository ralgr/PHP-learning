<?php
//==[VARIABLES]==
$name = $_POST["name"]; //Variables for POI details.
$type = $_POST["type"];
$country = $_POST["country"];
$region = $_POST["region"];
$lon = $_POST["lon"];
$lat = $_POST["lat"];
$desc = $_POST["desc"];
$dbConn = new PDO("mysql:host=localhost;dbname=ktorres;", "ktorres", "OhJee5ie"); //Database connection variable.
$query = "INSERT INTO pointsofinterest (name, type, country, region, lon, lat, description)
          VALUES ('$name', '$type', '$country', '$region', '$lon', '$lat', '$desc')"; //Query variable.

//==[ERR HANDLING]==
if ($name === "" || $type === "" || $country === "" || $region === "" || $desc === "") {
  header("HTTP/1.1 400 MISSING DATA");
} else {
  header("HTTP/1.1 200 OK");
  //==[EXECUTIONS]==
  $exeQuery = $dbConn->query($query); //Inserts to database.
}//endIf
?>
