<?php

 use Psr\Http\Message\ServerRequestInterface as Request;
 use Psr\Http\Message\ResponseInterface as Response;


//$app = new \Slim\App;

//GET Todas las instalaciones SELECT

 $app->get('/api/usuarios/{usuario}',function(Request $request, Response $response){
    
     $usuario= $request->getAttribute('usuario');
     $sql="SELECT id FROM usuarios WHERE nombre='".$usuario."'";
     try{
         $db= new db();     
         $db=$db->conectDB();
         $resultado= $db->prepare($sql);
         $resultado->execute();

         if($resultado->rowCount()>0){
             $idUsuario= $resultado->fetchAll(PDO::FETCH_OBJ);
             echo json_encode($idUsuario,JSON_UNESCAPED_UNICODE);
            
         }else{
             echo json_encode("No se han encontrado resultados");
         }
         $dbConexion=null;
         $resultado=null;

     }catch(PDOException $e){
         echo '{"error":{"text":'.$e->getMessage().'}';
     }

    
 });