document.onload = rellenar();

function rellenar(){
   // rellenarPrecios();
    //getPliego();
    rellenarTablaPrecios();
    rellenarPrecios();
}



function rellenarTablaPrecios(){

    var idUsuario = document.getElementById('inputIdUsuario').value;
    console.log(idUsuario);

    if (idUsuario=="a02161" || idUsuario=="a02132" || idUsuario=="a00774" || idUsuario=="A02161" || idUsuario=="A02132" || idUsuario=="A00774"){
            var p=document.getElementById("formTablaPrecios");
            p.innerHTML=`

            <div class="container-fluid ml-3 mt-0 p-1" >
                <div class="row">
                    <label class="ml-3 mt-1 p-1"> Precio MFO Cruce </label>
                    <div class="col-1  ml-3">
                        <input  class="form-control" id="inputMFOCruce" onfocusout="">
                    </div>
                </div>

                <div class="row">
                    <label class="ml-3 mt-1 p-1"> Precio MFO Paso de Peatones </label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFOPP" onfocusout="">
                    </div>
                      
                </div>
            
                <div class="row">
                    <label class="ml-3 mt-1 p-1"> Precio MFO Punto de Medida </label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFOPM" onfocusout="">
                    </div>
                       
                </div>

                <div class="row">
                <label class="ml-3 mt-1 p-1"> Precio MFO Cargador Eléctrico </label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFOCargador" onfocusout="">
                    </div>
 
                </div>   
                
                <div class="row">
                <label class="ml-3 mt-1 p-1"> Precio MFO Acire </label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFOAcire" onfocusout="">
                    </div>

                </div>   
                
                <div class="row">
                <label class="ml-3 mt-1 p-1"> Precio MFO Cámara</label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFOCamara" onfocusout="">
                    </div>

                </div>   

                <div class="row">
                <label class="ml-3 mt-1 p-1"> Precio MFO Central</label>
                <div class="col-1">
                    <input  class="form-control" id="inputMFOCentral" onfocusout="">
                </div>

                </div> 

                <div class="row">
                <label class="ml-3 mt-1 p-1"> Precio MFO Sector</label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFOSector" onfocusout="">
                    </div>

                </div> 

                <div class="row">
                <label class="ml-3 mt-1 p-1"> Precio MFO Nodo</label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFONodo" onfocusout="">
                    </div>

                </div> 

                <div class="row">
                    <label class="ml-3 mt-1 p-1"> Precio MFO Radar/Foto Rojo</label>
                    <div class="col-1">
                        <input  class="form-control" id="inputMFORadar" onfocusout="">
                    </div>
                </div>

                <div class="row">

                    <div class="col-2">
                        <button class="btn btn-primary" id="" onclick="editarPreciosMFO()">Guardar Precios MFO</button>
                    </div> 

                </div>

            </div>
            
            `
    }else{
        console.log("No tengo acceso a Tabla de Precios");
    }

}

function rellenarPrecios() {
    var url = 'http://172.27.120.120/gestin/public/api/preciosmfo'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            document.getElementById('inputMFOCruce').value=response[0]['preciomfocruce'];
            document.getElementById('inputMFOPP').value=response[0]['preciomfopp'];
            document.getElementById('inputMFOPM').value=response[0]['preciomfopm'];
            document.getElementById('inputMFOCargador').value=response[0]['preciomfocargador'];
            document.getElementById('inputMFOAcire').value=response[0]['preciomfoacire'];
            document.getElementById('inputMFOCamara').value=response[0]['preciomfocamara'];
            document.getElementById('inputMFOCentral').value=response[0]['preciomfocentral'];
            document.getElementById('inputMFOSector').value=response[0]['preciomfosector'];
            document.getElementById('inputMFONodo').value=response[0]['preciomfonodo'];
            document.getElementById('inputMFORadar').value=response[0]['preciomforadar'];            
        })
    
}

 function editarPreciosMFO() {
   // var id= param;
    var mfocruce = parseFloat(document.getElementById('inputMFOCruce').value) ? document.getElementById('inputMFOCruce').value : 0 ;
    var mfopp = parseFloat(document.getElementById('inputMFOPP').value) ? document.getElementById('inputMFOPP').value : 0 ;
    var mfopm = parseFloat(document.getElementById('inputMFOPM').value) ? document.getElementById('inputMFOPM').value : 0 ;
    var mfocargador = parseFloat(document.getElementById('inputMFOCargador').value) ? document.getElementById('inputMFOCargador').value : 0 ;
    var mfoacire = parseFloat(document.getElementById('inputMFOAcire').value) ? document.getElementById('inputMFOAcire').value : 0 ;
    var mfocamara = parseFloat(document.getElementById('inputMFOCamara').value) ? document.getElementById('inputMFOCamara').value : 0 ;
    var mfocentral = parseFloat(document.getElementById('inputMFOCentral').value) ? document.getElementById('inputMFOCentral').value : 0 ;
    var mfosector = parseFloat(document.getElementById('inputMFOSector').value) ? document.getElementById('inputMFOSector').value : 0 ;
    var mfonodo = parseFloat(document.getElementById('inputMFONodo').value) ? document.getElementById('inputMFONodo').value : 0 ;
    var mforadar = parseFloat(document.getElementById('inputMFORadar').value) ? document.getElementById('inputMFORadar').value : 0 ;
    
    


    var url = 'http://172.27.120.120/gestin/public/api/preciosmfo/modificar';

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                preciomfocruce: mfocruce,
                preciomfopp: mfopp,
                preciomfopm: mfopm,
                preciomfocargador: mfocargador,
                preciomfoacire: mfoacire,
                preciomfocamara: mfocamara,
                preciomfocentral: mfocentral,
                preciomfosector: mfosector,
                preciomfonodo: mfonodo,
                preciomforadar: mforadar
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


 
}

function setPliego() {
    // var id= param;
      if (document.getElementById('2018').checked) {
           var n =2018;
      }
      if (document.getElementById('2021').checked) {
        var n =2021;
   }   
 
 
     var url = 'http://172.27.120.120/gestin/public/api/setpliego';
 
     fetch(url, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 n: n,
        
             })
         })
         .then(res => res.json())
         .catch(error => console.error('Error:', error))
         .then(response => {
             alert(response)
         })
 

 }
 function getPliego() {
    var url = 'http://172.27.120.120/gestin/public/api/configuracionpliego'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {

            if (response[0][0]==2018) {
                document.getElementById('2018').checked=true;
                document.getElementById('2021').checked=false;
            }else{
                document.getElementById('2018').checked=false;
                document.getElementById('2021').checked=true;
            }                  
        })
    
}

function o2018() {
    console.log("estoy en o2018")
    if (document.getElementById("2018").checked==false) {
        console.log["estoy en 2018"]
        document.getElementById("2018").checked=true;
        document.getElementById("2021").checked=false;
        setPliego(2018);
    }
};

function o2021() {
    console.log("estoy en o2021")
    if (document.getElementById("2021").checked==false) {
        document.getElementById("2021").checked=true;
        document.getElementById("2018").checked=false;
        setPliego(2021);
    }
};