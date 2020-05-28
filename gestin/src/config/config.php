<?php

include '../../public/login/session.php';
include_once './getNID.php';
 // CÓDIGO PARA IMPORTAR DE INCA HACIA MYSQL TODOS LOS NIDS INTRODUCIDOS EN EL INCA QUE NO ESTÁN DE BAJA








//}




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
   <link href="../../fontawesome/css/fontawesome.css" rel="stylesheet">
   <link href="../../fontawesome/css/solid.css" rel="stylesheet">

   
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style> </style>
    <title>Gestión de Inventario</title>
</head>

<body>

    <!-- Navbar -->
    <div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg navbar-dark bg-info">
            <a class="navbar-brand" href="#">Gestión de Inventario del Servei de Regulació i Control del Trànsit</a>
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
                            <a class="dropdown-item" href="../../public/consultaTipo.php">Tipo Instalación</a>
                            <a class="dropdown-item" href="../../public/consultaTotalesTipo.php">Totales Tipo Instalación</a>
                            <a class="dropdown-item" href="../../public/consultaTotalesLeds.php">Totales Leds</a>
                            <a class="dropdown-item" href="../../public/consultaTotalesElementos.php">Totales Elementos</a>
                            <a class="dropdown-item" href="../../public/consultaTotalesGrupos.php">Consulta de Cruce y total de Leds activos</a>
                            <a class="dropdown-item" href="#"></a>
                        </div>
                    </li>
                    <a class="nav-item nav-link" href="../../public/welcome.php">Instalaciones</a>

                    <li class="nav-item dropdown ">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            MFO
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="../../public/mfo.php">MFO Cruces</a>
                            <a class="dropdown-item" href="../../public/mfoPP.php">MFO Paso Peatones</a>
                            <a class="dropdown-item" href="../../public/mfoEspiras.php">MFO Espiras</a>
                            <a class="dropdown-item" href="../../public/mfoCargadores.php">MFO Cargadores</a>
                            <a class="dropdown-item" href="../../public/mfoAcires.php">MFO Acires</a>
                        </div>
                    </li>

                    <a class="nav-item nav-link" href="../../public/pintura.php">Pintura</a>
                    <a class="nav-item nav-link" href="../../public/preventivo.php">Preventivo</a>
                    <a class="nav-item nav-link" href="../../public/totalLed.php">Leds</a>

                    <a class="nav-item nav-link active" href="./config.php" tabindex="-1"
                        aria-disabled="true">Configuración</a>

                    <a class="nav-item nav-link" href="../../public/login/logout.php" tabindex="-1" aria-disabled="true">Cerrar
                        Sesión</a>
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

    <div class="container-fluid mt-0 p-1" style="background-color:#116791;" id="cabecera">
        <h3><b>Configuración</b></h3>
    </div>
    <hr class=" container- fluid mt-0">
    <!-- Container de cabecera -->
        <div class="container-fluid">
            <h4><b> Configuración de precios MFOs</b>
            <div class="btn btn-primary ml-1" id="editGrupo" onclick="editarPreciosMFO()"><i class="fas fa-pencil-alt"></i></div>
        </h4>
        <hr>
    
        <div class="container-fluid mt-3">

            <span class=""><b>Grupo 1</b></span>

            <form class="form-inline">
                <div class="form-group mb-2 mt-3 ml-3">
                    <label>Entre: </label>
                    <input type="text" class="form-control mr-2" id="numerogrupo11" style="width:50px" value="">

                    <label>y entre: </label>
                    <input type="text" class="form-control mr-2" id="numerogrupo12" style="width:50px">

                    <label>Precio: </label>
                    <input type="text" class="form-control mr-2" id="precioGrupo1" style="width:70px">
                </div>
            </form>
        </div>
        <div class="container-fluid mt-3">
            <span><b>Grupo 2</b></span>
            <form class="form-inline">
                <div class="form-group mb-2  mt-3 ml-3">
                    <label>Entre: </label>
                    <input type="text" class="form-control mr-2" id="numerogrupo21" style="width:50px">

                    <label>y entre: </label>
                    <input type="text" class="form-control mr-2" id="numerogrupo22" style="width:50px">

                    <label>Precio: </label>
                    <input type="text" class="form-control mr-2" id="precioGrupo2" style="width:70px">
                </div>
            </form>
        </div>
        <div class="container-fluid mt-3">
            <span><b>Grupo 3</b></span>
            <form class="form-inline">
                <div class="form-group mb-2  mt-3 ml-3">
                    <label>Entre: </label>
                    <input type="text" class="form-control mr-2" id="numerogrupo31" style="width:50px">

                    <label>y entre: </label>
                    <input type="text" class="form-control mr-2" id="numerogrupo32" style="width:50px">

                    <label>Precio: </label>
                    <input type="text" class="form-control mr-2" id="precioGrupo3" style="width:70px">
                </div>
            </form>
        </div>
        <div class="container-fluid mt-3">
            <span><b>Grupo 4</b></span>
            <form class="form-inline">
                <div class="form-group mb-2  mt-3 ml-3">
                    <label>Desde: </label>
                    <input type="text" class="form-control mr-2 " id="numerogrupo41" style="width:50px">

                    <label>Precio: </label>
                    <input type="text" class="form-control mr-2" id="precioGrupo4" style="width:70px">

                </div>
            </form>
        </div>

       

        <div class="row mt-2">
            <div class="col-1">
        
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
            <div class="col-1">
            </div>
        </div>

    </div>
    <!-- Fin botones de selección -->
    <hr>
    <!-- Formulario Introducir Nuevo-->
    <div class="mt-2 p-2">
            <h3><b>Importar NIDs de INCA<b></h3>
            <div class="btn btn-primary ml-3 mt-2" id="" onclick="funcionGetNID()">Importar NID</div>
            <div id="contar">
            
            </div>
    </div>


    <hr>
    <!-- Formulario Introducir Nuevo-->
    <div class="mt-2 p-2">
            <h3><b>Cambiar Configuración Precios MFO<b></h3>
            <h5>Alterna entre facturar por Tarjetas de Salida o por Número de Grupos</h5>
            <!-- <div class="form-check">
                <input class="form-check-input" type="radio" value="" id="2018" onclick="o2018()">
                <label class="form-check-label" for="2018">
                    Pliego 2018
                </label>
             
            </div>
            <div class="form-check">
                  <input class="form-check-input" type="radio" value="" id="2021" onclick="o2021()">
                <label class="form-check-label" for="2021">
                    Pliego 2021
                </label> 
            <div> -->



            <!-- Default unchecked -->
            <div class="custom-control custom-radio">
            <input type="radio" class="custom-control-input" id="2018" name="defaultExampleRadios">
            <label class="custom-control-label" for="2018">Pliego 2018</label>
            </div>

            <!-- Default checked -->
            <div class="custom-control custom-radio">
            <input type="radio" class="custom-control-input" id="2021" name="defaultExampleRadios">
            <label class="custom-control-label" for="2021">Pliego 2021</label>
            </div>

            <div class="btn btn-primary ml-3 mt-2" id="" onclick="setPliego()">Guardar Pliego</div>

            <!-- <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="radio" name="options" id="2018b" autocomplete="off" checked> Pliego 2018
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="2021b" autocomplete="off"> Pliego 2021
                </label>

            </div> -->
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
<script>
async function funcionGetNID() {

    var p = document.getElementById('contar');
                    p.innerHTML = '';
                    p.innerHTML=`<span class="ml-1">Importando...</span>`;

var url = 'http://172.27.120.120/gestin/public/api/nid'
  
var count= await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response == "No se han encontrado resultados") {
                alert(response);

            } else {
                console.log(response);
                return (response);
            }
        })
        pintarContar(count);
    }
function pintarContar(count) {
    var p = document.getElementById('contar');
                    p.innerHTML = '';
                    p.innerHTML=`

                    <span class="ml-1">Se han importado: ${count} elementos</span>
                    `
}
</script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <script src="config.js"></script>

</body>

</html>