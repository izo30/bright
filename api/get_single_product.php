<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);

        $sql = "SELECT * FROM products WHERE ID = '$ID'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $product = (object)array();
            $product->ID = $row["ID"];
            $product->product_name = $row["product_name"];
            $product->product_code = $row["product_code"];
            $product->description = $row["description"];
            $product->category = $row["category"];
            $product->unit = $row["unit"];
            $product->price = $row["price"];
            $product->brand = $row["brand"];
            $product->date = $row["date"];

            echo json_encode($product);

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
