// Detect when dorpdownList is changing jquery
$("#dropdown-menu1 button").click(function () {
    var a = $(this).text();
    $("#inputTipologia").val($(this).text());
    var datoInput = document.getElementById('inputTipologia').value;
    enviarInput(datoInput);
})


function enviarInput(datoInput) { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/instalaciones/' + datoInput;
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
            var p = document.getElementById('dropdownInstalacion');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerInstalacion(this.value,this.name)" value="${response[i]['id']}" value2="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })


       

}



function escribirTipoActuacion13_332(descripcionTipoActuacion, idTipoActuacion) { //CAMBIO DE NOMENCLATURA

    var p2 = document.getElementById('inputTipoActuacion');
    p2.value = descripcionTipoActuacion;
}


async function leerInstalacion(idInstalacion, ubicacion) {

 // await  desactivarBotones();
    document.getElementById("editInstalacion").disabled=true;

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
    var elementoBtn=document.getElementById("dropdownElemento");
    elementoBtn.innerHTML=` <button class="dropdown-item" type="" id="" onclick=""> </button> `;
     


  await  llamadaAPIInventario(idInstalacion);
  await  rellenarRegulador();
 // await  rellenarCM();
  await  rellenarCruce();
  await rellenarElementos();
  
  document.getElementById("editInstalacion").disabled=false;
}

function rellenarElementos(){

    var idTipoInstalacion=document.getElementById('inputTipologia').value;
    var elementoBtn=document.getElementById("dropdownElemento");

    switch(idTipoInstalacion){

        case "CÁMARAS":
            console.log("Estoy en CÁMARAS");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnCamaras" onclick="formCamTv('CÁMARAS')">CÁMARAS</button>
                `
            break;
        case "CARGADORES ELÉCTRICOS":
             console.log("Estoy en CARGADORES ELÉCTRICOS");
             elementoBtn.innerHTML= `
             <button class="dropdown-item" type="button" id="btnCargadores" onclick="formCargadores('CARGADORES ELÉCTRICOS')">CARGADORES ELÉCTRICOS</button>
                 `
             break;
        case "CENTRAL":
            console.log("Estoy en CENTRAL");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnCentral" onclick="formCentrales('CENTRAL')">CENTRAL</button>
                `
            break;
        case "CONTROL DE ACCESOS":
            console.log("Estoy en CONTROL DE ACCESOS");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnControlAccesos" onclick="formControlAccesos('CONTROL DE ACCESOS')">CONTROL DE ACCESOS</button>
                `
            break;
        case "CRUCES":
            console.log("Estoy en CRUCES");
            elementoBtn.innerHTML= `
                <button class="dropdown-item" type="button" id="btnTarjetas" onclick="formTarjetas('TARJETAS SALIDA')">TARJETAS SALIDA</button>
                <button class="dropdown-item" type="button" id="btnTarjetas" onclick="formTarjetasCpu('TARJETAS CPU')">TARJETAS CPU</button>
                <button class="dropdown-item" type="button" id="btnTarjetas" onclick="formTarjetasFa('TARJETAS F.A.')">TARJETAS F.A.</button>
                <button class="dropdown-item" type="button" id="btnBusTren" onclick="formBusTren('BUS/TREN')">BUS/TREN</button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" type="button" id="btnOculta" onclick="formOculta('SEÑAL OCULTA')">SEÑAL OCULTA</button>
                <button class="dropdown-item" type="button" id="btnLed" onclick="formLed('LEDS')">LEDS</button>
                <button class="dropdown-item" type="button" id="btnDetectores" onclick="formDetectores('DETECTORES')">DETECTORES</button>
                <button class="dropdown-item" type="button" id="btnModulos" onclick="formModulo('MÓDULOS')">MÓDULOS</button>
                `
            break;
/*        case "ESPIRAS":
            console.log("Estoy en ESPIRAS");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnEspiras" onclick="formEspiras('ESPIRAS')">ESPIRAS</button>
                `
            break;*/
        case "FOTO ROJO":
            console.log("Estoy en FOTO ROJO");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnFotoRojo" onclick="formFotoRojo('FOTO ROJO')">FOTO ROJO</button>
                `
            break;
        case "NODO":
                console.log("Estoy en NODO");
                elementoBtn.innerHTML= `
                <button class="dropdown-item" type="button" id="btnNodo" onclick="formNodo('NODO')">NODO</button>
                    `
                break;
        case "PANEL INFORMATIVO":
            console.log("Estoy en PANEL INFORMATIVO");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnPanelInformativo" onclick="formPanelInformativo('PANEL INFORMATIVO')">PANEL INFORMATIVO</button>
                `
            break;
        case "PUNTO DE MEDIDA":
            console.log("Estoy en PUNTO DE MEDIDA");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnPuntoMedida" onclick="formPuntoMedida('PUNTO DE MEDIDA')">PUNTO DE MEDIDA</button>
                `
            break;
        case "RADAR":
            console.log("Estoy en RADAR");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnRadar" onclick="formRadares('RADAR')">RADAR</button>
                `
            break;
        case "RESIDUOS":
            console.log("Estoy en RESIDUOS");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnResiduos" onclick="formResiduos('RESIDUOS')">RESIDUOS</button>
                `
            break;
        case "SECTOR":
            console.log("Estoy en SECTOR");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnSector" onclick="formSector('SECTOR')">SECTOR</button>
                `
            break;
        case "SEÑALES LUMINOSAS":
            console.log("Estoy en SEÑALES LUMINOSAS");
            elementoBtn.innerHTML= `
            <button class="dropdown-item" type="button" id="btnSeñalesLuminosas" onclick="formSeñalesLuminosas('SEÑALES LUMINOSAS')">SEÑALES LUMINOSAS</button>
                `
            break;
        default:   
            elementoBtn.innerHTML = ` `;
            break;

}


}




function llamadaAPIInventario(idInstalacion) {
    var url = 'http://172.27.120.120/gestin/public/api/inventario/' + idInstalacion;
    fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://172.27.120.120',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p1 = document.getElementById('inputRegulador');
            p1.value = response[0]['idRegulador'];
           // var p2 = document.getElementById('inputIdCM');
           // p2.value = response[0]['idCM'];
          //  var p3 = document.getElementById('inputWatios');
          //  p3.value = response[0]['watios'];
            var p4 = document.getElementById('inputObservaciones');
            p4.value = response[0]['observaciones'];
            // var p3 = document.getElementById('plano');
            // p3.href = response[0]['plano'];
           // var p4 = document.getElementById('inputUbicacionCarlos');
          //  p4.value = response[0]['ubicacion'];
          //  var p5 = document.getElementById('inputUbicacionNYXPalma');
          //  p5.value = response[0]['ubicacionNYXPalma'];

            //console.log('regulador:' + response[0]['observaciones']);
            // console.log('idCM:' + response[0]['idCM']);
            // console.log('watios:' + response[0]['watios']);
            // console.log('ubicacion:' + response[0]['ubicacion']);
            // console.log('ubicacionNYXPalma:' + response[0]['ubicacionNYXPalma']);


        })

}

// function rellenarRegulador() {



    
//     var url = 'http://172.27.120.120/gestin/public/api/regulador';
//     fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(res => res.json())
//         .catch(error => console.error('Error:', error))
//         .then(response => {
//             var p = document.getElementById('dropdownRegulador');
//             p.innerHTML = '';
//             for (var i in response) {
//                 p.innerHTML += `
//                 <button class="dropdown-item" type="submit" id="dropBtnRegulador${[i]}" name="${response[i]['nombre']}" onclick="leerRegulador(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['nombre']}</button>
//                 `
//             }
//         })
// }
function rellenarRegulador() {

    var tipo="";
    regulador.forEach(function(value,index){ //recorrer la matriz de la tabla en tablas.js
        tipo += '<button class="dropdown-item" type="submit" value="'+ value +'" onclick="leerRegulador(this.value)" >'+ value +'</button>';
         
    });
   
    var p = document.getElementById('dropdownRegulador');
                 p.innerHTML = '';
                 
                     p.innerHTML = tipo;
                     

}





function rellenarCM() {
    var url = 'http://172.27.120.120/gestin/public/api/cm';
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
    var url = 'http://172.27.120.120/gestin/public/api/cruces';
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

            if (p){
            p.innerHTML = '';
            
            for (var i in response) {
                p.innerHTML += `
                <button class="dropdown-item" type="submit" id="${response[i]['id']}" name="${response[i]['ubicacion']}" onclick="leerCruce(this.id)" value="${response[i]['ubicacion']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
                `
            }
        }

        })
}

function leerRegulador(nombreRegulador) {
    //var inputReg = document.getElementById('inputRegulador');
    //inputReg.value = nombreRegulador;
     var inputRegulador = document.getElementById('inputRegulador');
     inputRegulador.value = nombreRegulador;
}


function leerCM(idCM, ubicacionCarlos, ubicacionNYXPalma) {
    var p1 = document.getElementById('inputIdCM');
    p1.value = idCM;
    var p2 = document.getElementById('inputUbicacionNYXPalma');
    p2.value = ubicacionNYXPalma;
   // var p3 = document.getElementById('inputUbicacionCarlos');
   // p3.value = ubicacionCarlos;
}

function leerCruce(idCruce) {
    var p1 = document.getElementById('inputCruce');
    p1.value = idCruce;
   
}

function editarInstalacion() {

    var idInstalacion = document.getElementById('inputInstalacion').value;
    var idRegulador = document.getElementById('inputRegulador').value ? document.getElementById('inputRegulador').value : '';
   // var idCM = document.getElementById('inputIdCM').value ? document.getElementById('inputIdCM').value : null;
   // var alimentacion = document.getElementById('inputCruce').value ? document.getElementById('inputCruce').value : 0;
   // var watios = document.getElementById('inputWatios').value ? document.getElementById('inputWatios').value : null;
    var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value : null;
    var idUsuario = document.getElementById('inputIdUsuario').value;

      console.log(idInstalacion);
      //console.log(idRegulador);
      //console.log(idCM);
      //console.log(alimentacion);
      //console.log(watios);


    var url = 'http://172.27.120.120/gestin/public/api/inventario/modificar/' + idInstalacion;
    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRegulador: idRegulador,
               // alimentacion:alimentacion,
               // idCM: idCM,
               // watios: watios,
                observaciones: observaciones,
                idUsuario: idUsuario

            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)

        })
}

// function desactivarBotones() {

  
//     var ac=document.getElementById("btnTarjetas");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnBusTren");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btn11_322");
//     ac.classList.remove("active");
   
//     var ac=document.getElementById("btn12_300");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btn13_200");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btn12_200");
//     ac.classList.remove("active");
   
//     var ac=document.getElementById("btn11_2in");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btn12_pp");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnOculta");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnLed");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnInvidentes");
//     ac.classList.remove("active");
   
//     var ac=document.getElementById("btnDescontadores");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnBaculos");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnColumnas");
//     ac.classList.remove("active");
   
//     var ac=document.getElementById("btnPulsadores");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnEspiras");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnPantallasCon");
//     ac.classList.remove("active");
   
//     var ac=document.getElementById("btnCCTV");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnCamIp");
//     ac.classList.remove("active");

//     var ac=document.getElementById("btnModulo");
//     ac.classList.remove("active");

// }