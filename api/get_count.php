<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($_SESSION['login_user'] != "admin") {

        $count = (object) array();

        $user_ID = mysqli_real_escape_string($conn, $_SESSION['user_id']);

        // count orders
        $sql = "SELECT COUNT(*) as orders 
        FROM orders 
        INNER JOIN users ON orders.user_ID=users.ID
        WHERE orders.user_ID = '$user_ID';";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->orders = $row["orders"];
        } else {
            $count->orders = 0;
        }

        // count customers
        $sql = "SELECT COUNT(*) as customers 
        FROM customers 
        INNER JOIN users ON customers.user_ID=users.ID
        WHERE customers.user_ID = '$user_ID';";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->customers = $row["customers"];
        } else {
            $count->customers = 0;
        }

        // count products
        $sql = "SELECT COUNT(*) as products FROM products;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->products = $row["products"];
        } else {
            $count->products = 0;
        }

        // count users
        $sql = "SELECT COUNT(*) as users FROM users;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->users = $row["users"];
        } else {
            $count->users = 0;
        }

        echo json_encode($count);

    } else {

        $count = (object) array();

        // count orders
        $sql = "SELECT COUNT(*) as orders FROM orders;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->orders = $row["orders"];
        } else {
            $count->orders = 0;
        }

        // count customers
        $sql = "SELECT COUNT(*) as customers FROM customers;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->customers = $row["customers"];
        } else {
            $count->customers = 0;
        }

        // count products
        $sql = "SELECT COUNT(*) as products FROM products;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->products = $row["products"];
        } else {
            $count->products = 0;
        }

        // count users
        $sql = "SELECT COUNT(*) as users FROM users;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $count->users = $row["users"];
        } else {
            $count->users = 0;
        }

        echo json_encode($count);

    }

}
