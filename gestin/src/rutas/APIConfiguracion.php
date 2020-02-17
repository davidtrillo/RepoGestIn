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



 $app->get('/api/nid',function(Request $request, Response $response){

        // conexion SQLServer
        function conectDBSQLServer(){
            $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
            $connectionInfo = array( "Database"=>"Palma", "UID"=>"dtrillo", "PWD"=>"Mobilitat01",'CharacterSet' => 'UTF-8');
            $connSQLServer = sqlsrv_connect( $serverName, $connectionInfo);
            if( $connSQLServer ) {
                return $connSQLServer; 
            }else{
                die( print_r( sqlsrv_errors(), true));
            }
        }
        // conexion MySQL
        function conectDBMySQL(){
            $dbUser='root';
            $dbPass='';
            $mysqlConnect="mysql:charset=utf8;host=localhost;dbname=gestin";
            $connMySQL= new PDO($mysqlConnect,$dbUser,$dbPass);
            $connMySQL->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            if (!$connMySQL) {
                die("Connection failed: " . mysqli_connect_error());
          }
           
          echo "Connected successfully";
            return $connMySQL; 
        }



   
    try{
        //CONECTAR CON SQLSERVER
        $connSQLServer = conectDBSQLServer();  
        $sqlSQLServer="select Elm_CódigoNID from Cruce_Link_Elemento where (Elm_CódigoNID is not null) AND (Elm_FechaHasta IS NULL) LIMIT 10;";
        $getNID = sqlsrv_query($connSQLServer, $sqlSQLServer);  
        
        //CONECTAR CON MYSQL
        $connMySQL = conectDBMySQL();  
       // $sqlMySQL="select Elm_CódigoNID from Cruce_Link_Elemento where (Elm_CódigoNID is not null) AND (Elm_FechaHasta IS NULL);";


//    $result=array();

         if ($getNID == FALSE)  
             die(FormatErrors(sqlsrv_errors()));  

              $count = 0;  
              while($row = sqlsrv_fetch_array($getNID, SQLSRV_FETCH_ASSOC))  
              {  

                $sqlMySQL="INSERT INTO `gestin`.`nid` (`nid`) VALUES ('". $row['Elm_CódigoNID']."')";
                mysqli_query($connMySQL, $sqlMySQL);
                $st = mysqli_prepare($connMySQL, $sqlMySQL);

                // bind variables to insert query params
                //mysqli_stmt_bind_param($st, 'ssss', $firstname, $lastname, $gender, $username);
            
                // executing insert query
                mysqli_stmt_execute($st);





                 echo($row['Elm_CódigoNID']);
                  $count++;  
              } 
         
        

        sqlsrv_free_stmt($getNID);  
        sqlsrv_close($connSQLServer); 

      //  echo json_encode($result);

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
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
    
      $numerogrupo11=$request->getParam('numerogrupo11');
      $numerogrupo12=$request->getParam('numerogrupo12');
      $numerogrupo21=$request->getParam('numerogrupo21');
      $numerogrupo22=$request->getParam('numerogrupo22');
      $numerogrupo31=$request->getParam('numerogrupo31');
      $numerogrupo32=$request->getParam('numerogrupo32');
      $numerogrupo41=$request->getParam('numerogrupo41');
      $preciogrupo1=$request->getParam('preciogrupo1');
      $preciogrupo2=$request->getParam('preciogrupo2');
      $preciogrupo3=$request->getParam('preciogrupo3');
      $preciogrupo4=$request->getParam('preciogrupo4');

  
      // echo "todas las instalaciones";
      $sql='UPDATE preciosmfo SET numerogrupo11=:numerogrupo11,numerogrupo12=:numerogrupo12,numerogrupo21=:numerogrupo21,numerogrupo22=:numerogrupo22, numerogrupo22=:numerogrupo22, numerogrupo31=:numerogrupo31, numerogrupo32=:numerogrupo32, numerogrupo41=:numerogrupo41, preciogrupo1=:preciogrupo1, preciogrupo2=:preciogrupo2, preciogrupo3=:preciogrupo3, preciogrupo4=:preciogrupo4;';

      try{
          $db= new db();     
          $db=$db->conectDB();
          $resultado= $db->prepare($sql);
          //Asignar campos del SQL a las variables obtenidas
          $resultado->bindParam(':numerogrupo11',$numerogrupo11);
          $resultado->bindParam(':numerogrupo12',$numerogrupo12);
          $resultado->bindParam(':numerogrupo21',$numerogrupo21);
          $resultado->bindParam(':numerogrupo22',$numerogrupo22);
          $resultado->bindParam(':numerogrupo31',$numerogrupo31);
          $resultado->bindParam(':numerogrupo32',$numerogrupo32);
          $resultado->bindParam(':numerogrupo41',$numerogrupo41);
          $resultado->bindParam(':preciogrupo1',$preciogrupo1);
          $resultado->bindParam(':preciogrupo2',$preciogrupo2);
          $resultado->bindParam(':preciogrupo3',$preciogrupo3);
          $resultado->bindParam(':preciogrupo4',$preciogrupo4);

          $resultado->execute();
          echo json_encode("Precios editados con éxito",JSON_UNESCAPED_UNICODE);
          $resultado=null;
          $db=null;
      }catch(PDOException $e){
          echo '{"error":{"text":'.$e->getMessage().'}';
      }
  });
