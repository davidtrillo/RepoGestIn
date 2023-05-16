<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Comprobación de TODOS los números de serie
$app->get('/api/numserierepetidos/{param}', function (Request $request, Response $response) {
    
    $param = $request->getAttribute('param');
        //12/04/2023 se elimina del select si está o no instalada o activa ya que cuando no esté ni instalada o activa pasa directamente a Almacén o Residuo
    
    $sql = "SELECT id,idInstalacion, idNumSerie FROM ".$param." WHERE idNumSerie in (SELECT idNumSerie FROM ".$param." WHERE idNumSerie<>0 GROUP BY idNumSerie HAVING COUNT(idNumSerie)>1);";
//    $sql = "SELECT id,idInstalacion, idNumSerie FROM ".$param." WHERE idNumSerie in (SELECT idNumSerie FROM ".$param." WHERE idNumSerie<>0 and activo='true'  GROUP BY idNumSerie HAVING COUNT(idNumSerie)>1)  AND activo='true';";

    
    
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

//Comprobación de UN número de serie
$app->get('/api/numserierepetidos/{param}/{idNumSerie}', function (Request $request, Response $response) {


    $idNumSerie = $request->getAttribute('idNumSerie');
    $param = $request->getAttribute('param');

    if ($param=='tarjetas') {
        //12/04/2023 se elimina del select si está o no instalada o activa ya que cuando no esté ni instalada o activa pasa directamente a Almacén o Residuo
         $sql = 'SELECT id ,idInstalacion, idNumSerie FROM '.$param.' WHERE idNumSerie="'. $idNumSerie .'";';
    }else{
         $sql = 'SELECT id ,idInstalacion, idNumSerie FROM '.$param.' WHERE idNumSerie="'. $idNumSerie .'";';
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