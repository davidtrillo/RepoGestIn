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
   <script src="https://kit.fontawesome.com/de8261cad4.js"></script>
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      
   <style>
      #dropdownInstalacion,#dropdownRegulador,#dropdownCruce,#dropdownCM{
          height: 500px; 
          overflow-y: auto; 
      }

      .btn-info {
         width: 90px;
      }
   </style>
   <title>Gestión de Inventario</title>
</head>

<body>

<!-- Navbar -->
<div class="container-fluid p-0">
   <nav class="navbar navbar-expand-lg navbar-dark bg-info">
   <a class="navbar-brand" href="#">Gestión de Inventario</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
   </button>
   <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
         <a class="nav-item nav-link" href="./welcome.php">Instalaciones</a>
         <a class="nav-item nav-link" href="./mfo.php">MFO</a>
         <a class="nav-item nav-link" href="./pintura.php">Pintura</a>
         <a class="nav-item nav-link" href="./preventivo.php">Preventivo</a>

         <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Listados
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="./consultaTipo.php">Tipo Instalación</a>
              <a class="dropdown-item" href="#"></a>
              <a class="dropdown-item" href="#"></a>
            </div>
          </li>

         <a class="nav-item nav-link" href="./login/logout.php" tabindex="-1" aria-disabled="true">Cerrar Sesión</a>
      </div>

   </div>
   </nav>
</div>
<!-- Fin Navbar -->



   <div class="container-fluid mt-0 p-0">
      <!-- <h4>Bienvenido <?php echo ucwords($login_session); ?></h4> -->
      <input type="hidden" id="inputUsuario" value="<?php echo $login_session; ?>">
      <input type="hidden" id="inputIdUsuario" value="<?php echo $id_session; ?>">
   </div>

   <!-- Dropdowns Menus -->
     
   <div class="container-fluid mt-0 p-1" style="background-color:powderblue;" id="cabecera">
   <h3><b>Instalaciones</b></h3>
   </div>
      <hr class=" container- fluid mt-0">
   <!-- Container de cabecera -->
   <div class="container-fluid">
      <!-- Primera Row -->
      <div class="row ml-1">
         <div class="col-2 p-1">
            <div class="dropdown">
               <button class="btn btn-secondary dropdown-toggle" type="button" id="btnInstalacion"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tipo Instalación
               </button>
               <div class="dropdown-menu" id="dropdown-menu1" aria-labelledby="dropdownMenu2">
                  <?php
                              $apiUrl = "http://172.27.120.111/gestin/public/api/tipoinstalacion"; //llamamos al EndPoint de la API
                              $json = file_get_contents($apiUrl); //capturamos la informacion
                              $datosAPI = json_decode($json, true); //transformamos el json a array
                              for ($i = 0; $i < count($datosAPI); ++$i) {?>
                  <button class="dropdown-item" type="submit" id="dropBtnTipoInstalacion" name="drop_tipoInstalacion"
                     value="<?php echo ($datosAPI[$i]['tipoInstalacion']); ?>"><?php echo ($datosAPI[$i]['tipoInstalacion']); ?></button>
                  <?php }?>
               </div>
            </div>
            <form method="post" action="">
               <input type="text" class="form-control mt-1 " id="inputTipologia" placeholder=""
                  aria-label="Tipologia" aria-describedby="basic-addon1">
            </form>
         </div>
         <div class="col-2 p-1">
            <div class="dropdown">
               <button class="btn btn-secondary dropdown-toggle" type="button" id="btnInstalacion"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Instalación
               </button>
               <div class="dropdown-menu" id="dropdownInstalacion" aria-labelledby="dropdownMenu2">
                  <!-- Aquí se inyecta el código mediante JS -->
               </div>
            </div>
            <input type="text" class="form-control mt-1 " placeholder="" id="inputInstalacion"
               aria-label="Instalación" aria-describedby="basic-addon1">
         </div>
         <div class="col-6 mt-2 p-1">
            <span>Ubicación</span>
            <input type="text" class="form-control mt-2 bg-light" placeholder="" id="inputUbicacion"
               aria-label="Ubicación" aria-describedby="basic-addon1">
         </div>
      </div>
      <!-- Segunda Row -->
      <div class="row ml-1">
         <div class="col-1 mt-2 p-1">
            <div class="dropdown">
               <button class="btn btn-secondary dropdown-toggle" type="button" id="btnInstalacion"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Regulador
               </button>
               <div class="dropdown-menu" id="dropdownRegulador" aria-labelledby="dropdownRegulador">
                  <!-- Aquí se iyecta el código mediante JS -->
               </div>
               <input type="text" class="form-control mt-1" value="" id="inputRegulador">
               <input type="hidden" class="form-control mt-1" value="" id="inputIdRegulador">

            </div>
         </div>
         <div class="col-1 mt-2 p-1">
            <div class="dropdown">
               <button class="btn btn-secondary dropdown-toggle" type="button" id="btnCruce"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Alimenta.
               </button>
               <div class="dropdown-menu" id="dropdownCruce" aria-labelledby="dropdownMenu2">
                  <!-- Aquí se iyecta el código mediante JS -->
               </div>
            </div>
            <input type="text" class="form-control mt-1 " placeholder="" id="inputCruce"
               aria-label="Cruce" aria-describedby="basic-addon1">
         </div>
         <div class="col-1 mt-2 p-1">
            <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="btnCM"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     CM
                  </button>
                  <div class="dropdown-menu" id="dropdownCM" aria-labelledby="dropdownCM">
                     <!-- Aquí se iyecta el código mediante JS -->
                  </div>
            </div>
               <input type="text" class="form-control mt-1" value="" id="inputIdCM">
         </div>
         <div class="col-3 mt-3 p-1">
               <span>Ubicación Sector NYX</span>
               <input type="text" class="form-control mt-2 bg-light" value="" id="inputUbicacionNYXPalma">
         </div>
         <div class="col-3 mt-3 p-1">
               <span>Ubicación Sector Carlos</span>
               <input type="text" class="form-control mt-2 bg-light" value="" id="inputUbicacionCarlos">
         </div>

         <div class="col-1 mt-3 p-1">
            <span>Watios</span>
            <input type="text" class="form-control mt-2" value="" id="inputWatios">
         </div>
         <div class="col-1">
            <br>
            <br>
            <div class="btn btn-primary" id="editInstalacion" onclick="editarInstalacion()"><i class="fas fa-pencil-alt"></i></div>
         </div>
         <!-- No se pueden poner links a archivos locales sin deshabilitar las funcionalidades o bajar los archivos -->
         <!-- Se podria usar Web Server for Chrome https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource-->
         <!-- <div class="col-2 mt-2">
            <button class="btn btn-secondary mb-2"onclick="window.open('C:\Users\dtrillo\p1.txt','_system')">Plano</button>
            <br>
            <a class="mt-3" href="file:///C:\Users\dtrillo\p1.txt" id="plano">Ver Plano</a>
                  
         </div> -->
      </div>
   </div>
   <hr>

   <!-- botones de selección -->
   <div class="container-fluid mt-2 ml-1">

      <div class="row">
         <div class="col-1">
            <button class="btn btn-info" onclick="formTarjetas()">Tarjetas</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" onclick="formBusTren()">Bus/tren</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" onclick="form11_322()">11/3.2.2</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"  onclick="form12_300()">12/300</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="form13_200()">13/200</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="form12_200()">12/200</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="form11_2in()">11/2in</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="form12_pp()">12/PP</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"  onclick="form12_pea_bici()">12/PE/Bic</button>
         </div>

      </div>

      <div class="row mt-2">
         <div class="col-1">
            <button class="btn btn-info"  onclick="form12_bici()">12/Bici</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formInvidentes()">Invide.</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formDescontadores()">Descont.</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formBaculos()">Báculos</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"  onclick="formColumnas()">Column</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formPulsadores()">Pulsador</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formEspiras()">Espiras</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formPantallasCon()">Pant.Con.</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formCamTV()">CCTV</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info"   onclick="formCamIP()">CamIP</button>
         </div>
      </div>

   </div>
   <!-- Fin botones de selección -->
   <hr>
   <!-- Formulario Introducir Nuevo-->
   <div class="mt-2 p-2" id="formIntroducir">

   </div>
   <!-- fin formulario Nuevo-->
   <hr>
   <!-- Formulario Body Nuevo-->
   <div class="mt-2 p-2" id="formBody">

   </div>
   <!-- fin formulario Body-->
   <hr>
   <!-- Formulario footer Nuevo-->
   <div class="mt-2 p-2" id="formFooter">


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




   <script src="../js/funciones.js"></script>
   <script src="../js/tarjetas.js"></script>
   <script src="../js/bustren.js"></script>
   <script src="../js/11_322.js"></script>
   <script src="../js/12_300.js"></script>
   <script src="../js/13_200.js"></script>
   <script src="../js/12_200.js"></script>
   <script src="../js/11_2in.js"></script>
   <script src="../js/12_pp.js"></script>
   <script src="../js/12_pea_bici.js"></script>
   <script src="../js/12_bici.js"></script>
   <script src="../js/invidentes.js"></script>
   <script src="../js/descontadores.js"></script>
   <script src="../js/baculos.js"></script>
   <script src="../js/columnas.js"></script>
   <script src="../js/pulsadores.js"></script>
   <script src="../js/espiras.js"></script>
   <script src="../js/pantallascon.js"></script>
   <script src="../js/camtv.js"></script>
   <script src="../js/camip.js"></script>


</body>

</html>