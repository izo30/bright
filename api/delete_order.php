<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);

        $id_exists = "SELECT * FROM orders WHERE ID = '$ID'";
        $result = $conn->query($id_exists);

        // If ID exists
        if ($result->num_rows > 0) {
            $sql = "DELETE FROM orders
            WHERE ID='$ID'";

            if ($conn->query($sql) === true) {
                echo json_encode("Record deleted successfully");
            } else {
                echo json_encode("Error deleting order");
            }
        } else {
            echo json_encode("Id provided is invalid");
        }
    } else {
        echo json_encode("Required values not set");
    }
}
