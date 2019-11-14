<?php
session_start();

if (session_status() == PHP_SESSION_ACTIVE ) {
    session_destroy();
    echo json_encode("logged off");
} else {
    echo json_encode("offline");
}
