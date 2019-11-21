function nuevaLed() { //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
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
        var almacen = document.getElementById('inputAlmacen').checked;

        
        activo = String(activo);
        almacen = String(almacen);

        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://webserver.mobilitat.local/gestin/public/api/led/nueva';

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
                    activo: activo,
                    almacen:almacen
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

    }
    setTimeout(() => {
        rellenarTodosLed(); //CAMBIO DE NOMENCLATURA
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




 function formLed(elemento) { //CAMBIO DE NOMENCLATURA
    var instalacion = document.getElementById("inputInstalacion");

    //desactivarBotones();
   // var ac=document.getElementById("btnLed");
    //ac.classList.add("active");
    var inputElemento = document.getElementById("inputElemento");
    inputElemento.value=elemento;

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
              <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tipo
              </button>
                <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                    <button class="dropdown-item" onclick="escribirTipo('100 mm')" >100 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200 mm')" >200 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200 mm Bici')" >200 mm Bici</button>
                    <button class="dropdown-item" onclick="escribirTipo('300 mm')" >300 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200')" >200x200</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200 Bici')" >200x200 Bici</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200 Bici/Peatón')" >200x200 Bici/Peatón</button>
                
                </div>
            </div>
        </div>
        <div class="col-1">
            <div class="dropdown" >
              <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Color
              </button>
                <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                    <button class="dropdown-item" onclick="escribirColor('Rojo')" >Rojo</button>
                    <button class="dropdown-item" onclick="escribirColor('Ambar')" >Ambar</button>
                    <button class="dropdown-item" onclick="escribirColor('Verde')" >Verde</button>
                    <button class="dropdown-item" onclick="escribirColor('Blanco')" >Blanco</button>
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
                  Observaciones
              </div>
              <div class="col-1">
              <span>Act.</span>  <span class="ml-2">Almac.</span> 
              </div>
        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1 ml-1" id="formGuardar">
              <div class="col-2">
                  <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
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
                  <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie" onfocusout="comprobarNumSerieLed()">
              </div>
              <div class="col-1">
                  <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
              </div>
              <div class="col-2">
                  <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones">
              </div>
              <div class="col-1">
                  <input type="checkbox" class="mt-3 ml-3 name="inputActivo" id="inputActivo">
                  <input type="checkbox" class="mt-3 ml-3" name="inputAlmacen" id="inputAlmacen">
              </div>
              <div class="col-1">
                  <div class="btn btn-primary" onclick="nuevaLed()">Guardar</div>
              </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `
      
        // rellenar todos los registros 
        rellenarTodosLed();//CAMBIO DE NOMENCLATURA
    }
}

function escribirTipo(param) {
    var p1=document.getElementById("inputTipo");    
    p1.value=param;
}

function escribirTipo2(param,id) {
    var p1=document.getElementById("inputTipoTar"+id);    
    p1.value=param;
}

function escribirColor(param) {
    var p1=document.getElementById("inputColor");    
    p1.value=param;
}

function escribirColor2(param,id) {
    var p1=document.getElementById("inputColorTar"+id);    
    p1.value=param;
}

async function rellenarTodosLed() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;

    var url = 'http://webserver.mobilitat.local/gestin/public/api/led/' + idInstalacion
     
    
   await fetch(url, {
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
            
                    if (response[i]['almacen'] == "true") {
                        var almacen = "checked";
                    } else {
                        var almacen = "";
                    }
                    
                    p.innerHTML += `
                 <div class="row mt-1 ml-1" id="">
                        
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
                           <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}" onfocusout="comprobarNumSerieLed()">
                        </div>
                        <div class="col-1">
                           <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                        </div>
                        <div class="col-2">
                            <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                        </div>
                        <div class="col-1">
                          <input type="checkbox" class=" mt-3 ml-3" name="" id="inputActivoTar${response[i]['id']}"  ${activo}>
                          <input type="checkbox" class="mt-3 ml-3 name="" id="inputAlmacenTar${response[i]['id']}"  ${almacen}>
                        </div>

                        <div class="col-1">
                           <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarLed(this.id)"><i class="fas fa-pencil-alt"></i></div>
                           <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
                        </div>

              </div>  
                 
                 `

                }
            }
        })
      await  comprobarNumSerieLed2();
       await  rellenarFooterLed();//CAMBIO DE NOMENCLATURA
}

function rellenarFooterLed(){//CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://webserver.mobilitat.local/gestin/public/api/ledi/activas/1' //+ idInstalacion
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response == "No se han encontrado resultados activos") {
                alert(response);

            } else {
                var p = document.getElementById('cabecera');
                p.innerHTML = '';
                p.innerHTML=`
                <h3><b>Instalaciones</b></h3>
                <span class="ml-1">Total de <b>Señales Leds</b> Activos: ${response[0]['c']}</span>
                `
            }
        })

}


function borrarLed(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://webserver.mobilitat.local/gestin/public/api/led/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
        rellenarTodosLed();//CAMBIO DE NOMENCLATURA
    }, 1000);
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
    var inputAlmacenTar = document.getElementById('inputAlmacenTar' + param).checked;
    inputActivoTar = String(inputActivoTar);
    inputAlmacenTar = String(inputAlmacenTar);
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
    var url = 'http://webserver.mobilitat.local/gestin/public/api/led/modificar/' + param;

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
                activo: inputActivoTar,
                almacen:inputAlmacenTar
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodosLed(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}

function comprobarNumSerieLed() {
    var idNumSerie = document.getElementById('inputNumSerie').value;

    if (idNumSerie) {

        var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/led/' + idNumSerie;
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




function comprobarNumSerieLed2() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
  
    if (idInstalacion) {

        var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/led';
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
                                comprobarNumSerieLed3(response[i]['id'],response[i]['idNumSerie']);
                              
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


function comprobarNumSerieLed3(id,idNumSerie) {
    
    if (idNumSerie) {

       // var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/' + idNumSerie;
        var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/led/' + idNumSerie;
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