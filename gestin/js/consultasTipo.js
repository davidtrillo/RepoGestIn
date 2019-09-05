// Detect when dorpdownList is changing jquery
$("#dropdown-menu1 button").click(function () {
    var a = $(this).text();
    $("#inputTipologia").val($(this).text());
    var datoInput = document.getElementById('inputTipologia').value;
    enviarInput(datoInput);

})

function enviarInput(datoInput) { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.111/gestin/public/api/instalaciones/' + datoInput;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownInstalacion');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacion(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}

function rellenarCruce() {
    var url = 'http://172.27.120.111/gestin/public/api/cruces';
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
                <button class="dropdown-item" type="submit" id="${response[i]['id']}" name="${response[i]['ubicacion']}" onclick="leerCruce(this.id)" value="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                `
            }
        })
}

function leerCruce(idCruce) {
    var p1 = document.getElementById('inputCruce');
    p1.value = idCruce;
    
}

function leerInstalacion(idInstalacion, ubicacion) {
    var inputInst = document.getElementById('inputInstalacion');
    inputInst.value = idInstalacion;
    
    var inputUbi = document.getElementById('inputUbicacion');
    inputUbi.value = ubicacion;
    
     // aquí poner el codigo para ejecutar la consulta
     var t = document.getElementById('titulo');
     t.innerHTML='';
    pintarResultados("tarjetas", idInstalacion);
    pintarResultados("bustren", idInstalacion);
    pintarResultados("11_322", idInstalacion);
    pintarResultados("12_300", idInstalacion);
    pintarResultados("13_200", idInstalacion);
    pintarResultados("12_200", idInstalacion);
    pintarResultados("11_2in", idInstalacion);
    pintarResultados("12_pp", idInstalacion);
    pintarResultados("12_pea_bici", idInstalacion);
    pintarResultados("12_bici", idInstalacion);
    pintarResultados("invidentes", idInstalacion);
    pintarResultados("descontadores", idInstalacion);
    pintarResultados("baculos", idInstalacion);
    pintarResultados("columnas", idInstalacion);
    pintarResultados("pulsadores", idInstalacion);
    pintarResultados("espiras", idInstalacion);
    pintarResultados("pantallascon", idInstalacion);
    
}


// function lista(id) {

//     pintarResultados("tarjetas", id);

// }


function pintarResultados(tipo, id) {

    console.log(tipo);
    var url = 'http://172.27.120.111/gestin/public/api/' + tipo + '/' + id;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
                        if (response!="No se han encontrado resultados"){
                                    var t = document.getElementById('titulo');
                                    t.innerHTML += `        
                                    <!-- Títulos Form Nuevo-->
                                    <h4 class="mt-1"><b>${tipo.toUpperCase()}</b></h4>
                                    <div class="row ml-1">
                                        <div class="col-2">
                                            F.Actuación
                                        </div>
                                        <div class="col-2">
                                            Tipo Actuación
                                        </div>
                                        <div class="col-3">
                                            Observaciones
                                        </div>
                                        <div class="col-1">
                                            Albarán
                                        </div>
                                        <div class="col-1">
                                            Num. Serie
                                        </div>
                                        <div class="col-1">
                                            Precio
                                        </div>

                                    </div>
                                <!-- Fin Titulos -->
                                `;
                                // var p = document.getElementById('datos');
                                    for (var i in response) {
                                        t.innerHTML += `
                                    <div class="row mt-0" id="">
                                        <div class="col-2">
                                            <input type="text" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" value="${response[i]['fechaActuacion']}" disabled>
                                        </div>
                                        <div class="col-2">
                                            <input type="text" class="form-control mt-1" name="inputTipoActuacion" id="inputTipoActuacion"  value="${response[i]['descripcion']}"  disabled>
                                        </div>
                                        <div class="col-3">
                                            <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones"  value="${response[i]['observaciones']}"  disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran"  value="${response[i]['albaran']}" disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie"  value="${response[i]['idNumSerie']}" disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputPrecio" id="inputPrecio" value="${response[i]['precio']}"  disabled>
                                        </div>

                                    </div>  
                                        
                                        `
                                    }
                        }

        })


}