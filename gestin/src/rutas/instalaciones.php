<?php
 use Psr\Http\Message\ServerRequestInterface as Request;
 use Psr\Http\Message\ResponseInterface as Response;






//$app = new \Slim\App;

//GET Todas las instalaciones SELECT


$app->get('/api/tipoinstalacion',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql="SELECT tipoInstalacion FROM instalaciones group by tipoInstalacion order by 1";
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount()>0){
            $tipoInstalacion= $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($tipoInstalacion,JSON_UNESCAPED_UNICODE);
            
        }else{
            echo json_encode("No se han encontrado resultados");
        }
        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }

    
});


$app->get('/api/cruces',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql='SELECT id, ubicacion,cont FROM instalaciones where tipoInstalacion LIKE "CRUCE%" OR id="000" ORDER BY 3';
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

$app->get('/api/cruce/{id}',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $id= $request->getAttribute('id');
    $sql="SELECT ubicacion FROM instalaciones where id ='".$id."'";
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


$app->get('/api/pp',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql='SELECT id, ubicacion FROM instalaciones where tipoInstalacion LIKE "SEÑALES%" ORDER BY 1';
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


 

//GET saber que tipo de regulador es

$app->get('/api/regulador/{id}',function(Request $request, Response $response){
    $tipoInstalacion= $request->getAttribute('id');
    // echo "todas las instalaciones";
    $sql='SELECT idregulador FROM gestin.inventario WHERE idInstalacion="'.$tipoInstalacion.'" AND idregulador LIKE "%CITY%";';
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount()>0){
           // $instalaciones= $resultado->fetchAll(PDO::FETCH_OBJ);
           // echo json_encode($instalaciones,JSON_UNESCAPED_UNICODE);
            echo ("true");
        }else{
            echo ("false");
            // echo json_encode("No se han encontrado resultados");
        }
        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//GET Todas las instalaciones SEGUN tipo de instalación SELECT BY ID

$app->get('/api/instalaciones/{tipoInstalacion}',function(Request $request, Response $response){
    $tipoInstalacion= $request->getAttribute('tipoInstalacion');
    // echo "todas las instalaciones";
    $sql='SELECT id,ubicacion,cont FROM instalaciones WHERE tipoInstalacion="'.$tipoInstalacion.'" ORDER BY 3;';
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount()>0){
            $instalaciones= $resultado->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($instalaciones,JSON_UNESCAPED_UNICODE);
            
        }else{
            echo json_encode("No se han encontrado resultados");
        }
        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});


//POST para crear una nueva instalación CREATE

$app->post('/api/instalaciones/nueva',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT
    $id=$request->getParam('id');
    $ubicacion=$request->getParam('ubicacion');
    $tipoInstalacion=$request->getParam('tipoInstalacion');
    $idUsuario=$request->getParam('idUsuario');
    
    // echo "todas las instalaciones";
    $sql='INSERT INTO instalaciones(id,ubicacion,tipoInstalacion,idUsuario) VALUES (:id,:ubicacion,:tipoInstalacion,:idUsuario)';
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);

        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':id',$id);
        $resultado->bindParam(':ubicacion',$ubicacion);
        $resultado->bindParam(':tipoInstalacion',$tipoInstalacion);
        $resultado->bindParam(':idUsuario',$idUsuario);

        $resultado->execute();
        echo json_encode("Instalación guardada con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//POST para modificar instalacion UPDATE BY ID

$app->put('/api/instalaciones/modificar/{id}',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    $ubicacion=$request->getParam('ubicacion');
    $tipoInstalacion=$request->getParam('tipoInstalacion');
    $idUsuario=$request->getParam('idUsuario');
    
    // echo "todas las instalaciones";
    $sql='UPDATE instalaciones SET id=:id,ubicacion=:ubicacion,tipoInstalacion=:tipoInstalacion,idUsuario=:idUsuario WHERE id="'.$id.'"';

    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':id',$id);
        $resultado->bindParam(':ubicacion',$ubicacion);
        $resultado->bindParam(':tipoInstalacion',$tipoInstalacion);
        $resultado->bindParam(':idUsuario',$idUsuario);

        $resultado->execute();
        echo json_encode("Instalación editada con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});


//DELETE para borrar instalacion DELETE BY ID

$app->delete('/api/instalaciones/borrar/{id}',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    
    // echo "todas las instalaciones";
    $sql='DELETE FROM instalaciones WHERE id="'.$id.'"';

    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();
        
        if($resultado->rowCount()>0){

            echo json_encode("Instalación eliminada con éxito",JSON_UNESCAPED_UNICODE);
            
        }else{
            echo json_encode("No se han encontrado resultados con el ID".$id,JSON_UNESCAPED_UNICODE);
        }
     
 

        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});