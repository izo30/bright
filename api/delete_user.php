<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);

        $items_exists = false;

        $user_order = "SELECT * FROM orders WHERE user_ID = '$ID'";
        $order_result = $conn->query($user_order);

        // If order for user exists
        if ($order_result->num_rows > 0) {
            $items_exists = true;
        }

        $user_customer = "SELECT * FROM customers WHERE user_ID = '$ID'";
        $customer_result = $conn->query($user_customer);

        // If customer for user exists
        if ($customer_result->num_rows > 0) {
            $items_exists = true;
        }

        if (!$items_exists) {
            $id_exists = "SELECT * FROM users WHERE ID = '$ID'";
            $result = $conn->query($id_exists);

            // If ID exists
            if ($result->num_rows > 0) {
                $sql = "DELETE FROM users
            WHERE ID='$ID'";

                if ($conn->query($sql) === true) {
                    echo json_encode("Record deleted successfully");
                } else {
                    echo json_encode("Error deleting users");
                }
            } else {
                echo json_encode("Id provided is invalid");
            }
        } else {
            echo json_encode("Error deleting user. User orders or customers exist");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
