<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['from'])
        && isset($_POST['to'])
        && isset($_POST['status'])) {

        $from = mysqli_real_escape_string($conn, $_POST['from']);
        $to = mysqli_real_escape_string($conn, $_POST['to']);

        $from = strtotime('+1 day', $from);
        $to = strtotime('+1 day', $to);

        $status = mysqli_real_escape_string($conn, $_POST['status']);

        $sql = "SELECT SUM(orders.cost) as total
            FROM orders
            WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to' AND orders.status = '$status'";
        if ($status === "ALL") {
            $sql = "SELECT SUM(orders.cost) as total
                FROM orders
                WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to'";
        }
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode($row["total"]);

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
