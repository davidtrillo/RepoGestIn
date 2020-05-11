<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

 $app->get('/api/consultatotalestipo/',function(Request $request, Response $response){

    

        $sql = 'SELECT tipoInstalacion,count(id)  FROM gestin.instalaciones WHERE tipoInstalacion not like "AL%" group by tipoInstalacion order by 1;';
  
    
     try{ 
         $db= new db();     
         $db=$db->conectDB();
         $resultado= $db->prepare($sql);
         $resultado->execute();
         if($resultado->rowCount()>0){
             $totales= $resultado->fetchAll();
            //// echo json_encode($inventario);
            $ret= json_encode($totales);
         
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

//GET Todas las pinturas SELECT

$app->get('/api/consultatotalesleds/',function(Request $request, Response $response){

    

    $sql = 'SELECT tipo, color, count(id) FROM gestin.led where activo="true" group by tipo, color order by 1,2;';


 try{ 
     $db= new db();     
     $db=$db->conectDB();
     $resultado= $db->prepare($sql);
     $resultado->execute();
     if($resultado->rowCount()>0){
         $totales= $resultado->fetchAll();
        //// echo json_encode($inventario);
        $ret= json_encode($totales);
     
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
