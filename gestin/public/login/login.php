<?php


   session_start(); //Session Started for Login  
   
    $error='';
    $ldap_user='';
    $ldap_password='';
  
    if(($_SERVER["REQUEST_METHOD"] == "POST") && ($_POST["username"])&& ($_POST["password"])) {
        
        $host = "172.27.120.108";
        $hostIMI = "172.29.7.72";
        $port = "389";

        $ldap_con = ldap_connect("ldap://{$host}:{$port}") or die("No se pudo conectar al servidor LDAP.");
        ldap_set_option($ldap_con,LDAP_OPT_PROTOCOL_VERSION,3);
        //var_dump($ldap_con); //Comprobación de estado de conexión OK #2
         $ldap_dn="OU=Usuaris Mobilitat,DC=mobilitat,DC=local";
         $ldap_dnIMI="OU=Entorn Municipal,DC=ajtpmi,DC=local";

        // $ldap_user="dtrillo";
        // $ldap_password="Mobilitat01";

        $ldap_user=$_POST["username"];
        $ldap_password=$_POST["password"];

        //if (@ldap_bind($ldap_con, $ldap_user."@ajtpmi.local", $ldap_password)){ 
      if (@ldap_bind($ldap_con, $ldap_user."@mobilitat.local", $ldap_password)){
          //echo "dentro";
          $_SESSION['login_user'] = $ldap_user;
          header("Location: ../welcome.php");
       }else{
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
   <link href="../../fontawesome/css/fontawesome.css" rel="stylesheet">
   <link href="../../fontawesome/css/solid.css" rel="stylesheet"> 
    <title>LogIn</title>
  </head>
  <body>

    <div class="wrapper fadeInDown">
        <div id="formContent">
           <!-- Icon -->
          <div class="fadeIn first p-3 "  >
              <span style="font-size:3rem;">
                <img src="..\..\img\logoajuntament.jpg" alt="" class="img-fluid mb-0">
                     <h4>Gestión de Inventario</h4>
                     <h5>Instalaciones de Regulación y Control del Tráfico urbano de Palma</h5>
                     <h5>Departament de Mobilitat</h5>
                     <h5 class="pt-3"><b>Log In</b></h5>
                     <!-- <i class="far fa-user"  id="icon"></i> -->
              </span>
          </div>
      
          <!-- Login Form -->
          <form action=".\login.php" method="POST">
            <input type="text" id="login" class="fadeIn second" name="username" placeholder="usuario">
            <input type="password" id="password" class="fadeIn third" name="password" placeholder="password">
            <br>
            <button type="submit" class="btn btn-primary p-2 m-3">Enviar</button>
          </form>

          <?php if($error){echo $error;}  ?>

          <!-- Remind Passowrd -->
          <!-- <div id="formFooter">
            <a class="underlineHover" href="agregar_usuario.php">Agregar Usuario</a>
          </div>  -->
      
        </div>
      </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>


