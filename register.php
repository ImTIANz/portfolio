<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Registration</title>
    <link rel="stylesheet" href="registration.css">
</head>
<body>
<div class="registration-container">
    <h2>Register</h2>
    <form method="post" action="register_process.php">
        <label for="username">Username:</label>
        <input type="text" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" name="password" required><br><br>
        <input type="submit" name="register" value="Register">
    </form>

    <p>Already have an account? <a href="login.php">Click here to login</a></p>
</div>

</body>
</html>
