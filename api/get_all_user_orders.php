<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['user_id'])) {

        $user_ID = mysqli_real_escape_string($conn, $_POST['user_id']);

        $sql = "SELECT orders.ID, users.full_name as sales_rep, customers.full_name, customers.shop_name, orders.customer_ID, products.product_name, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
        FROM orders
        INNER JOIN customers ON orders.customer_ID=customers.ID
        INNER JOIN users ON orders.user_ID=users.ID
        INNER JOIN products ON orders.product_ID=products.ID
        WHERE orders.user_ID = '$user_ID'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $orders = array();

            while ($row = $result->fetch_assoc()) {
                $order = (object) array();
                $order->ID = $row["ID"];
                $order->sales_rep = $row["sales_rep"];
                $order->customer_ID = $row["customer_ID"];
                $order->product_ID = $row["product_ID"];
                $order->full_name = $row["full_name"];
                $order->shop_name = $row["shop_name"];
                $order->product_name = $row["product_name"];
                $order->quantity = $row["quantity"];
                $order->cost = $row["cost"];
                $order->status = $row["status"];
                $order->date = $row["date"];

                $orders[] = $order;
            }

            echo json_encode($orders);

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
