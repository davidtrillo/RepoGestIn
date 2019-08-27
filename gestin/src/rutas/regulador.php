<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las instalaciones SELECT

$app->get('/api/regulador',function(Request $request, Response $response){
    // echo "todas los inventarios con una ID de instalacion";

    
    $sql="SELECT * FROM regulador";

    try{
        $db= new db();     
        $db=$db->conectDB();
        $resultado= $db->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount()>0){
            $regulador= $resultado->fetchAll();
           //// echo json_encode($inventario);
           $ret= json_encode($regulador);
           
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

