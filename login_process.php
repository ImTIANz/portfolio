<?php
session_start();

// Database connection settings (same as in register_process.php)
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sudoku login game';

// Create a database connection (same as in register_process.php)
$mysqli = new mysqli($host, $user, $password, $database);

// Check for database connection errors (same as in register_process.php)
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

// Handle login form submission
if (isset($_POST['login'])) {
    $username = $mysqli->real_escape_string($_POST['username']);
    $password = $mysqli->real_escape_string($_POST['password']);

    // Hash the password (should use password_hash() and verify_password() in production)
    $hashedPassword = md5($password); // This is just a simple example; use a more secure method.

    // Query the database for the user
    $query = "SELECT id, username FROM users WHERE username = '$username' AND password = '$hashedPassword'";
    $result = $mysqli->query($query);

    if ($result->num_rows == 1) {
        // Login successful, store user information in a session
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];

        // Redirect to the welcome_page game (welcome_page.html)
        header("Location: welcome_page.html");
        exit();
    } else {
        // Login failed, display an error message or redirect to the login page
        $error_message = "Invalid username or password.";
    }
}

// Close the database connection (same as in register_process.php)
$mysqli->close();
?>
