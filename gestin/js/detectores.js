function nuevaDetectores() { //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var idTipoActuacion = document.getElementById('inputTipoActuacion').value
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFechaDetectores(fechaActuacion)) { //CAMBIO DE NOMENCLATURA
            if (existeFechaDetectores(fechaActuacion)) { //CAMBIO DE NOMENCLATURA

            } else {
                alert("La fecha introducida no existe.");
                return;
            }
        } else {
            alert("El formato de la fecha es incorrecto.");

            return;
        }



        if (document.getElementById('inputNumSerie').value){
            var idNumSerie = document.getElementById('inputNumSerie').value;
        }else{
            alert("No se ha introducido el número de serie")
            return;
        }


        var idNumSerie = document.getElementById('inputNumSerie').value ? document.getElementById('inputNumSerie').value : "0";
        var albaran = document.getElementById('inputAlbaran').value ? document.getElementById('inputAlbaran').value : "0";
        var observaciones = document.getElementById('inputObservaciones2').value ? document.getElementById('inputObservaciones2').value : "";
        var precio = document.getElementById('inputPrecio').value ? document.getElementById('inputPrecio').value : "0";
        var activo = document.getElementById('inputActivoDetector').checked;
        var instalada = document.getElementById('inputInstaladaDetector').checked;
        var almacen = null;
        var residuos = null;

        activo = String(activo);
        instalada = String(instalada);
        almacen = String(almacen);
        residuos = String(residuos);




        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.120/gestin/public/api/detectores/nueva';

        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: idInstalacion,
                    idTipoActuacion: idTipoActuacion,
                    idNumSerie: idNumSerie,
                    albaran: albaran,
                    observaciones: observaciones,
                    fechaActuacion: fechaActuacion,
                    idUsuario: idUsuario,
                    precio: precio,
                    activo: activo,
                    instalada: instalada,
                    almacen: almacen,
                    residuos: residuos
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

    }
    setTimeout(() => {
        rellenarTodosDetectores(); //CAMBIO DE NOMENCLATURA
    }, 1000);

}

function validarFormatoFechaDetectores(campo) { //CAMBIO DE NOMENCLATURA
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaDetectores(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var day = fechaf[2];
    var month = fechaf[1];
    var year = fechaf[0];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function existeFecha2Detectores(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}



function escribirTipoActuacionDetectores(descripcionTipoActuacion) { //CAMBIO DE NOMENCLATURA
    var p2 = document.getElementById('inputTipoActuacion');
    p2.value = descripcionTipoActuacion;
}


function leerTipoActuacionDetectores(idTipoActuacion) { //CAMBIO DE NOMENCLATURA
    var p1 = document.getElementById('idTipoActuacion');
    p1.value = idTipoActuacion;
}

function rellenarTipoActuacion2Detectores(idTipoActuacion, idActuacion) { //CAMBIO DE NOMENCLATURA
    var p1 = document.getElementById('inputTipoActuacionTar' + idActuacion);
    p1.value = idTipoActuacion;
}

async function formDetectores(elemento) { //CAMBIO DE NOMENCLATURA
    var instalacion = document.getElementById("inputInstalacion");
    var inputElemento = document.getElementById("inputElemento");
    inputElemento.value=elemento;

    var tipo="";
    tipoActuacion.forEach(function(value,index){ //recorrer la matriz de la tabla en tablas.js
        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" onclick="escribirTipoActuacion13_332(this.value)" >'+ value +'</button>';
         
    });

    if (instalacion.value != "") {
        var f1 = document.getElementById("formIntroducir");
        f1.innerHTML = `
        
        <!-- Títulos Form Nuevo-->
        <div class="row ml-1">
        <div class="col-2">
            F.Actuación
        </div>
        <div class="col-2">
            <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Tipo A.
                </button>
                <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                `+ tipo +`
                </div>
            </div>
        </div>

        <div class="col-3">
            Observaciones
        </div>
        <div class="col-1">
          Albarán
        </div>
        <div class="col-1">
            Num. Serie
        </div>
        <div class="col-1">
            Precio
        </div>
        <div class="col-1">
            <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Activa</span> 
            <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Instalada</span>
            <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Almacén</span> 
            <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Residuos</span> 
        </div>
        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1 ml-1" id="formGuardar">
        <div class="col-2">
            <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
        </div>
        <div class="col-2">
            <input type="text" class="form-control mt-1" name="inputTipoActuacion" id="inputTipoActuacion">
        </div>
        <div class="col-3">
            <input type="text" class="form-control mt-1" name="inputObservaciones2" id="inputObservaciones2">
        </div>
        <div class="col-1">
            <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
        </div>
        <div class="col-1">
            <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie" onfocusout="comprobarNumSerieDetectores()">
        </div>
        <div class="col-1">
        <input type="text" class="form-control mt-1" name="inputPrecio" id="inputPrecio">
        </div>
        <div class="col-1">
        <!-- ALERTAAAAA ESTÁ AL REVES PERO FUNCIONA ASÍ POR NO CAMBIAR TODO EL CÓDIGO!!! INSTALADA ES ACTIVO Y ACTIVO ES INSTALADA -->
        <input type="checkbox" class=" mt-3 ml-2" name="inputInstaladaDetector" id="inputInstaladaDetector" onclick="checkDetectorInstalada()"> 
        <input type="checkbox" class=" mt-3 ml-2" name="inputActivoDetector" id="inputActivoDetector" onclick="checkDetectorActiva()">
        </div>
        <div class="col-1">
            <div class="btn btn-primary" onclick="nuevaDetectores()">Guardar</div>
        </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `


        // rellenar todos los registros 
       await rellenarTodosDetectores();//CAMBIO DE NOMENCLATURA
    }
}



async function rellenarTodosDetectores() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://172.27.120.120/gestin/public/api/detectores/' + idInstalacion
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response == "No se han encontrado resultados") {

                var p = document.getElementById('formBody');
                p.innerHTML = '';
                alert(response);

            } else {
                var p = document.getElementById('formBody');
                p.innerHTML = '';
               for (var i in response) {
                    if (response[i]['activo'] == "true") {
                        var activo = "checked";
                    } else {
                        var activo = "";
                    }
                    if (response[i]['instalada'] == "true") {
                        var instalada = "checked";
                        
                    } else {
                        var instalada = "";
                    }

                    if (response[i]['almacen'] == "true") {
                        var almacen = "checked";
                    } else {
                        var almacen = "";
                    }
                    if (response[i]['residuos'] == "true") {
                        var residuos = "checked";
                    } else {
                        var residuos = "";
                    }

                    var tipo="";
                    tipoActuacion.forEach(function(value,index){ //recorrer la matriz de la tabla en tablas.js
            
                        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" name="'+ response[i]['id'] +'" onclick="rellenarTipoActuacion213_332(this.value,this.name)" >'+ value +'</button>';
                        
                    });
                    p.innerHTML += `
                 <div class="row mt-1 ml-1" id="">
                 <div class="col-2">
                   <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                   <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                 </div>
                 <div class="col-2 mt-1" >
           
                    <div class="input-group">
                        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipoActuacionTar${response[i]['id']}" value="${response[i]['idTipoActuacion']}">
                        <div class="input-group-append">
                                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </button>
                            <div class="dropdown-menu">
                                `+ tipo +`
                            </div>
                        
                        </div>
                    </div>
                   
                 </div>
                 <div class="col-3">
                    <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                 </div>
                 <div class="col-1">
                    <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                 </div>
                 <div class="col-1">
                    <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}">
                 </div>
                 <div class="col-1">
                 <input type="text" class="form-control mt-1" name="" id="inputPrecioTar${response[i]['id']}"  value="${response[i]['precio']}">
                 </div>
                 <div class="col-1">
                     <input type="checkbox" class=" mt-3 ml-2" name="" id="inputActivoDetectorTar${response[i]['id']}" onclick="checkDetectorActiva(${response[i]['id']})" ${activo}>
                     <input type="checkbox" class=" mt-3 ml-2" name="" id="inputInstaladaDetectorTar${response[i]['id']}" onclick="checkDetectorInstalada(${response[i]['id']})"  ${instalada}>
                     <input type="checkbox" class=" mt-3 ml-3" name="" id="inputAlmacenDetectorTar${response[i]['id']}" onclick="checkDetectorAlmacen(${response[i]['id']})"  ${almacen}>
                     <input type="checkbox" class=" mt-3 ml-2" name="" id="inputResiduosDetectorTar${response[i]['id']}" onclick="checkDetectorResiduos(${response[i]['id']})" ${residuos}>
               </div>
                 <div class="col-1">
                    <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarDetectores(this.id)" title="Guardar edición"><i class="fas fa-pencil-alt"></i></div>
                    <div class="btn btn-danger" title="Eliminar registro" id="${response[i]['id']}" onclick="borrarDetectores(this.id)"><i class="fas fa-trash-alt"></i></div>
                 </div>
              </div>  
                 
                 `

                }
            }
        })

        await rellenarFooterDetectores();
        await comprobarNumSerieDetectores2();
     

}

function rellenarFooterDetectores(){//CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://172.27.120.120/gestin/public/api/detectores/activas/' + idInstalacion
    fetch(url, {
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
                var p = document.getElementById('cabecera');
                p.innerHTML = '';
                p.innerHTML=`
                <h3><b>Instalaciones</b></h3>
                <span class="ml-1">Total de <b>Señales Detectoress</b> Activas: ${response[0]['c']}</span>
                `
            }
        })

}


function borrarDetectores(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/detectores/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
        rellenarTodosDetectores();//CAMBIO DE NOMENCLATURA
    }, 1000);
}

function editarSimpleDetectores(param) {//CAMBIO DE NOMENCLATURA
    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputTipoActuacionTar = document.getElementById('inputTipoActuacionTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
    var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
    var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    var inputPrecioTar = document.getElementById('inputPrecioTar' + param).value;
    var inputActivoDetectorTar = document.getElementById('inputActivoDetectorTar' + param).checked;
    var inputInstaladaDetectorTar = document.getElementById('inputInstaladaDetectorTar' + param).checked;
    var inputAlmacenDetectorTar = document.getElementById('inputAlmacenDetectorTar' + param).checked;
    var inputResiduosDetectorTar = document.getElementById('inputResiduosDetectorTar' + param).checked;
    inputActivoDetectorTar = String(inputActivoDetectorTar);
    inputInstaladaDetectorTar = String(inputInstaladaDetectorTar);
    inputAlmacenDetectorTar = String(inputAlmacenDetectorTar);
    inputResiduosDetectorTar = String(inputResiduosDetectorTar);
    var idUsuario = document.getElementById('inputIdUsuario').value;

    // console.log(inputIdTar);
    // console.log(inputFechaActuacionTar);
    // console.log(inputTipoActuacionTar);
    // console.log(inputObservacionesTar);
    // console.log(inputNumSerieTar);
    // console.log(inputPrecioTar);
    // console.log(inputActivoDetectorTar);
    // console.log(idUsuario);


    //validar fecha correcta
    if (validarFormatoFechaDetectores(inputFechaActuacionTar)) {
        if (existeFechaDetectores(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }
    var url = 'http://172.27.120.120/gestin/public/api/detectores/modificar/' + param;

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: inputIdTar,
                idTipoActuacion: inputTipoActuacionTar,
                idNumSerie: inputNumSerieTar,
                albaran:inputAlbaranTar,
                observaciones: inputObservacionesTar,
                fechaActuacion: inputFechaActuacionTar,
                idUsuario: idUsuario,
                precio: inputPrecioTar,
                activo: inputActivoDetectorTar,
                instalada: inputInstaladaDetectorTar,
                almacen: inputAlmacenDetectorTar,
                residuos: inputResiduosDetectorTar
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodosDetectores(); //CAMBIO DE NOMENCLATURA
    }, 500);
}

async function editarDetectores(param) {


    if  (document.getElementById('inputAlmacenDetectorTar' + param).checked){
        if (confirm("El registro actual se borrará de la instalación y pasará a Almacén.")){
           
            var c=document.getElementById("modalFechaAlmacenBody");
            c.innerHTML=`
                        <!-- Inicio body 1 -->
                        <div class="row" id="">
                            <div class="col">
                                <b>F.Actuación</b>
                            </div>                  
                        </div>
        
                        <div class="row" id="">
                            <div class="col p-3">
                                Nueva Fecha de Actuación:
                                <input type="date" class="form-control mt-1" name="inputFechaActuacionAlmacen" id="inputFechaActuacionAlmacen" placeholder="DD/MM/YYYY">
                                <input type="hidden" id="claveid" value="${param}">
                            </div>           
                        </div>        
                        <!-- fin body 1  -->
                    `;  
        
            $('#staticBackdrop3').modal('show');
        
            return;

        }else{
            //alert("Es un no");
            return;
        }
    
    }else{
        if  (document.getElementById('inputResiduosDetectorTar' + param).checked){
            if (confirm("El registro actual se borrará de la instalación y pasará a Residuos.")){
               
                var c=document.getElementById("modalFechaResiduosBody");
                c.innerHTML=`
                            <!-- Inicio body 1 -->
                            <div class="row" id="">
                                <div class="col">
                                    <b>F.Actuación</b>
                                </div>                  
                            </div>
            
                            <div class="row" id="">
                                <div class="col p-3">
                                    Nueva Fecha de Actuación:
                                    <input type="date" class="form-control mt-1" name="inputFechaActuacionResiduos" id="inputFechaActuacionResiduos" placeholder="DD/MM/YYYY">
                                    <input type="hidden" id="claveid" value="${param}">
                                </div>           
                            </div>        
                            <!-- fin body 1  -->
                        `;  
            
                $('#staticBackdrop4').modal('show');
            
                return;
                
            }else{
                //alert("Es un no");
                return;
            }
        }else{
            editarSimpledetectores(param);
        }

    }
}




function comprobarNumSerieDetectores() {
    var idNumSerie = document.getElementById('inputNumSerie').value;

    if (idNumSerie) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/detectores/' + idNumSerie;
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

                if ((response != "No se han encontrado resultados") && (response.length > 0)) {

                    var res = "Número de Serie repetido en: ";

                    for (i in response) {
                        res += "\n Cruce: " + response[i]['idInstalacion'];
                    }
                    alert(res);
                    var clase = document.getElementById('inputNumSerie');
                    clase.classList.add("bg-danger");
                } else {
                    var clase = document.getElementById('inputNumSerie');
                    clase.classList.remove("bg-danger");
                }
            })
    }
}


function comprobarNumSerieDetectores2() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
  
    if (idInstalacion) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/detectores';
     fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

                if ((response.length > 0)) {


                    for (i in response) {

                        if (response[i]['idInstalacion'] == idInstalacion) {
                            var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                            if (clase) {
                                var id=response[i]['id'];
                                var idNumSerie=response[i]['idNumSerie'];
                                // comprobarNumSerieTarjeta3(response[i]['id'],response[i]['idNumSerie']);
                                if (idNumSerie) {

                                    // var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/' + idNumSerie;
                                     var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/detectores/' + idNumSerie;
                                     fetch(url, {
                                             method: 'GET',
                                             headers: {
                                                 'Content-Type': 'application/json'
                                             }
                                         })
                                         .then(res => res.json())
                                         .catch(error => console.error('Error:', error))
                                         .then(response => {
                             
                                             if ((response.length > 0)) {
                             
                                                 var res = "Número de Serie repetido en: ";
                                                 var clase = document.getElementById('inputNumSerieTar' + id);
                             
                                                 for (i in response) {
                                                     res += "\n Cruce: " + response[i]['idInstalacion'];
                                                 }
                                               
                                                 clase.setAttribute("data-toggle", "tooltip");
                                                 clase.setAttribute("data-placement", "top");
                                                 clase.setAttribute("title", "Repetido en cruce " + res);
                                                 
                                             }
                             
                                         })
                                 }



                               clase.classList.add("bg-danger");

                            }
                        } else {

                            var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                            if (clase) {
                                clase.classList.remove("bg-danger");


                            }
                        }
                    }

                } else {

                }
            })
    }
}
/*
document.addEventListener("DOMContentLoaded", async function(event) {
 
    await checkTarjetaInstalada();
    await checkTarjetaActiva();
    await checkTarjetaAlmacen();
    await checkTarjetaResiduos();
    // Aquí puedes escribir el código adicional que quieres que se ejecute cuando se dispara el evento DOMContentLoaded
  });
*/
function checkDetectorInstalada(id) {

    if (id){

        if (document.getElementById('inputInstaladaDetectorTar'+id).checked) {
          //  document.getElementById('inputActivoDetectorTar'+id).checked=true;
            document.getElementById('inputAlmacenDetectorTar'+id).checked=false;
            document.getElementById('inputResiduosDetectorTar'+id).checked=false;
        
        }else{
            document.getElementById('inputActivoDetectorTar'+id).checked=false;
            document.getElementById('inputInstaladaDetectorTar'+id).checked=false;
            document.getElementById('inputAlmacenDetectorTar'+id).checked=false;
            document.getElementById('inputResiduosDetectorTar'+id).checked=false;

        }
    }else{
        if (document.getElementById('inputInstaladaDetector').checked) {
            document.getElementById('inputActivoDetector').checked=true;

        
        }else{
            document.getElementById('inputActivoDetector').checked=false;
            document.getElementById('inputInstaladaDetector').checked=false;


        }
    }
}
function checkDetectorActiva(id) {

    if (id){


        if (document.getElementById('inputActivoDetectorTar'+id).checked) {
        
            document.getElementById('inputInstaladaDetectorTar'+id).checked=true;
            document.getElementById('inputAlmacenDetectorTar'+id).checked=false;
            document.getElementById('inputResiduosDetectorTar'+id).checked=false;      
    
        }else{
            document.getElementById('inputActivoDetectorTar'+id).checked=false;
            document.getElementById('inputInstaladaDetectorTar'+id).checked=false;
            document.getElementById('inputAlmacenDetectorTar'+id).checked=false;
            document.getElementById('inputResiduosDetectorTar'+id).checked=false;
        }


    }else{

        if (document.getElementById('inputActivoDetector').checked) {
        

    
        }else{
            document.getElementById('inputActivoDetector').checked=false;
            document.getElementById('inputInstaladaDetector').checked=false;

        }
    }
}
function checkDetectorAlmacen(id) {

    if (id){

        if ( document.getElementById('inputAlmacenDetectorTar'+id).checked) {
            document.getElementById('inputActivoDetectorTar'+id).checked=false;
            document.getElementById('inputInstaladaDetectorTar'+id).checked=false;
            document.getElementById('inputResiduosDetectorTar'+id).checked=false;
    
        }else{
            document.getElementById('inputActivoDetectorTar'+id).checked=false;
            document.getElementById('inputInstaladaDetectorTar'+id).checked=false;
            document.getElementById('inputAlmacenDetectorTar'+id).checked=false;
            document.getElementById('inputResiduosDetectorTar'+id).checked=false;
        }
    }else{
            if ( document.getElementById('inputAlmacen').checked) {
                document.getElementById('inputActivoDetector').checked=false;

        
            }else{
                document.getElementById('inputActivoDetector').checked=false;
                document.getElementById('inputInstaladaDetector').checked=false;

            }
        }
}
function checkDetectorResiduos(id) {

    if (id){

        if (document.getElementById('inputResiduosDetectorTar'+id).checked) {
        
            document.getElementById('inputInstaladaDetectorTar'+id).checked=false;
            document.getElementById('inputActivoDetectorTar'+id).checked=false;
            document.getElementById('inputAlmacenDetectorTar'+id).checked=false;
        //  document.getElementById('inputResiduos').checked=true;
    
        }else{
            document.getElementById('inputActivoDetectorTar'+id).checked=false;
            document.getElementById('inputInstaladaDetectorTar'+id).checked=false;
            document.getElementById('inputAlmacenDetectorTar'+id).checked=false;
            document.getElementById('inputResiduosDetectorTar'+id).checked=false;
        }
    }else{
        if (document.getElementById('inputResiduos').checked) {
        
            document.getElementById('inputInstaladaDetector').checked=false;
            document.getElementById('inputActivoDetector').checked=false;

    
        }else{
            document.getElementById('inputActivoDetector').checked=false;
            document.getElementById('inputInstaladaDetector').checked=false;

        }
    }
}
