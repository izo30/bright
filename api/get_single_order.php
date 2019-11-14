<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);

        $sql = "SELECT orders.ID, customers.full_name, orders.customer_ID, products.product_name, products.price, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
            FROM orders
            INNER JOIN customers ON orders.customer_ID=customers.ID
            INNER JOIN products ON orders.product_ID=products.ID
            WHERE orders.ID = '$ID'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $order = (object) array();
            $order->ID = $row["ID"];
            $order->customer_ID = $row["customer_ID"];
            $order->product_ID = $row["product_ID"];
            $order->full_name = $row["full_name"];
            $order->product_name = $row["product_name"];
            $order->price = $row["price"];
            $order->quantity = $row["quantity"];
            $order->cost = $row["cost"];
            $order->status = $row["status"];
            $order->date = $row["date"];

            echo json_encode($order);

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
