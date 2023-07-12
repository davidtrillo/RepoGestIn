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
// include_once '../src/rutas/usuarios.php';
include_once '../src/rutas/tipoactuacion.php';

include_once '../src/rutas/tarjetas.php';
include_once '../src/rutas/tarjetasCPU.php';
include_once '../src/rutas/tarjetasAmp.php';
include_once '../src/rutas/tarjetasFa.php';
include_once '../src/rutas/bustren.php';
include_once '../src/rutas/13_322.php';
include_once '../src/rutas/13_332.php';
include_once '../src/rutas/11_300.php';
include_once '../src/rutas/12_300.php';
include_once '../src/rutas/13_200.php';
include_once '../src/rutas/12_100.php';
include_once '../src/rutas/12_200.php';
include_once '../src/rutas/11_200.php';
// include_once '../src/rutas/12_pp.php';
// include_once '../src/rutas/12_pea_bici.php';
// include_once '../src/rutas/12_bici.php';
// include_once '../src/rutas/invidentes.php';
// include_once '../src/rutas/descontadores.php';
// include_once '../src/rutas/baculos.php';
//include_once '../src/rutas/soportes.php';
include_once '../src/rutas/oculta.php';
//include_once '../src/rutas/pulsadores.php';
include_once '../src/rutas/detectores.php';
include_once '../src/rutas/espiras.php';
include_once '../src/rutas/pantallascon.php';
include_once '../src/rutas/camtv.php';
include_once '../src/rutas/led.php';
include_once '../src/rutas/modulo.php';
// include_once '../src/rutas/brazos.php';
// include_once '../src/rutas/bajantes.php';
// include_once '../src/rutas/alargaderas.php';

include_once '../src/rutas/APIpintura.php';
include_once '../src/rutas/APIMFO.php';
include_once '../src/rutas/APIMFOCamaras.php';
include_once '../src/rutas/APIMFOCentrales.php';
include_once '../src/rutas/APIMFONodos.php';
include_once '../src/rutas/APIMFORadar.php';
include_once '../src/rutas/APIMFOPP.php';
include_once '../src/rutas/APIMFOEspiras.php';
include_once '../src/rutas/APIMFOCargadores.php';
include_once '../src/rutas/APIMFOAcires.php';
include_once '../src/rutas/APIMFOSectores.php';
include_once '../src/rutas/APIPreventivo.php';
include_once '../src/rutas/APINumSerie.php';
include_once '../src/rutas/APIConsultaTipo.php';
include_once '../src/rutas/APIConsultaTotalesTipo.php';
include_once '../src/rutas/APIConfiguracion.php';
include_once '../src/rutas/APINID.php';
include_once '../src/rutas/cargadoresE.php';
include_once '../src/rutas/centrales.php';
include_once '../src/rutas/controlAccesos.php';
include_once '../src/rutas/fotoRojo.php';
include_once '../src/rutas/nodo.php';
include_once '../src/rutas/panelInformativo.php';
include_once '../src/rutas/puntoMedida.php';
include_once '../src/rutas/radares.php';
include_once '../src/rutas/sector.php';
include_once '../src/rutas/señalesLuminosas.php';
include_once '../src/rutas/APIConsultaIntroduccion.php';
include_once '../src/rutas/residuos.php';
include_once '../src/rutas/almacen.php';
include_once '../src/rutas/APIConsultaAlmacen.php';







$app->run();
