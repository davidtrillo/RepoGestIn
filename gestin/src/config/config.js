document.onload = rellenar();

function rellenar(){
   // rellenarPrecios();
    //getPliego();
    rellenarTablaPrecios();
    rellenarPrecios();
    rellenarAlta();
    rellenarEditar();
    rellenarBorrar();
}


function rellenarBorrar(){

    var p=document.getElementById("formBorrarInstalacion");
    p.innerHTML=`
        <div class="container-fluid mt-0 p-1">

            <div class="row">
                <div class="col-4">
                    <h3><b>Borrar instalación</b></h3>
                </div>
            </div>
        
            <div class="row">

                <div class="col-2">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoInstalacionBorrar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tipo Instalación</button>
                        <div class="dropdown-menu" id="dropdownTipoInstalacionBorrar" aria-labelledby="dropdownMenu2">
                            <!-- Aquí se inyecta el código mediante JS -->
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnIdInstalacionBorrar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Instalación</button>
                        <div class="dropdown-menu" id="dropdownIdInstalacionBorrar" aria-labelledby="dropdownMenu2">
                            <!-- Aquí se inyecta el código mediante JS -->
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-2">
                    <input class="form-control" id="tipoInstalacionBorrar" readonly>
                </div>
                <div class="col-2">
                    <input class="form-control" id="idInstalacionBorrar" readonly>
                </div>

                <div class="col-2">
                    <button class="btn btn-danger" id="" onclick="borrarInstalacion()">Borrar</button>
                </div>
                
            </div>
        </div>
    
    `;

    var url = 'http://172.27.120.120/gestin/public/api/tipoinstalacion/alta';
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
            var p = document.getElementById('dropdownTipoInstalacionBorrar');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['tipoInstalacion']}" onclick="leerInstalacionBorrar(this.value)" value="${response[i]['tipoInstalacion']}"> ${response[i]['tipoInstalacion']} </button>
             `
            }
        })
       

}


function rellenarEditar(){

    var p=document.getElementById("formEditarInstalacion");
    p.innerHTML=`
        <div class="container-fluid mt-0 p-1">

            <div class="row">
                <div class="col-4">
                    <h3><b>Editar instalación</b></h3>
                </div>
            </div>
        
            <div class="row">

                <div class="col-2">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoInstalacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tipo Instalación</button>
                        <div class="dropdown-menu" id="dropdownTipoInstalacion" aria-labelledby="dropdownMenu2">
                            <!-- Aquí se inyecta el código mediante JS -->
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnIdInstalacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Instalación</button>
                        <div class="dropdown-menu" id="dropdownIdInstalacion" aria-labelledby="dropdownMenu2">
                            <!-- Aquí se inyecta el código mediante JS -->
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <span>Ubicación</span>
                </div>
                <div class="col-2">
                     <span>Orden(Numérico)</span>
                </div>

            </div>

            <div class="row">
                <div class="col-2">
                    <input class="form-control" id="tipoInstalacionEditar">
                </div>
                <div class="col-2">
                    <input class="form-control" id="idInstalacionEditar">
                </div>

                <div class="col-4">
                    <input class="form-control" id="ubicacionEditar">
                </div>

                <div class="col-2">
                    <input class="form-control" id="ordenEditar">
                </div>
                <div class="col-2">
                    <button class="btn btn-primary" id="" onclick="editarInstalacion()">Guardar</button>
                </div>
                
            </div>
        </div>
    
    `;

    var url = 'http://172.27.120.120/gestin/public/api/tipoinstalacion/alta';
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
            var p = document.getElementById('dropdownTipoInstalacion');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['tipoInstalacion']}" onclick="leerInstalacionEditar(this.value)" value="${response[i]['tipoInstalacion']}"> ${response[i]['tipoInstalacion']} </button>
             `
            }
        })
       

}

function rellenarAlta(){

    var p=document.getElementById("formAltaInstalacion");
    p.innerHTML=`
        <div class="container-fluid mt-0 p-1">

            <div class="row">
                <div class="col-4">
                    <h3><b>Alta de instalación</b></h3>
                </div>
            </div>
        
            <div class="row">
                <div class="col-2">
                    <span>ID</span>
                </div>
                <div class="col-4">
                    <span>Ubicación</span>
                </div>
                <div class="col-2">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="btnInstalacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tipo Instalación</button>
                        <div class="dropdown-menu" id="dropdownInstalacion" aria-labelledby="dropdownMenu2">
                            <!-- Aquí se inyecta el código mediante JS -->
                        </div>
                    </div>

                </div>
                <div class="col-2">
                     <span>Orden(Numérico)</span>
                </div>

            </div>

            <div class="row">
                <div class="col-2">
                    <input class="form-control" id="idInstalacionAlta">
                </div>
                <div class="col-4">
                    <input class="form-control" id="ubicacionAlta">
                </div>
                <div class="col-2">
                    <input class="form-control" id="tipoInstalacionAlta" readonly>
                </div>
                <div class="col-2">
                    <input class="form-control" id="ordenAlta">
                </div>
                <div class="col-2">
                    <button class="btn btn-primary" id="" onclick="altaInstalacion()">Guardar</button>
                </div>
                
            </div>
        </div>
    
    `;

    var url = 'http://172.27.120.120/gestin/public/api/tipoinstalacion/alta';
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
             <button class="dropdown-item" type="submit" id="dropBtnInstalacion${[i]}" name="${response[i]['tipoInstalacion']}" onclick="leerInstalacionAlta(this.value)" value="${response[i]['tipoInstalacion']}"> ${response[i]['tipoInstalacion']} </button>
             `
            }
        })




}


async function altaInstalacion(){


    var id = document.getElementById('idInstalacionAlta').value;
    var cont = document.getElementById('ordenAlta').value;
    var ubicacion = document.getElementById('ubicacionAlta').value;
    var tipoInstalacion = document.getElementById('tipoInstalacionAlta').value;
    var idUsuario = document.getElementById('inputIdUsuario').value ? document.getElementById('inputIdUsuario').value : null;


    
    var url = 'http://172.27.120.120/gestin/public/api/instalaciones2/nueva2';

   await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            ubicacion: ubicacion,
            tipoInstalacion: tipoInstalacion,
            idUsuario: idUsuario,
            cont: cont
        })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        alert(response)
    })

    await altaInventario();

    document.getElementById('idInstalacionAlta').value="";
   document.getElementById('ordenAlta').value="";
   document.getElementById('ubicacionAlta').value="";
    document.getElementById('tipoInstalacionAlta').value="";


}

function altaInventario(){
    var idInstalacion = document.getElementById('idInstalacionAlta').value;
    var idUsuario = document.getElementById('inputIdUsuario').value ? document.getElementById('inputIdUsuario').value : null;

    
    var url = 'http://172.27.120.120/gestin/public/api/inventario/nueva2';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idInstalacion: idInstalacion,
            idUsuario: idUsuario
        })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        alert(response)
    })




}

function leerInstalacionAlta(id){

    var p= document.getElementById("tipoInstalacionAlta");
    p.value=id;
}

function leerIdInstalacionEditar(id,ubicacion,cont){
    var a= document.getElementById("idAntiguo");
    var p= document.getElementById("idInstalacionEditar");
    var u= document.getElementById("ubicacionEditar");
    var c= document.getElementById("ordenEditar");
    p.value=id;
    a.value=id;
    u.value=ubicacion;
    c.value=cont;

}

function leerIdInstalacionBorrar(id){

    var p= document.getElementById("idInstalacionBorrar");

    p.value=id;


}

function leerInstalacionEditar(id){

    var p= document.getElementById("tipoInstalacionEditar");
    p.value=id;
    

    var url = 'http://172.27.120.120/gestin/public/api/instalaciones/' + id;
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
            var p = document.getElementById('dropdownIdInstalacion');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnIdInstalacion${[i]}" name="${response[i]['ubicacion']}" name2="${response[i]['cont']}" onclick="leerIdInstalacionEditar(this.value,this.name,${response[i]['cont']})" value="${response[i]['id']}"> ${response[i]['id']} </button>
             `
            }
        })
}

function leerInstalacionBorrar(id){

    var p= document.getElementById("tipoInstalacionBorrar");
    p.value=id;
    

    var url = 'http://172.27.120.120/gestin/public/api/instalaciones/' + id;
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
            var p = document.getElementById('dropdownIdInstalacionBorrar');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnIdInstalacion${[i]}" name="${response[i]['ubicacion']}" name2="${response[i]['cont']}" onclick="leerIdInstalacionBorrar(this.value)" value="${response[i]['id']}"> ${response[i]['id']} </button>
             `
            }
        })
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

async function editarInstalacion() {
    // var id= param;
    var id = document.getElementById('idAntiguo').value;
    var idNueva = document.getElementById('idInstalacionEditar').value;
    var cont = document.getElementById('ordenEditar').value;
    var ubicacion = document.getElementById('ubicacionEditar').value;
    var tipoInstalacion = document.getElementById('tipoInstalacionEditar').value;
    var idUsuario = document.getElementById('inputIdUsuario').value ? document.getElementById('inputIdUsuario').value : null;

    console.log ( JSON.stringify({
        idNueva: idNueva,
        ubicacion: ubicacion,
        tipoInstalacion: tipoInstalacion,
        idUsuario: idUsuario,
        cont: cont
    }));
    var url = 'http://172.27.120.120/gestin/public/api/instalaciones2/modificar2/'+id;

  await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idNueva: idNueva,
            ubicacion: ubicacion,
            tipoInstalacion: tipoInstalacion,
            idUsuario: idUsuario,
            cont: cont
        })


    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        alert(response)
    })


    document.getElementById('idInstalacionEditar').value="";
    document.getElementById('ordenEditar').value="";
    document.getElementById('ubicacionEditar').value="";
    document.getElementById('tipoInstalacionEditar').value="";

    var url = 'http://172.27.120.120/gestin/public/api/inventario2/modificar2/'+id;

   await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idNueva: idNueva,
            idUsuario: idUsuario
        })


    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        alert(response)
    })


    
 
  
 }

 async function borrarInstalacion() {
    //Llamada a la API según el dato obtenido del primer combo

    var a= document.getElementById("idInstalacionBorrar").value;
    


    var url = 'http://172.27.120.120/gestin/public/api/instalaciones/borrar/' + a;
   await fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
     rellenarTodosAlmacen();
    }, 500);

 
    
    var url = 'http://172.27.120.120/gestin/public/api/inventario2/borrar2/' + a;
   await fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
    setTimeout(() => {
     rellenarTodosAlmacen();
    }, 500);

    var a= document.getElementById("idInstalacionBorrar");
    a.value ="";
    var tipBorrar= document.getElementById("tipoInstalacionBorrar");
    tipBorrar.value="";

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