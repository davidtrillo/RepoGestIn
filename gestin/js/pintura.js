//document.onload = rellenarPintura();

function rellenarCrucePintura() { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://webserver.mobilitat.local/gestin/public/api/cruces'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropInstalacionPintura');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCrucePintura(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })


}

function rellenarCrucePintura2(param) { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://webserver.mobilitat.local/gestin/public/api/cruces'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropInstalacionPintura'+param);
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCrucePintura2(${param},this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })


}

function leerCrucePintura2(param,id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce2'+param);
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion2'+param);
    p2.value = ubicacion;
}

function leerCrucePintura(id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce');
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion');
    p2.value = ubicacion;
}

function nuevaPintura() {
    var idInstalacion = document.getElementById('inputIdCruce').value;

    if (idInstalacion.value != "") {
        var fechaActuacion = document.getElementById('inputFechaActuacion').value  ? document.getElementById('inputFechaActuacion').value :null;
        var fechaInspeccion = document.getElementById('inputFechaInspeccion').value ? document.getElementById('inputFechaInspeccion').value :null;
        var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value :null;
        var resolucion = document.getElementById('inputOk').checked;
        var idUsuario = document.getElementById('inputIdUsuario').value;
        resolucion = String(resolucion);

        // console.log(idInstalacion);
        // console.log(fechaActuacion);
        // console.log(fechaInspeccion);
        // console.log(observaciones);
        // console.log(resolucion);
        // console.log(idUsuario);


        var url = 'http://webserver.mobilitat.local/gestin/public/api/pintura/nueva';

        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: idInstalacion,
                    fechaActuacion: fechaActuacion,
                    fechaInspeccion: fechaInspeccion,
                    observaciones: observaciones,
                    idUsuario: idUsuario,
                    resolucion: resolucion
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

    }
    //rellenarPintura();
}



function rellenarPintura() {

    var url = 'http://webserver.mobilitat.local/gestin/public/api/pintura'
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
                    if (response[i]['resolucion'] == "true") {
                        var activo = "checked";
                    } else {
                        var activo = "";
                    }
                    var fechaActuacion= response[i]['fechaActuacion'] ;
                    if (fechaActuacion==null){
                        fechaActuacion="";
                    }

                    var fechaInspeccion= response[i]['fechaInspeccion'] ;
                    if (fechaInspeccion==null){
                        fechaInspeccion="";
                    }

                    p.innerHTML += `
                    <div class="container-fluid mt-1 ml-1 ">
                    <div class="row">
                        <div class="col-1 p-1">
                            <input type="text" class="form-control mt-2" name="" id="inputIdCruce2${response[i]['id']}" value="${response[i]['idInstalacion']}" onfocusout="rellenarUbicacion(${response[i]['id']})">                          
                        </div>
           
                       <div class="col-3 p-1">
                          <input type="text" class="form-control mt-2" name="" id="inputUbicacion2${response[i]['id']}" placeholder="Ubicación" value="${response[i]['ubicacion']}"
                             disabled>
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" name="" id="inputFechaActuacion2${response[i]['id']}" value="${fechaActuacion}">
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccion2${response[i]['id']}" value="${fechaInspeccion}">
                       </div>
                       <div class="col-3 p-1">
                          <input type="text" class="form-control mt-2" name="" id="observaciones2${response[i]['id']}" value="${response[i]['observaciones']}">
                       </div>
           
                       <div class="col-1 p-1">
                          <input type="checkbox" class="mt-3 ml-5" name="resolucion" id="resolucion2${response[i]['id']}" ${activo}>
                       </div>
                       <div class="col-1 p-1 mt-2">

                       <div class="btn bg-warning" data-toggle="modal" data-target="#exampleModal" id="${response[i]['id']}"  onclick="getElementos('${response[i]['idInstalacion']}')"><i class="fas fa-info-circle"></i></div>
                         
                       <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarPintura(this.id)"><i
                                class="fas fa-pencil-alt"></i></div>
                         
                        <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarPintura(this.id)"><i
                                class="fas fa-trash-alt"></i></div>

                       </div>
                    </div>
                 </div>
                 
                 `

                }
            }
        })


}


function rellenarUbicacion(param) {

    var p1=document.getElementById("inputIdCruce2"+param);

    var url = 'http://webserver.mobilitat.local/gestin/public/api/cruce/'+p1.value;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            //console.log(p1.value+' '+param+' '+response[0]['ubicacion']);
            var p = document.getElementById('inputUbicacion2'+param);
                p.innerHTML='';
                p.value=response[0]['ubicacion'];     
        })
}




function getElementos(id) {

     var url = 'http://webserver.mobilitat.local/gestin/public/api/elementospintura/'+id;
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
               // alert(response);
            } else {
                
                p1=document.getElementById('exampleModalLabel');
                p1.innerHTML=response[0]['idInstalacion']+"-"+response[0]['ubicacion'];
                p1=document.getElementById('idReg');
                p1.innerHTML=response[0]['reg'];
                p1=document.getElementById('idDet');
                p1.innerHTML=response[0]['det'];
                p1=document.getElementById('idCTV');
                p1.innerHTML=response[0]['ctv'];
                p1=document.getElementById('idCen');
                p1.innerHTML=response[0]['central'];
                p1=document.getElementById('id08m');
                p1.innerHTML=response[0]['08m'];
                p1=document.getElementById('id24m');
                p1.innerHTML=response[0]['24m'];;
                p1=document.getElementById('id4m');
                p1.innerHTML=response[0]['4m'];
                p1=document.getElementById('idBac');
                p1.innerHTML=response[0]['bac'];
                p1=document.getElementById('idSim');
                p1.innerHTML=response[0]['sim'];
                p1=document.getElementById('idDob');
                p1.innerHTML=response[0]['dob'];
                p1=document.getElementById('idBaj');
                p1.innerHTML=response[0]['baj'];
                p1=document.getElementById('observaciones');
                p1.innerHTML=response[0]['observaciones'];
            }
         })
}


function borrarPintura(id) {

        var url = 'http://webserver.mobilitat.local/gestin/public/api/pintura/borrar/'+id;
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
    
            rellenarPintura();
}

function editarPintura(param) {//CAMBIO DE NOMENCLATURA
    var id= param;
    var inputIdCruce2 = document.getElementById('inputIdCruce2' + param).value;
    var inputFechaActuacion2 = document.getElementById('inputFechaActuacion2' + param).value;
    var inputFechaInspeccion2 = document.getElementById('inputFechaInspeccion2' + param).value;
    var observaciones2 = document.getElementById('observaciones2' + param).value;
    var resolucion2 = document.getElementById('resolucion2' + param).checked;
    resolucion2 = String(resolucion2);
    var idUsuario = document.getElementById('inputIdUsuario').value;

     console.log(id);
     console.log(inputIdCruce2);
     console.log(inputFechaActuacion2);
     console.log(inputFechaInspeccion2);
     console.log(observaciones2);
     console.log(resolucion2);
     console.log(idUsuario);

    var url = 'http://webserver.mobilitat.local/gestin/public/api/pintura/modificar/' + param;

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                idInstalacion:inputIdCruce2,
                idUsuario:idUsuario,
                observaciones:observaciones2,
                fechaActuacion:inputFechaActuacion2,
                fechaInspeccion:inputFechaInspeccion2,
                resolucion:resolucion2          
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarPintura(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}
