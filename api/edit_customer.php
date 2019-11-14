<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])
        && isset($_POST['full_name'])
        && isset($_POST['shop_name'])
        && isset($_POST['phone'])
        && isset($_POST['location'])
        && isset($_POST['nature'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);
        $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
        $shop_name = mysqli_real_escape_string($conn, $_POST['shop_name']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
        $location = mysqli_real_escape_string($conn, $_POST['location']);
        $nature = mysqli_real_escape_string($conn, $_POST['nature']);

        // validate for a valid nature value
        $nature_list = array('COMPANY', 'BUSINESS', 'INDIVIDUAL');
        if (in_array($nature, $nature_list)) {

            $id_exists = "SELECT * FROM customers WHERE ID = '$ID'";
            $result = $conn->query($id_exists);

            // If ID exists
            if ($result->num_rows > 0) {
                $sql = "UPDATE customers
                    SET
                    full_name='$full_name',
                    shop_name='$shop_name',
                    phone='$phone',
                    location='$location',
                    nature='$nature'
                    WHERE ID='$ID'";

                if ($conn->query($sql) === true) {
                    echo json_encode("Record updated successfully");
                } else {
                    echo json_encode("Error updating customer");
                }
            } else {
                echo json_encode("Id provided is invalid");
            }

        } else {
            echo json_encode("Nature value invalid");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
