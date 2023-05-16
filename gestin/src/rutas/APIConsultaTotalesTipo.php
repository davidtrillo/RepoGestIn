<?php
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Psr\Http\Message\ResponseInterface as Response;


//GET Todas las pinturas SELECT

 $app->get('/api/consultatotalestipo/',function(Request $request, Response $response){

    

        $sql = 'SELECT tipoInstalacion,count(id)  FROM gestin.instalaciones group by tipoInstalacion order by 1;';
  
    
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

//GET Todas las pinturas SELECT

$app->get('/api/consultatotaleselementos/',function(Request $request, Response $response){

    

    $sql = '
    SELECT "Tarjetas de Salida" AS Elemento,count(*) as tarjetas FROM gestin.tarjetas
    union all
    SELECT "Tarjetas CPU" AS Elemento,count(*) as tarjetascpu FROM gestin.tarjetascpu
    union all
    SELECT "Tarjetas FA" AS Elemento,count(*) as tarjetasfa  FROM gestin.tarjetasfa
    union all
    SELECT "Tarjetas BUS/TREN" AS Elemento,count(*) as bustren FROM gestin.bustren
    union all
    SELECT "Señales Ocultas" AS Elemento,count(*) as oculta FROM gestin.oculta
    union all
    SELECT "Pulsadores" AS Elemento,count(*) as pulsadores FROM gestin.pulsadores
    union all
    SELECT "Detectores" AS Elemento,count(*) as detectores FROM gestin.detectores
    union all
    SELECT "Espiras de Detección" AS Elemento,count(*) as espiras FROM gestin.espiras
    union all
    SELECT "Módulos" AS Elemento,count(*) as modulo FROM gestin.modulo
    
    ';


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

$app->get('/api/consultatotalescruceled/',function(Request $request, Response $response){

    $sql = 'SELECT idInstalacion, count(*) FROM gestin.led where activo="true" group by idInstalacion;';

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