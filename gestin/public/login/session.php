<?php
   //  define('DB_SERVER', '172.27.120.120');
   //  define('DB_USERNAME', 'root');
   //  define('DB_PASSWORD', '');
   //  define('DB_DATABASE', 'gestin');
   //  $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
   session_start();
   
   $login_session = $_SESSION['login_user'];
   
   // $ses_sql = mysqli_query($db,"select * from usuarios where nombre = '$user_check' ");
   // $row = mysqli_fetch_array($ses_sql,MYSQLI_ASSOC);
   // $login_session = $row['nombre'];
   // $id_session=$row['id'];
   
   if(!isset($_SESSION['login_user'])){
      header("location:login.php");
      die();
   }
?>