document.onload = rellenarCruceLed();
document.onload = rellenarCruceLed2();
document.onload = rellenarLed();

function rellenarCruceLed() { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.111/gestin/public/api/cruces'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownCruce');
            p.innerHTML = '';

            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceLed(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })
}
function rellenarCruceLed2(id) { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.111/gestin/public/api/cruces'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            
            var p = document.getElementById('dropdownCruce2'+id);
            if (id!=null){
                p.innerHTML = '';

                for (var i in response) {
                    p.innerHTML += `
                <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceLed2(this.value,${id})" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                `
                }
            }
        })
}

function leerCruceLed(id) {
    var p1 = document.getElementById('inputIdCruce');
    p1.value = id;
}

function leerCruceLed2(id,value) {
    var p1 = document.getElementById('inputIdCruceTar'+value);
    p1.value = id;
}

function escribirTipo(id) {
    var p1 = document.getElementById('inputTipo');
    p1.value = id;
}

function escribirTipo2(value,id) {
    var p1 = document.getElementById('inputTipoTar'+id);
    p1.value = value;
}
function escribirColor(id) {
    var p1 = document.getElementById('inputColor');
    p1.value = id;
}
function escribirColor2(value,id) {
    var p1 = document.getElementById('inputColorTar'+id);
    p1.value = value;
}



function nuevaLed() { //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputIdCruce').value;
    var color = document.getElementById('inputColor').value ? document.getElementById('inputColor').value :"";
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFechaLed(fechaActuacion)) { //CAMBIO DE NOMENCLATURA
            if (existeFechaLed(fechaActuacion)) { //CAMBIO DE NOMENCLATURA

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
        var tipo = document.getElementById('inputTipo').value ? document.getElementById('inputTipo').value :"";  
        var grupo = document.getElementById('inputGrupo').value ? document.getElementById('inputGrupo').value :"";  
        var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value :"";
        var activo = document.getElementById('inputActivo').checked;

        
activo = String(activo);

        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.111/gestin/public/api/led/nueva';

        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: idInstalacion,
                    color: color,
                    idNumSerie: idNumSerie,
                    albaran: albaran,
                    observaciones: observaciones,
                    fechaActuacion: fechaActuacion,
                    idUsuario: idUsuario,
                    tipo: tipo,
                    grupo: grupo,
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
        rellenarLed(); //CAMBIO DE NOMENCLATURA
    }, 1000);

}

function validarFormatoFechaLed(campo) { //CAMBIO DE NOMENCLATURA
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaLed(fecha) { //CAMBIO DE NOMENCLATURA
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

function existeFecha2Led(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}


function rellenarLed() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputIdCruce').value;
    var url = 'http://172.27.120.111/gestin/public/api/led' 
    
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
                    <div class="row mt-1" id="">
                      
                    <div class="col-1 mt-1" >
                            <div class="input-group">
                                <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputIdCruceTar${response[i]['id']}" value="${response[i]['idInstalacion']}">
                                <div class="input-group-append">

                                        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>

                                        <div class="dropdown-menu dp2" id="dropdownCruce2${response[i]['id']}">

                                        </div>
                                </div>
                            </div>
                    </div>


                    <div class="col-2">
                        <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                        <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                    </div>

                    <div class="col-2 mt-1" >
                        <div class="input-group">
                            <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipoTar${response[i]['id']}" value="${response[i]['tipo']}">
                            <div class="input-group-append">

                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>

                                    <div class="dropdown-menu">
                                        <button class="dropdown-item" onclick="escribirTipo2('100 mm',${response[i]['id']})" >100 mm</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200 mm',${response[i]['id']})" >200 mm</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200 mm Bici',${response[i]['id']})" >200 mm Bici</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('300 mm',${response[i]['id']})" >300 mm</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200x200',${response[i]['id']})" >200x200</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici',${response[i]['id']})" >200x200 Bici</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici/Peatón',${response[i]['id']})" >200x200 Bici/Peatón</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-1 mt-1" >


                                <div class="input-group">
                                    <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputColorTar${response[i]['id']}" value="${response[i]['color']}">
                                    <div class="input-group-append">

                                            <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>

                                            <div class="dropdown-menu">
                                                <button class="dropdown-item" onclick="escribirColor2('Rojo',${response[i]['id']})" >Rojo</button>
                                                <button class="dropdown-item" onclick="escribirColor2('Ambar',${response[i]['id']})" >Ambar</button>
                                                <button class="dropdown-item" onclick="escribirColor2('Verde',${response[i]['id']})" >Verde</button>
                                            </div>
                                    </div>
                                </div>
                    </div>
                    <div class="col-1">
                       <input type="text" class="form-control mt-1" name="" id="inputGrupoTar${response[i]['id']}"  value="${response[i]['grupo']}">
                    </div>
                    <div class="col-1">
                       <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}" >
                    </div>
                    <div class="col-1">
                       <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                    </div>
                    <div class="col-2">
                        <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                    </div>
                    <div class="col-1">
                      <input type="checkbox" class=" mt-3 ml-0" name="" id="inputActivoTar${response[i]['id']}"  ${activo}>
                      <div class="btn btn-primary ml-3" id="${response[i]['id']}" onclick="editarLed(this.id)"><i class="fas fa-pencil-alt"></i></div>
                      <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
                    </div>

                    <div class="col-1">
                    </div>

          </div>  
         
                 `

                 rellenarCruceLed2(response[i]['id']);
                 
                }
            }
        })
        
        comprobarNumSerieLed2();
}


function borrarLed(id) {

        var url = 'http://172.27.120.111/gestin/public/api/led/borrar/'+id;
        fetch(url, {
                method: 'DELETE',
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
                alert("Registro Borrado con éxito")
               }
            })
    
            rellenarLed();
}
function editarLed(param) {//CAMBIO DE NOMENCLATURA
    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputColorTar = document.getElementById('inputColorTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
    var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
    var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    var inputGrupoTar = document.getElementById('inputGrupoTar' + param).value;
    var inputTipoTar = document.getElementById('inputTipoTar' + param).value;
    var inputActivoTar = document.getElementById('inputActivoTar' + param).checked;
    inputActivoTar = String(inputActivoTar);
    var idUsuario = document.getElementById('inputIdUsuario').value;

    // console.log(inputIdTar);
    // console.log(inputFechaActuacionTar);
    // console.log(inputColorTar);
    // console.log(inputObservacionesTar);
    // console.log(inputNumSerieTar);
    // console.log(inputGrupoTar);
    // console.log(inputActivoTar);
    // console.log(idUsuario);


    //validar fecha correcta
    if (validarFormatoFechaLed(inputFechaActuacionTar)) {
        if (existeFechaLed(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }
    var url = 'http://172.27.120.111/gestin/public/api/led/modificar/' + param;

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: inputIdTar,
                color: inputColorTar,
                idNumSerie: inputNumSerieTar,
                albaran:inputAlbaranTar,
                observaciones: inputObservacionesTar,
                fechaActuacion: inputFechaActuacionTar,
                idUsuario: idUsuario,
                grupo: inputGrupoTar,
                tipo: inputTipoTar,
                activo: inputActivoTar
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarLed(); //CAMBIO DE NOMENCLATURA
    }, 500);
}

function comprobarNumSerieLed() {
    var idNumSerie = document.getElementById('inputNumSerie').value;

    if (idNumSerie) {

        var url = 'http://172.27.120.111/gestin/public/api/numserierepetidos/led/' + idNumSerie;
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

function comprobarNumSerieLed4(id,value) {
    var idNumSerie = document.getElementById('inputNumSerieTar'+id).value;

    if (idNumSerie) {

        var url = 'http://172.27.120.111/gestin/public/api/numserierepetidos/led/' + idNumSerie;
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log(idNumSerie+" "+response.length  );
                if ((response.length > 1)) {

                    var res = "Número de Serie repetido en: ";

                    for (i in response) {
                        res += "\n Cruce: " + response[i]['idInstalacion'];
                    }
                   // alert(res);
                    var clase = document.getElementById('inputNumSerieTar'+id);
                    clase.classList.add("bg-danger");
                } else {
                    var clase = document.getElementById('inputNumSerieTar'+id);
                    clase.classList.remove("bg-danger");
                }
            })
    }
}


function comprobarNumSerieLed2() {
  
        var url = 'http://172.27.120.111/gestin/public/api/numserierepetidos/led';
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
                        
                        console.log(response[i]['id']);
                            var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                            if (clase) {
                                comprobarNumSerieLed3(response[i]['id'],clase.value);         
                                clase.classList.add("bg-danger");
                            }
                      
                        else {
                            var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                            if (clase) {
                                clase.classList.remove("bg-danger");
                            }
                        }
                    }

                } 
            })
}


function comprobarNumSerieLed3(id,idNumSerie) {
    
    if (idNumSerie) {

       // var url = 'http://172.27.120.111/gestin/public/api/numserierepetidos/' + idNumSerie;
        var url = 'http://172.27.120.111/gestin/public/api/numserierepetidos/led/' + idNumSerie;
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