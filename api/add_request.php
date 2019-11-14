<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['request_ID'])
        && isset($_POST['product_name'])
        && isset($_POST['product_code'])
        && isset($_POST['description'])
        && isset($_POST['category'])
        && isset($_POST['unit'])
        && isset($_POST['price'])
        && isset($_POST['brand'])) {

        $request_ID = mysqli_real_escape_string($conn, $_POST['request_ID']);
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
            $sql = "DELETE FROM  requests WHERE ID = '$request_ID'";
            $result = $conn->query($sql);

            if ($result === true) {
                echo json_encode("New product created successfully and request deleted successfully");
            } else {
                echo json_encode("New product created successfully but error deleting record");
            }
        } else {
            echo json_encode("Error inserting requested product");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
