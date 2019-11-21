<?php

   //include("../../src/config/db.php"); //Configuration BD File Conection 
   session_start(); //Session Started for Login  
   
  //  $error='';
  //  define('DB_SERVER', 'webserver.mobilitat.local');
  //  define('DB_USERNAME', 'root');
  //  define('DB_PASSWORD', '');
  //  define('DB_DATABASE', 'gestin');
  //  $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

  //  if($_SERVER["REQUEST_METHOD"] == "POST") {
  //     // username and password sent from form 
  //     $myusername = mysqli_real_escape_string($db,$_POST['username']);
  //     $mypassword = mysqli_real_escape_string($db,$_POST['password']); 
      
  //     //SQL Sentence
  //     $sql = "SELECT id FROM usuarios WHERE nombre = '$myusername' and contrasena = '$mypassword'";
  //     $result = mysqli_query($db,$sql);
  //     $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
  //     $count = mysqli_num_rows($result);
      
  //     // If result matched $myusername and $mypassword, table row must be 1 row
		
  //     if($count == 1) {
  //       // session_register("myusername");
  //        $_SESSION['login_user'] = $myusername;
  //        header("Location: ../welcome.php");
  //       }else {
  //           //$error = "Nombre o Contraseña Incorrecta";
  //           $error = "Nombre o Contraseña Incorrecta ";
  //     }
  //  }

  
  if(isset($_POST['login'])){ //check if form was submitted
    $input = $_POST['user']; //get input text
    $pass = $_POST['pass'];
   }
    //get input text
//    $message = "Success! You entered: ".$input. " + ".$pass;




//echo "Hola";
//echo $_POST['user'];
//echo $_POST['pass'];


// Credenciales de prueba
//$user = "dtrillo";
//$pass = "Mobilitat01";

// Datos de acceso al servidor LDAP
$host = "172.27.120.108";
$port = "389";

// Conexto donde se encuentran los usuarios
$basedn = "OU=Usuaris Mobilitat,DC=mobilitat,DC=local";

// Atributos a recuperar
$searchAttr = array("dn", "cn", "sn", "givenName");

// Atributo para incorporar en la respuesta
$displayAttr = "cn";

// Respuesta por defecto
$status = 1;
$msg = "";
$userDisplayName = "null";

// Recuperar datos del POST
if (isset($_POST['user'])) {
        $user = $_POST['user'];
        echo "Ha entrado en user";
}
if (isset($_POST['pass'])) {
        $pass = $_POST['pass'];
        echo "Ha entrado en pass";
}

// Establecer la conexión con el servidor LDAP
$ad = ldap_connect("ldap://{$host}:{$port}") or die("No se pudo conectar al servidor LDAP.");
//echo "Ha conectado_".$ad; //Resource #2 es Contectado
// Autenticar contra el servidor LDAP

ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
//echo "\nHa conectado_".$ad;
//echo "\nuid={$user},{$basedn}_";
//echo  "\n".$pass;
//$ldapbind=ldap_bind($ad, "uid={$user},{$basedn}", $pass);
$ldapbind=ldap_bind($ad, $user."@mobilitat.local", $pass);
//echo "\nResultado ldapbind=".$ldapbind;




if (@ldap_bind($ad, $user."@mobilitat.local", $pass)) {
    $msg = "Ok dentro";
    echo "\n IdUsuario: " .base64_encode($user);
}
else {
        // Si falla la autenticación, retornar error
        $msg = "Usuario y/o contraseña inválidos";
}

// Respuesta en formato JSON
header('Content-Type: application/json');
//echo "\n{\"uid\": \"{$user}\", \"estado\": \"{$status}\", \"nombre\": \"{$userDisplayName}\", \"debug\": \"{$msg}\"}";
  
  
  



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

  <body>

<div>
<center>
<form method="POST" id="form">
  <table>
    <tr><td>Usuario:</td><td><input name="user" type="text"></td></tr>
    <tr><td>Contraseña:</td><td><input name="pass" type="password" onkeydown="if (event.keyCode == 13) auth()"></td></tr>
  </table>
  <br />
  <input type="submit" name="login" value="Login" onclick="">
</center>
</form>

</div>

</body>
</html>


