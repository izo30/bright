<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['ID'])
        && isset($_POST['ID_number'])
        && isset($_POST['full_name'])
        && isset($_POST['status'])
        && isset($_POST['phone'])) {

        $ID = mysqli_real_escape_string($conn, $_POST['ID']);
        $ID_number = mysqli_real_escape_string($conn, $_POST['ID_number']);
        $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
        $status = mysqli_real_escape_string($conn, $_POST['status']);

        try {
            $image = $_FILES['image']['name'];
            $target_dir = "images/";
            $target_file = $target_dir . basename($_FILES["image"]["name"]);

            // Select file type
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            // Valid file extensions
            $extensions_arr = array("jpg", "jpeg", "png", "gif");

            // validate for a valid user status value
            $status_list = array('ACTIVE', 'INACTIVE');
            if (in_array($status, $status_list)) {

                // Check extension
                if (in_array($imageFileType, $extensions_arr)) {

                    $id_exists = "SELECT * FROM users WHERE ID = '$ID'";
                    $result = $conn->query($id_exists);

                    // If ID exists
                    if ($result->num_rows > 0) {
                        $sql = "UPDATE users
                    SET
                    ID_number='$ID_number',
                    full_name='$full_name',
                    phone='$phone',
                    image='$image',
                    status='$status'
                    WHERE ID='$ID'";

                        if ($conn->query($sql) === true) {
                            echo json_encode("Record updated successfully");
                        } else {
                            echo json_encode("Error updating user");
                        }
                    } else {
                        echo json_encode("Id provided is invalid");
                    }

                    // Upload file
                    move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $image);

                } else {
                    echo json_encode("Wrong image format");
                }

            } else {
                echo json_encode("Status value invalid");
            }

        } catch (Exception $e) {
            echo json_encode('Error no image entered');
        }

    } else {
        echo json_encode("Required values not set");
    }
}
