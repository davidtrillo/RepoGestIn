<?php
ReadData();

//class dbSQLServer{

    // conexion
    function conectDBSQLServer(){
        $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
        $connectionInfo = array( "Database"=>"Palma", "UID"=>"dtrillo", "PWD"=>"Mobilitat01",'CharacterSet' => 'UTF-8');
        print_r($connectionInfo);
        $conn = sqlsrv_connect( $serverName, $connectionInfo);
        echo $conn;
        
        if( $conn ) {
             echo "Conexión establecida.<br />";
             return $conn; 
        
        }else{
             echo "Conexión no se pudo establecer.<br />";
             die( print_r( sqlsrv_errors(), true));
        }
    }


    function conectDBSQLServerPDO(){ // 08/01/2020 - no funciona
        $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
        $conn = new PDO( "sqlsrv:server=$serverName ; Database=Palma", "dtrillo", "Mobilitat01");  
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }

    function ReadData()  
    {  
         try  
         {  
            $conn = conectDBSQLServer();  
            $sql='SELECT TOP 1000 [Crz_ID]
            ,[Part]
            ,[Crz_X1]
            ,[Crz_X2]
            ,[Crz_Y1]
            ,[Crz_Y2]
            ,[Crz_Emplazamiento]
            ,[Crz_Barrio]
            ,[Crz_Distrito]
            ,[Crz_Lote]
        FROM [Palma].[dbo].[Cruce]';
             $getProducts = sqlsrv_query($conn, $sql);  
             if ($getProducts == FALSE)  
                 die(FormatErrors(sqlsrv_errors()));  
             $productCount = 0;  
             while($row = sqlsrv_fetch_array($getProducts, SQLSRV_FETCH_ASSOC))  
             {  
                 echo($row['Crz_ID']);  
                 echo("<br/>");  
                 $productCount++;  
             }  
             sqlsrv_free_stmt($getProducts);  
             sqlsrv_close($conn);  
         }  
         catch(Exception $e)  
         {  
             echo("Error!");  
         }  


     }  






//}



?>

