<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require '../vendor/autoload.php';
require '../src/config/db.php';


$config = ["settings" => ["displayErrorDetails" => true]];

$app = new \Slim\App($config);
//Ruta de Instalaciones

include_once '../src/rutas/cm.php';
include_once '../src/rutas/regulador.php';
include_once '../src/rutas/instalaciones.php';
include_once '../src/rutas/inventario.php';
include_once '../src/rutas/usuarios.php';
include_once '../src/rutas/tipoactuacion.php';

include_once '../src/rutas/tarjetas.php';
include_once '../src/rutas/bustren.php';
include_once '../src/rutas/11_322.php';
include_once '../src/rutas/12_300.php';
include_once '../src/rutas/13_200.php';
include_once '../src/rutas/12_200.php';
include_once '../src/rutas/11_2in.php';
include_once '../src/rutas/12_pp.php';
include_once '../src/rutas/12_pea_bici.php';
include_once '../src/rutas/12_bici.php';
include_once '../src/rutas/invidentes.php';
include_once '../src/rutas/descontadores.php';
include_once '../src/rutas/baculos.php';
include_once '../src/rutas/columnas.php';
include_once '../src/rutas/pulsadores.php';
include_once '../src/rutas/espiras.php';
include_once '../src/rutas/pantallascon.php';
include_once '../src/rutas/camtv.php';
include_once '../src/rutas/camip.php';

include_once '../src/rutas/APIpintura.php';
include_once '../src/rutas/APIMFO.php';
include_once '../src/rutas/APIPreventivo.php';
include_once '../src/rutas/APINumSerie.php';


$app->run();
