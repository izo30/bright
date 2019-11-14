<?php
include "config.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = "SELECT customers.ID, users.full_name as sales_rep, customers.user_ID, customers.full_name, customers.shop_name, customers.phone, customers.location, customers.nature, customers.date 
    FROM customers 
    INNER JOIN users ON customers.user_ID=users.ID";
    $result = $conn->query($sql);

    $admin_sql = "SELECT customers.ID, admin.username as sales_rep, customers.user_ID, customers.full_name, customers.shop_name, customers.phone, customers.location, customers.nature, customers.date 
    FROM customers 
    INNER JOIN admin ON customers.user_ID=admin.ID";
    $admin_result = $conn->query($admin_sql);

    if ($result->num_rows > 0 || $admin_result->num_rows > 0) {
        $customers = array();

        while($row = $result->fetch_assoc()) {
            $customer = (object) array();
            $customer->ID = $row["ID"];
            $customer->sales_rep = $row["sales_rep"];
            $customer->full_name = $row["full_name"];
            $customer->shop_name = $row["shop_name"];
            $customer->phone = $row["phone"];
            $customer->location = $row["location"];
            $customer->nature = $row["nature"];
            $customer->date = $row["date"];

            $customers[] = $customer;
        }

        while($row = $admin_result->fetch_assoc()) {
            $customer = (object) array();
            $customer->ID = $row["ID"];
            $customer->sales_rep = $row["sales_rep"];
            $customer->full_name = $row["full_name"];
            $customer->shop_name = $row["shop_name"];
            $customer->phone = $row["phone"];
            $customer->location = $row["location"];
            $customer->nature = $row["nature"];
            $customer->date = $row["date"];

            $customers[] = $customer;
        }

        echo json_encode($customers);

    } else {
        echo json_encode("0 results");
    }
}
