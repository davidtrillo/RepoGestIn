<?php

   //include("../../src/config/db.php"); //Configuration BD File Conection 
   session_start(); //Session Started for Login  
   
   $error='';
   define('DB_SERVER', 'webserver.mobilitat.local');
   define('DB_USERNAME', 'root');
   define('DB_PASSWORD', '');
   define('DB_DATABASE', 'gestin');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      $myusername = mysqli_real_escape_string($db,$_POST['username']);
      $mypassword = mysqli_real_escape_string($db,$_POST['password']); 
      
      //SQL Sentence
      $sql = "SELECT id FROM usuarios WHERE nombre = '$myusername' and contrasena = '$mypassword'";
      $result = mysqli_query($db,$sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == 1) {
        // session_register("myusername");
         $_SESSION['login_user'] = $myusername;
         header("Location: ../welcome.php");
        }else {
            //$error = "Nombre o Contraseña Incorrecta";
            $error = "Nombre o Contraseña Incorrecta ";
      }
   }
?>

<!doctype html>
<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> 
    <link rel="stylesheet" href="../../css/styles.css">
        <!-- <script src="https://kit.fontawesome.com/de8261cad4.js"></script> -->
   <link href="../fontawesome/css/fontawesome.css" rel="stylesheet">
   <link href="../fontawesome/css/solid.css" rel="stylesheet"> 
    <title>LogIn</title>
  </head>
  <body>

    <div class="wrapper fadeInDown">
        <div id="formContent">
           <!-- Icon -->
          <div class="fadeIn first p-3 "  >
              <span style="font-size:3rem;">
                     <h4>Log In</h4>
                     <i class="far fa-user"  id="icon"></i>
              </span>
          </div>
      
          <!-- Login Form -->
          <form action="" method="POST">
            <input type="text" id="login" class="fadeIn second" name="username" placeholder="usuario">
            <input type="password" id="password" class="fadeIn third" name="password" placeholder="password">
            <br>
            <button type="submit" class="btn btn-primary p-2 m-3">Enviar</button>
          </form>

          <?php if($error){echo $error;}  ?>

          <!-- Remind Passowrd -->
          <div id="formFooter">
            <a class="underlineHover" href="agregar_usuario.php">Agregar Usuario</a>
          </div> 
      
        </div>
      </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>


