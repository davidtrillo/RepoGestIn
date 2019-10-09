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
      #dropInstalacionPintura{
         height: 500px;
         overflow-y: auto;
      }

      .btn-info {
         width: 90px;
      }
   </style>
   <title>MFO Espiras</title>
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
         <li class="nav-item dropdown ">
               <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               MFO
               </a>
               <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="./mfo.php">MFO Cruces</a>
                  <a class="dropdown-item" href="./mfoPP.php">MFO Paso Peatones</a>
                  <a class="dropdown-item" href="./mfoEspiras.php">MFO Espiras</a>
                  <a class="dropdown-item" href="./mfoCargadores.php">MFO Cargadores</a>
                  <a class="dropdown-item" href="./mfoAcires.php">MFO Acires</a>
               </div>
         </li>

         <!-- <a class="nav-item nav-link active" href="./mfo.php">MFO</a> -->
         <a class="nav-item nav-link" href="./pintura.php">Pintura</a>
         <a class="nav-item nav-link" href="./preventivo.php">Preventivo</a>
         <a class="nav-item nav-link" href="./totalLed.php">Leds</a>

         <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Listados
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="./consultaTipo.php">Tipo Instalación</a>
              <a class="dropdown-item" href="#"></a>
              <a class="dropdown-item" href="#"></a>
            </div>
          </li>
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

   <div class="container-fluid mt-0 p-1" style="background-color:Turquoise;">
      <div class="row"> 
         <div class="col-2">
             <h3><b>MFO Espiras</b></h3>
         </div>
         <div class="col-3">
            <input type="month" class="form-control" id="inputMes" onfocusout="">
         </div>
         <div class="col-3">
            <button class="btn btn-primary" onclick="imprimir()">Imprimir</button>
         </div>        
      </div>
   </div>

   <!-- Dropdowns Menus -->
   <hr class="mt-0 mb-0">
   <!-- Container de cabecera -->
   <div class="container-fluid mt-1 ml-1">
      <!-- FormGuardar -->
      <div class="container-fluid mt-1 ml-1 ">

         <div class="row">
            <div class="col-1 p-1">

               <span><b>Instalación</b></span>

               <div class="input-group mt-2">
                  <button type="button" class="btn btn-secondary dropdown-toggle" name="" value=""
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                     onclick="rellenarCruceMFO()">
                     Inst
                  </button>
                  <div class="dropdown-menu" id="dropInstalacionPintura">
                     <!-- inyectar código -->
                  </div>
                  <input type="text" class="form-control" name="" id="inputIdCruce" value="">
                     
               </div>
            </div>

            <div class="col-2 p-1">
               <span><b>Ubicación</b></span>
               <input type="text" class="form-control mt-2" name="" id="inputUbicacion" placeholder="Ubicación" value="" disabled>
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
               <input type="text" class="form-control mt-2" name="" id="inputPrecio" value="">
            </div>
            <div class="col-1 p-1">
               <span><b>Resolución Ok</b></span>
               <br class="mt-3">
               <input type="checkbox" class="mt-3 ml-5" name="" id="inputOk" checked>
            </div>
            <div class="col-1 p-1 mt-4">
               <div class="btn btn-primary" onclick="nuevoMFO()">Guardar</div>
            </div>
         </div>
      </div>

   </div>
   <!-- Fin FormGuardar -->
   <hr  class="mt-1 mb-1">
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

   <!-- Formulario Modal -->

   <!-- <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Sin Datos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        </button>
      </div>
      <div class="modal-body">
      <div class="container-fluid">
               
               <table class="table table-bordered">
                   <thead>
                   <tr>
                       <table class="table table-bordered text-center">
                       <thead>
                           <tr>
                           <th scope="col">REG.</th>
                           <th scope="col">DET.</th>
                           <th scope="col">CTV</th>
                           <th scope="col">CEN.</th>
                           <th scope="col">0,8M.</th>
                           <th scope="col">2,4M.</th>
                           <th scope="col">4M.</th>
                           <th scope="col">BAC.</th>
                           <th scope="col">SIM.</th>
                           <th scope="col">DOB.</th>
                           <th scope="col">BAJ.</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>        
                           <td id="idReg">Sin Datos</td>
                           <td id="idDet">Sin Datos</td>
                           <td id="idCTV">Sin Datos</td>
                           <td id="idCen">Sin Datos</td>
                           <td id="id08m">Sin Datos</td>
                           <td id="id24m">Sin Datos</td>
                           <td id="id4m">Sin Datos</td>
                           <td id="idBac">Sin Datos</td>
                           <td id="idSim">Sin Datos</td>
                           <td id="idDob">Sin Datos</td>
                           <td id="idBaj">Sin Datos</td>
                           </tr>
                       </tbody>
                       </table>
                   </tr>
                   </thead>
               </table>
               <p id="observaciones">Observaciones</p>
               </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> -->
   <!-- fin Formulario Modal -->


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
   
   <script src="../js/funciones.js"></script>
   <script src="../js/mfoEspiras.js"></script>


</body>

</html>