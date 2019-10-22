<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//$app = new \Slim\App;

//GET Todas las instalaciones SELECT
$app->get('/api/CamIP', function (Request $request, Response $response) {

    $sql = 'SELECT t.id, ta.descripcion,t.idNumSerie,t.albaran,t.observaciones,t.fechaActuacion,t.precio,t.activo,t.almacen FROM CamIP t inner join tipoactuacion ta on t.idTipoActuacion=ta.id order by t.activo desc,t.fechaActuacion desc';
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
$app->get('/api/CamIP/activas/{instalacion}', function (Request $request, Response $response) {

    $instalacion = $request->getAttribute('instalacion');
    $sql = 'SELECT count(id) AS c FROM CamIP WHERE activo="true" AND idInstalacion="' . $instalacion . '"';
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


$app->get('/api/CamIP/{instalacion}', function (Request $request, Response $response) {

    $instalacion = $request->getAttribute('instalacion');
    $sql = 'SELECT t.id,t.idTipoActuacion,ta.descripcion,t.idNumSerie,t.albaran,t.observaciones,t.fechaActuacion,t.precio,t.activo,t.almacen FROM CamIP t inner join tipoactuacion ta on t.idTipoActuacion=ta.id WHERE idInstalacion="' . $instalacion . '" order by t.activo desc,t.fechaActuacion desc';
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
$app->post('/api/CamIP/nueva', function (Request $request, Response $response) {
    //declaracion de las variables de recepcion desde FRONT
    // $id=$request->getParam('id');
    $idInstalacion = $request->getParam('idInstalacion');
    $idTipoActuacion = $request->getParam('idTipoActuacion');
    $idNumSerie = $request->getParam('idNumSerie');
    $albaran = $request->getParam('albaran');
    $observaciones = $request->getParam('observaciones');
    $fechaActuacion = $request->getParam('fechaActuacion');
    $idUsuario = $request->getParam('idUsuario');
    $precio = $request->getParam('precio');
    $activo = $request->getParam('activo');
    $almacen = $request->getParam('almacen');

    // echo "todas las instalaciones";
    $sql = 'INSERT INTO CamIP (id, idInstalacion, idTipoActuacion, idNumSerie, idUsuario,albaran, observaciones, fechaActuacion, precio, activo, almacen) VALUES (NULL, :idInstalacion, :idTipoActuacion, :idNumSerie, :idUsuario,:albaran ,:observaciones, :fechaActuacion, :precio, :activo, :almacen);';
    // $sql='INSERT INTO CamIP (idInstalacion) VALUES (:idInstalacion);';

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        //Asignar campos del SQL a las variables obtenidas
        // $resultado->bindParam(':id',$id);
        $resultado->bindParam(':idInstalacion', $idInstalacion);
        $resultado->bindParam(':idTipoActuacion', $idTipoActuacion);
        $resultado->bindParam(':albaran', $albaran);
        $resultado->bindParam(':idNumSerie', $idNumSerie);
        $resultado->bindParam(':idUsuario', $idUsuario);
        $resultado->bindParam(':observaciones', $observaciones);
        $resultado->bindParam(':fechaActuacion', $fechaActuacion);
        $resultado->bindParam(':precio', $precio);
        $resultado->bindParam(':activo', $activo);
        $resultado->bindParam(':almacen', $almacen);

        $resultado->execute();
        echo json_encode("CamIP guardada con éxito", JSON_UNESCAPED_UNICODE);

        $resultado = null;
        $db = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
        echo json_encode("Algo no ha ido bien", JSON_UNESCAPED_UNICODE);
    }
});

//DELETE para borrar instalacion DELETE BY ID

$app->delete('/api/CamIP/borrar/{id}', function (Request $request, Response $response) {

    $id = $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    $sql = 'DELETE FROM CamIP WHERE id=' . $id;

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {

            echo json_encode("Instalación eliminada con éxito", JSON_UNESCAPED_UNICODE);

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

$app->put('/api/CamIP/modificar/{id}', function (Request $request, Response $response) {
    //declaracion de las variables de recepcion desde FRONT

    $id = $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    $idTipoActuacion = $request->getParam('idTipoActuacion');
    $idNumSerie = $request->getParam('idNumSerie');
    $albaran = $request->getParam('albaran');
    $observaciones = $request->getParam('observaciones');
    $fechaActuacion = $request->getParam('fechaActuacion');
    $idUsuario = $request->getParam('idUsuario');
    $precio = $request->getParam('precio');
    $activo = $request->getParam('activo');
    $almacen = $request->getParam('almacen');
    // echo "todas las instalaciones";

    //  $sql='UPDATE CamIP SET idTipoActuacion=:idtipoActuacion,idNumSerie=:idNumSerie,idUsuario=:idUsuario,observaciones=:observaciones,fechaActuacion=:fechaActuacion,precio=:precio,activo=:activo WHERE id='.$id;
    $sql = 'UPDATE CamIP SET albaran=:albaran,idTipoActuacion=:idTipoActuacion,idNumSerie=:idNumSerie,idUsuario=:idUsuario,observaciones=:observaciones, fechaActuacion=:fechaActuacion,precio=:precio,activo=:activo,almacen=:almacen WHERE id='. $id;

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);

        //Asignar campos del SQL a las variables obtenidas
       // $resultado->bindParam(':id',$id);
        $resultado->bindParam(':idTipoActuacion', $idTipoActuacion);
        $resultado->bindParam(':idNumSerie', $idNumSerie);
        $resultado->bindParam(':albaran', $albaran);
        $resultado->bindParam(':observaciones', $observaciones);
        $resultado->bindParam(':fechaActuacion', $fechaActuacion);
        $resultado->bindParam(':idUsuario', $idUsuario);
        $resultado->bindParam(':precio', $precio);
        $resultado->bindParam(':activo', $activo);
        $resultado->bindParam(':almacen', $almacen);

        $resultado->execute();
        echo json_encode("CamIp editada con éxito", JSON_UNESCAPED_UNICODE);

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
