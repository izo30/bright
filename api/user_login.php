<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // code sent from form
    if (isset($_POST['code'])) {
        $code = mysqli_real_escape_string($conn, $_POST['code']);

        $sql = "SELECT * FROM users WHERE code = '$code'";
        $result = $conn->query($sql);

        // If result matched $code, table row must be 1 row
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            if ($row['status'] == "active") {
                $_SESSION['login_user'] = $code;
                $_SESSION['user_id'] = $row["ID"];
            
                echo json_encode("login successful");
            } else {
                echo json_encode("Your code is invalid");
            }

        } else {
            echo json_encode("Your code is invalid");
        }
    } else {
        echo json_encode("Code is not set");
    }
}
