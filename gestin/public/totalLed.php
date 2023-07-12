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
    <!--    <script src="https://kit.fontawesome.com/de8261cad4.js"></script> -->
    <link href="../fontawesome/css/fontawesome.css" rel="stylesheet">
    <link href="../fontawesome/css/solid.css" rel="stylesheet">

    <!-- fotnawasome 3.2 new format with bootstrap - Icono de Modificación -->
    <!-- <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet"> -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js">
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style>
        #dropdownCruce,
        #dropdownCruce2,
        #dropdownNIDTotalLed,
        .dp2,
        .pag {
            height: 500px;

            overflow-y: auto;
        }


        #pag {
            width: 80px !important;
            /* height: 400px !important; */
            min-width: 2rem;
        }

        #inputNID {
            width: 150px !important;
            min-width: 2rem;
        }

        [id^=inputNIDTar] {
            width: 150px !important;
            min-width: 2rem;
        }
    </style>
    <title>Leds</title>


            <script>
        $(document).ready(function(){
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
                console.log("he hecho esto del tooltip");
            })
        });
        </script>
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
                    <a class="nav-item nav-link active" href="./totalLed.php">Leds</a>



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




    </div>



    <!-- Dropdowns Menus -->
    <div class="container-fluid mt-0 p-0" style="background-color:LightSkyBlue;">
        <div class="row">
            <div class="col-auto">
                <h3 class="ml-3 mt-2"><b>Leds</b></h3>

            </div>

            <!-- <div class="p-2 mr-4 ml-4">
                    <div class="col">

                    </div>
            </div> -->


            <div class="col-auto">
                <div class="ml-1 mt-3" id="">
                    <input type="checkbox" name="" id="repes" onclick="repes()"> Núm. de serie Repetidos
                </div>
            </div>

            <div class="col-auto">
                <div class="ml-1 mt-3" id="spinner">
                    <!-- Aquí inyecto el código del spinner -->
                </div>
            </div>
            <div class="col mt-3 ">
                <p class="text-right">Filtro Cruce</p>
            </div>

            <div class="col-1 mt-1 ml-0">
                <input type="text" class="form-control mt-1 bg-warning" id="inputIdFiltroCruce">
            </div>

            <div class="col-1 mt-2 ml-0">

                <div class="btn btn-primary" onclick="filtrarCruce()">Aplicar Filtro</i></div>

            </div>
        </div>
    </div>


    <hr class="mt-0 mb-0 bg-dark">
    <!-- Container de cabecera -->
    <div class="container-fluid mt-2" id="repesTitle">
        <div class="row ml-1">
            <div class="col-1 pl-0">

            </div>
            <div class="col-1 pl-0">
                NID
            </div>

            <div class="col-2 pl-0">
                F.Actuación
            </div>
            <div class="col-1 pl-0">
                Tipo
            </div>
            <div class="col-1 pl-0">
                Color
            </div>
            <div class="col-1 pl-0">
                Fabricacion
            </div>
            <div class="col-1 pl-0">
                Num. Serie
            </div>
            <div class="col-1 pl-0">
                Albarán
            </div>
            <div class="col-1 pl-0">
                Observaciones
            </div>

        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo 
        <div class="row mt-1 ml-1" id="formGuardar">
            <div class="col-1  pl-0">
            </div>
            <div class="col-1 pl-0">
                <input type="text" class="form-control mt-1" name="inputNID" id="inputNID" disabled>
            </div>
            <div class="col-2  pl-0">
                <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion"
                    placeholder="DD/MM/YYYY">
            </div>
            <div class="col-1  pl-0">
                <input type="text" class="form-control mt-1" name="inputTipo" id="inputTipo">
            </div>
            <div class="col-1  pl-0">
                <input type="text" class="form-control mt-1" name="inputColor" id="inputColor">
            </div>
            <div class="col-1  pl-0">
                <input type="text" class="form-control mt-1" name="inputFabricacion" id="inputFabricacion">
            </div>
            <div class="col-1  pl-0">
                <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie"
                    onfocusout="comprobarNumSerieLed()">
            </div>
            <div class="col-1  pl-0">
                <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
            </div>
            <div class="col-1  pl-0">
                <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones">
            </div>
            <div class="col-1  pl-0">
            <input type="checkbox" class="mt-3 ml-3 name=" inputActivo" id="inputActivo">
                <input type="checkbox" class="mt-3 ml-3" name="inputAlmacen" id="inputAlmacen"> 

            </div>
            <div class="col-1  pl-0">
                <div class="btn btn-primary ml-3" onclick="nuevaLed()"><i class="fas fa-save"></i></div>

            </div>
        </div>
         Fin Form Introducir nuevo -->
        <!-- Fin FormGuardar -->

        <div class="container-fluid">
            <hr class="mt-1 mb-1 bg-dark">
        </div>

        <!-- Formulario Body Nuevo-->
        <div class="container-fluid pl-0 mb-2 " id="formBody">

            <!-- inyeccion de codigo  -->
        </div>

        <!-- fin formulario Body-->

        <!-- Formulario footer-->
<div class="container-fluid">
        <div class="container-fluid position-bottom mt-1 p-1 bg-white" id="formFooter" style="height:50px;">
            <hr class="mt-0 mb-1 bg-dark">


            <div class="row">
                <div class="col-2">
                    <div class="dropdown">
                        <span><b>Paginación</b></span>
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownLimit"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            50
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="pag">
                            <a class="dropdown-item" href="#" onclick="paginacion('50')">50</a>
                            <a class="dropdown-item" href="#" onclick="paginacion('100')">100</a>
                            <a class="dropdown-item" href="#" onclick="paginacion('150')">150</a>
                            <a class="dropdown-item" href="#" onclick="paginacion('200')">200</a>
                        </div>
                    </div>
                </div>
                <div class="col mt-1" id="footerTotal">


                </div>
                <div class="col">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination" id="nPag">
                            <!-- inyeccion de codigo por JS -->


                        </ul>
                    </nav>
                </div>
                <div class="col-2">
                    <img src="../img/logoajuntament.jpg" alt="" class="img-fluid float-right mt-0" style="height:50px">
                </div>
            </div>

        </div>
</div>
        <!-- fin formulario Footer-->




        <!-- Formulario Modal -->

        <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Sustitución de Led</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="modalLedBody">

                    </div>


                    <div class="modal-footer">
                        
                        <span class="mr-auto" >El led se dará de baja y alta con los nuevos datos de manera automática</span>
                        
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="sustituirLed()">Grabar</button>
                    </div>
                </div>
            </div>
        </div>





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
        <script src="../js/totalLed.js"></script>
        <script src="../js/almacen.js"></script>
        <script src="../js/residuos.js"></script>


</body>

</html>