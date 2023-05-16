$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


function nuevaResiduos() {
    var idInstalacion = 'RESIDUOS';
    var idTipoInstalacion = document.getElementById('inputTipoInstalacion').value;
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFechaResiduos(fechaActuacion)) {
            if (existeFechaResiduos(fechaActuacion)) {

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
            if(idTipoInstalacion=="COLUMNA"){
                idNumSerie="COLUMNA000"
            }else{
                
            alert("No se ha introducido el número de serie")
            return;}
        }



        var observaciones = document.getElementById('inputObservaciones2').value ? document.getElementById('inputObservaciones2').value : "";



        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.120/gestin/public/api/residuos/nueva';

        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: idInstalacion,
                    idTipoInstalacion: idTipoInstalacion,
                    idNumSerie: idNumSerie,
                    observaciones: observaciones,
                    fechaActuacion: fechaActuacion,
                    idUsuario: idUsuario
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

    }
    setTimeout(() => {
        rellenarTodosResiduos();
    }, 1000);

}

function validarFormatoFechaResiduos(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaResiduos(fecha) {
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

function existeFecha2Residuos(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}



function leerTipoInstalacion(descripcionTipoActuacion) {
 
    var p1 = document.getElementById('inputTipoInstalacion');
    p1.value = descripcionTipoActuacion;

}

function leerTipoInstalacionTar(descripcionTipoActuacion,param ) {
 
    var p1 = document.getElementById('inputTipoInstalacionTar'+ param);
    p1.value = descripcionTipoActuacion;

}


async function formResiduos(elemento) {

    //desactivarBotones();

    // var ac=document.getElementById("btnTarjetas");
    // ac.classList.add("active");

    var url = 'http://172.27.120.120/gestin/public/api/tipoinstalacion'
   var tipoInstalacion= await    fetch(url, {
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
               


                /*var p = document.getElementById('cabecera');
                p.innerHTML = '';
                p.innerHTML = `
                <h3><b>Instalaciones</b></h3>
                <span class="ml-1">Total de <b>Almacén</b> Instaladas: ${response[0]['c']}</span>
                `*/
                return(response);
            }
        })
    var tipoInst='';

    // for (i = 0; i < tipoInstalacion.length; i++) {
    //    console.log(tipoInstalacion[i]);
    //   tipoInst += '<button class="dropdown-item" type="submit" value="'+  tipoInstalacion[i].tipoInstalacion  +'" onclick="leerTipoInstalacion(this.value)" >'+ tipoInstalacion[i].tipoInstalacion  +'</button>';
    //} 

    //AÑADIMOS LOS ELEMENTOS ESPECÍFICOS DE CRUCE
        
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "CÁMARA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "CÁMARA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "CARGADOR ELÉCTRICO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "CARGADOR ELÉCTRICO"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "CENTRAL"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "CENTRAL"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "COLUMNA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "COLUMNA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "CONTROL DE ACCESOS"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "CONTROL DE ACCESOS"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "ESPIRA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "ESPIRA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "FOTO ROJO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "FOTO ROJO"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "NODO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "NODO"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "PANEL INFORMATIVO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "PANEL INFORMATIVO"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "RADAR"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "RADAR"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "SEÑAL LUMINOSA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "SEÑAL LUMINOSA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "PUNTO DE MEDIDA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "PUNTO DE MEDIDA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "LED"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "LED"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "TARJETA SALIDA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "TARJETA SALIDA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "TARJETA CPU"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "TARJETA CPU"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "TARJETA BUS/TREN"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "TARJETA BUS/TREN"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "SEÑAL OCULTA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "SEÑAL OCULTA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "DETECTOR"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "DETECTOR"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "MÓDULO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "MÓDULO"  +'</button>';
 
    
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
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoInstalacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tipo Inst.
                    </button>
                    <div class="dropdown-menu" id="dropdownTipoInstalacion" aria-labelledby="dropdownTipoInstalacion">
                    `+ 
                   tipoInst                   
                    +`
                    </div>
            
                </div>
        </div>

        <div class="col-3">
            Observaciones
        </div>
        <div class="col-1">
            Num. Serie
        </div>

        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1 ml-1" id="formGuardar">
        <div class="col-2">
            <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
        </div>
        <div class="col-2">
            <input type="text" class="form-control mt-1" name="inputTipoInstalacion" id="inputTipoInstalacion">
        </div>
        <div class="col-3">
            <input type="text" class="form-control mt-1" name="inputObservaciones2" id="inputObservaciones2">
        </div>

        <div class="col-1">
            <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie" onfocusout="comprobarNumSerieResiduos()">
        </div>
    
        <div class="col-1">
            <div class="btn btn-primary" onclick="nuevaResiduos()">Guardar</div>
        </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `
 

        // rellenar todos los registros 
        await rellenarTodosResiduos();
    }
}



async function rellenarTodosResiduos() {//Llamada a la API 
    var idInstalacion = document.getElementById('inputInstalacion').value;

    var tipoInst='';

    // for (i = 0; i < tipoInstalacion.length; i++) {
    //    console.log(tipoInstalacion[i]);
    //   tipoInst += '<button class="dropdown-item" type="submit" value="'+  tipoInstalacion[i].tipoInstalacion  +'" onclick="leerTipoInstalacion(this.value)" >'+ tipoInstalacion[i].tipoInstalacion  +'</button>';
    //} 

    //AÑADIMOS LOS ELEMENTOS ESPECÍFICOS DE CRUCE
        




    var url = 'http://172.27.120.120/gestin/public/api/residuos/' + idInstalacion
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
              //  console.log("residuos:"+response[i]['residuos'].value);
              //  console.log("residuos:"+response[i]['residuos'].value);

               tipoInst='';
                for (var i in response) {
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '" value="'+  "CÁMARA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CÁMARA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "CARGADOR ELÉCTRICO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CARGADOR ELÉCTRICO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "CENTRAL"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CENTRAL"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "COLUMNA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "COLUMNA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "CONTROL DE ACCESOS"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CONTROL DE ACCESOS"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "ESPIRA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "ESPIRA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "FOTO ROJO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "FOTO ROJO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "NODO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "NODO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "PANEL INFORMATIVO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "PANEL INFORMATIVO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "RADAR"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "RADAR"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "SEÑAL LUMINOSA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "SEÑAL LUMINOSA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "PUNTO DE MEDIDA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "PUNTO DE MEDIDA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "LED"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "LED"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "TARJETA SALIDA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "TARJETA SALIDA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "TARJETA CPU"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "TARJETA CPU"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "TARJETA BUS/TREN"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "TARJETA BUS/TREN"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "SEÑAL OCULTA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "SEÑAL OCULTA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "DETECTOR"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "DETECTOR"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "MÓDULO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "MÓDULO"  +'</button>';





                    p.innerHTML += `
                 <div class="row mt-1 ml-1" id="">
                 <div class="col-2">
                   <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                   <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                 </div>
                 <div class="col-2 mt-1" >
                    <div class="input-group">
                        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipoInstalacionTar${response[i]['id']}" value="${response[i]['idTipoInstalacion']}">
                        <div class="input-group-append">
                                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </button>
                            <div class="dropdown-menu">
                                `+ tipoInst +`
                            </div>
                        
                        </div>
                    </div>
                   
                 </div>
                 <div class="col-3">
                    <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                 </div>
                 <div class="col-1">
                    <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}">
                 </div>

                 <div class="col-1">
                    <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarResiduos(this.id)" title="Guardar edición"><i class="fas fa-pencil-alt"></i></div>
                    <div class="btn btn-danger" title="Eliminar registro" id="${response[i]['id']}" onclick="borrarResiduos(this.id)"><i class="fas fa-trash-alt"></i></div>
                 </div>
              </div>  

                 `

                }
            }
        })

   await rellenarFooterResiduos();
   await comprobarNumSerieResiduos2();


}

function rellenarFooterResiduos() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://172.27.120.120/gestin/public/api/residuos/instaladas/' + idInstalacion
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
                <span class="ml-1">Total de <b>Residuos</b> Instaladas: ${response[0]['c']}</span>
                `
            }
        })

}


function borrarResiduos(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/residuos/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
     rellenarTodosResiduos();
    }, 500);
}

function editarResiduos(param) {

 

    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputTipoInstalacionTar = document.getElementById('inputTipoInstalacionTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;

    
    if (document.getElementById('inputNumSerieTar' + param).value){
        var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    }else{
        alert("No se ha introducido el número de serie")
        return;
    }


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
    if (validarFormatoFechaResiduos(inputFechaActuacionTar)) {
        if (existeFechaResiduos(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }

    var url = 'http://172.27.120.120/gestin/public/api/residuos/modificar/' + param;

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: inputIdTar,
                idTipoInstalacion: inputTipoInstalacionTar,
                idNumSerie: inputNumSerieTar,
                observaciones: inputObservacionesTar,
                fechaActuacion: inputFechaActuacionTar,
                idUsuario: idUsuario,

            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodosResiduos();
    }, 500);
}


function comprobarNumSerieResiduos() {
    var idNumSerie = document.getElementById('inputNumSerie').value;
    console.log(idNumSerie);

    if (idNumSerie) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/residuos/' + idNumSerie;
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




 function comprobarNumSerieResiduos2() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
  
    if (idInstalacion) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/residuos';
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
                                     var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/residuos/' + idNumSerie;
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


function comprobarNumSerieResiduos3(id,idNumSerie) {
    
    if (idNumSerie) {

       // var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/' + idNumSerie;
        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/residuos/' + idNumSerie;
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



function insertarEnResiduos(param,fecha){
  
    var idInstalacion="RESIDUOS";
    var inputFechaActuacionTar = fecha;//document.getElementById('inputFechaActuacionTar' + param).value;
    var idTipoInstalacion =document.getElementById('inputElemento').value; //"CÁMARAS";
    var observaciones = document.getElementById('inputObservacionesTar' + param).value;
    var idNumSerie = document.getElementById('inputNumSerieTar' + param).value;
    var idUsuario = document.getElementById('inputIdUsuario').value;


    //validar fecha correcta
 


    var url = 'http://172.27.120.120/gestin/public/api/residuos/nueva';

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idInstalacion: idInstalacion,
                idTipoInstalacion: idTipoInstalacion,
                idNumSerie: idNumSerie,
                observaciones: observaciones,
                fechaActuacion: inputFechaActuacionTar,
                idUsuario: idUsuario
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodosCamTv();
    }, 500);

}