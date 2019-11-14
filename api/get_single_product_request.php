<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);

        $sql = "SELECT * FROM requests WHERE ID = '$ID'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $request = (object)array();
            $request->ID = $row["ID"];
            $request->product_name = $row["product_name"];
            $request->category = $row["category"];
            $request->date = $row["date"];

            echo json_encode($request);

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
