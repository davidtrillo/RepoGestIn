<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

 $app->get('/api/preventivo',function(Request $request, Response $response){

     $sql='SELECT p.*,i.ubicacion FROM preventivo p INNER JOIN instalaciones i ON p.idInstalacion =i.id order by p.fechaPreventivo desc';
    
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


//POST para crear una nueva instalación CREATE

$app->post('/api/preventivo/nueva',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $idInstalacion=$request->getParam('idInstalacion');
    $fechaPreventivo=$request->getParam('fechaPreventivo');
    $fechaInspeccionVoluntarioSemaforo=$request->getParam('fechaInspeccionVoluntarioSemaforo');
    $fechaInspeccionAlumbrado=$request->getParam('fechaInspeccionAlumbrado');
    $observacionesPreventivo=$request->getParam('observacionesPreventivo');
    $observacionesInspeccionVoluntarioSemaforo=$request->getParam('observacionesInspeccionVoluntarioSemaforo');
    $observacionesInspeccionAlumbrado=$request->getParam('observacionesInspeccionAlumbrado');
    $estadoInspeccionVoluntarioSemaforo=$request->getParam('estadoInspeccionVoluntarioSemaforo');
    $estadoInspeccionAlumbrado=$request->getParam('estadoInspeccionAlumbrado');
    $idUsuario=$request->getParam('idUsuario');
   
   
    $sql='INSERT INTO preventivo(idInstalacion,idUsuario,fechaPreventivo,fechaInspeccionVoluntarioSemaforo,fechaInspeccionAlumbrado,observacionesPreventivo,observacionesInspeccionVoluntarioSemaforo,observacionesInspeccionAlumbrado,estadoInspeccionVoluntarioSemaforo,estadoInspeccionAlumbrado) VALUES (:idInstalacion,:idUsuario,:fechaPreventivo,:fechaInspeccionVoluntarioSemaforo,:fechaInspeccionAlumbrado,:observacionesPreventivo,:observacionesInspeccionVoluntarioSemaforo,:observacionesInspeccionAlumbrado,:estadoInspeccionVoluntarioSemaforo,:estadoInspeccionAlumbrado)';



   try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);


        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':idInstalacion',$idInstalacion);
        $resultado->bindParam(':fechaPreventivo',$fechaPreventivo);
        $resultado->bindParam(':fechaInspeccionVoluntarioSemaforo',$fechaInspeccionVoluntarioSemaforo);
        $resultado->bindParam(':fechaInspeccionAlumbrado',$fechaInspeccionAlumbrado);
        $resultado->bindParam(':idUsuario',$idUsuario);
        $resultado->bindParam(':observacionesPreventivo',$observacionesPreventivo);
        $resultado->bindParam(':observacionesInspeccionAlumbrado',$observacionesInspeccionAlumbrado);
        $resultado->bindParam(':observacionesInspeccionVoluntarioSemaforo',$observacionesInspeccionVoluntarioSemaforo);
        $resultado->bindParam(':estadoInspeccionVoluntarioSemaforo',$estadoInspeccionVoluntarioSemaforo);
        $resultado->bindParam(':estadoInspeccionAlumbrado',$estadoInspeccionAlumbrado);

        $resultado->execute();
        echo json_encode("Registro guardado con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

 //DELETE para borrar instalacion DELETE BY ID
 $app->delete('/api/preventivo/borrar/{id}',function(Request $request, Response $response){

     $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
  
     // echo "todas las instalaciones";
     $sql='DELETE FROM preventivo WHERE id='.$id;
     try{
         $db= new db();     
         $db=$db->conectDB();
         $resultado= $db->prepare($sql);
         $resultado->execute();
      
         if($resultado->rowCount()>0){
             echo json_encode("MFO eliminado con éxito",JSON_UNESCAPED_UNICODE);
          
         }else{
             echo json_encode("No se han encontrado resultados con el ID".$id,JSON_UNESCAPED_UNICODE);
         }
   
         $resultado=null;
         $db=null;
     }catch(PDOException $e){
         echo '{"error":{"text":'.$e->getMessage().'}';
     }
 });


//POST para modificar instalacion UPDATE BY ID
 $app->put('/api/preventivo/modificar/{id}',function(Request $request, Response $response){
     //declaracion de las variables de recepcion desde FRONT
     $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
     $idInstalacion=$request->getParam('idInstalacion');
     $idUsuario=$request->getParam('idUsuario');
     $observaciones=$request->getParam('observaciones');
     $fechaActuacion=$request->getParam('fechaActuacion');
     $fechaInspeccion=$request->getParam('fechaInspeccion');
     $resolucion=$request->getParam('resolucion');
     $precio=$request->getParam('precio');
  
     // echo "todas las instalaciones";
     $sql='UPDATE preventivo SET idInstalacion=:idInstalacion,idUsuario=:idUsuario,observaciones=:observaciones,fechaActuacion=:fechaActuacion, fechaInspeccion=:fechaInspeccion, resolucion=:resolucion, precio=:precio WHERE id='.$id;
     try{
         $db= new db();     
         $db=$db->conectDB();
         $resultado= $db->prepare($sql);
         //Asignar campos del SQL a las variables obtenidas

         $resultado->bindParam(':idInstalacion',$idInstalacion);
         $resultado->bindParam(':idUsuario',$idUsuario);
         $resultado->bindParam(':observaciones',$observaciones);
         $resultado->bindParam(':fechaActuacion',$fechaActuacion);
         $resultado->bindParam(':fechaInspeccion',$fechaInspeccion);
         $resultado->bindParam(':resolucion',$resolucion);
         $resultado->bindParam(':precio',$precio);

         $resultado->execute();
         echo json_encode("MFO editado con éxito",JSON_UNESCAPED_UNICODE);
         $resultado=null;
         $db=null;
     }catch(PDOException $e){
         echo '{"error":{"text":'.$e->getMessage().'}';
     }
 });
