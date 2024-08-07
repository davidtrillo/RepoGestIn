<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// //Comprobación de TODOS los números de serie
// $app->get('/api/tarjetascpu/numserierepetidos', function (Request $request, Response $response) {

//     $sql = "SELECT id,idInstalacion, idNumSerie FROM tarjetascpu WHERE idNumSerie in (SELECT idNumSerie FROM tarjetascpu WHERE activo='true'  GROUP BY idNumSerie HAVING COUNT(idNumSerie)>1)  AND activo='true';";
//     try {
//         $db = new db();
//         $db = $db->conectDB();
//         $resultado = $db->prepare($sql);
//         $resultado->execute();

//         if ($resultado->rowCount() > 0) {
//             $alltarjetascpu = $resultado->fetchAll(PDO::FETCH_OBJ);
//             echo json_encode($alltarjetascpu, JSON_UNESCAPED_UNICODE);
//         } else {
//             echo json_encode("No se han encontrado resultados");
//         }
//         $db = null;
//         $resultado = null;

//     } catch (PDOException $e) {
//         echo '{"error":{"text":' . $e->getMessage() . '}';
//     }

// });

// //Comprobación de UN número de serie
// $app->get('/api/tarjetascpu/numserierepetidos/{idNumSerie}', function (Request $request, Response $response) {
//     $idNumSerie = $request->getAttribute('idNumSerie');
//     $sql = 'SELECT id ,idInstalacion, idNumSerie FROM tarjetascpu WHERE activo="true" AND idNumSerie="'. $idNumSerie .'";';
//     try {
//         $db = new db();
//         $db = $db->conectDB();
//         $resultado = $db->prepare($sql);
//         $resultado->execute();

//         if ($resultado->rowCount() > 0) {
//             $alltarjetascpu = $resultado->fetchAll(PDO::FETCH_OBJ);
//             echo json_encode($alltarjetascpu, JSON_UNESCAPED_UNICODE);
//         } else {
//             echo json_encode("No se han encontrado resultados");
//         }
//         $db = null;
//         $resultado = null;

//     } catch (PDOException $e) {
//         echo '{"error":{"text":' . $e->getMessage() . '}';
//     }

// });


//GET Todas las instalaciones SELECT
$app->get('/api/tarjetascpu', function (Request $request, Response $response) {

    $sql = 'SELECT t.id,t.tipo,  t.idTipoActuacion,t.idNumSerie,t.albaran,t.observaciones,t.fechaActuacion,t.precio,t.activo,t.instalada,t.almacen,t.residuos FROM tarjetascpu t   order by t.activo desc,t.fechaActuacion desc';
    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $alltarjetascpu = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($alltarjetascpu, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});

//GET tarjetascpu instaladas COUNT
$app->get('/api/tarjetascpu/instaladas/{instalacion}', function (Request $request, Response $response) {

    $instalacion = $request->getAttribute('instalacion');
    $sql = 'SELECT count(id) AS c FROM tarjetascpu WHERE instalada="true" AND idInstalacion="' . $instalacion . '"';
    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $alltarjetascpu = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($alltarjetascpu, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});



//GET tarjetascpu activas COUNT
$app->get('/api/tarjetascpu/activas/{instalacion}', function (Request $request, Response $response) {

    $instalacion = $request->getAttribute('instalacion');
    $sql = 'SELECT count(id) AS c FROM tarjetascpu WHERE activo="true" AND idInstalacion="' . $instalacion . '"';
    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);
        $resultado->execute();

        if ($resultado->rowCount() > 0) {
            $alltarjetascpu = $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($alltarjetascpu, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("No se han encontrado resultados");
        }
        $db = null;
        $resultado = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }

});

$app->get('/api/tarjetascpu/{instalacion}', function (Request $request, Response $response) {

    $instalacion = $request->getAttribute('instalacion');
    $sql = 'SELECT t.id,t.idTipoActuacion,t.tipo, t.idTipoActuacion,t.idNumSerie,t.albaran,t.observaciones,t.fechaActuacion,t.precio,t.activo,t.instalada,t.almacen,t.residuos FROM tarjetascpu t   WHERE idInstalacion="' . $instalacion . '" order by t.activo desc,t.fechaActuacion desc';
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
$app->post('/api/tarjetascpu/nueva', function (Request $request, Response $response) {
    //declaracion de las variables de recepcion desde FRONT
    // $id=$request->getParam('id');
    $idInstalacion = $request->getParam('idInstalacion');
    $idTipoActuacion = $request->getParam('idTipoActuacion');
    $idNumSerie = $request->getParam('idNumSerie');
    $tipo = $request->getParam('tipo');
    $albaran = $request->getParam('albaran');
    $observaciones = $request->getParam('observaciones');
    $fechaActuacion = $request->getParam('fechaActuacion');
    $idUsuario = $request->getParam('idUsuario');
    $precio = $request->getParam('precio');
    $activo = $request->getParam('activo');
    $instalada = $request->getParam('instalada');
    $almacen = $request->getParam('almacen');
    $residuos = $request->getParam('residuos');

    // echo "todas las instalaciones";
    $sql = 'INSERT INTO tarjetascpu (id, idInstalacion, idTipoActuacion, tipo, idNumSerie, idUsuario,albaran, observaciones, fechaActuacion, precio, activo,instalada,almacen,residuos) VALUES (NULL, :idInstalacion, :idTipoActuacion, :tipo, :idNumSerie, :idUsuario,:albaran ,:observaciones, :fechaActuacion, :precio, :activo,:instalada,:almacen,:residuos);';
    // $sql='INSERT INTO tarjetascpu (idInstalacion) VALUES (:idInstalacion);';

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
        $resultado->bindParam(':tipo', $tipo);
        $resultado->bindParam(':idUsuario', $idUsuario);
        $resultado->bindParam(':observaciones', $observaciones);
        $resultado->bindParam(':fechaActuacion', $fechaActuacion);
        $resultado->bindParam(':precio', $precio);
        $resultado->bindParam(':activo', $activo);
        $resultado->bindParam(':instalada', $instalada);
        $resultado->bindParam(':almacen', $almacen);
        $resultado->bindParam(':residuos', $residuos);

        $resultado->execute();
        echo json_encode("Tarjeta guardada con éxito", JSON_UNESCAPED_UNICODE);

        $resultado = null;
        $db = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
        echo json_encode("Algo no ha ido bien", JSON_UNESCAPED_UNICODE);
    }
});

//DELETE para borrar instalacion DELETE BY ID

$app->delete('/api/tarjetascpu/borrar/{id}', function (Request $request, Response $response) {

    $id = $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    $sql = 'DELETE FROM tarjetascpu WHERE id=' . $id;

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
        $db = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }
});

//POST para modificar instalacion UPDATE BY ID

$app->put('/api/tarjetascpu/modificar/{id}', function (Request $request, Response $response) {
    //declaracion de las variables de recepcion desde FRONT

    $id = $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    $idTipoActuacion = $request->getParam('idTipoActuacion');
    $idNumSerie = $request->getParam('idNumSerie');
    $tipo = $request->getParam('tipo');
    $albaran = $request->getParam('albaran');
    $observaciones = $request->getParam('observaciones');
    $fechaActuacion = $request->getParam('fechaActuacion');
    $idUsuario = $request->getParam('idUsuario');
    $precio = $request->getParam('precio');
    $activo = $request->getParam('activo');
    $instalada = $request->getParam('instalada');
    $almacen = $request->getParam('almacen');
    $residuos = $request->getParam('residuos');
    // echo "todas las instalaciones";

    //  $sql='UPDATE tarjetascpu SET idTipoActuacion=:idtipoActuacion,idNumSerie=:idNumSerie,idUsuario=:idUsuario,observaciones=:observaciones,fechaActuacion=:fechaActuacion,precio=:precio,activo=:activo WHERE id='.$id;
    $sql = 'UPDATE tarjetascpu SET albaran=:albaran,idTipoActuacion=:idTipoActuacion,idNumSerie=:idNumSerie,tipo=:tipo,idUsuario=:idUsuario,observaciones=:observaciones, fechaActuacion=:fechaActuacion,precio=:precio,activo=:activo,instalada=:instalada,almacen=:almacen,residuos=:residuos WHERE id='. $id;

    try {
        $db = new db();
        $db = $db->conectDB();
        $resultado = $db->prepare($sql);

        //Asignar campos del SQL a las variables obtenidas
       // $resultado->bindParam(':id',$id);
        $resultado->bindParam(':idTipoActuacion', $idTipoActuacion);
        $resultado->bindParam(':idNumSerie', $idNumSerie);
        $resultado->bindParam(':tipo', $tipo);
        $resultado->bindParam(':albaran', $albaran);
        $resultado->bindParam(':observaciones', $observaciones);
        $resultado->bindParam(':fechaActuacion', $fechaActuacion);
        $resultado->bindParam(':idUsuario', $idUsuario);
        $resultado->bindParam(':precio', $precio);
        $resultado->bindParam(':activo', $activo);
        $resultado->bindParam(':instalada', $instalada);
        $resultado->bindParam(':almacen', $almacen);
        $resultado->bindParam(':residuos', $residuos);

        $resultado->execute();
        echo json_encode("Tarjeta editada con éxito", JSON_UNESCAPED_UNICODE);

        $resultado = null;
        $db = null;

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}';
    }
});

