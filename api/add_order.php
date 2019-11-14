<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['customer_id'])
        && isset($_POST['product_id'])
        && isset($_POST['quantity'])
        && isset($_POST['cost'])
        && isset($_POST['status'])
        && isset($_SESSION['user_id'])) {

        $customer_id = mysqli_real_escape_string($conn, $_POST['customer_id']);
        $product_id = mysqli_real_escape_string($conn, $_POST['product_id']);
        $quantity = mysqli_real_escape_string($conn, $_POST['quantity']);
        $cost = mysqli_real_escape_string($conn, $_POST['cost']);
        $status = mysqli_real_escape_string($conn, $_POST['status']);
        $user_id = $_SESSION['user_id'];
        $ID = uniqid();

        // validate for a valid status value
        $status_list = array('UNPAID', 'PAID');
        if (in_array($status, $status_list)) {

            $sql = "INSERT INTO orders (ID, customer_ID, product_ID, user_ID, quantity, cost, status)
            VALUES ('$ID', '$customer_id', '$product_id', '$user_id', '$quantity', '$cost', '$status')";

            if ($conn->query($sql) === true) {
                echo json_encode("New order created successfully");
            } else {
                echo json_encode("Error inserting order");
            }

        } else {
            echo json_encode("Status value invalid");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
