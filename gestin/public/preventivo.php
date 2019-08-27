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
         height: 400px;
         overflow-y: auto;
      }

   </style>
   <title>Preventivo</title>
</head>

<body>

   <!-- Navbar -->
   <div class="container-fluid p-0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-info">
         <a class="navbar-brand" href="#">Gestión de Inventario</a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
               <a class="nav-item nav-link text-right" href="./welcome.php">Instalaciones</a>
               <a class="nav-item nav-link" href="./mfo.php">MFO</a>
               <a class="nav-item nav-link" href="./pintura.php">Pintura</a>
               <a class="nav-item nav-link active" href="./preventivo.php">Preventivo</a>
               <a class="nav-item nav-link" href="./login/logout.php" tabindex="-1" aria-disabled="true">Cerrar
                  Sesión</a>
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
   <div class="container-fluid mt-0 p-1" style="background-color:LightSteelBlue;">
      <h3><b>Preventivo</b></h3>
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
                     onclick="rellenarCrucePreventivo()">
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
               <span><b>Fecha Preventivo</b></span>
               <input type="date" class="form-control mt-2" name="" id="inputFechaPreventivo" value="">
            </div>
            <div class="col-5 p-1">
               <span><b>Observaciones Preventivo</b></span>
               <input type="text" class="form-control mt-2" name="" id="inputObservacionesPreventivo" value="">
            </div>
         </div>



         <div class="row">
            <div class="col-xd-1 p-1">
               <span><b>Fecha Insp. Vol. Sem.</b></span>
               <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccionVoluntariaSemaforo" value="">
            </div>
            <div class="col-2 p-1">
               <span><b>Estado Insp. Vol. Sem.</b></span>
               <div class="input-group ">
                  <button type="button" class="btn btn-secondary dropdown-toggle p-1 mt-2" name="" value=""
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                     onclick="">
                     Estado
                  </button>
                  <div class="dropdown-menu" id="dropEstadoSemaforo">
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="Favorable">Favorable</button>
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="Leve">Leve</button>
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="Condicional">Condicional</button>
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="No Favorable">No Favorable</button>
                  </div>
                     <input type="text" class="form-control mt-2" name="" id="inputEstadoInspeccionVoluntarioSemaforo" value="">
               </div>
            </div>
            <div class="col-2 p-1">
               <span><b>Observaciones Insp. Vol. Sem.</b></span>
               <input type="text" class="form-control mt-2" name="" id="inputObservacionesInspeccionVoluntarioSemaforo" value="">
            </div>
            <div class="col-xd-1 p-1">
               <span><b>Fecha Insp. Vol. Alum.</b></span>
               <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccionVoluntarioAlumbrado" value="">
            </div>
            <div class="col-2 p-1">
               <span><b>Estado Insp. Vol. Alum.</b></span>
               <div class="input-group ">
                  <button type="button" class="btn btn-secondary dropdown-toggle p-1 mt-2" name="" value=""
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                     onclick="">
                     Estado
                  </button>
                  <div class="dropdown-menu" id="dropEstadoSemaforo">
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="Favorable">Favorable</button>
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="Leve">Leve</button>
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="Condicional">Condicional</button>
                     <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="No Favorable">No Favorable</button>
                  </div>
                     <input type="text" class="form-control mt-2" name="" id="inputEstadoInspeccionVoluntarioAlumbrado" value="">
               </div>
            </div>
            <div class="col-2 p-1">
               <span><b>Observaciones Insp. Vol. Alum.</b></span>
               <input type="text" class="form-control mt-2" name="" id="inputObservacionesInspeccionVoluntarioAlumbrado" value="">
            </div>
            <div class="col-1 p-1 mt-2">
               <br>
               <div class="btn btn-primary" onclick="nuevoPreventivo()">Guardar</div>
            </div>

         </div>


      </div>

   </div>
   <!-- Fin FormGuardar -->
   <hr  class="mt-1 mb-1 bg-primary">
   <!-- Formulario Body Nuevo-->
   <div class="container-fluid ml-1 " id="formBody">
  
            <!-- inyeccion de codigo  -->
   </div>
  
   <!-- fin formulario Body-->
   <hr class="mt-1 mb-1 bg-primary">
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
   <script src="../js/funciones.js"></script>
   <script src="../js/preventivo.js"></script>


</body>

</html>