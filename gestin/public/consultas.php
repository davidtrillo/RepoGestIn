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
      .dropdown-menu {
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
   <a class="navbar-brand" href="#">Gestión de Inventario</a>
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
                     <a class="dropdown-item" href="./consultaTipo.php">Tipo Instalación</a>
                     <a class="dropdown-item" href="./consultaTotalesTipo.php">Totales Tipo Instalación</a>
                     <a class="dropdown-item" href="./consultaTotalesLeds.php">Totales Leds</a>
                     <a class="dropdown-item" href="./consultaTotalesElementos.php">Totales Elementos</a>
                     <a class="dropdown-item" href="./consultaTotalesGrupos.php">Consulta de Cruce y total de Leds activos</a>
                     <a class="dropdown-item" href="#"></a>
                     <a class="dropdown-item" href="#"></a>
            </div>
          </li>
         <a class="nav-item nav-link" href="./welcome.php">Instalaciones</a>
         <a class="nav-item nav-link" href="./mfo.php">MFO</a>
         <a class="nav-item nav-link" href="./pintura.php">Pintura</a>
         <a class="nav-item nav-link" href="./preventivo.php">Preventivo</a>


         <a class="nav-item nav-link" href="./login/logout.php" tabindex="-1" aria-disabled="true">Cerrar Sesión</a>
      </div>

   </div>
   </nav>
</div>
   <!-- Fin Navbar -->



   <div class="">
      <!-- <h4>Bienvenido <?php echo ucwords($login_session); ?></h4> -->
      <input type="hidden" id="inputUsuario" value="<?php echo $login_session; ?>">
      <input type="hidden" id="inputIdUsuario" value="<?php echo $id_session; ?>">
   </div>

   <!-- Dropdowns Menus -->

   <!-- <div class="container-fluid mt-0 p-1" style="background-color:LightSkyBlue;">
      <h3><b>Pintura</b></h3>
   </div> -->

   <!-- <hr class="mt-0 mb-0"> -->
   <!-- Container de cabecera -->

   <hr  class="m-0 bg-dark">

   <!-- Form de Consulta -->
   <div class="container-fluid bg-warning">
      <div class="row ml-1 ">
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
      </div>
   <!-- Fin Form Consulta -->

   <hr  class="mt-0 bg-dark">
   <!-- Formulario Body Nuevo-->
   <div class="container-fluid ml-1 " id="formBody">
     
            <!-- inyeccion de codigo  -->
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

   <script src="../js/consultas.js"></script>

</body>

</html>