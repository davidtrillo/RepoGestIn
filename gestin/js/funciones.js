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

function leerInstalacion(idInstalacion, ubicacion) {
    var inputInst = document.getElementById('inputInstalacion');
    inputInst.value = idInstalacion;

    var inputUbi = document.getElementById('inputUbicacion');
    inputUbi.value = ubicacion;

    var f1 = document.getElementById("formIntroducir");
    f1.innerHTML = "";
    var f2 = document.getElementById("formBody");
    f2.innerHTML = "";
    var f3 = document.getElementById("formFooter");
    f3.innerHTML = "";

    llamadaAPIInventario(idInstalacion);
    rellenarRegulador();
    rellenarCM();
    rellenarCruce();
}

function llamadaAPIInventario(idInstalacion) {
    var url = 'http://172.27.120.111/gestin/public/api/inventario/' + idInstalacion;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p1 = document.getElementById('inputRegulador');
            p1.value = response[0]['nombre'];
            var p2 = document.getElementById('inputIdCM');
            p2.value = response[0]['idCM'];
            var p3 = document.getElementById('inputWatios');
            p3.value = response[0]['watios'];
            // var p3 = document.getElementById('plano');
            // p3.href = response[0]['plano'];
            var p4 = document.getElementById('inputUbicacionCarlos');
            p4.value = response[0]['ubicacion'];
            var p5 = document.getElementById('inputUbicacionNYXPalma');
            p5.value = response[0]['ubicacionNYXPalma'];

            console.log('regulador:' + response[0]['nombre']);
            console.log('idCM:' + response[0]['idCM']);
            console.log('watios:' + response[0]['watios']);
            console.log('ubicacion:' + response[0]['ubicacion']);
            console.log('ubicacionNYXPalma:' + response[0]['ubicacionNYXPalma']);


        })

}

function rellenarRegulador() {
    var url = 'http://172.27.120.111/gestin/public/api/regulador';
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownRegulador');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
                <button class="dropdown-item" type="submit" id="dropBtnRegulador${[i]}" name="${response[i]['nombre']}" onclick="leerRegulador(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['nombre']}</button>
                `
            }
        })
}

function rellenarCM() {
    var url = 'http://172.27.120.111/gestin/public/api/cm';
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownCM');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
                <button class="dropdown-item" type="submit" id="${response[i]['id']}" name="${response[i]['ubicacionNYXPalma']}" onclick="leerCM(this.id,this.value,this.name)" value="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacionNYXPalma']}</button>
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

function leerRegulador(idRegulador, nombreRegulador) {
    var inputReg = document.getElementById('inputRegulador');
    inputReg.value = nombreRegulador;
    var inputIdRegulador = document.getElementById('inputIdRegulador');
    inputIdRegulador.value = idRegulador;
}

function leerCM(idCM, ubicacionCarlos, ubicacionNYXPalma) {
    var p1 = document.getElementById('inputIdCM');
    p1.value = idCM;
    var p2 = document.getElementById('inputUbicacionNYXPalma');
    p2.value = ubicacionNYXPalma;
    var p3 = document.getElementById('inputUbicacionCarlos');
    p3.value = ubicacionCarlos;
}

function leerCruce(idCruce) {
    var p1 = document.getElementById('inputCruce');
    p1.value = idCruce;
   
}

function editarInstalacion() {

    var idInstalacion = document.getElementById('inputInstalacion').value;
    var idRegulador = document.getElementById('inputIdRegulador').value ? document.getElementById('inputIdRegulador').value : null;
    var idCM = document.getElementById('inputIdCM').value ? document.getElementById('inputIdCM').value : null;
    var alimentacion = document.getElementById('inputCruce').value ? document.getElementById('inputCruce').value : 0;
    var watios = document.getElementById('inputWatios').value ? document.getElementById('inputWatios').value : null;
    var idUsuario = document.getElementById('inputIdUsuario').value;

    console.log(idInstalacion);
    console.log(idRegulador);
    console.log(idCM);
    console.log(alimentacion);
    console.log(watios);


    var url = 'http://172.27.120.111/gestin/public/api/inventario/modificar/' + idInstalacion;
    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRegulador: idRegulador,
                alimentacion:alimentacion,
                idCM: idCM,
                watios: watios,
                idUsuario: idUsuario

            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)

        })
}