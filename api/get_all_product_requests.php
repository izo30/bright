<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = "SELECT requests.ID, users.full_name as sales_rep, requests.user_ID, requests.product_name, requests.category, requests.date
    FROM requests
    INNER JOIN users ON requests.user_ID=users.ID";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $requests = array();

        while($row = $result->fetch_assoc()) {
            $request = (object)array();
            $request->ID = $row["ID"];
            $request->sales_rep = $row["sales_rep"];
            $request->product_name = $row["product_name"];
            $request->category = $row["category"];
            $request->date = $row["date"];

            $requests[] = $request;
        }

        echo json_encode($requests);

    } else {
        echo json_encode("0 results");
    }
}
