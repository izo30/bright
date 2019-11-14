<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])
        && isset($_POST['product_name'])
        && isset($_POST['product_code'])
        && isset($_POST['description'])
        && isset($_POST['category'])
        && isset($_POST['unit'])
        && isset($_POST['price'])
        && isset($_POST['brand'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);
        $product_name = mysqli_real_escape_string($conn, $_POST['product_name']);
        $product_code = mysqli_real_escape_string($conn, $_POST['product_code']);
        $description = mysqli_real_escape_string($conn, $_POST['description']);
        $category = mysqli_real_escape_string($conn, $_POST['category']);
        $unit = mysqli_real_escape_string($conn, $_POST['unit']);
        $price = mysqli_real_escape_string($conn, $_POST['price']);
        $brand = mysqli_real_escape_string($conn, $_POST['brand']);

        $id_exists = "SELECT * FROM products WHERE ID = '$ID'";
        $result = $conn->query($id_exists);

        // If ID exists
        if ($result->num_rows > 0) {
            $sql = "UPDATE products
                SET
                product_name='$product_name',
                product_code='$product_code',
                description='$description',
                category='$category',
                unit='$unit',
                price='$price',
                brand='$brand'
                WHERE ID='$ID'";

            if ($conn->query($sql) === true) {
                echo json_encode("Record updated successfully");
            } else {
                echo json_encode("Error updating product");
            }
        } else {
            echo json_encode("Id provided is invalid");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
