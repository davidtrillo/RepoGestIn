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
        #dropdownCruce,
        #dropdownCruce2,
        .dp2 {
            height: 500px;
            overflow-y: auto;
        }
    </style>
    <title>Leds</title>
</head>

<body>

    <!-- Navbar -->
    <div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg navbar-dark bg-info">
            <a class="navbar-brand" href="#">Gestión del Inventario del Servei de Regulació i Control del Trànsit</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div class="navbar-nav ml-auto">
                    <a class="nav-item nav-link" href="./welcome.php">Instalaciones</a>
                             <li class="nav-item dropdown ">
               <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
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
                    <a class="nav-item nav-link" href="./pintura.php">Pintura</a>
                    <a class="nav-item nav-link" href="./preventivo.php">Preventivo</a>
                    <a class="nav-item nav-link active" href="./totalLed.php">Leds</a>


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

    <!-- Dropdowns Menus -->
    <div class="container-fluid mt-0 p-1" style="background-color:LightSkyBlue;">
        <div class="row">
            <div class="col">
                <h3 class="ml-3"><b>Leds</b></h3>
            </div>
            <div class="col">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                        <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"><<</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">0-50</a></li>
                        <li class="page-item"><a class="page-link" href="#">50-100</a></li>
                        <li class="page-item"><a class="page-link" href="#">100-150</a></li>
                        <li class="page-item">
                        <a class="page-link" href="#">>></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>


    <hr class="mt-0 mb-0 bg-dark">
    <!-- Container de cabecera -->
    <div class="container-fluid mt-2">
        <!-- FormGuardar -->
        <!-- Títulos Form Nuevo-->
        <div class="row">
            <div class="col-1">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipo" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Cruce
                    </button>
                    <div class="dropdown-menu" id="dropdownCruce" aria-labelledby="dropdownTipoActuacion">


                    </div>
                </div>
            </div>
            <div class="col-2">
                
            </div>
            <div class="col-2 ">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipo" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Tipo
                    </button>
                    <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                        <button class="dropdown-item" onclick="escribirTipo('100 mm')">100 mm</button>
                        <button class="dropdown-item" onclick="escribirTipo('200 mm')">200 mm</button>
                        <button class="dropdown-item" onclick="escribirTipo('200 mm Bici')">200 mm Bici</button>
                        <button class="dropdown-item" onclick="escribirTipo('300 mm')">300 mm</button>
                        <button class="dropdown-item" onclick="escribirTipo('200x200')">200x200</button>
                        <button class="dropdown-item" onclick="escribirTipo('200x200 Bici')">200x200 Bici</button>
                        <button class="dropdown-item" onclick="escribirTipo('200x200 Bici/Peatón')">200x200
                            Bici/Peatón</button>

                    </div>
                </div>
            </div>
            <div class="col-1">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Color
                    </button>
                    <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                        <button class="dropdown-item" onclick="escribirColor('Rojo')">Rojo</button>
                        <button class="dropdown-item" onclick="escribirColor('Ambar')">Ambar</button>
                        <button class="dropdown-item" onclick="escribirColor('Verde')">Verde</button>
                        <button class="dropdown-item" onclick="escribirColor('Blanco')">Blanco</button>
                    </div>
                </div>
            </div>
            <div class="col-1">
                Grupo
            </div>
            <div class="col-1">
                Num. Serie
            </div>
            <div class="col-1">
                Albarán
            </div>
            <div class="col-2">
            <span class="mr-0"> Observaciones </span>
            </div>
            <div class="col-1">
                <span class="ml-0"> Activo </span>
                <span class="ml-0"> Almacen </span>
            </div>
        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1" id="formGuardar">
            <div class="col-1">
                <input type="text" class="form-control mt-1" id="inputIdCruce">
            </div>
            <div class="col-auto">
            F.Actuación
                <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion">
            </div>
            <div class="col-2">
                <input type="text" class="form-control mt-1" name="inputTipo" id="inputTipo">
            </div>
            <div class="col-1">
                <input type="text" class="form-control mt-1" name="inputColor" id="inputColor">
            </div>
            <div class="col-1">
                <input type="text" class="form-control mt-1" name="inputGrupo" id="inputGrupo">
            </div>
            <div class="col-1">
                <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie"
                    onfocusout="comprobarNumSerieLed()">
            </div>
            <div class="col-1">
                <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
            </div>
            <div class="col-2">
                <input type="text" class="form-control mt-1 ml-0" name="inputObservaciones" id="inputObservaciones">
            </div>
            <div class="col-1">
                <input type="checkbox" class="mt-2 ml-0" name="inputActivo" id="inputActivo">
                <input type="checkbox" class="mt-2 ml-0" name="inputAlmacen" id="inputAlmacen">

                <div class="btn btn-primary mt-1 ml-3" onclick="nuevaLed()">Guardar</div>
            </div>
            <div class="col-1">
            </div>
        </div>
    </div>
</div>
    <!-- Fin FormGuardar -->

<div class="container-fluid">
    <hr class="mt-1 mb-1 bg-dark">
</div>
    
    <!-- Formulario Body Nuevo-->
    <div class="container-fluid ml-1 " id="formBody">

        <!-- inyeccion de codigo  -->
    </div>

    <!-- fin formulario Body-->


    <!-- fin formulario Footer-->

    <!-- Formulario Modal -->





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


</body>

</html>