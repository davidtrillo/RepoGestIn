<?php

$dbUser='web';
$dbPass='Intruder3';
$mysqlConnect="mysql:host=localhost;dbname=gestin";
$dbConexion= new PDO($mysqlConnect,$dbUser,$dbPass);
$dbConexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$sql="SELECT * FROM instalaciones";
$gsent= $dbConexion->prepare($sql);
$gsent->execute();
$resultado= $gsent->fetchAll();
//var_dump($resultado);
