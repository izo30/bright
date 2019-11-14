<?php
include "config.php";
// Include dompdf autoloader
require_once 'dompdf/autoload.inc.php';
session_start();

// Reference the Dompdf namespace
use Dompdf\Dompdf;

// Instantiate and use the dompdf class
$dompdf = new Dompdf();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['from'])
        && isset($_POST['to'])
        && isset($_POST['status'])) {

        $from = mysqli_real_escape_string($conn, $_POST['from']);
        $to = mysqli_real_escape_string($conn, $_POST['to']);

        $from = strtotime('+1 day', $from);
        $to = strtotime('+1 day', $to);

        $status = mysqli_real_escape_string($conn, $_POST['status']);

        $sql = "SELECT orders.ID, users.full_name as sales_rep, customers.full_name, customers.shop_name, orders.customer_ID, products.product_name, products.price, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
            FROM orders
            INNER JOIN customers ON orders.customer_ID=customers.ID
            INNER JOIN users ON orders.user_ID=users.ID
            INNER JOIN products ON orders.product_ID=products.ID
            WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to' AND orders.status = '$status'";
        if ($status === "ALL") {
            $sql = "SELECT orders.ID, users.full_name as sales_rep, customers.full_name, customers.shop_name, orders.customer_ID, products.product_name, products.price, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
                FROM orders
                INNER JOIN customers ON orders.customer_ID=customers.ID
                INNER JOIN users ON orders.user_ID=users.ID
                INNER JOIN products ON orders.product_ID=products.ID
                WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to'";
        }
        $result = $conn->query($sql);

        $admin_sql = "SELECT orders.ID, admin.username as sales_rep, customers.full_name, customers.shop_name, orders.customer_ID, products.product_name, products.price, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
            FROM orders
            INNER JOIN customers ON orders.customer_ID=customers.ID
            INNER JOIN admin ON orders.user_ID=admin.ID
            INNER JOIN products ON orders.product_ID=products.ID
            WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to' AND orders.status = '$status'";
        if ($status === "ALL") {
            $admin_sql = "SELECT orders.ID, admin.username as sales_rep, customers.full_name, customers.shop_name, orders.customer_ID, products.product_name, products.price, orders.product_ID, orders.quantity, orders.cost, orders.status, orders.date
                FROM orders
                INNER JOIN customers ON orders.customer_ID=customers.ID
                INNER JOIN admin ON orders.user_ID=admin.ID
                INNER JOIN products ON orders.product_ID=products.ID
                WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to'";
        }
        $admin_result = $conn->query($admin_sql);

        if ($result->num_rows > 0 || $admin_result->num_rows > 0) {

            $total = 0;
            $sql = "SELECT SUM(orders.cost) as total
                FROM orders
                WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to' AND orders.status = '$status'";
            if ($status === "ALL") {
                $sql = "SELECT SUM(orders.cost) as total
                    FROM orders
                    WHERE UNIX_TIMESTAMP(orders.date) >= '$from' AND UNIX_TIMESTAMP(orders.date) <= '$to'";
            }
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $total = $row["total"];
            }

            $report_page =
            '<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    /* Style the body */
                    body {
                        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                        margin: 0;
                    }

                    /* Header/Logo Title */
                    .header {
                        padding: 20px 60px;
                        text-align: center;
                        background: #144557;
                        color: white;
                        font-size: 20px;
                    }

                    h1 {
                        margin: 20px 0px;
                    }

                    p {
                        margin: 5px 0;
                    }

                    #content {
                        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                        margin: 20px 0;
                    }

                    #content td,
                    #content th {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }

                    #content tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }

                    #content tr:hover {
                        background-color: #ddd;
                    }

                    #content th {
                        padding-top: 12px;
                        padding-bottom: 12px;
                        text-align: left;
                        background-color: #0D6A89;
                        color: white;
                    }

                    .totals {
                        background-color: #0D6A89;
                        color: #fff;
                        padding: 15px;
                    }
                </style>
            </head>

            <body>

                <div class="header">
                    <h1>Bright Orders Report</h1>
                    <p>From: ' . date('d M Y', $from) . '</p>
                    <p>To: ' . date('d M Y', $to) . '</p>
                </div>

                <h2 class="totals">Total for ' .$status. ' Orders : Kshs. ' .$total. '</h2>

                <table id="content">
                    <tr>
                        <th>
                            Sales Rep
                        </th>
                        <th>
                            Customer
                        </th>
                        <th>
                            Shop Name
                        </th>
                        <th>
                            Item
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Total Cost
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Date
                        </th>
                    </tr>
                ';

            while ($row = $result->fetch_assoc()) {

                $report_page .=
                    '
                <tr>
                    <td>
                        ' . $row["sales_rep"] . '
                    </td>
                    <td>
                        ' . $row["full_name"] . '
                    </td>
                    <td>
                        ' . $row["shop_name"] . '
                    </td>
                    <td>
                        ' . $row["product_name"] . '
                        </td>
                    <td>
                        ' . $row["quantity"] . '
                    </td>
                    <td>
                        ' . $row["cost"] . '
                    </td>
                    <td>
                        ' . $row["status"] . '
                    </td>
                    <td>
                        ' . $row["date"] . '
                    </td>
                </tr>
                ';
            }

            while ($row = $admin_result->fetch_assoc()) {

                $report_page .=
                    '
                <tr>
                    <td>
                        ' . $row["sales_rep"] . '
                    </td>
                    <td>
                        ' . $row["full_name"] . '
                    </td>
                    <td>
                        ' . $row["shop_name"] . '
                    </td>
                    <td>
                        ' . $row["product_name"] . '
                        </td>
                    <td>
                        ' . $row["quantity"] . '
                    </td>
                    <td>
                        ' . $row["cost"] . '
                    </td>
                    <td>
                        ' . $row["status"] . '
                    </td>
                    <td>
                        ' . $row["date"] . '
                    </td>
                </tr>
                ';
            }

            $report_page .=
                '</table>
            </body>

            </html>';

            // Load HTML content
            $dompdf->loadHtml($report_page);

            // (Optional) Setup the paper size and orientation
            $dompdf->setPaper('A4', 'landscape');

            // Render the HTML as PDF
            $dompdf->render();

            // Output the generated PDF to Browser
            $dompdf->stream("Bright_Orders_Report_" . date("Y-m-d_h:i:sa"), array("Attachment" => 1));

        } else {
            echo json_encode("0 results");
        }

    } else {
        echo json_encode("Required values not set");
    }
}
