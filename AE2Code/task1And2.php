<?php
  //Specifies to the client that the results are in JSON format.
  header("Content-type: application/json");

  //==[VARIABLES]==
  $dbConn = new PDO("mysql:host=localhost;dbname=ktorres;", "ktorres", "OhJee5ie");  //Database connection variable.
  $region = $_GET["region"]; //Region variable containing the POI region.
  $type = $_GET["type"]; //Type variable containing POI type.
  //If statement for the proper query.
  if (!$region && !$type) {
    $query = "SELECT * FROM pointsofinterest";  //Both region and type is NOT present.
  } elseif ($region && !$type) {
    $query = "SELECT * FROM pointsofinterest WHERE region='$region'"; //Only region is present.
  } elseif (!$region && $type) {
    $query = "SELECT * FROM pointsofinterest WHERE type='$type'"; //Only type is present.
  } elseif ($region && $type) {
    $query = "SELECT * FROM pointsofinterest WHERE region='$region' AND type='$type'"; //Both region and type is present.
  } //endIf

  //==[EXECUTIONS]==
  $exeQuery = $dbConn->query($query); //Executes the query to the database.
  $resultsAsAssocArray = $exeQuery->fetchAll(PDO::FETCH_ASSOC);//Fetch the results as associative arrays.
  if (count($resultsAsAssocArray) == 0) {
    header("HTTP/1.1 404 NOT FOUND");
  } else {
    header("HTTP/1.1 200 OK");
    echo json_encode($resultsAsAssocArray); //Transform the results into JSON format before echoing them out.
  }
?>
