<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_SESSION['user_id'])) {

        $ID = $_SESSION['user_id'];

        $sql = "SELECT * FROM users WHERE ID = '$ID'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $user = (object)array();
            $user->ID = $row["ID"];
            $user->code = $row["code"];
            $user->full_name = $row["full_name"];
            $user->ID_number = $row["ID_number"];
            $user->phone = $row["phone"];
            $user->image = $row["image"];
            $user->date = $row["date"];

            echo json_encode($user);

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
