document.onload = rellenarPreventivo();

function rellenarCrucePreventivo() { //Llamada a la API según el dato obtenido del primer combo
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
            var p = document.getElementById('dropInstalacionPintura');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCrucePreventivo(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}

function rellenarCrucePreventivo2(param) { //Llamada a la API según el dato obtenido del primer combo
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
            var p = document.getElementById('dropCruce2'+param);
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion2${[i]}" name="${response[i]['ubicacion']}" onclick="leerCrucePreventivo2(${param},this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}

function leerCrucePreventivo(id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce');
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion');
    p2.value = ubicacion;
}

function leerCrucePreventivo2(param,id, ubicacion) {

    var p1 = document.getElementById('inputIdCruce2'+param);
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion2'+param);
    p2.value = ubicacion;
}

function leerEstadoSemaforo(id) {
    var p1 = document.getElementById('inputEstadoInspeccionVoluntarioSemaforo');
    p1.value = id;
}

function leerEstadoAlumbrado(id) {
    var p1 = document.getElementById('inputEstadoInspeccionVoluntarioAlumbrado');
    p1.value = id;
}

function leerEstadoAlumbrado2(param,id) {
    var p1 = document.getElementById('inputEstadoInspeccionVoluntarioAlumbrado2'+id);
    p1.value = param;
}

function leerEstadoSemaforo2(param,id) {
    var p1 = document.getElementById('inputEstadoInspeccionVoluntarioSemaforo2'+id);
    p1.value = param;
}

function nuevoPreventivo() {
    var idInstalacion = document.getElementById('inputIdCruce').value;

    if (idInstalacion.value != "") {
        var inputFechaPreventivo = document.getElementById('inputFechaPreventivo').value ? document.getElementById('inputFechaPreventivo').value :null;
        var inputObservacionesPreventivo = document.getElementById('inputObservacionesPreventivo').value ? document.getElementById('inputObservacionesPreventivo').value :null;
        var inputFechaInspeccionVoluntariaSemaforo = document.getElementById('inputFechaInspeccionVoluntariaSemaforo').value  ? document.getElementById('inputFechaInspeccionVoluntariaSemaforo').value :null;
        var inputObservacionesInspeccionVoluntarioSemaforo = document.getElementById('inputObservacionesInspeccionVoluntarioSemaforo').value  ? document.getElementById('inputObservacionesInspeccionVoluntarioSemaforo').value :null; 
        var inputEstadoInspeccionVoluntarioSemaforo = document.getElementById('inputEstadoInspeccionVoluntarioSemaforo').value  ? document.getElementById('inputEstadoInspeccionVoluntarioSemaforo').value :null;
        var inputFechaInspeccionVoluntarioAlumbrado = document.getElementById('inputFechaInspeccionVoluntarioAlumbrado').value  ? document.getElementById('inputFechaInspeccionVoluntarioAlumbrado').value :null;
        var inputEstadoInspeccionVoluntarioAlumbrado = document.getElementById('inputEstadoInspeccionVoluntarioAlumbrado').value  ? document.getElementById('inputEstadoInspeccionVoluntarioAlumbrado').value :null;
        var inputObservacionesInspeccionVoluntarioAlumbrado = document.getElementById('inputObservacionesInspeccionVoluntarioAlumbrado').value  ? document.getElementById('inputObservacionesInspeccionVoluntarioAlumbrado').value :null;
        var idUsuario = document.getElementById('inputIdUsuario').value;

        // console.log(inputFechaPreventivo);
        // console.log(inputObservacionesPreventivo);
        // console.log(inputFechaInspeccionVoluntariaSemaforo);
        // console.log(inputObservacionesInspeccionVoluntarioSemaforo);
        // console.log(inputEstadoInspeccionVoluntarioSemaforo);
        // console.log(inputFechaInspeccionVoluntarioAlumbrado);
        // console.log(inputEstadoInspeccionVoluntarioAlumbrado);
        // console.log(inputObservacionesInspeccionVoluntarioAlumbrado);


        var url = 'http://172.27.120.111/gestin/public/api/preventivo/nueva';

        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion:idInstalacion ,
                    fechaPreventivo:inputFechaPreventivo , 
                    fechaInspeccionVoluntarioSemaforo: inputFechaInspeccionVoluntariaSemaforo ,
                    fechaInspeccionAlumbrado: inputFechaInspeccionVoluntarioAlumbrado ,
                    observacionesPreventivo: inputObservacionesPreventivo ,
                    observacionesInspeccionVoluntarioSemaforo: inputObservacionesInspeccionVoluntarioSemaforo ,
                    observacionesInspeccionAlumbrado: inputObservacionesInspeccionVoluntarioAlumbrado ,
                    estadoInspeccionVoluntarioSemaforo:  inputEstadoInspeccionVoluntarioSemaforo,
                    estadoInspeccionAlumbrado: inputEstadoInspeccionVoluntarioAlumbrado ,
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
        rellenarPreventivo(); 
    }, 1000);
}



function rellenarPreventivo() {

    var url = 'http://172.27.120.111/gestin/public/api/preventivo'
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
                var  color;
                p.innerHTML = '';
                for (var i in response) {


                    if ((i%2)==0){
                        color="bg-light";
                    }else{
                        
                        color="";
                    }


                    // console.log(response[i]['id']);
                    // console.log(response[i]['idInstalacion']);
                    // console.log(response[i]['ubicacion']);
                    // console.log(response[i]['fechaPreventivo']);
                    // console.log(response[i]['observacionesPreventivo']);
                    // console.log(response[i]['fechaInspeccionVoluntarioSemaforo']);
                    // console.log(response[i]['estadoInspeccionVoluntarioSemaforo']);
                    // console.log(response[i]['observacionesInspeccionVoluntarioSemaforo']);
                    // console.log(response[i]['fechaInspeccionAlumbrado']);
                    // console.log(response[i]['estadoInspeccionAlumbrado']);
                    // console.log(response[i]['observacionesInspeccionAlumbrado']);


                    p.innerHTML += `
                    <div class="container-fluid mt-1 ml-1 ${color} ">

                    <div class="row">
                       <div class="col-1 p-1">
                       <input type="text" class="form-control mt-2" name="" id="inputIdCruce2${response[i]['id']}" value="${response[i]['idInstalacion']}" onfocusout="rellenarUbicacion(${response[i]['id']})">                          

 
                       </div>
                    
                       <div class="col-2 p-1">
                          <span><b>Ubicación</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputUbicacion2${response[i]['id']}" placeholder="Ubicación" value="${response[i]['ubicacion']}" disabled>
                       </div>
                       <div class="col-xd-1 p-1">
                          <span><b>Fecha Preventivo</b></span>
                          <input type="date" class="form-control mt-2" name="" id="inputFechaPreventivo2${response[i]['id']}" value="${response[i]['fechaPreventivo']}">
                       </div>
                       <div class="col-5 p-1">
                          <span><b>Observaciones Preventivo</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputObservacionesPreventivo2${response[i]['id']}" value="${response[i]['observacionesPreventivo']}">
                       </div>
                    </div>
                    
                    
                    
                    <div class="row">
                       <div class="col-xd-1 p-1">
                          <span><b>Fecha Insp. Vol. Sem.</b></span>
                          <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccionVoluntariaSemaforo2${response[i]['id']}" value="${response[i]['fechaInspeccionVoluntarioSemaforo']}">
                       </div>
                       <div class="col-2 p-1">
                          <span><b>Estado Insp. Vol. Sem.</b></span>
                          <div class="input-group ">
                             <button type="button" class="btn btn-secondary dropdown-toggle p-1 mt-2" name="" value=""
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                onclick="">
                                Estado
                             </button>
                             <div class="dropdown-menu" id="dropEstadoSemaforo">
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo2(this.value,${response[i]['id']})" value="Favorable">Favorable</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo2(this.value,${response[i]['id']})" value="Leve">Leve</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo2(this.value,${response[i]['id']})" value="Condicional">Condicional</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo2(this.value,${response[i]['id']})" value="No Favorable">No Favorable</button>
                             </div>
                                <input type="text" class="form-control mt-2" name="" id="inputEstadoInspeccionVoluntarioSemaforo2${response[i]['id']}" value="${response[i]['estadoInspeccionVoluntarioSemaforo']}">
                          </div>
                       </div>
                       <div class="col-2 p-1">
                          <span><b>Observaciones Insp. Vol. Sem.</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputObservacionesInspeccionVoluntarioSemaforo2${response[i]['id']}" value="${response[i]['observacionesInspeccionVoluntarioSemaforo']}">
                       </div>
                       <div class="col-xd-1 p-1">
                          <span><b>Fecha Insp. Vol. Alum.</b></span>
                          <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccionVoluntarioAlumbrado2${response[i]['id']}" value="${response[i]['fechaInspeccionAlumbrado']}">
                       </div>
                       <div class="col-2 p-1">
                          <span><b>Estado Insp. Vol. Alum.</b></span>
                          <div class="input-group ">
                             <button type="button" class="btn btn-secondary dropdown-toggle p-1 mt-2" name="" value=""
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                onclick="">
                                Estado
                             </button>
                             <div class="dropdown-menu" id="dropEstadoAlumbrado">
                                <button class="dropdown-item" type="submit" id="btnEstadoAlumbrado${response[i]['id']}" name="" onclick="leerEstadoAlumbrado2(this.value,${response[i]['id']})" value="Favorable">Favorable</button>
                                <button class="dropdown-item" type="submit" id="btnEstadoAlumbrado${response[i]['id']}" name="" onclick="leerEstadoAlumbrado2(this.value,${response[i]['id']})" value="Leve">Leve</button>
                                <button class="dropdown-item" type="submit" id="btnEstadoAlumbrado${response[i]['id']}" name="" onclick="leerEstadoAlumbrado2(this.value,${response[i]['id']})" value="Condicional">Condicional</button>
                                <button class="dropdown-item" type="submit" id="btnEstadoAlumbrado${response[i]['id']}" name="" onclick="leerEstadoAlumbrado2(this.value,${response[i]['id']})" value="No Favorable">No Favorable</button>
                             </div>
                                <input type="text" class="form-control mt-2" name="" id="inputEstadoInspeccionVoluntarioAlumbrado2${response[i]['id']}" value="${response[i]['estadoInspeccionAlumbrado']}">
                          </div>
                       </div>
                       <div class="col-2 p-1">
                          <span><b>Observaciones Insp. Vol. Alum.</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputObservacionesInspeccionVoluntarioAlumbrado2${response[i]['id']}" value="${response[i]['observacionesInspeccionAlumbrado']}">
                       </div>
                       <div class="col-1 p-1 mt-2">
                          <br>                        
                          <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarPreventivo(this.id)"><i
                                   class="fas fa-pencil-alt"></i></div>
                          
                          <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarPreventivo(this.id)"><i
                                   class="fas fa-trash-alt"></i></div>
                                  
                       </div>
                     
                    </div>
                    
                    
                    </div>
                    <hr  class=" container-fluid mt-1 mb-1 bg-danger">
                 `

                }
            }
        })


}

function rellenarUbicacion(param) {

    var p1=document.getElementById("inputIdCruce2"+param);

    var url = 'http://172.27.120.111/gestin/public/api/cruce/'+p1.value;
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

function borrarPreventivo(id) {

        var url = 'http://172.27.120.111/gestin/public/api/preventivo/borrar/'+id;
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
            setTimeout(() => {
                rellenarPreventivo(); 
            }, 1000);
}


function editarPreventivo(param) {
    var idInstalacion = document.getElementById('inputIdCruce2'+param).value;
    var inputFechaPreventivo = document.getElementById('inputFechaPreventivo2'+param).value ? document.getElementById('inputFechaPreventivo2'+param).value :null;
    var inputObservacionesPreventivo = document.getElementById('inputObservacionesPreventivo2'+param).value ? document.getElementById('inputObservacionesPreventivo2'+param).value :null;
    var inputFechaInspeccionVoluntariaSemaforo = document.getElementById('inputFechaInspeccionVoluntariaSemaforo2'+param).value  ? document.getElementById('inputFechaInspeccionVoluntariaSemaforo2'+param).value :null;
    var inputObservacionesInspeccionVoluntarioSemaforo = document.getElementById('inputObservacionesInspeccionVoluntarioSemaforo2'+param).value  ? document.getElementById('inputObservacionesInspeccionVoluntarioSemaforo2'+param).value :null; 
    var inputEstadoInspeccionVoluntarioSemaforo = document.getElementById('inputEstadoInspeccionVoluntarioSemaforo2'+param).value  ? document.getElementById('inputEstadoInspeccionVoluntarioSemaforo2'+param).value :null;
    var inputFechaInspeccionVoluntarioAlumbrado = document.getElementById('inputFechaInspeccionVoluntarioAlumbrado2'+param).value  ? document.getElementById('inputFechaInspeccionVoluntarioAlumbrado2'+param).value :null;
    var inputEstadoInspeccionVoluntarioAlumbrado = document.getElementById('inputEstadoInspeccionVoluntarioAlumbrado2'+param).value  ? document.getElementById('inputEstadoInspeccionVoluntarioAlumbrado2'+param).value :null;
    var inputObservacionesInspeccionVoluntarioAlumbrado = document.getElementById('inputObservacionesInspeccionVoluntarioAlumbrado2'+param).value  ? document.getElementById('inputObservacionesInspeccionVoluntarioAlumbrado2'+param).value :null;
    var idUsuario = document.getElementById('inputIdUsuario').value;

     console.log(param);
     console.log(idInstalacion);
     console.log(inputObservacionesPreventivo);
     console.log(inputFechaInspeccionVoluntariaSemaforo);
     console.log(inputObservacionesInspeccionVoluntarioSemaforo);
     console.log(inputEstadoInspeccionVoluntarioSemaforo);
     console.log(inputFechaInspeccionVoluntarioAlumbrado);
     console.log(inputEstadoInspeccionVoluntarioAlumbrado);
     console.log(inputObservacionesInspeccionVoluntarioAlumbrado);
     console.log(inputFechaPreventivo);

    var url = 'http://172.27.120.111/gestin/public/api/preventivo/modificar/' + param;

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    idInstalacion:idInstalacion ,
                    fechaPreventivo:inputFechaPreventivo , 
                    fechaInspeccionVoluntarioSemaforo: inputFechaInspeccionVoluntariaSemaforo ,
                    fechaInspeccionAlumbrado: inputFechaInspeccionVoluntarioAlumbrado ,
                    observacionesPreventivo: inputObservacionesPreventivo ,
                    observacionesInspeccionVoluntarioSemaforo: inputObservacionesInspeccionVoluntarioSemaforo ,
                    observacionesInspeccionAlumbrado: inputObservacionesInspeccionVoluntarioAlumbrado ,
                    estadoInspeccionVoluntarioSemaforo:  inputEstadoInspeccionVoluntarioSemaforo,
                    estadoInspeccionAlumbrado: inputEstadoInspeccionVoluntarioAlumbrado ,
                    idUsuario: idUsuario  
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenarPreventivo(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}
