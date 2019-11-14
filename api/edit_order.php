<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])
        && isset($_POST['customer_id'])
        && isset($_POST['product_id'])
        && isset($_POST['quantity'])
        && isset($_POST['cost'])
        && isset($_POST['status'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);
        $customer_id = mysqli_real_escape_string($conn, $_POST['customer_id']);
        $product_id = mysqli_real_escape_string($conn, $_POST['product_id']);
        $quantity = mysqli_real_escape_string($conn, $_POST['quantity']);
        $cost = mysqli_real_escape_string($conn, $_POST['cost']);
        $status = mysqli_real_escape_string($conn, $_POST['status']);

        $id_exists = "SELECT * FROM orders WHERE ID = '$ID'";
        $result = $conn->query($id_exists);

        // validate for a valid status value
        $status_list = array('UNPAID', 'PAID');
        if (in_array($status, $status_list)) {

            // If ID exists
            if ($result->num_rows > 0) {
                $sql = "UPDATE orders
                SET
                customer_id='$customer_id',
                product_id='$product_id',
                quantity='$quantity',
                cost='$cost',
                status='$status'
                WHERE ID='$ID'";

                if ($conn->query($sql) === true) {
                    echo json_encode("Record updated successfully");
                } else {
                    echo json_encode("Error updating order");
                }
            } else {
                echo json_encode("Id provided is invalid");
            }

        } else {
            echo json_encode("Status value invalid");
        }
    } else {
        echo json_encode("Required values not set");
    }
}
