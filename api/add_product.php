<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['product_name'])
        && isset($_POST['product_code'])
        && isset($_POST['description'])
        && isset($_POST['category'])
        && isset($_POST['unit'])
        && isset($_POST['price'])
        && isset($_POST['brand'])) {

        $product_name = mysqli_real_escape_string($conn, $_POST['product_name']);
        $product_code = mysqli_real_escape_string($conn, $_POST['product_code']);
        $description = mysqli_real_escape_string($conn, $_POST['description']);
        $category = mysqli_real_escape_string($conn, $_POST['category']);
        $unit = mysqli_real_escape_string($conn, $_POST['unit']);
        $price = mysqli_real_escape_string($conn, $_POST['price']);
        $brand = mysqli_real_escape_string($conn, $_POST['brand']);
        $ID = uniqid();

        $sql = "INSERT INTO products (ID, product_name, product_code, description, category, unit, price, brand)
            VALUES ('$ID', '$product_name', '$product_code', '$description', '$category', '$unit', '$price', '$brand')";

        if ($conn->query($sql) === true) {
            echo json_encode("New product created successfully");
        } else {
            echo json_encode("Error: " . $sql . "<br>" . $conn->error);
        }

    } else {
        echo json_encode("Required values not set");
    }
}
