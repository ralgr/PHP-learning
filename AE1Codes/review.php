<?php

  $poiId = $_POST["poiId"];
  $review = $_POST["type"];
  $username = $_SERVER["PHP_AUTH_USER"];
  $password = $_SERVER["PHP_AUTH_PW"];

  //Variable containing a PDO object that allows for the connection to the specified database.
  $dbConn = new PDO("mysql:host=localhost;dbname=dftitutorials", "dftitutorials", "dftitutorials");

  $securityQuery = "SELECT * FROM  poi_users WHERE username='$username' AND password = '$password')";
  $query = "INSERT INTO poi_reviews ('poi_id', 'review') VALUES ('$poiId', '$review')";

  $securityResult = $dbConn->query($securityQuery);

  if (!$securityResult) {
    header("HTTP/1.1 401 Unauthorized");
  } else {
    header("HTTP/1.1 200 OK");
    $dbConn->query($query);
  };
?>
