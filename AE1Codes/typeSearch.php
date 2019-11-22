<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div class="output">
    <ul>
      <?php
      $type = $_GET["type"];

      // Initialise the cURL connection
      $connection = curl_init();

      // Specify the URL to connect to - this can be PHP, HTML or anything else!
      curl_setopt($connection, CURLOPT_URL, "https://edward2.solent.ac.uk/~ktorres/TestDir/sample.php?type=" . $type);

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
      //Repeated as long as there are arrays
      for($i=0; $i<count($data); $i++)
      {
          //Associative arrays use non-numerical indexes, hence the second parameter
          //$data[$i] points toward what array of all the results to display
          //combined with the second parameter, this code points toward the appropriate data in the array
          echo "<li>";
          echo  "ID: " .$data[$i]["id"]."<br>";
          echo  "Title: " .$data[$i]["type"]."<br>";
          echo  "Lat: " .$data[$i]["lat"]."<br>";
          echo  "Lon: " .$data[$i]["lon"]."<br>";
          echo  "Chart: " .$data[$i]["chart"]."<br>";
          echo  "<a href='login.php?id=".$data[$i]["id"]."' target='_blank'><strong>Review!</strong></a>";
          echo "</li>";
      }
      ?>
    </ul>
  </div>
</body>
</html>
