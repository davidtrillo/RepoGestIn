function nuevaAlargaderas() { //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var idTipoActuacion = document.getElementById('idTipoActuacion').value ? document.getElementById('idTipoActuacion').value :"1";
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFechaAlargaderas(fechaActuacion)) { //CAMBIO DE NOMENCLATURA
            if (existeFechaAlargaderas(fechaActuacion)) { //CAMBIO DE NOMENCLATURA

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
        var tipo = document.getElementById('inputTipoBrazo').value ? document.getElementById('inputTipoBrazo').value :"";  
        var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value :"";
        var precio = document.getElementById('inputPrecio').value ? document.getElementById('inputPrecio').value :"0";
        var activo = document.getElementById('inputActivo').checked; // mirar si guarda uno o guarda true
        
activo = String(activo);
console.log(tipo);






        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://webserver.mobilitat.local/gestin/public/api/alargaderas/nueva';

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
                    tipo: tipo,
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
        rellenarTodosAlargaderas(); //CAMBIO DE NOMENCLATURA
    }, 1000);

}

function validarFormatoFechaAlargaderas(campo) { //CAMBIO DE NOMENCLATURA
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaAlargaderas(fecha) { //CAMBIO DE NOMENCLATURA
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

function existeFecha2Alargaderas(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}


function rellenarTipoActuacion2Alargaderas(idActuacion) { //Llamada a la API según el dato obtenido del primer combo //CAMBIO DE NOMENCLATURA
    var url = 'http://webserver.mobilitat.local/gestin/public/api/tipoactuacion'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {

            var p2 = document.getElementById('dropTipoActuacion2' + idActuacion);

            p2.innerHTML = '';

            for (var i in response) {
                p2.innerHTML += `
             <button class="dropdown-item" type="submit" id="${idActuacion}" name="${response[i]['id']}" onclick="leerTipoActuacion2Alargaderas(this.value,this.name,this.id)" value="${response[i]['descripcion']}" >${response[i]['descripcion']}</button>
             `
            }
        })
}

function rellenarTipoActuacionAlargaderas() { //Llamada a la API según el dato obtenido del primer combo //CAMBIO DE NOMENCLATURA
    var url = 'http://webserver.mobilitat.local/gestin/public/api/tipoactuacion'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownTipoActuacion');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['id']}" onclick="leerTipoActuacionAlargaderas(this.value,this.name)" value="${response[i]['descripcion']}">${response[i]['descripcion']}</button> 
             `
            } //CAMBIO DE NOMENCLATURA
        })
}

function leerTipoActuacionAlargaderas(descripcionTipoActuacion, idTipoActuacion) { //CAMBIO DE NOMENCLATURA
    var p1 = document.getElementById('idTipoActuacion');
    p1.value = idTipoActuacion;
    var p2 = document.getElementById('inputTipoActuacion');
    p2.value = descripcionTipoActuacion;
}

function leerTipoActuacion2Alargaderas(descripcionTipoActuacion, idTipoActuacion, idActuacion) { //CAMBIO DE NOMENCLATURA
    var p1 = document.getElementById('inputTipoActuacionTar' + idActuacion);
    p1.value = idTipoActuacion;
    var p2 = document.getElementById('inputTipoActuacion2' + idActuacion);
    p2.value = descripcionTipoActuacion;
}

function escribirTipo(tipo) { //CAMBIO DE NOMENCLATURA
    var p1 = document.getElementById('inputTipoBrazo');
    p1.value = tipo;

}

function escribirTipo2(tipo,id) { //CAMBIO DE NOMENCLATURA
    var p1 = document.getElementById('inputTipoBrazoTar'+id);
    p1.value = tipo;

}

async function formAlargaderas(elemento) { //CAMBIO DE NOMENCLATURA
    var instalacion = document.getElementById("inputInstalacion");
    var inputElemento = document.getElementById("inputElemento");
    inputElemento.value=elemento;

    if (instalacion.value != "") {
        var f1 = document.getElementById("formIntroducir");
        f1.innerHTML = `
        
        <!-- Títulos Form Nuevo-->
        <div class="row ml-1">
        <div class="col-2 pl-1">
            F.Actuación
        </div>
        <div class="col-2 pl-1">
        <div class="dropdown" >
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tipo A.
                    </button>
                    <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                                <!-- Aquí se inyecta el código mediante JS -->
                    </div>
                    <input type="hidden"  value="1" id="idTipoActuacion">
                </div>
        </div>
        <div class="col-1 pl-1">
        <div class="dropdown" >
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoBrazo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tipo Alar.
                    </button>
                    <div class="dropdown-menu" id="dropdownTipoBrazo" aria-labelledby="dropdownTipoBrazo">
                        <button class="dropdown-item" type="button"  onclick="escribirTipo('0.5')">0.5</button>
                        <button class="dropdown-item" type="button"  onclick="escribirTipo('1')">1</button>
                        <button class="dropdown-item" type="button"  onclick="escribirTipo('1.5')">1.5</button>
                        <button class="dropdown-item" type="button"  onclick="escribirTipo('2')">2</button>
                        <button class="dropdown-item" type="button"  onclick="escribirTipo('OTROS')">OTROS</button>
                    </div>
                    <input type="hidden"  value="1" id="idTipoBrazo">
                </div>
        </div>
        <div class="col-2 pl-1">
            Observaciones
        </div>
        <div class="col-1 pl-1">
          Albarán
        </div>
        <div class="col-1 pl-1">
            Num. Serie
        </div>
        <div class="col-1 pl-1">
            Precio
        </div>
        <div class="col-1 pl-1">
            Activo
        </div>
        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1 ml-1" id="formGuardar">
        <div class="col-2  pl-1">
            <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
        </div>
        <div class="col-2 pl-1">
            <input type="text" class="form-control mt-1" name="inputTipoActuacion" id="inputTipoActuacion">
        </div>
        <div class="col-1 pl-1">
            <input type="text" class="form-control mt-1" name="inputTipoBrazo" id="inputTipoBrazo">
        </div>
        <div class="col-2 pl-1">
            <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones">
        </div>
        <div class="col-1 pl-1">
            <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
        </div>
        <div class="col-1 pl-1">
            <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie">
        </div>
        <div class="col-1 pl-1">
        <input type="text" class="form-control mt-1" name="inputPrecio" id="inputPrecio">
        </div>
        <div class="col-1 pl-1">
            <input type="checkbox" class=" mt-3 ml-3" name="inputActivo" id="inputActivo">
        </div>
        <div class="col-1 pl-1">
            <div class="btn btn-primary" onclick="nuevaAlargaderas()">Guardar</div>
        </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `
        await rellenarTipoActuacionAlargaderas();//CAMBIO DE NOMENCLATURA

        // rellenar todos los registros 
        await rellenarTodosAlargaderas();//CAMBIO DE NOMENCLATURA
    }
}



function rellenarTodosAlargaderas() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://webserver.mobilitat.local/gestin/public/api/alargaderas/' + idInstalacion
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
                 
                    p.innerHTML += `
                 <div class="row mt-1 ml-1" id="">
                 <div class="col-2  pl-1">
                   <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                   <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                 </div>
                 <div class="col-2 mt-1  pl-1" >
                        <div class="input-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" name="btnTipoActuacion${response[i]['id']}" value="${response[i]['id']}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick="rellenarTipoActuacion2Alargaderas(this.value)">
                                    Tipo A.
                            </button>
                            <div class="dropdown-menu" id="dropTipoActuacion2${response[i]['id']}">
                               
                            </div>
                            <input type="text" class="form-control" name="" id="inputTipoActuacion2${response[i]['id']}"  value="${response[i]['descripcion']}">
                            <input type="hidden" class="form-control" name="" id="inputTipoActuacionTar${response[i]['id']}"  value="${response[i]['idTipoActuacion']}">
                        </div>
                   
                 </div>
                 <div class="col-1 pl-1">
                    <div class="input-group" >
                           <button type="button" class="btn btn-secondary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                              T.
                          </button>
                        <div class="dropdown-menu" id="dropdownTipoBrazo2" aria-labelledby="dropdownTipoBrazo">
                            <button class="dropdown-item" type="button" id="btnTipoBrazoSimple" onclick="escribirTipo2('0.5',${response[i]['id']})">0.5</button>
                            <button class="dropdown-item" type="button" id="btnTipoBrazoDoble" onclick="escribirTipo2('1',${response[i]['id']})">1</button>
                            <button class="dropdown-item" type="button" id="btnTipoBrazoDoble" onclick="escribirTipo2('1.5',${response[i]['id']})">1.5</button>
                            <button class="dropdown-item" type="button" id="btnTipoBrazoDoble" onclick="escribirTipo2('2',${response[i]['id']})">2</button>
                            <button class="dropdown-item" type="button" id="btnTipoBrazoDoble" onclick="escribirTipo2('OTROS',${response[i]['id']})">OTROS</button>
                        </div>
                        <input type="text" class="form-control mt-1" name="" id="inputTipoBrazoTar${response[i]['id']}"  value="${response[i]['tipo']}" >
                        <input type="hidden"  value="1" id="idTipoBrazo">
                    </div>
                 </div>
                 <div class="col-2 pl-1">
                    <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                 </div>
                 <div class="col-1 pl-1">
                    <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                 </div>
                 <div class="col-1 pl-1">
                    <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}">
                 </div>
                 <div class="col-1 pl-1">
                 <input type="text" class="form-control mt-1" name="" id="inputPrecioTar${response[i]['id']}"  value="${response[i]['precio']}">
                 </div>
                 <div class="col-1 pl-1">
                   <input type="checkbox" class=" mt-3 ml-3" name="" id="inputActivoTar${response[i]['id']}"  ${activo}>
                 </div>
                 <div class="col-1 pl-1">
                    <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarAlargaderas(this.id)"><i class="fas fa-pencil-alt"></i></div>
                    <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarAlargaderas(this.id)"><i class="fas fa-trash-alt"></i></div>
                 </div>
              </div>  
                 
                 `

                }
            }
        })

        rellenarFooterAlargaderas();//CAMBIO DE NOMENCLATURA
}

function rellenarFooterAlargaderas(){//CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://webserver.mobilitat.local/gestin/public/api/alargaderas/activas/' + idInstalacion
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
                <span class="ml-1">Total de <b>Alargaderas</b> Activas: ${response[0]['c']}</span>
                `
            }
        })

}


function borrarAlargaderas(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://webserver.mobilitat.local/gestin/public/api/alargaderas/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
        rellenarTodosAlargaderas();//CAMBIO DE NOMENCLATURA
    }, 1000);
}

function editarAlargaderas(param) {//CAMBIO DE NOMENCLATURA
    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputTipoActuacionTar = document.getElementById('inputTipoActuacionTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
    var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
    var inputTipoBrazoTar = document.getElementById('inputTipoBrazoTar' + param).value;
    var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    var inputPrecioTar = document.getElementById('inputPrecioTar' + param).value;
    var inputActivoTar = document.getElementById('inputActivoTar' + param).checked;
    inputActivoTar = String(inputActivoTar);
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
    if (validarFormatoFechaAlargaderas(inputFechaActuacionTar)) {
        if (existeFechaAlargaderas(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }
    var url = 'http://webserver.mobilitat.local/gestin/public/api/alargaderas/modificar/' + param;

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
                tipo:inputTipoBrazoTar,
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
        rellenarTodosAlargaderas(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}