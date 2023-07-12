<?php

include './login/session.php';
//include_once 'r_instalaciones.php';

require '../vendor/autoload.php';


?>
<!doctype html>
<html lang="es">

<head>
   <!-- Required meta tags -->

   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <script src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
   <!-- Bootstrap CSS -->
       <!-- <script src="https://kit.fontawesome.com/de8261cad4.js"></script> -->
   <link href="../fontawesome/css/fontawesome.css" rel="stylesheet">
   <link href="../fontawesome/css/solid.css" rel="stylesheet">
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>

   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <style>
      #dropdownInstalacion {
         height: 500px;
         overflow-y: auto;
      }

      .btn-info {
         width: 90px;
      }
   </style>
   <title>Consultas</title>
</head>

<body>

   <!-- Navbar -->
<div class="container-fluid p-0">
   <nav class="navbar navbar-expand-lg navbar-dark bg-info">
   <a class="navbar-brand" href="#">Gestión del inventario de las Instalaciones de Regulación y Control del Tráfico urbano de Palma</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
   </button>
   <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
         <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Consultas
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="./consultaTipo.php">Todos elementos de Cruce</a>
              <a class="dropdown-item" href="./consultaTotalesTipo.php">Totales Tipo Instalación</a>
              <a class="dropdown-item" href="./consultaTotalesLeds.php">Totales Leds</a>
              <a class="dropdown-item" href="./consultaTotalesElementos.php">Totales Elementos</a>
              <a class="dropdown-item" href="./consultaTotalesGrupos.php">Consulta de Cruce y total de Leds activos</a>
                            <a class="dropdown-item" href="./consultaIntroduccion.php">Consulta de Introducción de datos por mes</a>
              <a class="dropdown-item" href="./consultaAlmacen.php">Consulta de todos elementos de Almacén</a>

            </div>
          </li>
         <a class="nav-item nav-link" href="./welcome.php">Instalaciones</a>
         <li class="nav-item dropdown ">
               <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               MFO
               </a>
               <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="./mfo.php">MFO Cruces</a>
                  <a class="dropdown-item" href="./mfoPP.php">MFO Paso Peatones</a>
                  <a class="dropdown-item" href="./mfoEspiras.php">MFO PM</a>
                  <a class="dropdown-item" href="./mfoCargadores.php">MFO Cargadores</a>
                  <a class="dropdown-item" href="./mfoAcires.php">MFO Acires</a>
                  <a class="dropdown-item" href="./mfoCamaras.php">MFO Cámaras</a>
                  <a class="dropdown-item" href="./mfoCentrales.php">MFO Centrales</a>
                  <a class="dropdown-item" href="./mfoSectores.php">MFO Sectores</a>
                  <a class="dropdown-item" href="./mfoNodos.php">MFO Nodos</a>
                  <a class="dropdown-item" href="./mfoRadar.php">MFO Radar/Foto Rojo</a>
               </div>
         </li>
         <a class="nav-item nav-link" href="./pintura.php">Pintura</a>
         <a class="nav-item nav-link" href="./preventivo.php">Preventivo</a>
         <a class="nav-item nav-link" href="./totalLed.php">Leds</a>

          <a class="nav-item nav-link" href="../src/config/config.php" tabindex="-1" aria-disabled="true">Configuración</a>
         <a class="nav-item nav-link" href="./login/logout.php" tabindex="-1" aria-disabled="true">Cerrar Sesión</a>
      </div>

   </div>
   </nav>
</div>
   <!-- Fin Navbar -->



   <div class="">
      <!-- <h4>Bienvenido <?php echo ucwords($login_session); ?></h4> -->
      <input type="hidden" id="inputIdUsuario" value="<?php echo $login_session; ?>">
    
   </div>

   <!-- Dropdowns Menus -->

   <!-- <div class="container-fluid mt-0 p-1" style="background-color:LightSkyBlue;">
      <h3><b>Pintura</b></h3>
   </div> -->

   <!-- <hr class="mt-0 mb-0"> -->
   <!-- Container de cabecera -->

   <hr  class="m-0 p-1 bg-dark">

   <!-- Titulo de Consulta -->
   <div class="container-fluid p-2">
      <h3 class="">Totales por Tipo de Elementos de Cruce</h3>
   </div>
   <!-- Titulo Form Consulta -->

   <hr  class="mt-0 p-1 bg-dark">



   <div class="container-fluid" id="titulo" >
   <div class="row mt-2">
      <div class="col-4">
                       
                     
      <table class="table table-striped" >
   
               <tbody id="tabla">



               </tbody>
          </table>
         </div>  
      
      </div>
   
   </div>
   <!-- Formulario Body Nuevo-->

<div class="container-fluid ml-1 mt-0 " id="datos">
      <!-- Form Introducir Nuevo -->

      <!-- inyeccion de codigo  -->
</div>
  
   <!-- fin formulario Body-->
   <hr>
   <!-- Formulario footer Nuevo-->
   <div class="mt-2 p-2 fixed-bottom" id="formFooter">
            <img src="../img/logoajuntament.jpg" alt="" class="img-fluid float-right" style="height:50px">
   </div>
   <!-- fin formulario Footer-->


   <!-- Optional JavaScript -->
   <!-- jQuery first, then Popper.js, then Bootstrap JS -->

   <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
  </script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
  <script src="../node_modules/jspdf/dist/jspdf.min.js"></script>
  <script src="../node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js"></script>

   <script src="../js/consultasTotalesTipoElementos.js"></script>




 
</body>

</html>