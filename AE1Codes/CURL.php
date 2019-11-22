<?php
$connection = curl_init();
curl_setopt($connection, CURLOPT_URL, 'https://edward2.solent.ac.uk/~ktorres/TestDir/regionAndType.html');
curl_exec($connection);
?>

<!-- $connection = curl_init();

// Specify the URL to connect to - this can be PHP, HTML or anything else!
curl_setopt($connection, CURLOPT_URL, "https://url.co.uk/htwebservice.php?type=" . $type);


// This option ensures that the HTTP response is *returned* from curl_exec(),
// (see below) rather than being output to screen.
curl_setopt($connection,CURLOPT_RETURNTRANSFER,1);

// Do not include the HTTP header in the response.
curl_setopt($connection,CURLOPT_HEADER, 0);

// Actually connect to the remote URL. The response is
// returned from curl_exec() and placed in $response.
$response = curl_exec($connection);

// Close the connection.
curl_close($connection);

// Echo the response back from the server (for illustration purposes)
//echo $response;

//Putting json_decoded $response into $data for echoing
//"true" parameter to convert JSON object to associative array
$data = json_decode($response, true);

//Code to echo out associative array according to desired index
for($i=0; $i<count($data); $i++)
{
    //Associative arrays use non-numerical indexes, hence the second parameter
    //$data[$i] points toward what array of all the results to display
    //combined with the second parameter, this code points toward the appropriate data in the array
    echo "<p>"
    echo  "Type: " .$data[$i]["type"]."<br>";
    echo  "Country: " .$data[$i]["country"]."<br>";
    echo  "Region: " .$data[$i]["region"]."<br>";
    echo  "Latitude: " .$data[$i]["lat"]."<br>";
    echo  "Longitude: " .$data[$i]["lon"]."<br>";
    echo "</p>"
} -->
