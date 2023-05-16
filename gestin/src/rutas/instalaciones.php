<?php
 use Psr\Http\Message\ServerRequestInterface as Request;
 use Psr\Http\Message\ResponseInterface as Response;






//$app = new \Slim\App;

//GET Todas las instalaciones SELECT


$app->get('/api/tipoinstalacion',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql="SELECT tipoInstalacion FROM instalaciones  group by tipoInstalacion order by 1";
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


$app->get('/api/tipoinstalacion/alta',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql="SELECT tipoInstalacion FROM instalaciones where tipoInstalacion<>'ALMACÉN' AND tipoInstalacion<>'RESIDUOS' AND tipoInstalacion<>'ESPIRAS'  group by tipoInstalacion order by 1";
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
    $sql='SELECT id, ubicacion,cont FROM instalaciones where tipoInstalacion LIKE "CRUCE%" OR id="ALMACÉN" ORDER BY 3';
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

$app->get('/api/camaras',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql='SELECT id, ubicacion FROM instalaciones where tipoInstalacion LIKE "CÁMARAS" ORDER BY 1';
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

/*
$app->get('/api/centrales',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql='SELECT id, ubicacion FROM instalaciones where tipoInstalacion LIKE "CENTRAL" ORDER BY 1';
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
 */
$app->get('/api/nodos',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql='SELECT id, ubicacion FROM instalaciones where tipoInstalacion LIKE "NODO" ORDER BY 1';
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


$app->get('/api/radar',function(Request $request, Response $response){
    // echo "todas las instalaciones";
    $sql='SELECT id, ubicacion FROM instalaciones where tipoInstalacion LIKE "RADAR" OR  tipoInstalacion LIKE "FOTO ROJO" ORDER BY 1';
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

$app->get('/api/instalaciones/consulta/{id}',function(Request $request, Response $response){
    $id= $request->getAttribute('id');
    // echo "todas las instalaciones";
    $sql='SELECT id,ubicacion,cont FROM instalaciones WHERE id="'.$id.'" ;';
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

$app->post('/api/instalaciones2/nueva2',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $id=$request->getParam('id');
    $ubicacion=$request->getParam('ubicacion');
    $tipoInstalacion=$request->getParam('tipoInstalacion');
    $cont=$request->getParam('cont');
    $idUsuario=$request->getParam('idUsuario');
 
    $sql='INSERT INTO instalaciones(id,ubicacion,tipoInstalacion,idUsuario,cont) VALUES (:id,:ubicacion,:tipoInstalacion,:idUsuario,:cont)';
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':id',$id);
        $resultado->bindParam(':ubicacion',$ubicacion);
        $resultado->bindParam(':tipoInstalacion',$tipoInstalacion);
        $resultado->bindParam(':idUsuario',$idUsuario);
        $resultado->bindParam(':cont',$cont);
     
        $resultado->execute();
            echo json_encode("Instalación2 guardada con éxito",JSON_UNESCAPED_UNICODE);
        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

$app->post('/api/inventario/nueva2',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $idInstalacion=$request->getParam('idInstalacion');
    $idUsuario=$request->getParam('idUsuario');
 
    $sql='INSERT INTO inventario(idInstalacion,idUsuario) VALUES (:idInstalacion,:idUsuario)';
    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':idInstalacion',$idInstalacion);
        $resultado->bindParam(':idUsuario',$idUsuario);
     
        $resultado->execute();
            echo json_encode("Inventario guardado con éxito",JSON_UNESCAPED_UNICODE);
        $resultado=null;
        $db=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//POST para modificar instalacion UPDATE BY ID

$app->put('/api/instalaciones2/modificar2/{id}',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT
    $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    $idNueva= $request->getParam('idNueva'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    $cont=$request->getParam('cont');
    $ubicacion=$request->getParam('ubicacion');
    $tipoInstalacion=$request->getParam('tipoInstalacion');
    $idUsuario=$request->getParam('idUsuario');

    
    // echo "todas las instalaciones";
//    $sql='UPDATE instalaciones SET id=:id,ubicacion=:ubicacion,tipoInstalacion=:tipoInstalacion,idUsuario=:idUsuario,cont=:cont WHERE id="'.$id.'"';
   $sql="UPDATE instalaciones SET id=:idNueva,ubicacion=:ubicacion,tipoInstalacion=:tipoInstalacion,idUsuario=:idUsuario,cont=:cont WHERE id = '". $id ."'";
  //echo $sql;
  
  
   try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        

    //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':idNueva',$idNueva);
        $resultado->bindParam(':ubicacion',$ubicacion);
        $resultado->bindParam(':cont',$cont);
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

$app->put('/api/inventario2/modificar2/{id}',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT
    $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    $idNueva= $request->getParam('idNueva'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE
    $idUsuario=$request->getParam('idUsuario');

    
    // echo "todas las instalaciones";
//    $sql='UPDATE instalaciones SET id=:id,ubicacion=:ubicacion,tipoInstalacion=:tipoInstalacion,idUsuario=:idUsuario,cont=:cont WHERE id="'.$id.'"';
   $sql="UPDATE inventario SET idinstalacion=:idNueva,idUsuario=:idUsuario WHERE idInstalacion = '". $id ."'";
  //echo $sql;
  
  
   try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        

    //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':idNueva',$idNueva);
        $resultado->bindParam(':idUsuario',$idUsuario);

        $resultado->execute();
        echo json_encode("Inventario editado con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});



//DELETE para borrar instalacion DELETE BY ID

$app->delete('/api/instalaciones/borrar/{id}',function(Request $request, Response $response){
  
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

//DELETE para borrar instalacion DELETE BY ID

$app->delete('/api/inventario2/borrar2/{id}',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $id= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE

    
    // echo "todas las instalaciones";
    $sql='DELETE FROM inventario WHERE idInventario="'.$id.'"';

    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();
        
        if($resultado->rowCount()>0){

            echo json_encode("Inventario eliminada con éxito",JSON_UNESCAPED_UNICODE);
            
        }else{
            echo json_encode("No se han encontrado resultados con el ID".$id,JSON_UNESCAPED_UNICODE);
        }
     
 

        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});