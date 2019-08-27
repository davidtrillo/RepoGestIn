<?php
 use Psr\Http\Message\ServerRequestInterface as Request;
 use Psr\Http\Message\ResponseInterface as Response;


//$app = new \Slim\App;

//GET Todas las instalaciones SELECT

$app->get('/api/tipoactuacion',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql="SELECT id,descripcion FROM tipoactuacion order by 2";
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount()>0){
            $tipoActuacion= $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($tipoActuacion,JSON_UNESCAPED_UNICODE);       
        }else{
            echo json_encode("No se han encontrado resultados");
        }
        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }

});

$app->get('/api/tipoactuacion/{descripcion}',function(Request $request, Response $response){
    
    $descripcion= $request->getAttribute('descripcion'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    $sql='SELECT * FROM tipoactuacion WHERE descripcion="'.$descripcion.'";' ;
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount()>0){
            $tipoActuacion= $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($tipoActuacion,JSON_UNESCAPED_UNICODE);       
        }else{
            echo json_encode("No se han encontrado resultados");
        }
        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }

});
