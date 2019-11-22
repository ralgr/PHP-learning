<?php
//==[VARIABLES]==
$type = $_GET["poiType"];

//==[CURL]==
$curlConn = curl_init(); //Initialise connection.
//=[CURL settings]=
curl_setopt($curlConn, CURLOPT_URL, "https://edward2.solent.ac.uk/~ktorres/AE2/task1And2.php?type=" . $type); //Specify the URL to connect to.
curl_setopt($curlConn,CURLOPT_RETURNTRANSFER,1); //Ensures that the HTTP response is *returned* from curl_exec() rather than being output to screen.
curl_setopt($curlConn,CURLOPT_HEADER, 0); //Do not include the HTTP header in the response.
//=[CURL execution]=
$response = curl_exec($curlConn); //Executes connetion.
curl_close($curlConn); //Closes connection.

$data = json_decode($response, true); //Decoding result for use in php.

//For loop to show all results.
for($i=0; $i<count($data); $i++)
{
  echo "<li>";
  echo  "Name: " .$data[$i]["name"]."<br>";
  echo  "Type: " .$data[$i]["type"]."<br>";
  echo  "Region: " .$data[$i]["region"]."<br>";
  echo  "Country: " .$data[$i]["country"]."<br>";
  echo  "Longitude: " .$data[$i]["longitude"]."<br>";
  echo  "Latitude: " .$data[$i]["latitude"]."<br>";
  echo  "Description: " .$data[$i]["description"]."<br>";
  echo  "<form action='task4.php' method='POST'>";
  echo  "<input type='hidden' name='poiId' value='".$data[$i]["ID"]."'>";
  echo  "<input type='text' name='poiReview' placeholder='Enter review.'>";
  echo  "<input type='submit' name='submit' value='Submit'>";
  echo  "</form>";
  echo  "</li>";
}
?>
