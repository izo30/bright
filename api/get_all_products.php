<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $products = array();

        while($row = $result->fetch_assoc()) {
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

            $products[] = $product;
        }

        echo json_encode($products);

    } else {
        echo json_encode("0 results");
    }
}
