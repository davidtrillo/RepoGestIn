document.onload = rellenarMFO();

function rellenarCruceMFO() { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.111/gestin/public/api/acires'
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
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceMFO(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}


function rellenarCruceMFO2(param) { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.111/gestin/public/api/acires'
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
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceMFO2(${param},this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}

function leerCruceMFO(id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce');
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion');
    p2.value = ubicacion;
}

function leerCruceMFO2(param, id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce2'+param);
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion2'+param);
    p2.value = ubicacion;
}

async function nuevoMFO() {

    var idInstalacion = document.getElementById('inputIdCruce').value;

    if (idInstalacion.value != "") {
        var fechaActuacion = document.getElementById('inputFechaActuacion').value ? document.getElementById('inputFechaActuacion').value : null;
        var fechaInspeccion = document.getElementById('inputFechaInspeccion').value ? document.getElementById('inputFechaInspeccion').value : null;
        var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value : null;
        var resolucion = document.getElementById('inputOk').checked; // mirar si guarda uno o guarda true 
        var idUsuario = document.getElementById('inputIdUsuario').value ? document.getElementById('inputIdUsuario').value : null;
        var precio = document.getElementById('inputPrecio').value ? document.getElementById('inputPrecio').value : 0;
        resolucion = String(resolucion);


        var url = 'http://172.27.120.111/gestin/public/api/mfoacires/nueva';

       await fetch(url, {
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
                    resolucion: resolucion,
                    precio:precio
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

    }
    rellenarMFO();
}



function rellenarMFO() {

    var url = 'http://172.27.120.111/gestin/public/api/mfoacires/acires'
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
                            <div class="input-group mt-2">
                                <button type="button" class="btn btn-secondary dropdown-toggle" name="" value=""
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    onclick="rellenarCruceMFO2(${response[i]['id']})">
                                    Inst
                                </button>
                                <div class="dropdown-menu" id="dropInstalacionPintura${response[i]['id']}">
                                    <!-- inyectar código -->
                                </div>
                                <input type="text" class="form-control" name="" id="inputIdCruce2${response[i]['id']}" value="${response[i]['idInstalacion']}">                          
                            </div>
                        </div>
           
                       <div class="col-2 p-1">
                          <input type="text" class="form-control mt-2" name="" id="inputUbicacion2${response[i]['id']}" placeholder="Ubicación" value="${response[i]['ubicacion']}"
                             disabled>
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" data-val="false" name="" id="inputFechaActuacion2${response[i]['id']}" value="${fechaActuacion}">
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" data-val="false" name="" id="inputFechaInspeccion2${response[i]['id']}" value="${fechaInspeccion}">
                       </div>
                       <div class="col-3 p-1">
                          <input type="text" class="form-control mt-2" name="" id="observaciones2${response[i]['id']}" value="${response[i]['observaciones']}">
                       </div>
                       <div class="col-1 p-1">
                             <input type="text" class="form-control mt-2" name="" id="precio2${response[i]['id']}" value="${response[i]['precio']}">
                        </div>
                       <div class="col-1 p-1">
                          <input type="checkbox" class="mt-3 ml-5" name="resolucion" id="resolucion2${response[i]['id']}" ${activo}>
                       </div>
                       <div class="col-1 p-1 mt-2">

                                             
                       <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarMFO(this.id)"><i
                                class="fas fa-pencil-alt"></i></div>
                         
                        <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarMFO(this.id)"><i
                                class="fas fa-trash-alt"></i></div>

                       </div>
                    </div>
                 </div>
                 
                 `

                }
            }
        })


}



function borrarMFO(id) {

        var url = 'http://172.27.120.111/gestin/public/api/mfoacires/borrar/'+id;
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
                rellenarMFO(); 
            }, 1000);
}


function editarMFO(param) {
    var id= param;
    var inputIdCruce2 = document.getElementById('inputIdCruce2' + param).value ? document.getElementById('inputIdCruce2' + param).value : null ;
    var inputFechaActuacion2 = document.getElementById('inputFechaActuacion2' + param).value ? document.getElementById('inputFechaActuacion2' + param).value : null ;
    var inputFechaInspeccion2 = document.getElementById('inputFechaInspeccion2' + param).value ? document.getElementById('inputFechaInspeccion2' + param).value : null ;
    var observaciones2 = document.getElementById('observaciones2' + param).value ? document.getElementById('observaciones2' + param).value : null ;
    var resolucion2 = document.getElementById('resolucion2' + param).checked;
    resolucion2 = String(resolucion2);
    var idUsuario = document.getElementById('inputIdUsuario').value ;
    var precio = document.getElementById('precio2' + param).value ? document.getElementById('precio2' + param).value : 0 ;

     console.log(id);
     console.log(inputIdCruce2);
     console.log(inputFechaActuacion2);
     console.log(inputFechaInspeccion2);
     console.log(observaciones2);
     console.log(resolucion2);
     console.log(idUsuario);
     console.log(precio);

    var url = 'http://172.27.120.111/gestin/public/api/mfoacires/modificar/' + param;

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
        rellenarMFO(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}
