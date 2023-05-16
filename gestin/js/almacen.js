$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


function nuevaAlmacen() {
    var idInstalacion = "ALMACÉN";
    var idTipoInstalacion = document.getElementById('inputTipoInstalacion').value;
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;

    if (idInstalacion.value != "") {

        //validar fecha correcta
        if (validarFormatoFechaAlmacen(fechaActuacion)) {
            if (existeFechaAlmacen(fechaActuacion)) {

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
        var url = 'http://172.27.120.120/gestin/public/api/almacen/nueva';

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
        rellenarTodosAlmacen();
    }, 1000);

}

function validarFormatoFechaAlmacen(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaAlmacen(fecha) {
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

function existeFecha2Almacen(fecha) {
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


async function formAlmacen(elemento) {

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
        //tipoInst += '<button class="dropdown-item" type="submit" value="'+  "ESPIRA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "ESPIRA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "FOTO ROJO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "FOTO ROJO"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "NODO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "NODO"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "PANEL INFORMATIVO"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "PANEL INFORMATIVO"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "RADAR"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "RADAR"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "SEÑAL LUMINOSA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "SEÑAL LUMINOSA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "PUNTO DE MEDIDA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "PUNTO DE MEDIDA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "LED"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "LED"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "TARJETAS SALIDA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "TARJETAS SALIDA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "TARJETAS CPU"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "TARJETAS CPU"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "TARJETAS F.A."  +'" onclick="leerTipoInstalacion(this.value)" >'+ "TARJETAS F.A."  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "BUS/TREN"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "BUS/TREN"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "SEÑAL OCULTA"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "SEÑAL OCULTA"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "DETECTOR"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "DETECTOR"  +'</button>';
        tipoInst += '<button class="dropdown-item" type="submit" value="'+  "MÓDULOS"  +'" onclick="leerTipoInstalacion(this.value)" >'+ "MÓDULOS"  +'</button>';
 
    
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
            <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie" onfocusout="comprobarNumSerieAlmacen()">
        </div>
    
        <div class="col-1">
            <div class="btn btn-primary" onclick="nuevaAlmacen()">Guardar</div>
        </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `
 

        // rellenar todos los registros 
        await rellenarTodosAlmacen();
    }
}



async function rellenarTodosAlmacen() {//Llamada a la API 
    var idInstalacion = document.getElementById('inputInstalacion').value;

    var tipoInst='';

    // for (i = 0; i < tipoInstalacion.length; i++) {
    //    console.log(tipoInstalacion[i]);
    //   tipoInst += '<button class="dropdown-item" type="submit" value="'+  tipoInstalacion[i].tipoInstalacion  +'" onclick="leerTipoInstalacion(this.value)" >'+ tipoInstalacion[i].tipoInstalacion  +'</button>';
    //} 

    //AÑADIMOS LOS ELEMENTOS ESPECÍFICOS DE CRUCE
        




    var url = 'http://172.27.120.120/gestin/public/api/almacen/' + idInstalacion
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


                for (var i in response) {
                    
                    if(response[i]['idTipoInstalacion']=="LED"){
                       var linea='<div class="btn btn-info " title="Reubicar elemento" id="inputIdMod'+response[i]['id']+'" onclick="cambiarAlmacen('+response[i]['id']+')"  data-toggle="modal" ><i class="fas fa-recycle"></i></div>'
                     }else{
                        var linea='<div class="btn btn-info " title="Reubicar elemento" id="inputIdMod'+response[i]['id']+'" onclick="cambiarAlmacen('+response[i]['id']+')"  data-toggle="modal" data-target="#staticBackdrop2" ><i class="fas fa-recycle"></i></div>'
                     }
                    
                    tipoInst='';

                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '" value="' +  "CÁMARA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CÁMARA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "CARGADOR ELÉCTRICO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CARGADOR ELÉCTRICO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "CENTRAL"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CENTRAL"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "COLUMNA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "COLUMNA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "CONTROL DE ACCESOS"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "CONTROL DE ACCESOS"  +'</button>';
               //     tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "ESPIRA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "ESPIRA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "FOTO ROJO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "FOTO ROJO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "NODO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "NODO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "PANEL INFORMATIVO"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "PANEL INFORMATIVO"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "RADAR"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "RADAR"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "SEÑAL LUMINOSA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "SEÑAL LUMINOSA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "PUNTO DE MEDIDA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "PUNTO DE MEDIDA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "LED"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "LED"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "TARJETAS SALIDA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "TARJETAS SALIDA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "TARJETAS CPU"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "TARJETAS CPU"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "TARJETAS F.A."  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "TARJETAS F.A."  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "BUS/TREN"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "BUS/TREN"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "SEÑAL OCULTA"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "SEÑAL OCULTA"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "DETECTOR"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "DETECTOR"  +'</button>';
                    tipoInst += '<button class="dropdown-item" type="submit" id="'+ response[i]['id'] + '"  value="'+  "MÓDULOS"  +'" onclick="leerTipoInstalacionTar(this.value,this.id)" >'+ "MÓDULOS"  +'</button>';


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

                 <div class="col-2">
                    <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarAlmacen(this.id)" title="Guardar edición"><i class="fas fa-pencil-alt"></i></div>
                    `+linea+`                    
                    <div class="btn btn-warning" title="Mandar a Resiudos" id="${response[i]['id']}" data-toggle="modal" data-target="#staticBackdrop5" onclick="traspasoResiduos(this.id)"><i class="fas fa-trash-restore"></i></div>
                    <div class="btn btn-danger" title="Eliminar registro" id="${response[i]['id']}" onclick="borrarAlmacen(this.id)"><i class="fas fa-trash-alt"></i></div>
                 </div>
              </div>  

                 `

                }
            }
        })

   await rellenarFooterAlmacen();
   await comprobarNumSerieAlmacen2();


}

async function traspasoResiduos2(){
    var tipoInstalacion= document.getElementById("tipoInstalacion").value;
    var observaciones= document.getElementById("observaciones").value;
    var numSerie= document.getElementById("numSerie").value;
    var fecha=document.getElementById("inputFechaActuacionAlmacenResiduos").value
    var id=document.getElementById("claveId").value
    var idUsuario = document.getElementById('inputIdUsuario').value;


    var url = 'http://172.27.120.120/gestin/public/api/residuos/nueva';

    await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idInstalacion: "RESIDUOS",
                idTipoInstalacion: tipoInstalacion,
                idNumSerie: numSerie,
                observaciones: observaciones,
                fechaActuacion: fecha,
                idUsuario: idUsuario
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })

        await  borrarAlmacen(id);
        $('#staticBackdrop5').modal('hide');
        return;



}

function traspasoResiduos(id){

    var tipoInstalacion= document.getElementById("inputTipoInstalacionTar"+id).value;
    var observaciones= document.getElementById("inputObservacionesTar"+id).value;
    var numSerie= document.getElementById("inputNumSerieTar"+id).value;

    var c=document.getElementById("modalFechaAlmacenResiduosBody");
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
                        <input type="date" class="form-control mt-1" name="inputFechaActuacionAlmacenResiduos" id="inputFechaActuacionAlmacenResiduos" placeholder="DD/MM/YYYY">
                        <input type="hidden" id="tipoInstalacion" value="${tipoInstalacion}">
                        <input type="hidden" id="observaciones" value="${observaciones}">
                        <input type="hidden" id="numSerie" value="${numSerie}">
                        <input type="hidden" id="claveId" value="${id}">
                    </div>           
                </div>        
                <!-- fin body 1  -->
            `;  

    $('#staticBackdrop5').modal('show');
    return;

}


function rellenarFooterAlmacen() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://172.27.120.120/gestin/public/api/almacen/instaladas/' + idInstalacion
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
                <span class="ml-1">Total de <b>Almacen</b> Instaladas: ${response[0]['c']}</span>
                `
            }
        })

}


function borrarAlmacen(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/almacen/borrar/' + param
    fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
     rellenarTodosAlmacen();
    }, 500);
}

function editarAlmacen(param) {

 

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
    if (validarFormatoFechaAlmacen(inputFechaActuacionTar)) {
        if (existeFechaAlmacen(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }

    var url = 'http://172.27.120.120/gestin/public/api/almacen/modificar/' + param;

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
                idUsuario: idUsuario

            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarTodosAlmacen();
    }, 500);
}


function comprobarNumSerieAlmacen() {
    var idNumSerie = document.getElementById('inputNumSerie').value;
    console.log(idNumSerie);

    if (idNumSerie) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/almacen/' + idNumSerie;
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


 function comprobarNumSerieAlmacen2() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
  
    if (idInstalacion) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/almacen';
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
                                     var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/almacen/' + idNumSerie;
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


function comprobarNumSerieAlmacen3(id,idNumSerie) {
    
    if (idNumSerie) {

       // var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/' + idNumSerie;
        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/almacen/' + idNumSerie;
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


function insertarEnAlmacen(param,fecha){
  
    var idInstalacion="ALMACÉN";
    var inputFechaActuacionTar = fecha;//document.getElementById('inputFechaActuacionTar'+param).value;
    var idTipoInstalacion =document.getElementById('inputElemento').value; //"CÁMARAS";
    var observaciones = document.getElementById('inputObservacionesTar' + param).value;
    var idNumSerie = document.getElementById('inputNumSerieTar' + param).value;
    var idUsuario = document.getElementById('inputIdUsuario').value;


    //validar fecha correcta


    var url = 'http://172.27.120.120/gestin/public/api/almacen/nueva';

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

function leerInstalacionAlmacen(value,name){
    var p=document.getElementById('inputTipoInstalacionAlmacen');
    p.value=value;

}

async function cambiarAlmacen(id) {
  
  
var fechaActuacionCambiar= document.getElementById('inputFechaActuacionTar'+id).value;
var tipoInstalacionCambiar= document.getElementById('inputTipoInstalacionTar'+id).value;
var observacionesCambiar= document.getElementById('inputObservacionesTar'+id).value;
var inputNumSerieCambiar= document.getElementById('inputNumSerieTar'+id).value;

switch(tipoInstalacionCambiar){

        case "CÁMARAS":
        
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/camaras';
            fetch(url, {
                method: 'GET',
               
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                   
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                     <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                     `
                    }
                })  
        break;

        case "CARGADORES ELÉCTRICOS":
        var url = 'http://172.27.120.120/gestin/public/api/instalaciones/'+"CARGADORES ELÉCTRICOS";
        fetch(url, {
            method: 'GET',
           
                headers: {
                    'Access-Control-Allow-Origin': 'http://172.27.120.120',
                    'Content-Type': 'application/json'
                },
               
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                var p = document.getElementById('dropdown-Almacen');
                p.innerHTML = '';
                for (var i in response) {
                    p.innerHTML += `
                 <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                 `
                }
            }) 
        break;

        case "CENTRAL":
        var url = 'http://172.27.120.120/gestin/public/api/instalaciones/central';
        fetch(url, {
            method: 'GET',
           
                headers: {
                    'Access-Control-Allow-Origin': 'http://172.27.120.120',
                    'Content-Type': 'application/json'
                },
               
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                var p = document.getElementById('dropdown-Almacen');
                p.innerHTML = '';
                for (var i in response) {
                    p.innerHTML += `
                 <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                 `
                }
            }) 
        break;

        case "COLUMNA":
            break;
        
        case "CONTROL DE ACCESOS":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/'+tipoInstalacionCambiar;
            fetch(url, {
                method: 'GET',
               
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                   
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                     <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                     `
                    }
                }) 
            break;

        case "FOTO ROJO":
                var url = 'http://172.27.120.120/gestin/public/api/instalaciones/'+tipoInstalacionCambiar;
                fetch(url, {
                    method: 'GET',
                   
                        headers: {
                            'Access-Control-Allow-Origin': 'http://172.27.120.120',
                            'Content-Type': 'application/json'
                        },
                       
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        var p = document.getElementById('dropdown-Almacen');
                        p.innerHTML = '';
                        for (var i in response) {
                            p.innerHTML += `
                         <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                         `
                        }
                    }) 
                break;

        case "NODO":
                    var url = 'http://172.27.120.120/gestin/public/api/instalaciones/'+tipoInstalacionCambiar;
                    fetch(url, {
                        method: 'GET',
                       
                            headers: {
                                'Access-Control-Allow-Origin': 'http://172.27.120.120',
                                'Content-Type': 'application/json'
                            },
                           
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            var p = document.getElementById('dropdown-Almacen');
                            p.innerHTML = '';
                            for (var i in response) {
                                p.innerHTML += `
                             <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                             `
                            }
                        }) 
                    break;

        case "PANEL INFORMATIVO":
                        var url = 'http://172.27.120.120/gestin/public/api/instalaciones/'+tipoInstalacionCambiar;
                        fetch(url, {
                            method: 'GET',
                           
                                headers: {
                                    'Access-Control-Allow-Origin': 'http://172.27.120.120',
                                    'Content-Type': 'application/json'
                                },
                               
                            })
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => {
                                var p = document.getElementById('dropdown-Almacen');
                                p.innerHTML = '';
                                for (var i in response) {
                                    p.innerHTML += `
                                 <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                                 `
                                }
                            }) 
                        break;

        case "RADAR":
                            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/'+tipoInstalacionCambiar;
                            fetch(url, {
                                method: 'GET',
                               
                                    headers: {
                                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                                        'Content-Type': 'application/json'
                                    },
                                   
                                })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    var p = document.getElementById('dropdown-Almacen');
                                    p.innerHTML = '';
                                    for (var i in response) {
                                        p.innerHTML += `
                                     <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                                     `
                                    }
                                }) 
                            break;

        case "SEÑALES LUMINOSAS":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/señales luminosas';
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;

        case "PUNTO DE MEDIDA":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/' + tipoInstalacionCambiar;
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;

        case "LED":            
            alert ("Se debe copiar el número de serie, dar de baja en Almacén y pegar el número de serie en el nuevo NID");
        break;

        case "TARJETAS SALIDA":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/cruces';
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;

        case "TARJETAS CPU":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/cruces';
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;
    
        case "TARJETAS F.A.":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/cruces';
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;

        case "BUS/TREN":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/cruces';
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;

        case "SEÑAL OCULTA":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/cruces';
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;

        case "DETECTORES":
            var url = 'http://172.27.120.120/gestin/public/api/instalaciones/cruces';
            fetch(url, {
                method: 'GET',
                
                    headers: {
                        'Access-Control-Allow-Origin': 'http://172.27.120.120',
                        'Content-Type': 'application/json'
                    },
                    
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    var p = document.getElementById('dropdown-Almacen');
                    p.innerHTML = '';
                    for (var i in response) {
                        p.innerHTML += `
                        <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                        `
                    }
                }) 
            break;

        case "MÓDULOS":
                var url = 'http://172.27.120.120/gestin/public/api/instalaciones/cruces';
                fetch(url, {
                    method: 'GET',
                    
                        headers: {
                            'Access-Control-Allow-Origin': 'http://172.27.120.120',
                            'Content-Type': 'application/json'
                        },
                        
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        var p = document.getElementById('dropdown-Almacen');
                        p.innerHTML = '';
                        for (var i in response) {
                            p.innerHTML += `
                            <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacionAlmacen(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                            `
                        }
                    }) 
                break;

}

if (tipoInstalacionCambiar!="LED"){
        var c=document.getElementById("modalAlmacenBody");
            c.innerHTML=`
                        <!-- Inicio body 1 -->
                        <div class="row" id="">

                            <div class="col">
                                <b>F.Actuación</b>
                            </div>

                            <div class="col">
                                <b>Tipo Instalación</b>
                            </div>

                            <div class="col">
                                <b>Observaciones</b>                             
                            </div>
                            <div class="col">
                                <b>Num. Serie</b>                
                            </div>

                        </div>
                        <div class="row" id="">

                            <div class="col">
                                <span id="inputFactuacionCambio">${fechaActuacionCambiar}</span>
                            </div>

                            <div class="col">
                                <span id="inputTipoActuacionCambio">${tipoInstalacionCambiar}</span>
                            </div>

                            <div class="col">
                                <span id="inputObservacionesCambio">${observacionesCambiar}</span>                              
                            </div>
                            <div class="col">
                                <span id="inputNumSerieCambio" >${inputNumSerieCambiar}</span>                
                            </div>

                        </div>



                    <div class="row" id="">

                        <div class="col p-3">
                            Nueva Fecha de Actuación:
                            <input type="date" class="form-control mt-1" name="inputFechaActuacionMod" id="inputFechaActuacionMod" placeholder="DD/MM/YYYY">
                            <input type="hidden" id="clave" value="${id}">

                        </div>

                        <div class="col p-3" >
                        Instalación de destino:

                        <div class="input-group">
                            <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipoInstalacionAlmacen" value="">
                            <div class="input-group-append">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </button>
                                <div class="dropdown-menu" id="dropdown-Almacen">
                                    
                                </div>
                            
                            </div>
                        </div>
                    
                    </div>
                        


                    </div>

                        <!-- fin body 1  -->
                    `;     
        }
}


async function traspasoAlmacen() {


    var fechaActuacionCambiar= document.getElementById('inputFactuacionCambio').innerText;
    var tipoInstalacionCambiar= document.getElementById('inputTipoActuacionCambio').innerText;
    var observacionesCambiar= document.getElementById('inputObservacionesCambio').innerText;
    var inputNumSerieCambiar= document.getElementById('inputNumSerieCambio').innerText;
    var inputNuevaFecha=document.getElementById('inputFechaActuacionMod').value;
    var inputNuevaInstalacion=document.getElementById('inputTipoInstalacionAlmacen').value;
    var clave=document.getElementById('clave').value;

    


    switch(tipoInstalacionCambiar){

        case "CÁMARAS":
            console.log("Estoy en cámara");
            var idUsuario = document.getElementById('inputIdUsuario').value;
            var url = 'http://172.27.120.120/gestin/public/api/camtv/nueva';

            await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idInstalacion: inputNuevaInstalacion,
                        idTipoActuacion: "Reposición Almacén",
                        idNumSerie: inputNumSerieCambiar,
                        albaran: "0",
                        observaciones: observacionesCambiar,
                        fechaActuacion: inputNuevaFecha,
                        idUsuario: idUsuario,
                        precio: "0",
                        activo: "true",
                        instalada: "true"
                    })
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    alert(response)
                })
                await borrarAlmacen(clave);
                $('#staticBackdrop2').modal('hide');
                break;
                        
        case "CARGADORES ELÉCTRICOS":
                var idUsuario = document.getElementById('inputIdUsuario').value;
                var url = 'http://172.27.120.120/gestin/public/api/cargadoresE/nueva';
    
                await  fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            idInstalacion: inputNuevaInstalacion,
                            idTipoActuacion: "Reposición Almacén",
                            idNumSerie: inputNumSerieCambiar,
                            albaran: "0",
                            observaciones: observacionesCambiar,
                            fechaActuacion: inputNuevaFecha,
                            idUsuario: idUsuario,
                            precio: "0",
                            activo: "true",
                            instalada: "true",
                            almacen: "false",
                            residuos: "false"
                        })
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        alert(response)
                    })
                    await borrarAlmacen(clave);
                    $('#staticBackdrop2').modal('hide');

                break;

        case "CENTRAL":
                    var idUsuario = document.getElementById('inputIdUsuario').value;
                    var url = 'http://172.27.120.120/gestin/public/api/centrales/nueva';
        
                    await  fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                idInstalacion: inputNuevaInstalacion,
                                idTipoActuacion: "Reposición Almacén",
                                idNumSerie: inputNumSerieCambiar,
                                albaran: "0",
                                observaciones: observacionesCambiar,
                                fechaActuacion: inputNuevaFecha,
                                idUsuario: idUsuario,
                                precio: "0",
                                activo: "true",
                                instalada: "true",
                                almacen: "false",
                                residuos: "false"
                            })
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            alert(response)
                        })
                        await borrarAlmacen(clave);
                        $('#staticBackdrop2').modal('hide');
                    break;

        case "CONTROL DE ACCESOS":
                        var idUsuario = document.getElementById('inputIdUsuario').value;
                        var url = 'http://172.27.120.120/gestin/public/api/controlaccesos/nueva';
            
                        await  fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    idInstalacion: inputNuevaInstalacion,
                                    idTipoActuacion: "Reposición Almacén",
                                    idNumSerie: inputNumSerieCambiar,
                                    albaran: "0",
                                    observaciones: observacionesCambiar,
                                    fechaActuacion: inputNuevaFecha,
                                    idUsuario: idUsuario,
                                    precio: "0",
                                    activo: "true",
                                    instalada: "true",
                                    almacen: "false",
                                    residuos: "false"
                                })
                            })
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => {
                                alert(response)
                            })
                            await borrarAlmacen(clave);
                            $('#staticBackdrop2').modal('hide');
                        break;

        case "FOTO ROJO":
                            var idUsuario = document.getElementById('inputIdUsuario').value;
                            var url = 'http://172.27.120.120/gestin/public/api/fotorojo/nueva';
                
                            await  fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        idInstalacion: inputNuevaInstalacion,
                                        idTipoActuacion: "Reposición Almacén",
                                        idNumSerie: inputNumSerieCambiar,
                                        albaran: "0",
                                        observaciones: observacionesCambiar,
                                        fechaActuacion: inputNuevaFecha,
                                        idUsuario: idUsuario,
                                        precio: "0",
                                        activo: "true",
                                        instalada: "true",
                                        almacen: "false",
                                        residuos: "false"
                                    })
                                })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    alert(response)
                                })
                                await borrarAlmacen(clave);
                                $('#staticBackdrop2').modal('hide');
                            break;

        case "PANEL INFORMATIVO":
                                var idUsuario = document.getElementById('inputIdUsuario').value;
                                var url = 'http://172.27.120.120/gestin/public/api/panelinformativo/nueva';
                    
                                await  fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            idInstalacion: inputNuevaInstalacion,
                                            idTipoActuacion: "Reposición Almacén",
                                            idNumSerie: inputNumSerieCambiar,
                                            albaran: "0",
                                            observaciones: observacionesCambiar,
                                            fechaActuacion: inputNuevaFecha,
                                            idUsuario: idUsuario,
                                            precio: "0",
                                            activo: "true",
                                            instalada: "true",
                                            almacen: "false",
                                            residuos: "false"
                                        })
                                    })
                                    .then(res => res.json())
                                    .catch(error => console.error('Error:', error))
                                    .then(response => {
                                        alert(response)
                                    })
                                    await borrarAlmacen(clave);
                                    $('#staticBackdrop2').modal('hide');
                                break;

        case "RADAR":
                                    var idUsuario = document.getElementById('inputIdUsuario').value;
                                    var url = 'http://172.27.120.120/gestin/public/api/radares/nueva';
                        
                                    await  fetch(url, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                idInstalacion: inputNuevaInstalacion,
                                                idTipoActuacion: "Reposición Almacén",
                                                idNumSerie: inputNumSerieCambiar,
                                                albaran: "0",
                                                observaciones: observacionesCambiar,
                                                fechaActuacion: inputNuevaFecha,
                                                idUsuario: idUsuario,
                                                precio: "0",
                                                activo: "true",
                                                instalada: "true",
                                                almacen: "false",
                                                residuos: "false"
                                            })
                                        })
                                        .then(res => res.json())
                                        .catch(error => console.error('Error:', error))
                                        .then(response => {
                                            alert(response)
                                        })
                                        await borrarAlmacen(clave);
                                        $('#staticBackdrop2').modal('hide');
                                    break;

        case "SEÑALES LUMINOSAS":
            var idUsuario = document.getElementById('inputIdUsuario').value;
            var url = 'http://172.27.120.120/gestin/public/api/luminosas/nueva';

            await  fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idInstalacion: inputNuevaInstalacion,
                        idTipoActuacion: "Reposición Almacén",
                        idNumSerie: inputNumSerieCambiar,
                        albaran: "0",
                        observaciones: observacionesCambiar,
                        fechaActuacion: inputNuevaFecha,
                        idUsuario: idUsuario,
                        precio: "0",
                        activo: "true",
                        instalada: "true",
                        almacen: "false",
                        residuos: "false"
                    })
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    alert(response)
                })
                await borrarAlmacen(clave);
                $('#staticBackdrop2').modal('hide');
            break;

        case "PUNTO DE MEDIDA":
            var idUsuario = document.getElementById('inputIdUsuario').value;
            var url = 'http://172.27.120.120/gestin/public/api/puntomedida/nueva';

            await  fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idInstalacion: inputNuevaInstalacion,
                        idTipoActuacion: "Reposición Almacén",
                        idNumSerie: inputNumSerieCambiar,
                        albaran: "0",
                        observaciones: observacionesCambiar,
                        fechaActuacion: inputNuevaFecha,
                        idUsuario: idUsuario,
                        precio: "0",
                        activo: "true",
                        instalada: "true",
                        almacen: "false",
                        residuos: "false"
                    })
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    alert(response)
                })
                await borrarAlmacen(clave);
                $('#staticBackdrop2').modal('hide');
            break;
    
        case "LED":
                alert ("Se debe copiar el número de serie, dar de baja en Almacén y pegar el número de serie en el nuevo NID");
            break;

        case "TARJETAS SALIDA":
            var idUsuario = document.getElementById('inputIdUsuario').value;
            var url = 'http://172.27.120.120/gestin/public/api/tarjetas/nueva';

            await  fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idInstalacion: inputNuevaInstalacion,
                        idTipoActuacion: "Reposición Almacén",
                        idNumSerie: inputNumSerieCambiar,
                        albaran: "0",
                        observaciones: observacionesCambiar,
                        fechaActuacion: inputNuevaFecha,
                        idUsuario: idUsuario,
                        precio: "0",
                        activo: "true",
                        instalada: "true",
                        almacen: "false",
                        residuos: "false"
                    })
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    alert(response)
                })
                borrarAlmacen(clave);
                $('#staticBackdrop2').modal('hide');
            break;

        case "TARJETAS CPU":
                var idUsuario = document.getElementById('inputIdUsuario').value;
                var url = 'http://172.27.120.120/gestin/public/api/tarjetascpu/nueva';
        
                await  fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            idInstalacion: inputNuevaInstalacion,
                            idTipoActuacion: "Reposición Almacén",
                            tipo:"G",
                            idNumSerie: inputNumSerieCambiar,
                            albaran: "0",
                            observaciones: observacionesCambiar,
                            fechaActuacion: inputNuevaFecha,
                            idUsuario: idUsuario,
                            precio: "0",
                            activo: "true",
                            instalada: "true",
                            almacen: "false",
                            residuos: "false"
                        })
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        alert(response)
                    })
                    alert("El tipo de tarjeta de CPU por defecto es G.");
                    borrarAlmacen(clave);
                    $('#staticBackdrop2').modal('hide');
                break;

        case "TARJETAS F.A.":
        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.120/gestin/public/api/tarjetasfa/nueva';

        await  fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: inputNuevaInstalacion,
                    idTipoActuacion: "Reposición Almacén",
                    idNumSerie: inputNumSerieCambiar,
                    albaran: "0",
                    observaciones: observacionesCambiar,
                    fechaActuacion: inputNuevaFecha,
                    idUsuario: idUsuario,
                    precio: "0",
                    activo: "true",
                    instalada: "true",
                    almacen: "false",
                    residuos: "false"
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })
            borrarAlmacen(clave);
            $('#staticBackdrop2').modal('hide');
        break;

        case "BUS/TREN":
            var idUsuario = document.getElementById('inputIdUsuario').value;
            var url = 'http://172.27.120.120/gestin/public/api/bustren/nueva';

            await  fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idInstalacion: inputNuevaInstalacion,
                        idTipoActuacion: "Reposición Almacén",
                        idNumSerie: inputNumSerieCambiar,
                        albaran: "0",
                        observaciones: observacionesCambiar,
                        fechaActuacion: inputNuevaFecha,
                        idUsuario: idUsuario,
                        precio: "0",
                        activo: "true",
                        instalada: "true",
                        almacen: "false",
                        residuos: "false"
                    })
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    alert(response)
                })
                borrarAlmacen(clave);
                $('#staticBackdrop2').modal('hide');
            break;

        case "SEÑAL OCULTA":
        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.120/gestin/public/api/oculta/nueva';

        await  fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: inputNuevaInstalacion,
                    idTipoActuacion: "Reposición Almacén",
                    idNumSerie: inputNumSerieCambiar,
                    albaran: "0",
                    observaciones: observacionesCambiar,
                    fechaActuacion: inputNuevaFecha,
                    idUsuario: idUsuario,
                    precio: "0",
                    activo: "true",
                    instalada: "true",
                    almacen: "false",
                    residuos: "false"
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })
            borrarAlmacen(clave);
            $('#staticBackdrop2').modal('hide');
        break;

        case "DETECTORES":
        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.120/gestin/public/api/detectores/nueva';

        await  fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: inputNuevaInstalacion,
                    idTipoActuacion: "Reposición Almacén",
                    idNumSerie: inputNumSerieCambiar,
                    albaran: "0",
                    observaciones: observacionesCambiar,
                    fechaActuacion: inputNuevaFecha,
                    idUsuario: idUsuario,
                    precio: "0",
                    activo: "true",
                    instalada: "true",
                    almacen: "false",
                    residuos: "false"
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })
            borrarAlmacen(clave);
            $('#staticBackdrop2').modal('hide');
        break;

        case "MÓDULOS":
        var idUsuario = document.getElementById('inputIdUsuario').value;
        var url = 'http://172.27.120.120/gestin/public/api/modulo/nueva';

        await  fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: inputNuevaInstalacion,
                    idTipoActuacion: "Reposición Almacén",
                    idNumSerie: inputNumSerieCambiar,
                    albaran: "0",
                    observaciones: observacionesCambiar,
                    fechaActuacion: inputNuevaFecha,
                    idUsuario: idUsuario,
                    precio: "0",
                    activo: "true",
                    instalada: "true",
                    almacen: "false",
                    residuos: "false"
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })
            borrarAlmacen(clave);
            $('#staticBackdrop2').modal('hide');
        break;



}

}


function borrarElemento(tipoInstalacionCambiar,id){
    switch(tipoInstalacionCambiar){
        case "CÁMARAS":
             borrarCamTv(id);
            break;
        case "CARGADORES ELÉCTRICOS":
             borrarCargadores(id);
            break;
        case "CENTRAL":
            borrarCentrales(id);
            break;
        case "CONTROL DE ACCESOS":
            borrarControlAccesos(id);
            break;
        case "TARJETAS SALIDA":
            borrarTarjetaSalida(id);
            break;
        case "TARJETAS CPU":
            borrarTarjetaCpu(id);
            break;
        case "TARJETAS F.A.":
            borrarTarjetaFa(id);
            break;
        case "BUS/TREN":
            borrarBusTren(id);
            break;
        case "SEÑAL OCULTA":
            borrarOculta(id);
            break;
        case "LEDS":
             borrarLed(id);
             break;
        case "DETECTORES":
            borrarDetectores(id);
            break;
        case "MÓDULOS":
            borrarModulo(id);
            break;

        case "FOTO ROJO":
            borrarFotoRojo(id);
            break;
        case "NODO":
            borrarNodo(id);
            break;
        case "PANEL INFORMATIVO":
            borrarPanelInformativo(id);
            break;

        case "RADAR":
            borrarRadares(id);
            break;
            
        case "SECTOR":
            borrarSector(id);
            break;

        case "SEÑALES LUMINOSAS":
            borrarSeñalesLuminosas(id);
            break;
        
    }
}






async function putfechaAlmacen2(){
       
    var id=document.getElementById('claveid').value;
    var fechaNueva=document.getElementById('inputFechaActuacionAlmacen').value;
    var tipoInstalacionCambiar= document.getElementById('inputElemento').value;

    
    if (fechaNueva){
        await insertarEnAlmacen(id,fechaNueva);
        await borrarElemento(tipoInstalacionCambiar,id);
    }else{
        alert("No se ha introducido fecha");
    }  
    //fechaActuacion.value=fechaNueva.value;
    $('#staticBackdrop3').modal('hide');
    return ;
}

async function putfechaResiduos2(){
       
    var id=document.getElementById('claveid').value;
    var fechaNueva=document.getElementById('inputFechaActuacionResiduos').value;
    var tipoInstalacionCambiar= document.getElementById('inputElemento').value;
    


    if (fechaNueva){
        await insertarEnResiduos(id,fechaNueva);
        await borrarElemento(tipoInstalacionCambiar,id);

    }else{
        alert("No se ha introducido fecha");
    }
       
    //fechaActuacion.value=fechaNueva.value;
    $('#staticBackdrop4').modal('hide');
return ;
    

}