<?php
session_start();

if (isset($_SESSION['login_user'])) {
    echo json_encode($_SESSION['login_user']);
} else {
    echo json_encode("offline");
}