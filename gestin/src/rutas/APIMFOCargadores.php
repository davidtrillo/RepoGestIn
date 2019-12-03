<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

$app->get('/api/cargadores',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql='SELECT id, ubicacion FROM instalaciones where tipoInstalacion LIKE "CARGA%" ORDER BY 1';
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount()>0){
            $cruces= $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($cruces,JSON_UNESCAPED_UNICODE);
            
        }else{
            echo json_encode("No se han encontrado resultados");
        }
        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }

    
});



 $app->get('/api/mfocargadores/cargadores/{cruce}',function(Request $request, Response $response){
    
     $cruce= $request->getAttribute('cruce'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

     $sql='SELECT p.*,i.ubicacion FROM mfocargadores p INNER JOIN instalaciones i ON p.idInstalacion =i.id WHERE idInstalacion LIKE "'.$cruce.'" order by p.fechaActuacion desc';
     
    
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

$app->post('/api/mfocargadores/nueva',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $idInstalacion=$request->getParam('idInstalacion');
    $fechaActuacion=$request->getParam('fechaActuacion');
    $fechaInspeccion=$request->getParam('fechaInspeccion');
    $observaciones=$request->getParam('observaciones');
    $idUsuario=$request->getParam('idUsuario');
    $resolucion=$request->getParam('resolucion');
    $precio=$request->getParam('precio');
    
   
    $sql='INSERT INTO mfocargadores(idInstalacion,idUsuario,observaciones,resolucion,fechaActuacion,fechaInspeccion,precio) VALUES (:idInstalacion,:idUsuario,:observaciones,:resolucion,:fechaActuacion,:fechaInspeccion,:precio)';



   try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);


        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':idInstalacion',$idInstalacion);
        $resultado->bindParam(':fechaActuacion',$fechaActuacion);
        $resultado->bindParam(':fechaInspeccion',$fechaInspeccion);
        $resultado->bindParam(':observaciones',$observaciones);
        $resultado->bindParam(':idUsuario',$idUsuario);
        $resultado->bindParam(':resolucion',$resolucion);
        $resultado->bindParam(':precio',$precio);
       

        $resultado->execute();
        echo json_encode("Registro guardado con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

 //DELETE para borrar instalacion DELETE BY ID
 $app->delete('/api/mfocargadores/borrar/{id}',function(Request $request, Response $response){

     $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
  
     // echo "todas las instalaciones";
     $sql='DELETE FROM mfocargadores WHERE id='.$id;
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
 $app->put('/api/mfocargadores/modificar/{id}',function(Request $request, Response $response){
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
     $sql='UPDATE mfocargadores SET idInstalacion=:idInstalacion,idUsuario=:idUsuario,observaciones=:observaciones,fechaActuacion=:fechaActuacion, fechaInspeccion=:fechaInspeccion, resolucion=:resolucion, precio=:precio WHERE id='.$id;
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
 $app->get('/api/mfocargadores/imprimir/{a}/{b}',function(Request $request, Response $response){
    $mes= $request->getAttribute('a');
    $año= $request->getAttribute('b');

    $sql='SELECT idInstalacion, i.ubicacion, fechaActuacion, observaciones, precio FROM mfocargadores m JOIN instalaciones i ON m.idInstalacion=i.id WHERE month(m.fechaactuacion)="'.$mes.'" AND year(m.fechaactuacion)="'.$año.'"';
    //$sql='SELECT idInstalacion, i.ubicacion, fechaActuacion, observaciones, precio FROM mfo m JOIN instalaciones i ON m.idInstalacion=i.id WHERE month(m.fechaactuacion)="9" AND year(m.fechaactuacion)="2019"';
   
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