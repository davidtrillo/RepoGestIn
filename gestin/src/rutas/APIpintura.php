<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;






  //GET Todas las pinturas SELECT

 $app->get('/api/elementospintura/{idInstalacion}',function(Request $request, Response $response){
    $idInstalacion= $request->getAttribute('idInstalacion');
    $sql='SELECT e.*, i.ubicacion FROM elementos e JOIN instalaciones i ON e.idInstalacion=i.id WHERE e.idInstalacion="' .$idInstalacion.'"';

   
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
//GET Todas las pinturas SELECT

 $app->get('/api/pintura',function(Request $request, Response $response){

     $sql='SELECT p.*,i.ubicacion FROM pintura p INNER JOIN instalaciones i ON p.idInstalacion =i.id order by p.fechaActuacion desc';
    
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

$app->post('/api/pintura/nueva',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $idInstalacion=$request->getParam('idInstalacion');
    $fechaActuacion=$request->getParam('fechaActuacion');
    $fechaInspeccion=$request->getParam('fechaInspeccion');
    $observaciones=$request->getParam('observaciones');
    $idUsuario=$request->getParam('idUsuario');
    $resolucion=$request->getParam('resolucion');
    
   
    $sql='INSERT INTO pintura(idInstalacion,fechaActuacion,fechaInspeccion,observaciones,idUsuario,resolucion) VALUES (:idInstalacion,:fechaActuacion,:fechaInspeccion,:observaciones,:idUsuario,:resolucion)';



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


        $resultado->execute();
        echo json_encode("Regsitro guardado con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

 //DELETE para borrar instalacion DELETE BY ID
 $app->delete('/api/pintura/borrar/{id}',function(Request $request, Response $response){

     $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
  
     // echo "todas las instalaciones";
     $sql='DELETE FROM pintura WHERE id='.$id;
     try{
         $db= new db();     
         $db=$db->conectDB();
         $resultado= $db->prepare($sql);
         $resultado->execute();
      
         if($resultado->rowCount()>0){
             echo json_encode("Pintura eliminada con éxito",JSON_UNESCAPED_UNICODE);
          
         }else{
             echo json_encode("No se han encontrado resultados con el ID".$id,JSON_UNESCAPED_UNICODE);
         }
   
         $resultado=null;
         $dbConexion=null;
     }catch(PDOException $e){
         echo '{"error":{"text":'.$e->getMessage().'}';
     }
 });








//POST para modificar instalacion UPDATE BY ID

// $app->put('/api/inventario/modificar/{id}',function(Request $request, Response $response){
//     //declaracion de las variables de recepcion desde FRONT

//     $idInstalacion= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE


//     $idRegulador=$request->getParam('idRegulador');
//     $alimentacion=$request->getParam('alimentacion');
//     $idCM=$request->getParam('idCM');
//     $idUsuario=$request->getParam('idUsuario');
//     $watios=$request->getParam('watios');
//     //$plano=$request->getParam('plano');
//     //$resolucion=$request->getParam('resolucion');
    
//     // echo "todas las instalaciones";
//     $sql='UPDATE inventario SET alimentacion=:alimentacion,idRegulador=:idRegulador,idCM=:idCM,idUsuario=:idUsuario, watios=:watios WHERE idInstalacion="'.$idInstalacion.'"';

//     try{
//         $db= new db();     
//         $db=$db->conectDB();
//         $resultado= $db->prepare($sql);


//         //Asignar campos del SQL a las variables obtenidas
//        // $resultado->bindParam(':idInstalacion',$idInstalacion);
//         $resultado->bindParam(':idRegulador',$idRegulador);
//         $resultado->bindParam(':alimentacion',$alimentacion);
//         $resultado->bindParam(':idCM',$idCM);
//         $resultado->bindParam(':idUsuario',$idUsuario);
//         $resultado->bindParam(':watios',$watios);
//        // $resultado->bindParam(':plano',$plano);
//        // $resultado->bindParam(':resolucion',$resolucion);

//         $resultado->execute();
//         echo json_encode("Instalación editada con éxito",JSON_UNESCAPED_UNICODE);

//         $resultado=null;
//         $dbConexion=null;

//     }catch(PDOException $e){
//         echo '{"error":{"text":'.$e->getMessage().'}';
//     }
// });


