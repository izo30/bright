<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clients_bright";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $products = array();

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bright";

    // Create connection
    $conn2 = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn2->connect_error) {
        die("Connection failed: " . $conn2->connect_error);
    }

    $sql2 = "";

    while ($row = $result->fetch_assoc()) {
        $product_code = $row["CODE"];
        $product_name = $row["NAME"];
        $description = "";
        $category = $row["CATEGORY"];
        $unit = $row["UNIT"];
        $price = $row["PRICE"];
        $brand = $row["BRAND"];
        $ID = uniqid();

        $sql2 .= "INSERT INTO products (ID, product_name, product_code, description, category, unit, price, brand)
            VALUES ('$ID', '$product_name', '$product_code', '$description', '$category', '$unit', '$price', '$brand');";
    }

    if ($conn2->multi_query($sql2) === true) {
        echo "New records created successfully";
    } else {
        echo "Error: " . $sql2 . "<br>" . $conn2->error;
    }

    $conn2->close();

    // echo json_encode($products);
} else {
    echo "0 results";
}
$conn->close();
