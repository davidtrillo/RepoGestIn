<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

 $app->get('/api/preciosmfo',function(Request $request, Response $response){

     $sql='SELECT * FROM preciosmfo';
    
     try{
         $db= new db();     
         $db=$db->conectDB();
         $resultado= $db->prepare($sql);
         $resultado->execute();
         if($resultado->rowCount()>0){
             $inventario= $resultado->fetchAll();
            //// echo json_encode($inventario);
            $ret= json_encode($inventario);
         
            return $ret ;
            // echo json_encode("No se han encontrado resultados");
         }else{
             echo json_encode("No se han encontrado resultados");
         }
         $resultado=null;
         $db=null;
     }catch(PDOException $e){
         echo '{"error":{"text":'.$e->getMessage().'}';
     }
 });

 $app->get('/api/preciosmfo/{mfo}',function(Request $request, Response $response){
    
    $mfo= $request->getAttribute('mfo'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    $sql='SELECT '.$mfo.' FROM preciosmfo';
   
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();
        if($resultado->rowCount()>0){
            $inventario= $resultado->fetchAll();
           //// echo json_encode($inventario);
           $ret= json_encode($inventario);
        
           return $ret ;
           // echo json_encode("No se han encontrado resultados");
        }else{
            echo json_encode("No se han encontrado resultados");
        }
        $resultado=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});



//  $app->get('/api/nid', function(Request $request, Response $response){

//     echo("holis");
//     $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
//     $connectionInfo = array( "Database"=>"Palma", "UID"=>"dtrillo", "PWD"=>"Mobilitat01",'CharacterSet' => 'UTF-8');
    
//     $conn = sqlsrv_connect( $serverName, $connectionInfo);//conectDBSQLServer();  

//     if( $conn === false ) {
//         echo "Couldn't connect to SQL Server on $this->servername.<br />";
//         die( print_r( sqlsrv_errors(), true));
//     } else {
//         echo "Connected!";
//     }


//     $dbUser='user';
//     $dbPass='Mobilitat_01';
//     $servername="localhost";
//     $database="gestin";
//     $connMySQL=mysqli_connect($servername, $dbUser, $dbPass, $database);

//     if (!$connMySQL) {
//         echo("error");
//         die("Connection failed: " . mysqli_connect_error());
//   }
   
//  echo "Connected MySQL successfully";
//     return $connMySQL; 


// //mirar como lo hago en ATP
       

// });
$app->get('/api/nid',function(Request $request, Response $response){

      // conexion
     
        $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
        $connectionInfo = array( "Database"=>"Palma", "UID"=>"dtrillo", "PWD"=>"Mobilitat01",'CharacterSet' => 'UTF-8');
     //  print_r($connectionInfo);
        $conn = sqlsrv_connect( $serverName, $connectionInfo);
        //echo $conn;
        
        if( $conn ) {
           //  echo "Conexión establecida.<br />";
                     
        }else{
          //  echo "Conexión no se pudo establecer.<br />";
             die( print_r( sqlsrv_errors(), true));
        }
   

        // conexion MySQL
      
        $dbUser='user';
        $dbPass='Mobilitat_01';
        $servername="localhost";
        $database="gestin";
        $connMySQL=mysqli_connect($servername, $dbUser, $dbPass, $database);

        if (!$connMySQL) {
          //  echo "Connected MySQL FAILED";
            die("Connection failed: " . mysqli_connect_error());
        }else{
          //  echo "Connected MySQL successfully";
        }
                 
         $sql="select Elm_CódigoNID from Cruce_Link_Elemento where (Elm_CódigoNID is not null) AND (Elm_FechaHasta IS NULL)";
         $getNID = sqlsrv_query($conn, $sql);  
           
          if ($getNID == FALSE) { die(FormatErrors(sqlsrv_errors()));  }

          $sqlMySQL="DELETE FROM `gestin`.`nid`"; //BORRAMOS LA TABLA NID PARA LA NUEVA IMPORTACION
         mysqli_query($connMySQL, $sqlMySQL);
             $count = 0;  
             while($row = sqlsrv_fetch_array($getNID, SQLSRV_FETCH_ASSOC))  
             {  
                 $sqlMySQL="INSERT INTO `gestin`.`nid` (`nid`) VALUES ('". $row['Elm_CódigoNID']."')";
                mysqli_query($connMySQL, $sqlMySQL);
                 $count++;  
               } 
              
            // // echo("<br/>");  
            // // echo($productCount);
                
             mysqli_close($connMySQL);
             sqlsrv_free_stmt($getNID);  
             sqlsrv_close($conn);  
                      
             echo json_encode($count, JSON_UNESCAPED_UNICODE);
            return $count;
    

});

// //POST para crear una nueva instalación CREATE

// $app->post('/api/mfo/nueva',function(Request $request, Response $response){
//     //declaracion de las variables de recepcion desde FRONT

//     $idInstalacion=$request->getParam('idInstalacion');
//     $fechaActuacion=$request->getParam('fechaActuacion');
//     $fechaInspeccion=$request->getParam('fechaInspeccion');
//     $observaciones=$request->getParam('observaciones');
//     $idUsuario=$request->getParam('idUsuario');
//     $resolucion=$request->getParam('resolucion');
//     $precio=$request->getParam('precio');
    
   
//     $sql='INSERT INTO mfo(idInstalacion,idUsuario,observaciones,resolucion,fechaActuacion,fechaInspeccion,precio) VALUES (:idInstalacion,:idUsuario,:observaciones,:resolucion,:fechaActuacion,:fechaInspeccion,:precio)';



//    try{
//         $db= new db();     
//         $db=$db->conectDB();
//         $resultado= $db->prepare($sql);


//         //Asignar campos del SQL a las variables obtenidas
//         $resultado->bindParam(':idInstalacion',$idInstalacion);
//         $resultado->bindParam(':fechaActuacion',$fechaActuacion);
//         $resultado->bindParam(':fechaInspeccion',$fechaInspeccion);
//         $resultado->bindParam(':observaciones',$observaciones);
//         $resultado->bindParam(':idUsuario',$idUsuario);
//         $resultado->bindParam(':resolucion',$resolucion);
//         $resultado->bindParam(':precio',$precio);
       

//         $resultado->execute();
//         echo json_encode("Registro guardado con éxito",JSON_UNESCAPED_UNICODE);

//         $resultado=null;
//         $db=null;

//     }catch(PDOException $e){
//         echo '{"error":{"text":'.$e->getMessage().'}';
//     }
// });

//  //DELETE para borrar instalacion DELETE BY ID
//  $app->delete('/api/mfo/borrar/{id}',function(Request $request, Response $response){

//      $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
  
//      // echo "todas las instalaciones";
//      $sql='DELETE FROM mfo WHERE id='.$id;
//      try{
//          $db= new db();     
//          $db=$db->conectDB();
//          $resultado= $db->prepare($sql);
//          $resultado->execute();
      
//          if($resultado->rowCount()>0){
//              echo json_encode("MFO eliminado con éxito",JSON_UNESCAPED_UNICODE);
          
//          }else{
//              echo json_encode("No se han encontrado resultados con el ID".$id,JSON_UNESCAPED_UNICODE);
//          }
   
//          $resultado=null;
//          $db=null;
//      }catch(PDOException $e){
//          echo '{"error":{"text":'.$e->getMessage().'}';
//      }
//  });


 //POST para modificar instalacion UPDATE BY ID
  $app->put('/api/preciosmfo/modificar',function(Request $request, Response $response){
      //declaracion de las variables de recepcion desde FRONT
      //$id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    
      $preciomfocruce=$request->getParam('preciomfocruce');
      $preciomfopp=$request->getParam('preciomfopp');
      $preciomfopm=$request->getParam('preciomfopm');
      $preciomfocargador=$request->getParam('preciomfocargador');
      $preciomfoacire=$request->getParam('preciomfoacire');
      $preciomfocamara=$request->getParam('preciomfocamara');
      $preciomfocentral=$request->getParam('preciomfocentral');
      $preciomfosector=$request->getParam('preciomfosector');
      $preciomfonodo=$request->getParam('preciomfonodo');
      $preciomforadar=$request->getParam('preciomforadar');
      

  
      // echo "todas las instalaciones";
      $sql='UPDATE preciosmfo SET preciomfocruce=:preciomfocruce,preciomfopp=:preciomfopp,preciomfopm=:preciomfopm,preciomfocargador=:preciomfocargador, preciomfoacire=:preciomfoacire, preciomfocamara=:preciomfocamara, preciomfocamara=:preciomfocamara, preciomfocentral=:preciomfocentral, preciomfosector=:preciomfosector, preciomfonodo=:preciomfonodo, preciomforadar=:preciomforadar;';

      try{
          $db= new db();     
          $db=$db->conectDB();
          $resultado= $db->prepare($sql);
          //Asignar campos del SQL a las variables obtenidas
          $resultado->bindParam(':preciomfocruce',$preciomfocruce);
          $resultado->bindParam(':preciomfopp',$preciomfopp);
          $resultado->bindParam(':preciomfopm',$preciomfopm);
          $resultado->bindParam(':preciomfocargador',$preciomfocargador);
          $resultado->bindParam(':preciomfoacire',$preciomfoacire);
          $resultado->bindParam(':preciomfocamara',$preciomfocamara);
          $resultado->bindParam(':preciomfocentral',$preciomfocentral);
          $resultado->bindParam(':preciomfosector',$preciomfosector);
          $resultado->bindParam(':preciomfonodo',$preciomfonodo);
          $resultado->bindParam(':preciomforadar',$preciomforadar);


          $resultado->execute();
          echo json_encode("Precios editados con éxito",JSON_UNESCAPED_UNICODE);
          $resultado=null;
          $db=null;
      }catch(PDOException $e){
          echo '{"error":{"text":'.$e->getMessage().'}';
      }
  });

  $app->put('/api/setpliego',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT
    //$id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
  
    $n=$request->getParam('n');
   


    // echo "todas las instalaciones";
    $sql='UPDATE configuracion SET pliego=:n;';

    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':n',$n);
        $resultado->execute();
        echo json_encode("Configuración de pliego modificado con éxito",JSON_UNESCAPED_UNICODE);
        $resultado=null;
        $db=null;
    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

