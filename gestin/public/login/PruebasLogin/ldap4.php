<?php



    $host = "172.27.120.108";
    $port = "389";

    $ldap_con = ldap_connect("ldap://{$host}:{$port}") or die("No se pudo conectar al servidor LDAP.");
    ldap_set_option($ldap_con,LDAP_OPT_PROTOCOL_VERSION,3);
    //echo $ldap_con; Comprobación de estado de conexión OK #2
    $ldap_dn="OU=Usuaris Mobilitat,DC=mobilitat,DC=local";
    // $ldap_user="dtrillo";
    // $ldap_password="Mobilitat01";

     $ldap_user=$_POST["username"];
     $ldap_password=$_POST["password"];

     if (ldap_bind($ldap_con, $ldap_user."@mobilitat.local", $ldap_password)){
        header("Location: ../welcome.php");
     }else{
        $error = "Nombre o Contraseña Incorrecta ";
     }
    


?>

