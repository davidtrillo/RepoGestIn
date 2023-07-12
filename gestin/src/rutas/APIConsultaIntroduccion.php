<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

 $app->get('/api/consultaintroduccion/{var11}/{var21}/{var31}',function(Request $request, Response $response){
    $tipo= $request->getAttribute('var11');
    $mes= $request->getAttribute('var21');
    $año= $request->getAttribute('var31');
    
    if ($tipo=='led') {
        $sql = 'SELECT * FROM led WHERE month(fechaActuacion)='. $mes .' and year(fechaActuacion)='. $año .' order by fechaActuacion asc;';
    }else{
        $sql='SELECT * from '. $tipo .'  where month(fechaActuacion)='. $mes .' and year(fechaActuacion)='. $año .' order by fechaActuacion asc;';
    }
    
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

 $app->get('/api/consultaintroduccion/count/{var1}/{var2}/{var3}',function(Request $request, Response $response){
    $tipo= $request->getAttribute('var1');
    $mes= $request->getAttribute('var2');
    $año= $request->getAttribute('var3');
    
    if ($tipo=='led') {
        $sql = 'SELECT count(*) FROM led where month(fechaActuacion)='. $mes .' and year(fechaActuacion)='. $año .' and activo="true" order by fechaActuacion asc;';
    }else{
        $sql='SELECT count(id) from '. $tipo .'  where month(fechaActuacion)='. $mes .' and year(fechaActuacion)='. $año .' order by fechaActuacion asc;';
    }
   //  $sql='SELECT * FROM '.$tipo.' where month(fechaActuacion)=2 and year(fechaActuacion)=2023 order by fechaActuacion asc;';
    // echo $sql;
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



 