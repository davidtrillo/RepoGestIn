$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


function nuevaRadares() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var idTipoActuacion = document.getElementById('inputTipoActuacion').value;
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFechaRadares(fechaActuacion)) {
            if (existeFechaRadares(fechaActuacion)) {

            } else {
                alert("La fecha introducida no existe.");
                return;
            }
        } else {
            alert("El formato de la fecha es incorrecto.");

            return;
        }
        var idNumSerie = document.getElementById('inputNumSerie').value ? document.getElementById('inputNumSerie').value : "0";
        var albaran = document.getElementById('inputAlbaran').value ? document.getElementById('inputAlbaran').value : "0";
        var observaciones = document.getElementById('inputObservaciones2').value ? document.getElementById('inputObservaciones2').value : "";
        var precio = document.getElementById('inputPrecio').value ? document.getElementById('inputPrecio').value : "0";
        var activo = document.getElementById('inputActivo').checked;
        var instalada = document.getElementById('inputInstalada').checked;
        var almacen = document.getElementById('inputAlmacen').checked;
        var residuos = document.getElementById('inputResiduos').checked;


        activo = String(activo);
        instalada = String(instalada);
        almacen = String(almacen);
        residuos = String(residuos);

         //console.log(residuos);
        // console.log(idNumSerie);
        // console.log(albaran);
        // console.log(observaciones);
        // console.log(precio);


        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.120/gestin/public/api/radares/nueva';

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
        rellenarTodosRadares();
    }, 1000);

}

function validarFormatoFechaRadares(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaRadares(fecha) {
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

function existeFecha2Radares(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}



function leerTipoActuacion2(descripcionTipoActuacion, idTipoActuacion) {
    
    var p1 = document.getElementById('inputTipoActuacionTar' + idTipoActuacion);
    p1.value = descripcionTipoActuacion;

}

async function formRadares(elemento) {

    //desactivarBotones();

    // var ac=document.getElementById("btnTarjetas");
    // ac.classList.add("active");

    
    var tipo="";
    tipoActuacion.forEach(function(value,index){ //recorrer la matriz de la tabla en tablas.js
        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" onclick="escribirTipoActuacion13_332(this.value)" >'+ value +'</button>';
         
    });
    
    
    var instalacion = document.getElementById("inputInstalacion");
    
    if (instalacion.value != "") {
        
            var inputElemento = document.getElementById("inputElemento");
                inputElemento.value=elemento;
        


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
            <span class="ml-0 mb-0 p-0">Precio</span>
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
            <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie" onfocusout="comprobarNumSerieRadares()">
        </div>
        <div class="col-1">
        <input type="text" class="form-control mt-1" name="inputPrecio" id="inputPrecio">
        </div>
        <div class="col-1">
        <!-- ALERTAAAAA ESTÁ AL REVES PERO FUNCIONA ASÍ POR NO CAMBIAR TODO EL CÓDIGO!!! INSTALADA ES ACTIVO Y ACTIVO ES INSTALADA -->
            <input type="checkbox" class=" mt-3 ml-2" name="inputInstalada" id="inputInstalada" onclick="checkTarjetaInstalada()"> 
            <input type="checkbox" class=" mt-3 ml-2" name="inputActivo" id="inputActivo" onclick="checkTarjetaActiva()">
            <input type="checkbox" class=" mt-3 ml-3" name="inputAlmacen" id="inputAlmacen" onclick="checkTarjetaAlmacen()">
            <input type="checkbox" class=" mt-3 ml-2" name="inputResiduos" id="inputResiduos" onclick="checkTarjetaResiduos()">
        </div>  
        <div class="col-1">
            <div class="btn btn-primary" onclick="nuevaRadares()">Guardar</div>
        </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `
 

        // rellenar todos los registros 
        await rellenarTodosRadares();
    }
}



async function rellenarTodosRadares() { //Llamada a la API 
    var idInstalacion = document.getElementById('inputInstalacion').value;

    var url = 'http://172.27.120.120/gestin/public/api/radares/' + idInstalacion
  await  fetch(url, {
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
                //console.log("activo:"+response[i]['activo'].value);
              //  console.log("instalada:"+response[i]['instalada'].value);
              //  console.log("almacen:"+response[i]['almacen'].value);
              //  console.log("residuos:"+response[i]['residuos'].value);

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
            
                        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" name="'+ response[i]['id'] +'" onclick="leerTipoActuacion2(this.value,this.name)" >'+ value +'</button>';
                        
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
                    <input type="checkbox" class=" mt-3 ml-2" name="" id="inputActivoTar${response[i]['id']}" onclick="checkTarjetaActiva(${response[i]['id']})" ${activo}>
                    <input type="checkbox" class=" mt-3 ml-2" name="" id="inputInstaladaTar${response[i]['id']}" onclick="checkTarjetaInstalada(${response[i]['id']})"  ${instalada}>
                    <input type="checkbox" class=" mt-3 ml-3" name="" id="inputAlmacenTar${response[i]['id']}" onclick="checkTarjetaAlmacen(${response[i]['id']})"  ${almacen}>
                    <input type="checkbox" class=" mt-3 ml-2" name="" id="inputResiduosTar${response[i]['id']}" onclick="checkTarjetaResiduos(${response[i]['id']})" ${residuos}>                 
                </div>
                 <div class="col-1">
                    <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarRadares(this.id)"><i class="fas fa-pencil-alt"></i></div>
                    <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarRadares(this.id)"><i class="fas fa-trash-alt"></i></div>
                 </div>
              </div>  

                 `

                }
            }
        })

   await rellenarFooterRadares();
   await comprobarNumSerieRadares2();


}

function rellenarFooterRadares() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://172.27.120.120/gestin/public/api/radares/instaladas/' + idInstalacion
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

                // var p1 = document.getElementById('formFooter');
                // p1.innerHTML = '';
                // p1.innerHTML=`
                // <span class="ml-1">Total de Tarjetas Activas: ${response[0]['c']}</span>
                // `

                var p = document.getElementById('cabecera');
                p.innerHTML = '';
                p.innerHTML = `
                <h3><b>Instalaciones</b></h3>
                <span class="ml-1">Total de <b>Radares</b> Instaladas: ${response[0]['c']}</span>
                `
            }
        })

}


function borrarRadares(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/radares/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
     rellenarTodosRadares();
    }, 500);
}

function editarRadares(param) {

 

    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputTipoActuacionTar = document.getElementById('inputTipoActuacionTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
    var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
    var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    var inputPrecioTar = document.getElementById('inputPrecioTar' + param).value;
    var inputActivoTar = document.getElementById('inputActivoTar' + param).checked;
    var inputInstaladaTar = document.getElementById('inputInstaladaTar' + param).checked;
    var inputAlmacenTar = document.getElementById('inputAlmacenTar' + param).checked;
    var inputResiduosTar = document.getElementById('inputResiduosTar' + param).checked;

    inputActivoTar = String(inputActivoTar);
    inputInstaladaTar = String(inputInstaladaTar);
    inputAlmacenTar = String(inputAlmacenTar);
    inputResiduosTar = String(inputResiduosTar);

    var idUsuario = document.getElementById('inputIdUsuario').value;

    // console.log(inputIdTar);
    // console.log(inputFechaActuacionTar);
    // console.log(inputTipoActuacionTar);
    // console.log(inputObservacionesTar);
    // console.log(inputNumSerieTar);
    // console.log(inputPrecioTar);
    // console.log(inputActivoTar);
    // console.log(idUsuario);


    //validar fecha correcta
    if (validarFormatoFechaRadares(inputFechaActuacionTar)) {
        if (existeFechaRadares(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }
    var url = 'http://172.27.120.120/gestin/public/api/radares/modificar/' + param;

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: inputIdTar,
                idTipoActuacion: inputTipoActuacionTar,
                idNumSerie: inputNumSerieTar,
                albaran: inputAlbaranTar,
                observaciones: inputObservacionesTar,
                fechaActuacion: inputFechaActuacionTar,
                idUsuario: idUsuario,
                precio: inputPrecioTar,
                activo: inputActivoTar,
                instalada: inputInstaladaTar,
                almacen: inputAlmacenTar,
                residuos: inputResiduosTar

            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodosRadares();
    }, 500);
}


function comprobarNumSerieRadares() {
    var idNumSerie = document.getElementById('inputNumSerie').value;
    console.log(idNumSerie);

    if (idNumSerie) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/radares/' + idNumSerie;
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




 function comprobarNumSerieRadares2() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
  
    if (idInstalacion) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/radares';
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
                                     var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/radares/' + idNumSerie;
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


function comprobarNumSerieRadares3(id,idNumSerie) {
    
    if (idNumSerie) {

       // var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/' + idNumSerie;
        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/radares/' + idNumSerie;
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
}

document.addEventListener("DOMContentLoaded", async function(event) {
 
   await checkTarjetaInstalada();
   await checkTarjetaActiva();
   await checkTarjetaAlmacen();
   await checkTarjetaResiduos();
    // Aquí puedes escribir el código adicional que quieres que se ejecute cuando se dispara el evento DOMContentLoaded
  });

function checkTarjetaInstalada(id) {

    if (id){

        if (document.getElementById('inputInstaladaTar'+id).checked) {
          //  document.getElementById('inputActivoTar'+id).checked=true;
            document.getElementById('inputAlmacenTar'+id).checked=false;
            document.getElementById('inputResiduosTar'+id).checked=false;
        
        }else{
            document.getElementById('inputActivoTar'+id).checked=false;
            document.getElementById('inputInstaladaTar'+id).checked=false;
            document.getElementById('inputAlmacenTar'+id).checked=false;
            document.getElementById('inputResiduosTar'+id).checked=false;

        }
    }else{
        if (document.getElementById('inputInstalada').checked) {
            document.getElementById('inputActivo').checked=true;
            document.getElementById('inputAlmacen').checked=false;
            document.getElementById('inputResiduos').checked=false;
        
        }else{
            document.getElementById('inputActivo').checked=false;
            document.getElementById('inputInstalada').checked=false;
            document.getElementById('inputAlmacen').checked=false;
            document.getElementById('inputResiduos').checked=false;

        }
    }
}
function checkTarjetaActiva(id) {

    if (id){


        if (document.getElementById('inputActivoTar'+id).checked) {
        
            document.getElementById('inputInstaladaTar'+id).checked=true;
            document.getElementById('inputAlmacenTar'+id).checked=false;
            document.getElementById('inputResiduosTar'+id).checked=false;      
    
        }else{
            document.getElementById('inputActivoTar'+id).checked=false;
            document.getElementById('inputInstaladaTar'+id).checked=false;
            document.getElementById('inputAlmacenTar'+id).checked=false;
            document.getElementById('inputResiduosTar'+id).checked=false;
        }


    }else{

        if (document.getElementById('inputActivo').checked) {
        
            document.getElementById('inputAlmacen').checked=false;
            document.getElementById('inputResiduos').checked=false;      
    
        }else{
            document.getElementById('inputActivo').checked=false;
            document.getElementById('inputInstalada').checked=false;
            document.getElementById('inputAlmacen').checked=false;
            document.getElementById('inputResiduos').checked=false;
        }
    }
}
function checkTarjetaAlmacen(id) {

    if (id){

        if ( document.getElementById('inputAlmacenTar'+id).checked) {
            document.getElementById('inputActivoTar'+id).checked=false;
            document.getElementById('inputInstaladaTar'+id).checked=false;
            document.getElementById('inputResiduosTar'+id).checked=false;
    
        }else{
            document.getElementById('inputActivoTar'+id).checked=false;
            document.getElementById('inputInstaladaTar'+id).checked=false;
            document.getElementById('inputAlmacenTar'+id).checked=false;
            document.getElementById('inputResiduosTar'+id).checked=false;
        }
    }else{
            if ( document.getElementById('inputAlmacen').checked) {
                document.getElementById('inputActivo').checked=false;
                document.getElementById('inputInstalada').checked=false;
                document.getElementById('inputResiduos').checked=false;
        
            }else{
                document.getElementById('inputActivo').checked=false;
                document.getElementById('inputInstalada').checked=false;
                document.getElementById('inputAlmacen').checked=false;
                document.getElementById('inputResiduos').checked=false;
            }
        }
}
function checkTarjetaResiduos(id) {

    if (id){

        if (document.getElementById('inputResiduosTar'+id).checked) {
        
            document.getElementById('inputInstaladaTar'+id).checked=false;
            document.getElementById('inputActivoTar'+id).checked=false;
            document.getElementById('inputAlmacenTar'+id).checked=false;
        //  document.getElementById('inputResiduos').checked=true;
    
        }else{
            document.getElementById('inputActivoTar'+id).checked=false;
            document.getElementById('inputInstaladaTar'+id).checked=false;
            document.getElementById('inputAlmacenTar'+id).checked=false;
            document.getElementById('inputResiduosTar'+id).checked=false;
        }
    }else{
        if (document.getElementById('inputResiduos').checked) {
        
            document.getElementById('inputInstalada').checked=false;
            document.getElementById('inputActivo').checked=false;
            document.getElementById('inputAlmacen').checked=false;
        //  document.getElementById('inputResiduos').checked=true;
    
        }else{
            document.getElementById('inputActivo').checked=false;
            document.getElementById('inputInstalada').checked=false;
            document.getElementById('inputAlmacen').checked=false;
            document.getElementById('inputResiduos').checked=false;
        }
    }
}
