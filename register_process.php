<?php
// Database connection settings
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sudoku login game';

// Create a database connection
$mysqli = new mysqli($host, $user, $password, $database);

// Check for database connection errors
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

// Handle registration form submission
if (isset($_POST['register'])) {
    $username = $mysqli->real_escape_string($_POST['username']);
    $password = $mysqli->real_escape_string($_POST['password']);

    // Hash the password (you should use password_hash() in production)
    $hashedPassword = md5($password); // This is just a simple example; use a more secure method.

    // Insert user data into the database
    $insertQuery = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";
    $insertResult = $mysqli->query($insertQuery);

    if ($insertResult) {
        // Registration successful, redirect to the login page
        header("Location: login.php");
        exit();
    } else {
        // Registration failed, display an error message or redirect to the registration page
        $error_message = "Registration failed.";
    }
}

// Close the database connection
$mysqli->close();
?>
