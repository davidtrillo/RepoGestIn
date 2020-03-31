<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

 $app->get('/api/consultatipo/{tipo}/{id}',function(Request $request, Response $response){
    $id= $request->getAttribute('id');
    $tipo= $request->getAttribute('tipo');
    
    if ($tipo=='led') {
        $sql = 'SELECT * FROM led WHERE idInstalacion="' . $id . '" order by activo desc,fechaActuacion desc';
    }else{
        $sql='SELECT fechaActuacion,idTipoActuacion,precio,salbaran from '. $tipo .'  where idInstalacion="'. $id .'" and activo="true" order by 1 desc;';
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
