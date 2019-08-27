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

function leerCrucePreventivo(id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce');
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion');
    p2.value = ubicacion;
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

        console.log(inputFechaPreventivo);
        console.log(inputObservacionesPreventivo);
        console.log(inputFechaInspeccionVoluntariaSemaforo);
        console.log(inputObservacionesInspeccionVoluntarioSemaforo);
        console.log(inputEstadoInspeccionVoluntarioSemaforo);
        console.log(inputFechaInspeccionVoluntarioAlumbrado);
        console.log(inputEstadoInspeccionVoluntarioAlumbrado);
        console.log(inputObservacionesInspeccionVoluntarioAlumbrado);


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
    rellenarPreventivo();
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
                p.innerHTML = '';
                for (var i in response) {

                    p.innerHTML += `
                    <div class="container-fluid mt-1 ml-1 bg-light ">

                    <div class="row">
                       <div class="col-1 p-1">
                          <span><b>Instalación</b></span>
                          <div class="input-group mt-2">
                             <button type="button" class="btn btn-secondary dropdown-toggle" name="" value=""
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                onclick="rellenarCrucePreventivo()">
                                Inst
                             </button>
                             <div class="dropdown-menu" id="dropInstalacionPintura">
                                <!-- inyectar código -->
                             </div>
                             <input type="text" class="form-control" name="" id="inputIdCruce" value="">
                                
                          </div>
                       </div>
                    
                       <div class="col-2 p-1">
                          <span><b>Ubicación</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputUbicacion" placeholder="Ubicación" value="" disabled>
                       </div>
                       <div class="col-xd-1 p-1">
                          <span><b>Fecha Preventivo</b></span>
                          <input type="date" class="form-control mt-2" name="" id="inputFechaPreventivo" value="${response[i]['fechaPreventivo']}">
                       </div>
                       <div class="col-5 p-1">
                          <span><b>Observaciones Preventivo</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputObservacionesPreventivo" value="${response[i]['observacionesPreventivo']}">
                       </div>
                    </div>
                    
                    
                    
                    <div class="row">
                       <div class="col-xd-1 p-1">
                          <span><b>Fecha Insp. Vol. Sem.</b></span>
                          <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccionVoluntariaSemaforo" value="${response[i]['fechaInspeccionVoluntariaSemaforo']}">
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
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="Favorable">Favorable</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="Leve">Leve</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="Condicional">Condicional</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoSemaforo(this.value)" value="No Favorable">No Favorable</button>
                             </div>
                                <input type="text" class="form-control mt-2" name="" id="inputEstadoInspeccionVoluntarioSemaforo" value="${response[i]['fechaInspeccionVoluntariaSemaforo']}">
                          </div>
                       </div>
                       <div class="col-2 p-1">
                          <span><b>Observaciones Insp. Vol. Sem.</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputObservacionesInspeccionVoluntarioSemaforo" value="${response[i]['observacionesInspeccionVoluntarioSemaforo']}">
                       </div>
                       <div class="col-xd-1 p-1">
                          <span><b>Fecha Insp. Vol. Alum.</b></span>
                          <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccionVoluntarioAlumbrado" value="${response[i]['fechaInspeccionVoluntarioAlumbrado']}">
                       </div>
                       <div class="col-2 p-1">
                          <span><b>Estado Insp. Vol. Alum.</b></span>
                          <div class="input-group ">
                             <button type="button" class="btn btn-secondary dropdown-toggle p-1 mt-2" name="" value=""
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                onclick="">
                                Estado
                             </button>
                             <div class="dropdown-menu" id="dropEstadoSemaforo">
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="Favorable">Favorable</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="Leve">Leve</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="Condicional">Condicional</button>
                                <button class="dropdown-item" type="submit" id="" name="" onclick="leerEstadoAlumbrado(this.value)" value="No Favorable">No Favorable</button>
                             </div>
                                <input type="text" class="form-control mt-2" name="" id="inputEstadoInspeccionVoluntarioAlumbrado" value="${response[i]['estadoInspeccionVoluntarioAlumbrado']}">
                          </div>
                       </div>
                       <div class="col-2 p-1">
                          <span><b>Observaciones Insp. Vol. Alum.</b></span>
                          <input type="text" class="form-control mt-2" name="" id="inputObservacionesInspeccionVoluntarioAlumbrado" value="${response[i]['observacionesInspeccionVoluntarioAlumbrado']}">
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
    var id= param;
    var inputIdCruce2 = document.getElementById('inputIdCruce2' + param).value;
    var inputFechaActuacion2 = document.getElementById('inputFechaActuacion2' + param).value;
    var inputFechaInspeccion2 = document.getElementById('inputFechaInspeccion2' + param).value;
    var observaciones2 = document.getElementById('observaciones2' + param).value;
    var resolucion2 = document.getElementById('resolucion2' + param).checked;
    resolucion2 = String(resolucion2);
    var idUsuario = document.getElementById('inputIdUsuario').value;
    var precio = document.getElementById('precio2' + param).value;

     console.log(id);
     console.log(inputIdCruce2);
     console.log(inputFechaActuacion2);
     console.log(inputFechaInspeccion2);
     console.log(observaciones2);
     console.log(resolucion2);
     console.log(idUsuario);
     console.log(precio);

    var url = 'http://172.27.120.111/gestin/public/api/preventivo/modificar/' + param;

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
                resolucion:resolucion2,
                precio:precio    
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
