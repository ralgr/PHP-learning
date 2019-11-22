<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="_styles/styles.css" type="text/css" />
    <title>WAD Fansite</title>
</head>
<body>
    <article>
        <?php
            //Code to grab the id from the query string.
            $artist = $_GET["id"];

            //Echoes out a form.
            //Hidden field used to contain id to pass over to clientdownload.php.
            echo "<form method='post' action='_php/clientdownload.php'>";
            echo "<input name='username' type='text' placeholder='Username'>";
            echo "<input name='password' type='text' placeholder='Password'>";
            echo "<input name='artist' type='hidden' value='$artist'>";
            echo "<input type='submit' value='Log in'>";
            echo "</form>";
        ?>
    </article>
</body>
