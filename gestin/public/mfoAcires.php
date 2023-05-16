<?php

include './login/session.php';
//include_once 'r_instalaciones.php';

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

   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <style>
      #dropInstalacionPintura,
      #dropAcire {
         height: 500px;
         overflow-y: auto;
      }

      .btn-info {
         width: 90px;
      }
   </style>
   <title>MFO Acires</title>
</head>

<body>

   <!-- Navbar -->
   <div class="container-fluid p-0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-info">
         <a class="navbar-brand" href="#">Gestión del inventario de las Instalaciones de Regulación y Control del Tráfico urbano de Palma</a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">

               <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     Consultas
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                     <a class="dropdown-item" href="./consultaTipo.php">Tipo Instalación</a>
                     <a class="dropdown-item" href="./consultaIntroduccion.php">Consulta de Introducción de datos por mes</a>
                  </div>
               </li>
               <a class="nav-item nav-link" href="./welcome.php">Instalaciones</a>
               <li class="nav-item dropdown ">
                  <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button"
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

               <!-- <a class="nav-item nav-link active" href="./mfo.php">MFO</a> -->
               <a class="nav-item nav-link" href="./pintura.php">Pintura</a>
               <a class="nav-item nav-link" href="./preventivo.php">Preventivo</a>
               <a class="nav-item nav-link" href="./totalLed.php">Leds</a>

               <a class="nav-item nav-link" href="../src/config/config.php" tabindex="-1"
                  aria-disabled="true">Configuración</a>
               <a class="nav-item nav-link" href="./login/logout.php" tabindex="-1" aria-disabled="true">Cerrar
                  Sesión</a>
            </div>

         </div>
      </nav>
   </div>
   <!-- Fin Navbar -->



   <div class="">
      <!-- <h4>Bienvenido <?php echo ucwords($login_session); ?></h4> -->
      <input type="hidden" id="inputIdUsuario" value="<?php echo $login_session; ?>">

   </div>


   <div class="container-fluid mt-0 p-1" style="background-color:Turquoise;">
      <div class="row">
         <div class="col">
            <h3><b>MFO Acires</b></h3>
         </div>

         <div class="col">
            <input type="month" class="form-control" id="inputMes" onfocusout="">
         </div>

         <div class="col">
            <button class="btn btn-primary" onclick="imprimir()">Imprimir</button>
            <button class="btn btn-primary" onclick="imprimirNoOk()">Imprimir No Ok</button>
         </div>        
  
         <div class="col">
              <div class="input-group ">
               <button type="button" class="btn btn-secondary dropdown-toggle " name="" value="" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false" onclick="rellenarCruceMFOFiltro()">
                  Acire
               </button>
               <div class="dropdown-menu" id="dropAcire">
                  <!-- inyectar código -->
               </div>
               <input type="text" class="form-control bg-warning " name="" id="inputIdAcire" value="">
               <!-- <div class="btn btn-primary ml-2" onclick="filtrarCruce()">Aplicar Filtro</i></div> -->
            </div>
         </div>
      </div>
   </div>
   <!-- Dropdowns Menus -->
   <hr class="mt-0 mb-0">
   <!-- Container de cabecera -->
   <div class="container-fluid pb-3" style="background-color:#EDC2BF">
      <!-- FormGuardar -->
      <div class="container-fluid mt-1 ml-1 ">

         <div class="row">
            <div class="col-1 p-1">

               <span><b>Acire</b></span>

               <div class="input-group mt-2">
                 <!-- <button type="button" class="btn btn-secondary dropdown-toggle" name="" value=""
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick="rellenarCruceMFO()">
                     Acire
                  </button>-->
                  <div class="dropdown-menu" id="dropInstalacionPintura">
                     <!-- inyectar código -->
                  </div>
                  <input type="text" class="form-control" name="" id="inputIdCruce" value="" disabled>

               </div>
            </div>

            <div class="col-2 p-1">
               <span><b>Ubicación</b></span>
               <input type="text" class="form-control mt-2" name="" id="inputUbicacion" placeholder="Ubicación" value=""
                  disabled>
            </div>
            <div class="col-xd-1 p-1">
               <span><b>Fecha Actuación</b></span>
               <input type="date" class="form-control mt-2" name="" id="inputFechaActuacion" value="">
            </div>
            <div class="col-xd-1 p-1">
               <span><b>Fecha Inspección</b></span>
               <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccion" value="">
            </div>
            <div class="col-3 p-1">
               <span><b>Observaciones</b></span>
               <input type="text" class="form-control mt-2" name="" id="inputObservaciones" value="">
            </div>
            <div class="col-1 p-1">
               <span><b>Precio</b></span>
               <input type="text" class="form-control mt-2" name="" id="inputPrecio" value="" disabled>
            </div>
            <div class="col-1 p-1">
               <span><b>Resolución Ok</b></span>
               <br class="mt-3">
               <input type="checkbox" class="mt-3 ml-5" name="" id="inputOk" onclick="rellenarPrecio()">
            </div>
            <div class="col-1 p-1 mt-4">
               <div class="btn btn-primary" onclick="nuevoMFO()">Guardar</div>
            </div>
         </div>
      </div>

   </div>
   <!-- Fin FormGuardar -->
   <hr class="mt-1 mb-1">
   <!-- Formulario Body Nuevo-->
   <div class="container-fluid ml-1 " id="formBody">

      <!-- inyeccion de codigo  -->
   </div>

   <!-- fin formulario Body-->
   <hr>
   <!-- Formulario footer Nuevo-->
   <div class="mt-2 p-2 fixed-bottom" id="formFooter">
      <img src="../img/logoajuntament.jpg" alt="" class="img-fluid float-right" style="height:50px">
   </div>
   <!-- fin formulario Footer-->

   <!-- Formulario Modal -->



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

   <script src="../node_modules/jspdf/dist/jspdf.min.js"></script>
   <script src="../node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js"></script>
   
   <script src="../js/mfoAcires.js"></script>
   <script src="../js/funciones.js"></script>
   <script src="../js/tablas.js"></script>


</body>

</html>