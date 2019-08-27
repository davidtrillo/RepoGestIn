<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;
//include_once '../../public/index.php';

//$app = new \Slim\App;

//GET Todas las instalaciones SELECT

$app->get('/api/inventario/{idInstalacion}',function(Request $request, Response $response){
    // echo "todas los inventarios con una ID de instalacion";

    $idInstalacion= $request->getAttribute('idInstalacion');
    //$sql="SELECT r.id as idRegulador,r.nombre,idInstalacion,idCM,watios,plano,resolucion FROM inventario i INNER join regulador r on i.idRegulador =r.id  where idInstalacion=".$idInstalacion;
    $sql='SELECT r.id AS idRegulador,r.nombre,alimentacion,idInstalacion,idCM,cm.ubicacion,cm.ubicacionNYXPalma,watios,plano,resolucion FROM inventario i LEFT JOIN regulador r ON i.idRegulador =r.id LEFT JOIN cm ON i.idCM=cm.id WHERE idInstalacion="'.$idInstalacion.'"';

    
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

$app->post('/api/inventario/nueva',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT
    $id=null;//$request->getParam('id');
    $idInstalacion=$request->getParam('idInstalacion');
    $idRegulador=$request->getParam('idRegulador');
    $idCM=$request->getParam('idCM');
    $idUsuario=$request->getParam('idUsuario');
    $watios=$request->getParam('watios');
    $plano=$request->getParam('plano');
    $resolucion=$request->getParam('resolucion');
    
    // echo "todas las instalaciones";
   // $sql='INSERT INTO inventario(id,idInstalacion,idRegulador,idCM,idUsuario,watios,plano,resolucion) VALUES (:id,:idInstalacion,:idRegulador,:idCM,:idUsuario,:watios,:plano,:resolucion)';
   // $sql='INSERT INTO inventario(id,idInstalacion,idRegulador,idCM,idUsuario,watios,plano,resolucion) VALUES (null,"1",1,1,69,69,"69","69")';
    $sql='INSERT INTO inventario(id,idInstalacion) VALUES (:id,:idInstalacion)';



   try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);


        //Asignar campos del SQL a las variables obtenidas
        $resultado->bindParam(':id',$id);
        $resultado->bindParam(':idInstalacion',$idInstalacion);
        $resultado->bindParam(':idRegulador',$idRegulador);
        $resultado->bindParam(':idCM',$idCM);
        $resultado->bindParam(':idUsuario',$idUsuario);
        $resultado->bindParam(':watios',$watios);
        $resultado->bindParam(':plano',$plano);
        $resultado->bindParam(':resolucion',$resolucion);

        $resultado->execute();
        echo json_encode("Instalación guardad con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});

//POST para modificar instalacion UPDATE BY ID

$app->put('/api/inventario/modificar/{id}',function(Request $request, Response $response){
    //declaracion de las variables de recepcion desde FRONT

    $idInstalacion= $request->getAttribute('id'); // PARA RECUPERAR LA ID DEL REGISTRO QUE SE VA A HACER UPDATE


    $idRegulador=$request->getParam('idRegulador');
    $alimentacion=$request->getParam('alimentacion');
    $idCM=$request->getParam('idCM');
    $idUsuario=$request->getParam('idUsuario');
    $watios=$request->getParam('watios');
    //$plano=$request->getParam('plano');
    //$resolucion=$request->getParam('resolucion');
    
    // echo "todas las instalaciones";
    $sql='UPDATE inventario SET alimentacion=:alimentacion,idRegulador=:idRegulador,idCM=:idCM,idUsuario=:idUsuario, watios=:watios WHERE idInstalacion="'.$idInstalacion.'"';

    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);


        //Asignar campos del SQL a las variables obtenidas
       // $resultado->bindParam(':idInstalacion',$idInstalacion);
        $resultado->bindParam(':idRegulador',$idRegulador);
        $resultado->bindParam(':alimentacion',$alimentacion);
        $resultado->bindParam(':idCM',$idCM);
        $resultado->bindParam(':idUsuario',$idUsuario);
        $resultado->bindParam(':watios',$watios);
       // $resultado->bindParam(':plano',$plano);
       // $resultado->bindParam(':resolucion',$resolucion);

        $resultado->execute();
        echo json_encode("Instalación editada con éxito",JSON_UNESCAPED_UNICODE);

        $resultado=null;
        $dbConexion=null;

    }catch(PDOException $e){
        echo '{"error":{"text":'.$e->getMessage().'}';
    }
});


//DELETE para borrar instalacion DELETE BY ID

$app->delete('/api/inventario/borrar/{id}',function(Request $request, Response $response){
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