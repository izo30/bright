<?php
 
/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simple to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
 
// DB table to use
$table = 'products';
 
// Table's primary key
$primaryKey = 'ID';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'product_name', 'dt' => 0 ),
    array( 'db' => 'category',  'dt' => 1 ),
    array( 'db' => 'unit',   'dt' => 2 ),
    array( 'db' => 'price',     'dt' => 3 ),
    array( 'db' => 'brand',     'dt' => 4 ),
    array( 'db' => 'date',     'dt' => 5 ),
    array(
        'db'        => 'ID',
        'dt'        => 6,
        'formatter' => function( $d, $row ) {
            $d = "'" .$d. "'";
            return '<div class="row btn-actions">
                        <button class="btn btn-xs" onclick="openProduct(' .$d. ')">View</button>
                        <button class="btn btn-xs btn-xs-delete" onclick="deleteProduct(' .$d. ')">Delete</button>
                    </div>';
        }
    )
);
 
// SQL server connection information
$sql_details = array(
    'user' => 'root',
    'pass' => '',
    'db'   => 'bright',
    'host' => 'localhost'
);
 
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( 'ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);