<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Serum Molecule Match</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="start-screen">
    <h1 class="title">Serum Molecule Match</h1>
    <?php
    $successMessage = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $name = htmlspecialchars($_POST['name']);
      $email = htmlspecialchars($_POST['email']);

      // Check if both fields are filled
      if (!empty($name) && !empty($email)) {
        $file = fopen("user_data.txt", "a");
        $data = "Name: $name, Email: $email\n";
        fwrite($file, $data);
        fclose($file);

        $successMessage = "Thank you, $name! Your information has been saved. <a href='explanation.html'>Start Playing</a>";
      } else {
        $successMessage = "Please enter both your name and email.";
      }
    }
    ?>
    
    <form method="post" action="">
      <div class="input-container">
        <input type="text" id="name" name="name" placeholder="Name" class="input-field">
        <input type="email" id="email" name="email" placeholder="Email" class="input-field">
      </div>
      <button type="submit" class="start-button">Submit</button>
    </form>

    <?php if ($successMessage): ?>
      <p class="success-message"><?php echo $successMessage; ?></p>
    <?php endif; ?>
  </div>

  <script src="script.js"></script>
</body>
</html>
