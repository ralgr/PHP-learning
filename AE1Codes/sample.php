<?php
  //Header that specifies to the client that the results are in JSON format.
  header("Content-type: application/json");

  //Variables containing the user input for their desired region and POI type.
  $region = $_GET["region"];
  $type = $_GET["type"];

  //Variable containing a PDO object that allows for the connection to the specified database.
  $dbConn = new PDO("mysql:host=localhost;dbname=dftitutorials", "dftitutorials", "dftitutorials");

  //Variable containing the query to be sent to the database.
  //Only used for quality of life improvement.
  if (!$region && !$type) {
    $query = "SELECT * FROM annotations";
  } elseif (!$region && $type) {
    $query = "SELECT * FROM annotations WHERE type = '$type'";
  } elseif ($region && !$type) {
    $query = "SELECT * FROM annotations WHERE description = '$region'";
  } else {
    $query = "SELECT * FROM annotations WHERE type = '$type' AND description = '$region'";
  }//endIF

  //Variable containing the query command.
  $dbQuery = $dbConn->query($query);

  //Variable containing the fetch command which, will then populate variable with the query results.
  //The query results will be in the form of associative arrays.
  $resultsAsAssoc = $dbQuery->fetchAll(PDO::FETCH_ASSOC);

  //Code to transform the result into JSON format and echoing them out.
  echo json_encode($resultsAsAssoc);
?>
