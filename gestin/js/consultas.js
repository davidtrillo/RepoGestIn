

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

    console.log(idInstalacion); // aquí poner el codigo para ejecutar la consulta
}