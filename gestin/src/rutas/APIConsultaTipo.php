<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

 $app->get('/api/consultatipo/{tipo}/{id}',function(Request $request, Response $response){
    $id= $request->getAttribute('id');
    $tipo= $request->getAttribute('tipo');
    
    if ($tipo=='led') {
        $sql = 'SELECT * FROM led WHERE idInstalacion="' . $id . '" and activo="true" order by activo desc,fechaActuacion desc';
    }else{
        $sql='SELECT * from '. $tipo .'  where idInstalacion="'. $id .'" and activo="true" order by fechaActuacion desc;';
    }
    
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

 $app->get('/api/consultatipo/total/{tipo}/{id}',function(Request $request, Response $response){
    $id= $request->getAttribute('id');
    $tipo= $request->getAttribute('tipo');
    
    if ($tipo=='led') {
        $sql = 'SELECT count(*) FROM led WHERE idInstalacion="' . $id . '" and activo="true";';
    }else{
        $sql='SELECT count(id) from '. $tipo .'  where idInstalacion="'. $id .'" and activo="true" ;';
    }
    
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



 
//GET Todas SELECT
    function conectDBSQLServer(){
        $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
        $connectionInfo = array( "Database"=>"Palma", "UID"=>"dtrillo", "PWD"=>"Mobilitat01",'CharacterSet' => 'UTF-8');
     //  print_r($connectionInfo);
        $conn = sqlsrv_connect( $serverName, $connectionInfo);
        //echo $conn;
        
        if( $conn ) {
             echo "Conexión establecida.<br />";
             return $conn; 
        
        }else{
             echo "Conexión no se pudo establecer.<br />";
             die( print_r( sqlsrv_errors(), true));
        }
    }


$app->get('/api/consultatipo/inca/',function(Request $request, Response $response){
        
    
    try  
         {  

            $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
        $connectionInfo = array( "Database"=>"Palma", "UID"=>"dtrillo", "PWD"=>"Mobilitat01",'CharacterSet' => 'UTF-8');
     //  print_r($connectionInfo);
        $conn = sqlsrv_connect( $serverName, $connectionInfo);
      
            //$sql="SELECT '11-200',count(Modelo)as Total FROM dbo.INCA030_Semáforos WHERE Modelo LIKE '%11-200%';";
            $sql=" 
            SELECT '11-200',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%11-200%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT '11-300',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%11-300%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT '12-100',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%12-100%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT '12-200',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%12-200%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT '12-300',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%12-300%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT '13-200',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%13-200%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT '13-322',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%Rojo 300%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT '13-332',count(Modelo)as Total FROM [Palma].[dbo].[INCA030_Semáforos] WHERE Modelo LIKE '%13-300 Verde 200%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT 'Pantallas Contraste',COUNT( [Elm_Pantalla])FROM [Palma].[dbo].[INCA030_Semáforos] where Elm_Pantalla='Sí' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000'
            union all
            SELECT 'Pulsadores',COUNT(Modelo)FROM [Palma].[dbo].[INCA030_Semáforos] where  Modelo LIKE '%Pulsador%' and [Fecha de Baja de Elemento]='9999-12-31 00:00:00.000';
            ";
            $getQuery = sqlsrv_query($conn, $sql);  

          $errors = sqlsrv_errors(); 
                foreach( $errors as $error ) {
                    echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
                    echo "code: ".$error[ 'code']."<br />";
                    echo "message: ".$error[ 'message']."<br />";
                    
                }

          
           
          if ($getQuery == FALSE){
                  die();
                 };
        
            $json = array();

            while( $row = sqlsrv_fetch_array( $getQuery, SQLSRV_FETCH_ASSOC))
            {    
                $json[] = $row;
            }
            
           // echo json_encode($json);   

           // echo($conn);
           
           // echo($getQuery);
         // $count = 0;  
        //  while($row = sqlsrv_fetch_array($getQuery, SQLSRV_FETCH_ASSOC))  
          
        //  $row = sqlsrv_fetch_array($getQuery, SQLSRV_FETCH_ASSOC)  ;
            // {  
            //      echo($row[0][$count]);
           // $count++;  
           // } 
        //  echo($conn); 
        // $row = sqlsrv_fetch_array($getQuery, SQLSRV_FETCH_ASSOC);
        // echo($productCount);
                
      
            sqlsrv_free_stmt($getQuery);  
            sqlsrv_close($conn);  
            
           

            return json_encode($json);
         }  
         catch(Exception $e)  
         {  
             echo("Error!");  
         }  ;
    
 });   
        
    
    
    
     


























 // //POST para crear una nueva instalación CREATE

// $app->post('/api/preventivo/nueva',function(Request $request, Response $response){
//     //declaracion de las variables de recepcion desde FRONT

//     $idInstalacion=$request->getParam('idInstalacion');
//     $fechaPreventivo=$request->getParam('fechaPreventivo');
//     $fechaInspeccionVoluntarioSemaforo=$request->getParam('fechaInspeccionVoluntarioSemaforo');
//     $fechaInspeccionAlumbrado=$request->getParam('fechaInspeccionAlumbrado');
//     $observacionesPreventivo=$request->getParam('observacionesPreventivo');
//     $observacionesInspeccionVoluntarioSemaforo=$request->getParam('observacionesInspeccionVoluntarioSemaforo');
//     $observacionesInspeccionAlumbrado=$request->getParam('observacionesInspeccionAlumbrado');
//     $estadoInspeccionVoluntarioSemaforo=$request->getParam('estadoInspeccionVoluntarioSemaforo');
//     $estadoInspeccionAlumbrado=$request->getParam('estadoInspeccionAlumbrado');
//     $idUsuario=$request->getParam('idUsuario');
   
   
//     $sql='INSERT INTO preventivo(idInstalacion,idUsuario,fechaPreventivo,fechaInspeccionVoluntarioSemaforo,fechaInspeccionAlumbrado,observacionesPreventivo,observacionesInspeccionVoluntarioSemaforo,observacionesInspeccionAlumbrado,estadoInspeccionVoluntarioSemaforo,estadoInspeccionAlumbrado) VALUES (:idInstalacion,:idUsuario,:fechaPreventivo,:fechaInspeccionVoluntarioSemaforo,:fechaInspeccionAlumbrado,:observacionesPreventivo,:observacionesInspeccionVoluntarioSemaforo,:observacionesInspeccionAlumbrado,:estadoInspeccionVoluntarioSemaforo,:estadoInspeccionAlumbrado)';



//    try{
//         $db= new db();     
//         $db=$db->conectDB();
//         $resultado= $db->prepare($sql);


//         //Asignar campos del SQL a las variables obtenidas
//         $resultado->bindParam(':idInstalacion',$idInstalacion);
//         $resultado->bindParam(':fechaPreventivo',$fechaPreventivo);
//         $resultado->bindParam(':fechaInspeccionVoluntarioSemaforo',$fechaInspeccionVoluntarioSemaforo);
//         $resultado->bindParam(':fechaInspeccionAlumbrado',$fechaInspeccionAlumbrado);
//         $resultado->bindParam(':idUsuario',$idUsuario);
//         $resultado->bindParam(':observacionesPreventivo',$observacionesPreventivo);
//         $resultado->bindParam(':observacionesInspeccionAlumbrado',$observacionesInspeccionAlumbrado);
//         $resultado->bindParam(':observacionesInspeccionVoluntarioSemaforo',$observacionesInspeccionVoluntarioSemaforo);
//         $resultado->bindParam(':estadoInspeccionVoluntarioSemaforo',$estadoInspeccionVoluntarioSemaforo);
//         $resultado->bindParam(':estadoInspeccionAlumbrado',$estadoInspeccionAlumbrado);

//         $resultado->execute();
//         echo json_encode("Registro guardado con éxito",JSON_UNESCAPED_UNICODE);

//         $resultado=null;
//         $db=null;

//     }catch(PDOException $e){
//         echo '{"error":{"text":'.$e->getMessage().'}';
//     }
// });

//  //DELETE para borrar instalacion DELETE BY ID
//  $app->delete('/api/preventivo/borrar/{id}',function(Request $request, Response $response){

//      $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
  
//      // echo "todas las instalaciones";
//      $sql='DELETE FROM preventivo WHERE id='.$id;
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


// //POST para modificar instalacion UPDATE BY ID
//  $app->put('/api/preventivo/modificar/{id}',function(Request $request, Response $response){
//      //declaracion de las variables de recepcion desde FRONT
//      $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

//      $idInstalacion=$request->getParam('idInstalacion');
//      $fechaPreventivo=$request->getParam('fechaPreventivo');
//      $fechaInspeccionVoluntarioSemaforo=$request->getParam('fechaInspeccionVoluntarioSemaforo');
//      $fechaInspeccionAlumbrado=$request->getParam('fechaInspeccionAlumbrado');
//      $observacionesPreventivo=$request->getParam('observacionesPreventivo');
//      $observacionesInspeccionVoluntarioSemaforo=$request->getParam('observacionesInspeccionVoluntarioSemaforo');
//      $observacionesInspeccionAlumbrado=$request->getParam('observacionesInspeccionAlumbrado');
//      $estadoInspeccionVoluntarioSemaforo=$request->getParam('estadoInspeccionVoluntarioSemaforo');
//      $estadoInspeccionAlumbrado=$request->getParam('estadoInspeccionAlumbrado');
//      $idUsuario=$request->getParam('idUsuario');

  
//      // echo "todas las instalaciones";
//      $sql='UPDATE preventivo SET idInstalacion=:idInstalacion,idUsuario=:idUsuario,fechaPreventivo=:fechaPreventivo,fechaInspeccionVoluntarioSemaforo=:fechaInspeccionVoluntarioSemaforo, fechaInspeccionAlumbrado=:fechaInspeccionAlumbrado, observacionesPreventivo=:observacionesPreventivo, observacionesInspeccionVoluntarioSemaforo=:observacionesInspeccionVoluntarioSemaforo, observacionesInspeccionAlumbrado=:observacionesInspeccionAlumbrado,estadoInspeccionVoluntarioSemaforo=:estadoInspeccionVoluntarioSemaforo,estadoInspeccionAlumbrado=:estadoInspeccionAlumbrado WHERE id='.$id;
//      try{
//          $db= new db();     
//          $db=$db->conectDB();
//          $resultado= $db->prepare($sql);
//          //Asignar campos del SQL a las variables obtenidas

//          $resultado->bindParam(':idInstalacion',$idInstalacion);
//          $resultado->bindParam(':fechaPreventivo',$fechaPreventivo);
//          $resultado->bindParam(':fechaInspeccionVoluntarioSemaforo',$fechaInspeccionVoluntarioSemaforo);
//          $resultado->bindParam(':fechaInspeccionAlumbrado',$fechaInspeccionAlumbrado);
//          $resultado->bindParam(':idUsuario',$idUsuario);
//          $resultado->bindParam(':observacionesPreventivo',$observacionesPreventivo);
//          $resultado->bindParam(':observacionesInspeccionAlumbrado',$observacionesInspeccionAlumbrado);
//          $resultado->bindParam(':observacionesInspeccionVoluntarioSemaforo',$observacionesInspeccionVoluntarioSemaforo);
//          $resultado->bindParam(':estadoInspeccionVoluntarioSemaforo',$estadoInspeccionVoluntarioSemaforo);
//          $resultado->bindParam(':estadoInspeccionAlumbrado',$estadoInspeccionAlumbrado);

//          $resultado->execute();
//          echo json_encode("Preventivo editado con éxito",JSON_UNESCAPED_UNICODE);
//          $resultado=null;
//          $db=null;
//      }catch(PDOException $e){
//          echo '{"error":{"text":'.$e->getMessage().'}';
//      }
//  });
