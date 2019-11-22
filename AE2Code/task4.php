<?php
//==[VARIABLES]==
$poiId = $_POST["poiId"]; //ID of poi to be reviewed.
$poiReview = $_POST["poiReview"]; //Review of the poi.
$dbConn = new PDO("mysql:host=localhost;dbname=ktorres;", "ktorres", "OhJee5ie"); //Database conn variable.
$query = "INSERT INTO poi_reviews (poi_id, review)
          VALUES ('$poiId', '$poiReview')";

//==[ERR HANDLING & EXECUTIONS]==
if (!$poiId || !$poiReview) {
  header("HTTP/1.1 400 MISSING DATA");
} else {
  header("HTTP/1.1 200 OK");
  echo "Review for POI#$poiId submitted!";
  $exeQuery = $dbConn->query($query);
}
?>
