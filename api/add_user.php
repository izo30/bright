<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID_number'])
        && isset($_POST['full_name'])
        && isset($_POST['status'])
        && isset($_POST['phone'])) {

        $ID_number = mysqli_real_escape_string($conn, $_POST['ID_number']);
        $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
        $status = mysqli_real_escape_string($conn, $_POST['status']);
        $ID = uniqid();
        $code = substr(md5(uniqid(mt_rand(), true)), 0, 4);

        try {

            if (!empty($_FILES)) {
                $image = $_FILES['image']['name'];
                $target_dir = "images/";
                $target_file = $target_dir . basename($_FILES["image"]["name"]);

                // Select file type
                $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
                // Valid file extensions
                $extensions_arr = array("jpg", "jpeg", "png", "gif");

                // Check extension
                if (in_array($imageFileType, $extensions_arr)) {

                    $sql = "SELECT * FROM users WHERE ID_number = '$ID_number' OR phone = '$phone'";
                    $result = $conn->query($sql);

                    // If result matched $ID number or $phone, table row must be 1 row
                    if ($result->num_rows > 0) {
                        echo json_encode("ID number or phone already registered");
                    } else {
                        $sql = "INSERT INTO users (ID, code, full_name, ID_number, phone, image, status)
                    VALUES ('$ID', '$code', '$full_name', '$ID_number', '$phone', '$image', '$status')";

                        if ($conn->query($sql) === true) {
                            echo json_encode("New user created successfully");
                        } else {
                            echo json_encode("Error inserting user");
                        }
                    }

                    // Upload file
                    move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $image);

                } else {
                    echo json_encode("Wrong image format");
                }
            } else {

                $sql = "";
                if ($ID_number === "") {
                    $sql = "SELECT * FROM users WHERE phone = '$phone'";
                } else {
                    $sql = "SELECT * FROM users WHERE ID_number = '$ID_number' OR phone = '$phone'";
                }

                $result = $conn->query($sql);

                // If result matched $ID number or $phone, table row must be 1 row
                if ($result->num_rows > 0) {
                    echo json_encode("ID number or phone already registered");
                } else {
                    $sql = "INSERT INTO users (ID, code, full_name, ID_number, phone, image, status)
                    VALUES ('$ID', '$code', '$full_name', '$ID_number', '$phone', 'placeholder.png', '$status')";

                    if ($conn->query($sql) === true) {
                        echo json_encode("New user created successfully");
                    } else {
                        echo json_encode("Error inserting user");
                    }
                }

            }
        } catch (Exception $e) {
            echo json_encode('Message: ' . $e->getMessage());
        }

    } else {
        echo json_encode("Required values not set");
    }
}
