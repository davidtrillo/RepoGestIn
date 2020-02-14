function nuevaSoportes() { //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var idTipoActuacion = document.getElementById('inputTipoActuacion').value
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFechaSoportes(fechaActuacion)) { //CAMBIO DE NOMENCLATURA
            if (existeFechaSoportes(fechaActuacion)) { //CAMBIO DE NOMENCLATURA

            } else {
                alert("La fecha introducida no existe.");
                return;
            }
        } else {
            alert("El formato de la fecha es incorrecto.");

            return;
        }
        var idNumSerie = document.getElementById('inputNumSerie').value ? document.getElementById('inputNumSerie').value :"0";  
        var tipoSoporte = document.getElementById('inputTipoSoporte').value ? document.getElementById('inputTipoSoporte').value :"";  
        var albaran = document.getElementById('inputAlbaran').value ? document.getElementById('inputAlbaran').value :"0";  
        var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value :"";
        var precio = document.getElementById('inputPrecio').value ? document.getElementById('inputPrecio').value :"0";
        var activo = document.getElementById('inputActivo').checked; // mirar si guarda uno o guarda true
      
activo = String(activo);

        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://webserver.mobilitat.local/gestin/public/api/soportes/nueva';

        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: idInstalacion,
                    idTipoActuacion: idTipoActuacion,
                    idNumSerie: idNumSerie,
                    tipoSoporte: tipoSoporte,
                    albaran: albaran,
                    observaciones: observaciones,
                    fechaActuacion: fechaActuacion,
                    idUsuario: idUsuario,
                    precio: precio,
                    activo: activo
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

    }
    setTimeout(() => {
        rellenarTodosSoportes(); //CAMBIO DE NOMENCLATURA
    }, 1000);

}

function validarFormatoFechaSoportes(campo) { //CAMBIO DE NOMENCLATURA
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaSoportes(fecha) { //CAMBIO DE NOMENCLATURA
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

function existeFecha2Soportes(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}


// function rellenarTipoActuacion2Soportes(idActuacion) { //Llamada a la API según el dato obtenido del primer combo //CAMBIO DE NOMENCLATURA
//     var url = 'http://webserver.mobilitat.local/gestin/public/api/tipoactuacion'
//     fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(res => res.json())
//         .catch(error => console.error('Error:', error))
//         .then(response => {

//             var p2 = document.getElementById('dropTipoActuacion2' + idActuacion);

//             p2.innerHTML = '';

//             for (var i in response) {
//                 p2.innerHTML += `
//              <button class="dropdown-item" id="${idActuacion}" name="${response[i]['id']}" onclick="leerTipoActuacion2Soportes(this.value,this.name,this.id)" value="${response[i]['descripcion']}" >${response[i]['descripcion']}</button>
//              `
//             //  console.log("id:"+response[i]['id']+ " value:" + response[i]['descripcion']) ;
//             }
//         })
// }

// function rellenarTipoActuacionSoportes() { //Llamada a la API según el dato obtenido del primer combo //CAMBIO DE NOMENCLATURA
//     var url = 'http://webserver.mobilitat.local/gestin/public/api/tipoactuacion'
//     fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(res => res.json())
//         .catch(error => console.error('Error:', error))
//         .then(response => {
//             var p = document.getElementById('dropdownTipoActuacion');
//             p.innerHTML = '';
//             for (var i in response) {
//                 p.innerHTML += `
//              <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['id']}" onclick="leerTipoActuacionSoportes(this.value,this.name)" value="${response[i]['descripcion']}">${response[i]['descripcion']}</button> 
//              `
//             } //CAMBIO DE NOMENCLATURA
//         })
// }

// function leerTipoActuacionSoportes(descripcionTipoActuacion, idTipoActuacion) { //CAMBIO DE NOMENCLATURA
//     var p1 = document.getElementById('idTipoActuacion');
//     p1.value = idTipoActuacion;
//     var p2 = document.getElementById('inputTipoActuacion');
//     p2.value = descripcionTipoActuacion;
// }

// function leerTipoActuacion2Soportes(descripcionTipoActuacion, idTipoActuacion, idActuacion) { //CAMBIO DE NOMENCLATURA
//     var p1 = document.getElementById('inputTipoActuacionTar' + idActuacion);
//     p1.value = idTipoActuacion;
//     var p2 = document.getElementById('inputTipoActuacion2' + idActuacion);
//     p2.value = descripcionTipoActuacion;
// }

async function formSoportes(elemento) { //CAMBIO DE NOMENCLATURA
    var instalacion = document.getElementById("inputInstalacion");
    var inputElemento = document.getElementById("inputElemento");
    inputElemento.value=elemento;
    
    var tipo="";
    tipoActuacion.forEach(function(value,index){ //recorrer la matriz de la tabla en tablas.js
        //tipo += '<button class="dropdown-item" onclick="escribirTipoActuacionSoportes("'+ value +'")" >'+ value +'</button>';
        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" onclick="escribirTipoActuacionSoporte(this.value)" >'+ value +'</button>';
        
    });

    if (instalacion.value != "") {
        var f1 = document.getElementById("formIntroducir");
        f1.innerHTML = `
        
        <!-- Títulos Form Nuevo-->
        <div class="row ml-1">
            <div class="col-2 pl-0">
                F.Actuación
            </div>
            <div class="col-1 pl-0">
                <div class="dropdown" >
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Tipo Actu.
                        </button>
                        <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                        ` + tipo +`

                        </div>
                      
                </div>
            </div>
            <div class="col-2 pl-0">
            <div class="dropdown" >
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Tipo Soporte
                        </button>
                        <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Columna 0,8 m.')" >Columna 0,8 m.</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Columna 2 m.')" >Columna 2 m.</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Columna 4 m.')" >Columna 4 m.</button>
                              <div class="dropdown-divider"></div>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Báculo')" >Báculo</button>
                              <div class="dropdown-divider"></div>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Brazo Simple')" >Brazo Simple</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Brazo Doble')" >Brazo Doble</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Brazo Triple')" >Brazo Triple</button>
                              <div class="dropdown-divider"></div>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Alargadera 0.5 m.')" >Alargadera 0.5 m.</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Alargadera 1 m.')" >Alargadera 1 m.</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Alargadera 1.5 m.')" >Alargadera 1.5 m.</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Alargadera 2 m.')" >Alargadera 2 m.</button>
                              <button class="dropdown-item" onclick="escribirTipoSoporte('Alargadera Otros')" >Alargadera Otros</button>
                        </div>
                      
                    </div>
            </div>
            <div class="col-2 pl-0">
                Observaciones
            </div>
            <div class="col-1 pl-0">
              Albarán
            </div>
            <div class="col-1 pl-0">
                Num. Serie
            </div>
            <div class="col-1 pl-0">
                Precio
            </div>
            <div class="col-1 pl-0">
                Activo
            </div>
            </div>
            <!-- Fin Titulos -->
            <!-- Form Introducir Nuevo -->
            <div class="row mt-1 ml-1" id="formGuardar">
            <div class="col-2 pl-0">
                <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
            </div>
            <div class="col-1 pl-0">
                <input type="text" class="form-control mt-1" name="inputTipoActuacion" id="inputTipoActuacion">
            </div>
            <div class="col-2 pl-0">
                <input type="text" class="form-control mt-1" name="inputTipoSoporte" id="inputTipoSoporte">
            </div>
            <div class="col-2 pl-0">
                <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones">
            </div>
            <div class="col-1 pl-0">
                <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
            </div>
            <div class="col-1 pl-0">
                <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie">
            </div>
            <div class="col-1 pl-0">
            <input type="text" class="form-control mt-1" name="inputPrecio" id="inputPrecio">
            </div>
            <div class="col-1 pl-0">
                <input type="checkbox" class=" mt-3 ml-2" name="inputActivo" id="inputActivo">
                <div class="btn btn-primary ml-4" onclick="nuevaSoportes()"><i class="fas fa-save"></i></div>
            </div>
            </div>  
            <!-- Fin Form Introducir nuevo -->
        
        `
      //await rellenarTipoActuacionSoportes();//CAMBIO DE NOMENCLATURA

        // rellenar todos los registros 
      await rellenarTodosSoportes();//CAMBIO DE NOMENCLATURA
    }
}



function rellenarTodosSoportes() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://webserver.mobilitat.local/gestin/public/api/soportes/' + idInstalacion
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
                var tipo="";
                tipoActuacion.forEach(function(value,index){ //recorrer la matriz de la tabla en tablas.js
                    //tipo += '<button class="dropdown-item" onclick="escribirTipoActuacion2Soportes("'+ value +'","'+response[i]['id']+'")" >'+value+'</button>';
                    tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" name="'+ response[i]['id'] +'" onclick="escribirTipoActuacion2Soportes(this.value,this.name)" >'+ value +'</button>';
                });
                    p.innerHTML += `
                    <div class="row mt-1 ml-0" id="">
                    <div class="col-2 pl-0">
                      <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">
                      <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}"
                        placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                    </div>

                    <div class="col-1 mt-1 pl-0">
                        <div class="input-group">
                            <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipoActuacionTar${response[i]['id']}" value="${response[i]['idTipoActuacion']}">
                            <div class="input-group-append">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </button>
                                <div class="dropdown-menu">`+ tipo
                                +`
                                </div>
                            
                            </div>
                        </div>
                
                    </div>

                    <div class="col-2 mt-1 pl-0">
                            <div class="input-group">
                              <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipoSoporte${response[i]['id']}" value="${response[i]['tipoSoporte']}">
                              <div class="input-group-append">
                      
                                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu">

                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Columna 0,8 m.',${response[i]['id']})" >Columna 0,8 m.</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Columna 2 m.',${response[i]['id']})" >Columna 2 m.</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Columna 4 m.',${response[i]['id']})" >Columna 4 m.</button>
                                    <div class="dropdown-divider"></div>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Báculo',${response[i]['id']})" >Báculo</button>
                                    <div class="dropdown-divider"></div>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Brazo Simple',${response[i]['id']})" >Brazo Simple</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Brazo Doble',${response[i]['id']})" >Brazo Doble</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Brazo Triple',${response[i]['id']})" >Brazo Triple</button>
                                    <div class="dropdown-divider"></div>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Alargadera 0.5 m.',${response[i]['id']})" >Alargadera 0.5 m.</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Alargadera 1 m.',${response[i]['id']})" >Alargadera 1 m.</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Alargadera 1.5 m.',${response[i]['id']})" >Alargadera 1.5 m.</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Alargadera 2 m.',${response[i]['id']})" >Alargadera 2 m.</button>
                                    <button class="dropdown-item" onclick="escribirTipoSoporte2('Alargadera Otros',${response[i]['id']})" >Alargadera Otros</button>
                                </div>
                              </div>
                            </div>
                    </div>
                
                    <div class="col-2 pl-0">
                      <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"
                        value="${response[i]['observaciones']}">
                    </div>
                    <div class="col-1 pl-0">
                      <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}"
                        value="${response[i]['albaran']}">
                    </div>
                    <div class="col-1 pl-0">
                      <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"
                        value="${response[i]['idNumSerie']}">
                    </div>
                    <div class="col-1 pl-0">
                      <input type="text" class="form-control mt-1" name="" id="inputPrecioTar${response[i]['id']}"
                        value="${response[i]['precio']}">
                    </div>
                    <div class="col-1 pl-2">
                      <input type="checkbox" class=" mt-3 ml-1" name="" id="inputActivoTar${response[i]['id']}" ${activo}>
                      
                      <div class="btn btn-primary ml-3" id="${response[i]['id']}" onclick="editarSoportes(this.id)"><i
                          class="fas fa-pencil-alt"></i></div>
                      <div class="btn btn-danger ml-1" id="${response[i]['id']}" onclick="borrarSoportes(this.id)"><i
                          class="fas fa-trash-alt"></i></div>
                      
                      </div>
                    
                  
                  </div>
                 `

                }
            }
        })

        rellenarFooterSoportes();//CAMBIO DE NOMENCLATURA
}

function rellenarFooterSoportes(){//CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://webserver.mobilitat.local/gestin/public/api/soportes/activas/' + idInstalacion
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
                <span class="ml-1">Total de <b>Soportes</b> Activas: ${response[0]['c']}</span>
                `
            }
        })

}


function borrarSoportes(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://webserver.mobilitat.local/gestin/public/api/soportes/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
        rellenarTodosSoportes();//CAMBIO DE NOMENCLATURA
    }, 1000);
}

function editarSoportes(param) {//CAMBIO DE NOMENCLATURA
    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputTipoActuacionTar = document.getElementById('inputTipoActuacionTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
    var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
    var inputTipoSoporte = document.getElementById('inputTipoSoporte' + param).value;
    var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    var inputPrecioTar = document.getElementById('inputPrecioTar' + param).value;
    var inputActivoTar = document.getElementById('inputActivoTar' + param).checked;
    inputActivoTar = String(inputActivoTar);
    var idUsuario = document.getElementById('inputIdUsuario').value;




    //validar fecha correcta
    if (validarFormatoFechaSoportes(inputFechaActuacionTar)) {
        if (existeFechaSoportes(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }
    var url = 'http://webserver.mobilitat.local/gestin/public/api/soportes/modificar/' + param;

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
                activo: inputActivoTar,
                tipoSoporte: inputTipoSoporte
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodosSoportes(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}
function escribirTipoSoporte(param) {
    var p1=document.getElementById('inputTipoSoporte');
    p1.value=param;
}
function escribirTipoSoporte2(param,id) {
    var p1=document.getElementById('inputTipoSoporte'+id);
    p1.value=param;
}
function escribirTipoActuacion2Soportes(param,id) {
    var p1=document.getElementById('inputTipoActuacionTar'+id);
    p1.value=param;
}
function escribirTipoActuacionSoporte(param) {
    var p1=document.getElementById('inputTipoActuacion');
    p1.value=param;
}