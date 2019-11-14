<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $users = array();

        while($row = $result->fetch_assoc()) {
            $user = (object) array();
            $user->ID = $row["ID"];
            $user->code = $row["code"];
            $user->full_name = $row["full_name"];
            $user->ID_number = $row["ID_number"];
            $user->phone = $row["phone"];
            $user->status = $row["status"];
            $user->date = $row["date"];

            $users[] = $user;
        }

        echo json_encode($users);

    } else {
        echo json_encode("0 results");
    }
}
