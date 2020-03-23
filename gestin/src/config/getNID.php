<?php

//class dbSQLServer{

    // conexion
    function conectDBSQLServer(){
        $serverName = "188.165.135.168\SQL2008,1433"; //serverName\instanceName
        $connectionInfo = array( "Database"=>"Palma", "UID"=>"dtrillo", "PWD"=>"Mobilitat01",'CharacterSet' => 'UTF-8');
     //  print_r($connectionInfo);
        $conn = sqlsrv_connect( $serverName, $connectionInfo);
        //echo $conn;
        
        if( $conn ) {
             //echo "Conexión establecida.<br />";
             return $conn; 
        
        }else{
            // echo "Conexión no se pudo establecer.<br />";
             die( print_r( sqlsrv_errors(), true));
        }
    }

        // conexion MySQL
        function conectDBMySQL(){
            $dbUser='user';
            $dbPass='Mobilitat_01';
            $servername="localhost";
            $database="gestin";
            $connMySQL=mysqli_connect($servername, $dbUser, $dbPass, $database);

            if (!$connMySQL) {
                die("Connection failed: " . mysqli_connect_error());
          }
           
         //echo "Connected MySQL successfully";
            return $connMySQL; 
        }

   function getNID()  
    {  
         try  
         {  
            
            $conn = conectDBSQLServer();  
            $sql="select Elm_CódigoNID from Cruce_Link_Elemento where (Elm_CódigoNID is not null) AND (Elm_FechaHasta IS NULL)";
            $getNID = sqlsrv_query($conn, $sql);  
           
             if ($getNID == FALSE)  
                 die(FormatErrors(sqlsrv_errors()));  

            $connMySQL = conectDBMySQL();  
            $sqlMySQL="DELETE FROM `gestin`.`nid`"; //BORRAMOS LA TABLA NID PARA LA NUEVA IMPORTACION
            mysqli_query($connMySQL, $sqlMySQL);
            $count = 0;  
            while($row = sqlsrv_fetch_array($getNID, SQLSRV_FETCH_ASSOC))  
            {  
                $sqlMySQL="INSERT INTO `gestin`.`nid` (`nid`) VALUES ('". $row['Elm_CódigoNID']."')";
                mysqli_query($connMySQL, $sqlMySQL);
                $count++;  
              } 
              
            // echo("<br/>");  
            // echo($productCount);
                
            mysqli_close($connMySQL);
            sqlsrv_free_stmt($getNID);  
            sqlsrv_close($conn);  

            return $count;
         }  
         catch(Exception $e)  
         {  
             echo("Error!");  
         }  


     }  






//}



?>

