<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['customer_id'])) {

        $customer_ID = mysqli_real_escape_string($conn, $_POST['customer_id']);

        if ($customer_ID != null) {
            $sql = "SELECT SUM(orders.cost) as total
            FROM orders
            WHERE orders.customer_ID = '$customer_ID'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();

                $total = $row["total"];
                if ($total == null) {
                    echo json_encode(0);
                } else {
                    echo json_encode($total);
                }

            } else {
                echo json_encode("0 results");
            }
        } else {
            echo json_encode("Customer id should not be empty");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
