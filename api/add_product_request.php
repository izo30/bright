<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_SESSION['user_id'])
        && isset($_POST['product_name'])
        && isset($_POST['category'])) {

        $user_ID = $_SESSION['user_id'];
        $product_name = mysqli_real_escape_string($conn, $_POST['product_name']);
        $category = mysqli_real_escape_string($conn, $_POST['category']);
        $ID = uniqid();

        $sql = "INSERT INTO requests (ID, user_ID, product_name, category)
            VALUES ('$ID', '$user_ID', '$product_name', '$category')";

        if ($conn->query($sql) === true) {
            echo json_encode("New product request created successfully");
        } else {
            echo json_encode("Error inserting product request");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
