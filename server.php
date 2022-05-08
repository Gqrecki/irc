<?php
$time = time();
$mysqli = new mysqli('localhost', 'root', '', 'irc');
$mysqli->set_charset('utf8');
$result = $mysqli->query("SELECT max(ID) as ID FROM irc");
$rows = $result->fetch_all(MYSQLI_ASSOC);
$id = $rows[0]["ID"];
$mysqli->query("DELETE FROM irc WHERE time < NOW() - 60");
while(time()-$time<=5){
    $result = $mysqli->query("SELECT max(ID) as ID FROM irc");
    $rows = $result->fetch_all(MYSQLI_ASSOC);
    $newid = $rows[0]["ID"];
    if($id < $newid){
        $result2 = $mysqli->query("SELECT * FROM irc WHERE ID>=$newid");
        $rows2 = $result2->fetch_all(MYSQLI_ASSOC);
        echo json_encode($rows2);
        break;
    }
    usleep(10000);
}
?>