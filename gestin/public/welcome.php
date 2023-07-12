<?php

include './login/session.php';


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
      #dropdownInstalacion,
      #dropdownElemento,
      #dropdownRegulador,
      #dropdownCruce,
      #dropdownCM,
      #dropdownNIDLed {
         height: 500px;
         overflow-y: auto;
         
      }
      #dropdownNID,
      #dropdown-Almacen{
         overflow-y: auto;
         height: 400px;
      }
      .btn-info{
         min-height: 0px !important;         
      }

   </style>
   <title>GestIn</title>
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
                  <a class="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" role="button"
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
               <a class="nav-item nav-link active" href="./welcome.php">Instalaciones</a>

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

               <a class="nav-item nav-link" href="../src/config/config.php" tabindex="-1"aria-disabled="true">Configuración</a>
               <a class="nav-item nav-link" href="./login/logout.php" tabindex="-1" aria-disabled="true">Cerrar Sesión</a>
            </div>

         </div>
      </nav>
   </div>
   <!-- Fin Navbar -->



   <div class="container-fluid mt-0 p-0">
      <!-- <h4>Bienvenido <?php echo ucwords($login_session); ?></h4> -->
      <input type="hidden" id="inputIdUsuario" value="<?php echo $login_session; ?>">

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
                              $apiUrl = "http://172.27.120.120/gestin/public/api/tipoinstalacion"; //llamamos al EndPoint de la API
                              $json = file_get_contents($apiUrl); //capturamos la informacion
                              $datosAPI = json_decode($json, true); //transformamos el json a array
                              for ($i = 0; $i < count($datosAPI); ++$i) {?>
                  <button class="dropdown-item" type="submit" id="dropBtnTipoInstalacion" name="drop_tipoInstalacion"
                     value="<?php echo ($datosAPI[$i]['tipoInstalacion']); ?>"><?php echo ($datosAPI[$i]['tipoInstalacion']); ?></button>
                  <?php }?>
               </div>
            </div>
            <form method="post" action="">
               <input type="text" class="form-control mt-1 " id="inputTipologia" placeholder="" aria-label="Tipologia"
                  aria-describedby="basic-addon1">
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
            <input type="text" class="form-control mt-1 " placeholder="" id="inputInstalacion" aria-label="Instalación"
               aria-describedby="basic-addon1" onfocusout="">
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
        <!--
         <div class="col-1 mt-2 p-1">
            <div class="dropdown">
               <button class="btn btn-secondary dropdown-toggle" type="button" id="btnCruce" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  Alimenta.
               </button>
               <div class="dropdown-menu" id="dropdownCruce" aria-labelledby="dropdownMenu2">
          
               </div>
            </div>
            <input type="text" class="form-control mt-1 " placeholder="" id="inputCruce" aria-label="Cruce"
               aria-describedby="basic-addon1">
         </div>
         <div class="col-1 mt-2 p-1">
            <div class="dropdown">
               <button class="btn btn-secondary dropdown-toggle" type="button" id="btnCM" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  CM
               </button>
               <div class="dropdown-menu" id="dropdownCM" aria-labelledby="dropdownCM">
                    
               </div>
            </div>
            <input type="text" class="form-control mt-1" value="" id="inputIdCM">
         </div>
         <div class="col-3 mt-3 p-1">
            <span>Ubicación sector A.P. (NyxPalma)</span>
            <input type="text" class="form-control mt-2 bg-light" value="" id="inputUbicacionNYXPalma">
         </div>
         -->          
         <div class="col-3 mt-3 p-1">
            <span>Observaciones</span>
            <input type="text" class="form-control mt-2" value="" id="inputObservaciones">
         </div>
<!--
         <div class="col-1 mt-3 p-1">
            <span>Watios</span>
            <input type="text" class="form-control mt-2" value="" id="inputWatios">
         </div>
-->                 
         <div class="col-1">
            <br>
            <br>
            <button class="btn btn-primary mt-1" id="editInstalacion" onclick="editarInstalacion()" disabled><i class="fas fa-pencil-alt"></i> </button>
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

      <div class="col-3">
               <div class="btn-group">
                  <button type="button" class="btn btn-info h-25 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                     aria-expanded="false">
                     Elementos
                  </button>
                  <div class="dropdown-menu" id="dropdownElemento">
   
                     
                     
                        <!-- <div class="dropdown-divider"></div>
                     <button class="dropdown-item" type="button">Something else here</button> -->
                  </div>
               <input type="text" class="form-control ml-3 bg-light" value="" id="inputElemento" disabled>
               </div>
      </div>



         <!-- <div class="col-1">
            <button class="btn btn-info" id="btnTarjetas" onclick="formTarjetas()">Tarjetas</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnBusTren" onclick="formBusTren()">Bus/tren</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btn11_322" onclick="form11_322()">11/3.2.2</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btn12_300" onclick="form12_300()">12/300</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btn13_200"  onclick="form13_200()">13/200</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btn12_200"  onclick="form12_200()">12/200</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btn11_2in"  onclick="form11_2in()">11/2in</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btn12_pp"  onclick="form12_pp()">12/PP</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnOculta" onclick="formOculta()">S. Oculta</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnLed" onclick="formLed()">Leds</button>
         </div> -->

      </div>

      <div class="row mt-0">
         <!-- <div class="col-1">
            <button class="btn btn-info"  onclick="form12_bici()">12/Bici</button>
         </div> -->
         <!-- <div class="col-1">
            <button class="btn btn-info" id="btnInvidentes" onclick="formInvidentes()">Sonoro</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnDescontadores" onclick="formDescontadores()">Descont.</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnBaculos" onclick="formBaculos()">Báculos</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnColumnas" onclick="formColumnas()">Column</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnPulsadores" onclick="formPulsadores()">Pulsador</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnEspiras" onclick="formEspiras()">Espiras</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnPantallasCon" onclick="formPantallasCon()">Pant.Con.</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnCCTV" onclick="formCamTV()">CCTV</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnCamIp" onclick="formCamIP()">CamIP</button>
         </div>
         <div class="col-1">
            <button class="btn btn-info" id="btnModulo" onclick="formModulo()">Módulos</button>
         </div>
      </div> -->

   </div>
   <!-- Fin botones de selección -->
   <hr>
   <!-- Formulario Introducir Nuevo-->
   <div class="mt-1 p-1" id="formIntroducir">

   </div>
   <!-- fin formulario Nuevo-->
   <hr>
   <!-- Formulario Body Nuevo-->
   <div class="mt-2 p-2" id="formBody">

   </div>
   <!-- fin formulario Body-->
   <hr>
   <!-- Formulario footer Nuevo-->
   <div class="mt-2 p-2 fixed-bottom" id="formFooter">
      <img src="../img/logoajuntament.jpg" alt="" class="img-fluid float-right" style="height:50px">
   </div>
   <!-- fin formulario Footer-->

   
        <!-- Formulario Modal  -->

        <div class="modal fade" id="staticBackdrop2" data-backdrop="static" tabindex="-1" role="dialog"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Traspaso de Almacén</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="modalAlmacenBody">

                    </div>


                    <div class="modal-footer">
                        
                        <span class="mr-auto" >El elemento se dará de Alta en la nueva ubicación de y de baja de Almacén  </span>
                        
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="traspasoAlmacen()">Grabar</button>
                    </div>
                </div>
            </div>
        </div>

                <!-- Formulario Modal Fecha de Actuación almacen  -->

         <div class="modal fade" id="staticBackdrop3" data-backdrop="static" tabindex="-1" role="dialog"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                     <div class="modal-header">
                           <h5 class="modal-title" id="staticBackdropLabel">Traspaso de Almacén</h5>
                           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                     </div>
                    <div class="modal-body" id="modalFechaAlmacenBody">

                    </div>


                    <div class="modal-footer">
                        
                        <span class="mr-auto" >  </span>
                        
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="putfechaAlmacen2()">Grabar</button>
                    </div>
                </div>
            </div>
        </div>


                        <!-- Formulario Modal Fecha de Actuación Residuos  -->

                        <div class="modal fade" id="staticBackdrop4" data-backdrop="static" tabindex="-1" role="dialog"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                     <div class="modal-header">
                           <h5 class="modal-title" id="staticBackdropLabel">Traspaso de Residuos</h5>
                           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                     </div>
                    <div class="modal-body" id="modalFechaResiduosBody">

                    </div>


                    <div class="modal-footer">
                        
                        <span class="mr-auto" >  </span>
                        
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="putfechaResiduos2()">Grabar</button>
                    </div>
                </div>
            </div>
        </div>
 

                                <!-- Formulario Modal Fecha de Actuación de Almacén a Residuos  -->

                                <div class="modal fade" id="staticBackdrop5" data-backdrop="static" tabindex="-1" role="dialog"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                     <div class="modal-header">
                           <h5 class="modal-title" id="staticBackdropLabel">Traspaso de Residuos</h5>
                           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                     </div>
                    <div class="modal-body" id="modalFechaAlmacenResiduosBody">

                    </div>


                    <div class="modal-footer">
                        
                        <span class="mr-auto" >  </span>
                        
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="traspasoResiduos2()">Grabar</button>
                    </div>
                </div>
            </div>
        </div>

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
   <script src="../js/tablas.js"></script>
   <script src="../js/tarjetas.js"></script>
   <script src="../js/tarjetasCPU.js"></script>
   <script src="../js/tarjetasAmp.js"></script>
   <script src="../js/tarjetasFA.js"></script>
   <script src="../js/bustren.js"></script>
  <!--  <script src="../js/13_322.js"></script>
   <script src="../js/13_332.js"></script>
   <script src="../js/11_300.js"></script>
   <script src="../js/12_300.js"></script>
   <script src="../js/13_200.js"></script>
   <script src="../js/12_100.js"></script>
   <script src="../js/12_200.js"></script>
   <script src="../js/11_200.js"></script>
   <script src="../js/12_pp.js"></script> -->
   <!-- <script src="../js/12_pea_bici.js"></script>
   <script src="../js/12_bici.js"></script>
   <script src="../js/invidentes.js"></script> -->
   <script src="../js/oculta.js"></script>
   <!-- <script src="../js/descontadores.js"></script> -->
   <!-- <script src="../js/baculos.js"></script> -->
   <script src="../js/soportes.js"></script>
   <script src="../js/pulsadores.js"></script>
   <script src="../js/detectores.js"></script>
   <script src="../js/espiras.js"></script>
   <script src="../js/pantallascon.js"></script>
   <script src="../js/camtv.js"></script>
   <script src="../js/camip.js"></script>
   <script src="../js/led.js"></script>
   <script src="../js/modulos.js"></script>
   <script src="../js/cargadores.js"></script>
   <script src="../js/centrales.js"></script>
   <script src="../js/controlAccesos.js"></script>
   <script src="../js/fotoRojo.js"></script>
   <script src="../js/nodo.js"></script>
   <script src="../js/panelInformativo.js"></script>
   <script src="../js/puntoMedida.js"></script>
   <script src="../js/radares.js"></script>
   <script src="../js/sector.js"></script>
   <script src="../js/señalesLuminosas.js"></script>
   <script src="../js/almacen.js"></script>
   <script src="../js/residuos.js"></script>


   
   <!-- <script src="../js/brazos.js"></script> -->
   <!-- <script src="../js/bajantes.js"></script> -->
   <!-- <script src="../js/alargaderas.js"></script> -->


</body>

</html>