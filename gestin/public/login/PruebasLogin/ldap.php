<?php

//echo "Hola";
//echo $_POST['user'];
//echo $_POST['pass'];


// Credenciales de prueba
$user = "dtrillo";
$pass = "Mobilitat01";

// Datos de acceso al servidor LDAP
$host = "172.27.120.108";
$port = "389";

// Conexto donde se encuentran los usuarios
$basedn = "OU=Usuaris Mobilitat,DC=mobilitat,DC=local";

// Atributos a recuperar
$searchAttr = array("dn", "cn", "sn", "givenName");

// Atributo para incorporar en la respuesta
$displayAttr = "cn";

// Respuesta por defecto
$status = 1;
$msg = "";
$userDisplayName = "null";

// Recuperar datos del POST
if (isset($_POST['user'])) {
        $user = $_POST['user'];
        echo "Ha entrado en user";
}
if (isset($_POST['pass'])) {
        $pass = $_POST['pass'];
        echo "Ha entrado en pass";
}

// Establecer la conexión con el servidor LDAP
$ad = ldap_connect("ldap://{$host}:{$port}") or die("No se pudo conectar al servidor LDAP.");
echo "Ha conectado_".$ad; //Resource #2 es Contectado
// Autenticar contra el servidor LDAP

ldap_set_option($ad, LDAP_OPT_PROTOCOL_VERSION, 3);
echo "\nHa conectado_".$ad;
echo "\nuid={$user},{$basedn}_";
echo  "\n".$pass;
//$ldapbind=ldap_bind($ad, "uid={$user},{$basedn}", $pass);
$ldapbind=ldap_bind($ad, $user."@mobilitat.local", $pass);
echo "\nResultado ldapbind=".$ldapbind;




if (@ldap_bind($ad, $user."@mobilitat.local", $pass)) {
    $msg = "Ok dentro";
    echo "\n IdUsuario: " .base64_encode($user);
}
else {
        // Si falla la autenticación, retornar error
        $msg = "Usuario y/o contraseña inválidos";
}

// Respuesta en formato JSON
header('Content-Type: application/json');
echo "\n{\"uid\": \"{$user}\", \"estado\": \"{$status}\", \"nombre\": \"{$userDisplayName}\", \"debug\": \"{$msg}\"}";