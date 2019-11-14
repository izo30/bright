<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = "SELECT orders.ID, users.full_name as sales_rep, customers.full_name, customers.shop_name, orders.customer_ID, products.product_name, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
        FROM orders
        INNER JOIN customers ON orders.customer_ID=customers.ID
        INNER JOIN users ON orders.user_ID=users.ID
        INNER JOIN products ON orders.product_ID=products.ID";
    $result = $conn->query($sql);

    $admin_sql = "SELECT orders.ID, admin.username as sales_rep, customers.full_name, customers.shop_name, orders.customer_ID, products.product_name, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
        FROM orders
        INNER JOIN customers ON orders.customer_ID=customers.ID
        INNER JOIN admin ON orders.user_ID=admin.ID
        INNER JOIN products ON orders.product_ID=products.ID";
    $admin_result = $conn->query($admin_sql);

    if ($result->num_rows > 0 || $admin_result->num_rows > 0) {
        $orders = array();

        while($row = $result->fetch_assoc()) {
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

        while($row = $admin_result->fetch_assoc()) {
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
}
