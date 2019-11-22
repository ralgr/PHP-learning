<?php
  //==[VARIABLES]==
  $dbConn = new PDO("mysql:host=localhost;dbname=dftitutorials;", "dftitutorials", "dftitutorials");  //Database connection variable.
  $region = $_GET["region"]; //Region variable containing the POI region.
  $type = $_GET["type"]; //Type variable containing POI type.
  //If statement for the proper query.
  if (!$region && !$type) {
    $query = "SELECT * FROM annotations";  //Both region and type is NOT present.
  } elseif ($region && $type) {
    $query = "SELECT * FROM annotations WHERE description='$region' AND type='$type'"; //Both region and type is present.
  } elseif ($region && !$type) {
    $query = "SELECT * FROM annotations WHERE description='$region'"; //Only region is present.
  } elseif (!$region && $type) {
    $query = "SELECT * FROM annotations WHERE type='$type'"; //Only type is present.
  } //endIf

  //==[EXECUTIONS]==
  $exeQuery = $dbConn->query($query); //Executes the query to the database.
  $resultsAsAssocArray = $exeQuery->fetchAll(PDO::FETCH_ASSOC);//Fetch the results as associative arrays.
  echo json_encode($resultsAsAssoc); //Transform the results into JSON format before echoing them out.
?>
