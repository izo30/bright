<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // username and password sent from form
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $password = hash('sha256', $password);

        $sql = "SELECT * FROM admin WHERE username = '$username' and password = '$password'";
        $result = $conn->query($sql);

        // If result matched $username and $password, table row must be 1 row
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $_SESSION['login_user'] = $username;
            $_SESSION['user_id'] = $row["ID"];

            echo json_encode("login successful");
        } else {
            echo json_encode("Your Name or Password is incorrect");
        }
    } else {
        echo json_encode("Username or password is not set");
    }
}
