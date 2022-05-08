<?php
$mysqli = new mysqli('localhost', 'root', '', 'irc');
$mysqli->set_charset('utf8');
$result = $mysqli->query("INSERT INTO irc(nick,color,text) values('".$_GET["nick"]."','".$_GET["color"]."','".$_GET["text"]."')");
?>