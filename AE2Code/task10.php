<?php
  header("Content-type: application/json");
  list($west, $south, $east, $north) = explode(",", $_GET["bbox"]);

  $conn = new PDO("mysql:host=localhost;dbname=ktorres;", "ktorres","OhJee5ie");

  $result = $conn->query("SELECT * FROM pointsofinterest WHERE (lon BETWEEN '$east' AND '$west') AND (lat BETWEEN '$south' AND '$north')");
  $resultsAsAssocArray = $result->fetchAll(PDO::FETCH_ASSOC);

  $geoJSON = array(
    'type' => 'FeatureCollection',
    'features' => array()
  );

  for ($i=0; $i < count($resultsAsAssocArray); $i++) {
      $geoJSONFeature = array(
        'type' => 'Feature',
        'geometry' => array(
          'type' => 'Point',
          'coordinates' => array(
            $resultsAsAssocArray[$i]["lon"], $resultsAsAssocArray[$i]["lat"]
          )
        ),
        'properties' => array(
          'name' => $resultsAsAssocArray[$i]["name"],
          'type' => $resultsAsAssocArray[$i]["type"],
          'region' => $resultsAsAssocArray[$i]["region"],
          'country' => $resultsAsAssocArray[$i]["country"],
          'lon' => $resultsAsAssocArray[$i]["lon"],
          'lat' => $resultsAsAssocArray[$i]["lat"],
          'desc' => $resultsAsAssocArray[$i]["description"],
          'id' => $resultsAsAssocArray[$i]["ID"]
        )
      );

      array_push($geoJSON["features"], $geoJSONFeature);
  };

  header("HTTP/1.1 200 OK");
  echo json_encode($geoJSON);
?>
