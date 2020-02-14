function nueva12_100() { //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var idTipoActuacion = document.getElementById('inputTipoActuacion').value;
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFecha12_100(fechaActuacion)) { //CAMBIO DE NOMENCLATURA
            if (existeFecha12_100(fechaActuacion)) { //CAMBIO DE NOMENCLATURA

            } else {
                alert("La fecha introducida no existe.");
                return;
            }
        } else {
            alert("El formato de la fecha es incorrecto.");

            return;
        }
        var idNumSerie = document.getElementById('inputNumSerie').value ? document.getElementById('inputNumSerie').value :"0";  
        var albaran = document.getElementById('inputAlbaran').value ? document.getElementById('inputAlbaran').value :"0";  
        var nid = document.getElementById('inputNID').value ? document.getElementById('inputNID').value :"0";  
        var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value :"";
        var precio = document.getElementById('inputPrecio').value ? document.getElementById('inputPrecio').value :"0";
        var activo = document.getElementById('inputActivo').checked; // mirar si guarda uno o guarda true
        
activo = String(activo);

        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://webserver.mobilitat.local/gestin/public/api/12_100/nueva';

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
                    nid: nid,
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
      rellenarTodos12_100(); //CAMBIO DE NOMENCLATURA
    }, 1000);

}

function validarFormatoFecha12_100(campo) { //CAMBIO DE NOMENCLATURA
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFecha12_100(fecha) { //CAMBIO DE NOMENCLATURA
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

function existeFecha212_100(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}


// function rellenarTipoActuacion212_100(idActuacion) { //Llamada a la API según el dato obtenido del primer combo //CAMBIO DE NOMENCLATURA
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
//              <button class="dropdown-item" type="submit" id="${idActuacion}" name="${response[i]['id']}" onclick="leerTipoActuacion212_100(this.value,this.name,this.id)" value="${response[i]['descripcion']}" >${response[i]['descripcion']}</button>
//              `
//             }
//         })
// }

// function rellenarTipoActuacion12_100() { //Llamada a la API según el dato obtenido del primer combo //CAMBIO DE NOMENCLATURA
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
//              <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['id']}" onclick="leerTipoActuacion12_100(this.value,this.name)" value="${response[i]['descripcion']}">${response[i]['descripcion']}</button> 
//              `
//             } //CAMBIO DE NOMENCLATURA
//         })
// }

function rellenarNID12_100() { //NID


    var cr=document.getElementById("inputInstalacion");
    
    var url = 'http://webserver.mobilitat.local/gestin/public/api/nid/'+cr.value;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownNID');
            p.innerHTML = '';
            for (var i in response) {
                var str=response[i]['nid'];
                //console.log(str+"-"+str.substring(3,5));
                if (str.substring(9,14)=='12100'){// CAMBIAR TIPO DE CARCASA
                p.innerHTML += `
                    <button class="dropdown-item" type="submit" id="dropBtnNID${[i]}" name="${response[i]['nid']}" onclick="leerNID12_100(this.name)">${response[i]['nid']}</button> 
                    `
                }
            }
        })
}

function leerNID12_100(NID) { //NID
    var p1 = document.getElementById('inputNID');
    p1.value = NID;
}

function escribirTipoActuacion12_100(descripcionTipoActuacion, idTipoActuacion) { //CAMBIO DE NOMENCLATURA

    var p2 = document.getElementById('inputTipoActuacion');
    p2.value = descripcionTipoActuacion;
}


function leerTipoActuacion212_100(descripcionTipoActuacion, idTipoActuacion, idActuacion) { //CAMBIO DE NOMENCLATURA
    var p2 = document.getElementById('inputTipoActuacion2' + idActuacion);
    p2.value = descripcionTipoActuacion;
}

function rellenarTipoActuacion212_100(descripcionTipoActuacion, idActuacion) { //CAMBIO DE NOMENCLATURA

    var p2 = document.getElementById('inputTipoActuacionTar' + idActuacion);
    p2.value = descripcionTipoActuacion;
}

async function form12_100(elemento) { //CAMBIO DE NOMENCLATURA
    var instalacion = document.getElementById("inputInstalacion");
    var inputElemento = document.getElementById("inputElemento");
    inputElemento.value=elemento;
    
    var tipo="";
    tipoActuacion.forEach(function(value,index){ //recorrer la matriz de la tabla en tablas.js
        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" onclick="escribirTipoActuacion12_100(this.value)" >'+ value +'</button>';
         
    });

    if (instalacion.value != "") {
        var f1 = document.getElementById("formIntroducir");
        f1.innerHTML = `
        
        <!-- Títulos Form Nuevo-->
        <div class="row mt-1 pl-1">

            <div class="col-1 pl-1">
                <div class="dropdown" >
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="btnNID" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        NID
                    </button>
                    <div class="dropdown-menu" id="dropdownNID" aria-labelledby="dropdownNID">
                           
                    </div>
     
                </div>
            </div>

            <div class="col-2 pl-1 mt-3">
                F.Actuación
            </div>

            <div class="col-2 pl-1">
                    <div class="dropdown" >
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Tipo A.
                        </button>
                        <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                        `+ tipo +`
                        </div>
 
                    </div>
            </div>

            <div class="col-2 pl-1  mt-3">
                Observaciones
            </div>
            <div class="col-1 pl-1  mt-3">
            Albarán
            </div>
            <div class="col-1 pl-1  mt-3">
                Num. Serie
            </div>
            <div class="col-1 pl-1  mt-3">
                Precio
            </div>
            <div class="col-1 pl-1  mt-3">
                Activo
            </div>
        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1 pl-1" id="formGuardar">
                <div class="col-1 pl-1">
                    <input type="text" class="form-control mt-1" name="inputNID" id="inputNID">
                </div>
                <div class="col-2 pl-1">
                    <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
                </div>
                <div class="col-2 pl-1">
                    <input type="text" class="form-control mt-1" name="inputTipoActuacion" id="inputTipoActuacion">
                </div>
                <div class="col-2 pl-1">
                    <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones">
                </div>
                <div class="col-1 pl-1">
                    <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
                </div>
                <div class="col-1 pl-1">
                    <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie" onfocusout="comprobarNumSerie12_100()">
                </div>
                <div class="col-1 pl-1">
                <input type="text" class="form-control mt-1" name="inputPrecio" id="inputPrecio">
                </div>
                <div class="col-1 pl-1">
                    <input type="checkbox" class="mt-3 ml-3" name="inputActivo" id="inputActivo">
                </div>
                <div class="col-1 pl-1">
                <div class="btn btn-primary mt-0 ml-3" onclick="nueva12_100()"><i class="fas fa-save"></i></div>
            </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `
    // await rellenarTipoActuacion12_100();
     await rellenarNID12_100();//NID
     await rellenarTodos12_100();//rellenar todos
    }
}



function rellenarTodos12_100() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://webserver.mobilitat.local/gestin/public/api/12_100/' + idInstalacion
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
            
                        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" name="'+ response[i]['id'] +'" onclick="rellenarTipoActuacion212_100(this.value,this.name)" >'+ value +'</button>';
                        
                    });
                 
                    p.innerHTML += `
             <div class="row ml-0 pl-0" id="">
                 <div class="col-1 pl-0">
                 <input type="text" class="form-control mt-1" name="" id="inputNIDTar${response[i]['id']}"  value="${response[i]['nid']}">
              
                 </div>
                 <div class="col-2 pl-0">
                   <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                   <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                 </div>
                 <div class="col-2 mt-1 pl-0" >
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
                 <div class="col-2 pl-0">
                    <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                 </div>
                 <div class="col-1 pl-0">
                    <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                 </div>
                 <div class="col-1 pl-0">
                    <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}">
                 </div>
                 <div class="col-1 pl-0">
                 <input type="text" class="form-control mt-1" name="" id="inputPrecioTar${response[i]['id']}"  value="${response[i]['precio']}">
                 </div>
                 <div class="col-1 pl-0">
                   <input type="checkbox" class=" mt-3 ml-3" name="" id="inputActivoTar${response[i]['id']}"  ${activo}>
                 </div>
                 <div class="col-1 pl-0">
                    <div class="btn btn-primary" id="${response[i]['id']}" onclick="editar12_100(this.id)"><i class="fas fa-pencil-alt"></i></div>
                    <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrar12_100(this.id)"><i class="fas fa-trash-alt"></i></div>
                 </div>
                 
              </div>  
                 
                 `

                }
            }
        })

        rellenarFooter12_100();//CAMBIO DE NOMENCLATURA
        comprobarNumSerie12_1002();
}

function rellenarFooter12_100(){//CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://webserver.mobilitat.local/gestin/public/api/12_100/activas/' + idInstalacion
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
                <span class="ml-1">Total de <b>12_100</b> Activos: ${response[0]['c']}</span>
                `
            }
        })

}


function borrar12_100(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://webserver.mobilitat.local/gestin/public/api/12_100/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
        rellenarTodos12_100();//CAMBIO DE NOMENCLATURA
    }, 1000);
}

function editar12_100(param) {//CAMBIO DE NOMENCLATURA
    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputTipoActuacionTar = document.getElementById('inputTipoActuacionTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
    var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
    var inputNIDTar = document.getElementById('inputNIDTar' + param).value;
    var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    var inputPrecioTar = document.getElementById('inputPrecioTar' + param).value;
    var inputActivoTar = document.getElementById('inputActivoTar' + param).checked;
    inputActivoTar = String(inputActivoTar);
    var idUsuario = document.getElementById('inputIdUsuario').value;


    //validar fecha correcta
    if (validarFormatoFecha12_100(inputFechaActuacionTar)) {
        if (existeFecha12_100(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }
    var url = 'http://webserver.mobilitat.local/gestin/public/api/12_100/modificar/' + param;

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
                nid:inputNIDTar,
                observaciones: inputObservacionesTar,
                fechaActuacion: inputFechaActuacionTar,
                idUsuario: idUsuario,
                precio: inputPrecioTar,
                activo: inputActivoTar
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodos12_100(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}

function comprobarNumSerie12_100() {
    var idNumSerie = document.getElementById('inputNumSerie').value;

    if (idNumSerie) {

        var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/12_100/' + idNumSerie;
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




function comprobarNumSerie12_1002() {
    var idInstalacion = document.getElementById('inputInstalacion').value;

    if (idInstalacion) {

        var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/12_100';
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
                                comprobarNumSerie12_1003(response[i]['id'],response[i]['idNumSerie']);
                              
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


function comprobarNumSerie12_1003(id,idNumSerie) {

    if (idNumSerie) {

       // var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/' + idNumSerie;
        var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/12_100/' + idNumSerie;
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