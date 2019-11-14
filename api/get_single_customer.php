<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);

        $sql = "SELECT * FROM customers WHERE ID = '$ID'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $customer = (object)array();
            $customer->ID = $row["ID"];
            $customer->full_name = $row["full_name"];
            $customer->shop_name = $row["shop_name"];
            $customer->phone = $row["phone"];
            $customer->location = $row["location"];
            $customer->nature = $row["nature"];
            $customer->date = $row["date"];

            echo json_encode($customer);

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
