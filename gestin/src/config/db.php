<?php

class db{

     // conexion
     public function conectDB(){
        $dbUser='user';
        $dbPass='Mobilitat_01';
        $mysqlConnect="mysql:charset=utf8;host=localhost;dbname=gestin";
        $dbConexion= new PDO($mysqlConnect,$dbUser,$dbPass);
        $dbConexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        return $dbConexion; 
     }
  
 }
