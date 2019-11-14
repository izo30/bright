<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['full_name'])
        && isset($_POST['shop_name'])
        && isset($_POST['phone'])
        && isset($_POST['location'])
        && isset($_POST['nature'])
        && isset($_SESSION['user_id'])) {

        $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
        $shop_name = mysqli_real_escape_string($conn, $_POST['shop_name']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
        $location = mysqli_real_escape_string($conn, $_POST['location']);
        $nature = mysqli_real_escape_string($conn, $_POST['nature']);
        $user_id = $_SESSION['user_id'];
        $ID = uniqid();

        // validate for a valid nature value
        $nature_list = array('COMPANY', 'BUSINESS', 'INDIVIDUAL');
        if (in_array($nature, $nature_list)) {

            // check if another cusomer has been registered with same phone number
            $sql = "SELECT * FROM customers WHERE phone = '$phone'";
            $result = $conn->query($sql);

            // If result matched $phone, table row must be 1 row
            if ($result->num_rows > 0) {
                echo json_encode("Phone number already registered");
            } else {
                $sql = "INSERT INTO customers (ID, user_ID, full_name, shop_name, phone, location, nature)
                VALUES ('$ID', '$user_id', '$full_name', '$shop_name', '$phone', '$location', '$nature')";

                if ($conn->query($sql) === true) {
                    echo json_encode("New customer created successfully");
                } else {
                    echo json_encode("Error inserting customer");
                }
            }
        } else {
            echo json_encode("Nature value invalid");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
