<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//$app = new \Slim\App;


//GET Todas las instalaciones SELECT
$app->get('/api/led/{instalacion}/{limit}', function (Request $request, Response $response) {

    
    $limit = $request->getAttribute('limit');
    $instalacion = $request->getAttribute('instalacion');

   
        $sql = 'SELECT * FROM led where idInstalacion="' .$instalacion.  '" ORDER BY activo DESC, nid  limit '. $limit;
  


    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $allTarjetas = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($allTarjetas, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});


$app->get('/api/ledid/{id}', function (Request $request, Response $response) {

    
    $id = $request->getAttribute('id');
   

   
        $sql = 'SELECT * FROM led where id="' .$id.  '"';
  


    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $allTarjetas = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($allTarjetas, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});


//GET count todos los leds de un cruce
$app->get('/api/ledc/cont/{cruce}', function (Request $request, Response $response) {

    
    // $limit = $request->getAttribute('limit');
    // $offset = $request->getAttribute('offset');
    $cruce = $request->getAttribute('cruce');


        $sql = 'SELECT count(*) as c FROM led WHERE idInstalacion="' . $cruce . '" and activo="true";';
   


    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $allTarjetas = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($allTarjetas, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});

//GET Todas las instalaciones SELECT
$app->get('/api/ledi/{cruce}/{offset}/{limit}', function (Request $request, Response $response) {

    
    $limit = $request->getAttribute('limit');
    $offset = $request->getAttribute('offset');
  //  $paginacion = $request->getAttribute('paginacion');
    $cruce = $request->getAttribute('cruce');


        $sql = 'SELECT * FROM led WHERE idInstalacion="' . $cruce . '" ORDER BY activo DESC, nid,fechaActuacion desc limit '. $offset .','.$limit;
   


    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $allTarjetas = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($allTarjetas, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});

$app->get('/api/ledi/repes/{limit}', function (Request $request, Response $response) {

    $limit = $request->getAttribute('limit');

     if ($limit==0) {
         $sql = 'SELECT count(*) as c from led where idnumserie in (SELECT idnumserie FROM gestin.led where idNumSerie<>0 and activo="true" group by idNumSerie having (count(idNumSerie)>=2))';
     }else{
        $sql = 'SELECT * from led where idnumserie in (SELECT idnumserie FROM gestin.led where (idNumSerie<>"0" and idNumSerie<>"") and activo="true" group by idNumSerie having (count(idNumSerie)>=2)) order by idNumSerie limit '. $limit;
     }

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $allTarjetas = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($allTarjetas, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});

//GET Tarjetas activas COUNT
$app->get('/api/ledi/activas/{instalacion}', function (Request $request, Response $response) {

    $instalacion = $request->getAttribute('instalacion');
    $sql = 'SELECT count(id) AS c FROM led WHERE activo="true" AND idInstalacion="' . $instalacion . '"';
    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $allTarjetas = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($allTarjetas, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados2");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});


$app->get('/api/led/{instalacion}', function (Request $request, Response $response) {

    $instalacion = $request->getAttribute('instalacion');
    $sql = 'SELECT * FROM led WHERE idInstalacion="' . $instalacion . '" ORDER BY activo DESC, nid,fechaActuacion desc';
    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $tipoInstalacion = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($tipoInstalacion, JSON_UNESCAPED_UNICODE);

        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});

// POST para crear una nueva instalación CREATE
$app->post('/api/led/nueva', function (Request $request, Response $response) {
    //declaracion de las variables de recepcion desde FRONT
    // $id=$request->getParam('id');
    $idInstalacion = $request->getParam('idInstalacion');
    $color = $request->getParam('color');
    $idNumSerie = $request->getParam('idNumSerie');
    $albaran = $request->getParam('albaran');
    $observaciones = $request->getParam('observaciones');
    $fechaActuacion = $request->getParam('fechaActuacion');
    $idUsuario = $request->getParam('idUsuario');
    $fabricacion = $request->getParam('fabricacion');
    $tipo = $request->getParam('tipo');
    $activo = $request->getParam('activo');
    $almacen = $request->getParam('almacen');
    $nid = $request->getParam('nid');

    // echo "todas las instalaciones";
    $sql = 'INSERT INTO led (id, idInstalacion, color, idNumSerie, idUsuario,albaran, observaciones, fechaActuacion, fabricacion, tipo, activo, almacen, nid) VALUES (NULL, :idInstalacion, :color, :idNumSerie, :idUsuario,:albaran ,:observaciones, :fechaActuacion, :fabricacion,:tipo, :activo, :almacen, :nid);';
    // $sql='INSERT INTO led (idInstalacion) VALUES (:idInstalacion);';

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        //Asignar campos del SQL a las variables obtenidas
        // $resultado->bindParam(':id',$id);
        $resultado->bindParam(':idInstalacion', $idInstalacion);
        $resultado->bindParam(':color', $color);
        $resultado->bindParam(':albaran', $albaran);
        $resultado->bindParam(':idNumSerie', $idNumSerie);
        $resultado->bindParam(':idUsuario', $idUsuario);
        $resultado->bindParam(':observaciones', $observaciones);
        $resultado->bindParam(':fechaActuacion', $fechaActuacion);
        $resultado->bindParam(':tipo', $tipo);
        $resultado->bindParam(':fabricacion', $fabricacion);
        $resultado->bindParam(':activo', $activo);
        $resultado->bindParam(':almacen', $almacen);
        $resultado->bindParam(':nid', $nid);

        $resultado->execute();
        echo json_encode("Led guardado con éxito", JSON_UNESCAPED_UNICODE);

        $resultado = null;
        $db = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
        echo json_encode("Algo no ha ido bien", JSON_UNESCAPED_UNICODE);
    }
});

//DELETE para borrar instalacion DELETE BY ID

$app->delete('/api/led/borrar/{id}', function (Request $request, Response $response) {

    $id = $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    $sql = 'DELETE FROM led WHERE id=' . $id;

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {

            echo json_encode("Led eliminado con éxito", JSON_UNESCAPED_UNICODE);

        } else {
            echo json_encode("No se han encontrado resultados con el ID " . $id, JSON_UNESCAPED_UNICODE);
        }

        $resultado = null;
        $dbConexion = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }
});

//POST para modificar instalacion UPDATE BY ID

$app->put('/api/led/modificar/{id}', function (Request $request, Response $response) {
    //declaracion de las variables de recepcion desde FRONT

    $id = $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    $color = $request->getParam('color');
    $idNumSerie = $request->getParam('idNumSerie');
    $albaran = $request->getParam('albaran');
    $observaciones = $request->getParam('observaciones');
    $fechaActuacion = $request->getParam('fechaActuacion');
    $idUsuario = $request->getParam('idUsuario');
    $tipo = $request->getParam('tipo');
    $fabricacion = $request->getParam('fabricacion');
    $activo = $request->getParam('activo');
    $almacen = $request->getParam('almacen');
    $nid = $request->getParam('nid');
    // echo "todas las instalaciones";

    //  $sql='UPDATE led SET color=:color,idNumSerie=:idNumSerie,idUsuario=:idUsuario,observaciones=:observaciones,fechaActuacion=:fechaActuacion,precio=:precio,activo=:activo WHERE id='.$id;
    $sql = 'UPDATE led SET albaran=:albaran,color=:color,idNumSerie=:idNumSerie,idUsuario=:idUsuario,observaciones=:observaciones, fechaActuacion=:fechaActuacion,tipo=:tipo,fabricacion=:fabricacion,activo=:activo,almacen=:almacen,nid=:nid WHERE id='. $id;

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);

        //Asignar campos del SQL a las variables obtenidas
       // $resultado->bindParam(':id',$id);
        $resultado->bindParam(':color', $color);
        $resultado->bindParam(':idNumSerie', $idNumSerie);
        $resultado->bindParam(':albaran', $albaran);
        $resultado->bindParam(':observaciones', $observaciones);
        $resultado->bindParam(':fechaActuacion', $fechaActuacion);
        $resultado->bindParam(':idUsuario', $idUsuario);
        $resultado->bindParam(':tipo', $tipo);
        $resultado->bindParam(':fabricacion', $fabricacion);
        $resultado->bindParam(':activo', $activo);
        $resultado->bindParam(':almacen', $almacen);
        $resultado->bindParam(':nid', $nid);

        $resultado->execute();
        echo json_encode("Led editado con éxito", JSON_UNESCAPED_UNICODE);

        $resultado = null;
        $db = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }
});



//POST para modificar instalacion UPDATE BY ID

$app->put('/api/led/sustituir/{id}', function (Request $request, Response $response) {
    //declaracion de las variables de recepcion desde FRONT

    $id = $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    // $color = $request->getParam('color');
    // $idNumSerie = $request->getParam('idNumSerie');
    // $albaran = $request->getParam('albaran');
    // $observaciones = $request->getParam('observaciones');
    // $fechaActuacion = $request->getParam('fechaActuacion');
     $idUsuario = $request->getParam('idUsuario');
    // $tipo = $request->getParam('tipo');
    // $fabricacion = $request->getParam('fabricacion');
    // $activo = $request->getParam('activo');
    $almacen = $request->getParam('almacen');
    // $nid = $request->getParam('nid');
    // echo "todas las instalaciones";

    //  $sql='UPDATE led SET color=:color,idNumSerie=:idNumSerie,idUsuario=:idUsuario,observaciones=:observaciones,fechaActuacion=:fechaActuacion,precio=:precio,activo=:activo WHERE id='.$id;
    $sql = 'UPDATE led SET idUsuario=:idUsuario,activo="false",almacen=:almacen WHERE id='. $id;

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);

        //Asignar campos del SQL a las variables obtenidas
       // $resultado->bindParam(':id',$id);
        // $resultado->bindParam(':color', $color);
        // $resultado->bindParam(':idNumSerie', $idNumSerie);
        // $resultado->bindParam(':albaran', $albaran);
        // $resultado->bindParam(':observaciones', $observaciones);
        // $resultado->bindParam(':fechaActuacion', $fechaActuacion);
         $resultado->bindParam(':idUsuario', $idUsuario);
        // $resultado->bindParam(':tipo', $tipo);
        // $resultado->bindParam(':fabricacion', $fabricacion);
        // $resultado->bindParam(':activo', $activo);
        $resultado->bindParam(':almacen', $almacen);
        // $resultado->bindParam(':nid', $nid);

        $resultado->execute();
        echo json_encode("Led editado con éxito", JSON_UNESCAPED_UNICODE);

        $resultado = null;
        $db = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }
});
// //DELETE para borrar instalacion DELETE BY ID

// $app->delete('/api/instalaciones/borrar/{id}',function(Request $request, Response $response){
//     //declaracion de las variables de recepcion desde FRONT

//     $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

//     // echo "todas las instalaciones";
//     $sql='DELETE FROM instalaciones WHERE id="'.$id.'"';

//     try{
//         $db= new db();
//         $db=$db->conectDB();
//         $resultado= $db->prepare($sql);
//         $resultado->execute();

//         if($resultado->rowCount()>0){

//             echo json_encode("Instalación eliminada con éxito",JSON_UNESCAPED_UNICODE);

//         }else{
//             echo json_encode("No se han encontrado resultados con el ID".$id,JSON_UNESCAPED_UNICODE);
//         }

//         $resultado=null;
//         $dbConexion=null;

//     }catch(PDOException $e){
//         echo '{"error":{"text":'.$e->getMessage().'}';
//     }
// });
