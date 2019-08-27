document.onload = rellenarPintura();

function rellenarCrucePintura() { //Llamada a la API según el dato obtenido del primer combo
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
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCrucePintura(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })
    console.log("ha antes de");

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
        var fechaActuacion = document.getElementById('inputFechaActuacion').value;
        var fechaInspeccion = document.getElementById('inputFechaInspeccion').value;
        var observaciones = document.getElementById('inputObservaciones').value;
        var resolucion = document.getElementById('inputOk').checked; // mirar si guarda uno o guarda true 
        var idUsuario = document.getElementById('inputIdUsuario').value;
        resolucion = String(resolucion);

        console.log(idInstalacion);
        console.log(fechaActuacion);
        console.log(fechaInspeccion);
        console.log(observaciones);
        console.log(resolucion);
        console.log(idUsuario);


        var url = 'http://172.27.120.111/gestin/public/api/pintura/nueva';

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
    rellenarPintura();
}



function rellenarPintura() {

    var url = 'http://172.27.120.111/gestin/public/api/pintura'
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

                    p.innerHTML += `
                    <div class="container-fluid mt-1 ml-1 ">
                    <div class="row">
                        <div class="col-1 p-1">
                            <div class="input-group mt-2">
                                <button type="button" class="btn btn-secondary dropdown-toggle" name="" value=""
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    onclick="rellenarCrucePintura()">
                                    Inst
                                </button>
                                <div class="dropdown-menu" id="dropInstalacionPintura">
                                    <!-- inyectar código -->
                                </div>
                                <input type="text" class="form-control" name="" id="inputIdCruce2" value="${response[i]['idInstalacion']}">                          
                            </div>
                        </div>
           
                       <div class="col-3 p-1">
                          <input type="text" class="form-control mt-2" name="" id="inputUbicacion2" placeholder="Ubicación" value="${response[i]['ubicacion']}"
                             disabled>
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" name="" id="inputFechaActuacion2" value="${response[i]['fechaActuacion']}">
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccion2" value="${response[i]['fechaInspeccion']}">
                       </div>
                       <div class="col-3 p-1">
                          <input type="text" class="form-control mt-2" name="" id="observaciones2" value="${response[i]['observaciones']}">
                       </div>
           
                       <div class="col-1 p-1">
                          <input type="checkbox" class="mt-3 ml-5" name="resolucion" id="" ${activo}>
                       </div>
                       <div class="col-1 p-1 mt-2">

                       <div class="btn bg-warning" data-toggle="modal" data-target="#exampleModal" id="${response[i]['id']}"  onclick="getElementos('${response[i]['idInstalacion']}')"><i class="fas fa-info-circle"></i></div>
                         
                       <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarBusTren(this.id)"><i
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

function getElementos(id) {

     var url = 'http://172.27.120.111/gestin/public/api/elementospintura/'+id;
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

        var url = 'http://172.27.120.111/gestin/public/api/pintura/borrar/'+id;
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