




async function nuevaLed() { //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var color = document.getElementById('inputColor').value ? document.getElementById('inputColor').value :"";
    var fechaActuacion = document.getElementById('inputFechaActuacion').value;
    var nid = document.getElementById('inputNID').value ;
    var idUsuario = document.getElementById('inputIdUsuario').value;
    var nNID=99;

if(nid !="" && nid.length == 14){  //-COMPROBAR SI el campo NID está lleno

    nLeds=nid[10];//Si está lleno mirar el número de lentes máximos que puede tener 3 o 2 o 1

    //COMPROBAR cuantos registros tiene ese NID activos
    var url = 'http://172.27.120.120/gestin/public/api/lednum2/nleds/'+nid;
         vCount = await fetch(url, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then(res => res.json())
             .catch(error => console.error('Error:', error))
             .then(response => {
                 return response;
             })
          nNID = vCount[0]['c'];

        //Si son igual o superior a 3 o 2, según el número, sacar un aviso, borrar los datos de nuevo.
             switch(true){
                case(nLeds>nNID)://Cuando hay más lentes que NIDs dados de alta. Se puede dar de alta otra lente.
            
                        if (idInstalacion.value != "") { //AQUÍ SE DA DE ALTA EL NUEVO LED

                            //validar fecha correcta
                            if (validarFormatoFechaLed(fechaActuacion)) { //CAMBIO DE NOMENCLATURA
                                if (existeFechaLed(fechaActuacion)) { //CAMBIO DE NOMENCLATURA

                                } else {
                                    alert("La fecha introducida no existe.");
                                    return;
                                }
                            } else {
                                alert("El formato de la fecha es incorrecto.");
                                return;
                            }
                            var idNumSerie = document.getElementById('inputNumSerie').value ? document.getElementById('inputNumSerie').value :"0";  
                            var albaran = document.getElementById('inputAlbaran').value ? document.getElementById('inputAlbaran').value :"0";  
                            var tipo = document.getElementById('inputTipo').value ? document.getElementById('inputTipo').value :"";  
                            var fabricacion = document.getElementById('inputFabricacion').value ? document.getElementById('inputFabricacion').value :"";  
                            var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value :"";
                            var activo = document.getElementById('inputActivoLed').checked;
                            var instalada = document.getElementById('inputInstaladaLed').checked;
                            var almacen = null;
                            var residuos = null;
                            
                            activo = String(activo);
                            instalada = String(instalada);
                            almacen = String(almacen);
                            residuos = String(residuos);
                           

                            var idUsuario = document.getElementById('inputIdUsuario').value;
                            var url = 'http://172.27.120.120/gestin/public/api/led/nueva';

                            fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        idInstalacion: idInstalacion,
                                        color: color,
                                        idNumSerie: idNumSerie,
                                        albaran: albaran,
                                        nid: nid,
                                        observaciones: observaciones,
                                        fechaActuacion: fechaActuacion,
                                        idUsuario: idUsuario,
                                        tipo: tipo,
                                        fabricacion: fabricacion,
                                        activo: activo,
                                        almacen:almacen,
                                        residuos: residuos,
                                        instalada: instalada
                                    })
                                })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    alert(response)
                                })

                        }                 

                break;

                case(nLeds<=nNID)://Cuando hay igual de lentes que NIDs dados de alta. No se puede dar de alta la lente, hay que desactivar una.
                    if (nLeds>1){
                        alert("No se puede crear un nuevo registro. El NID "+ nid + " ya tiene " + nLeds + " lentes activas en esta instalación");
                    } else {
                        alert("No se puede crear un nuevo registro. El NID "+ nid + " ya tiene " + nLeds + " lente activa en esta instalación");
                    }
                break;

             }

         
}else{

    alert("Para dar de alta una lente se debe seleccionar NID válido.");

        }

    setTimeout(() => {
        rellenarTodosLed(); //CAMBIO DE NOMENCLATURA
    }, 1000);

}

function validarFormatoFechaLed(campo) { //CAMBIO DE NOMENCLATURA
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {

        return true;
    } else {

        return false;
    }
}

function existeFechaLed(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var day = fechaf[2];
    var month = fechaf[1];
    var year = fechaf[0];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function existeFecha2Led(fecha) { //CAMBIO DE NOMENCLATURA
    var fechaf = fecha.split("/");
    var d = fechaf[2];
    var m = fechaf[1];
    var y = fechaf[0];
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}


function rellenarNIDLed() { //NID


    var cr=document.getElementById("inputInstalacion");
    
    var url = 'http://172.27.120.120/gestin/public/api/nid/'+cr.value;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownNIDLed');
            p.innerHTML = '';
            for (var i in response) {
                //var str=response[i]['nid'];
              
                p.innerHTML += `
                    <button class="dropdown-item" type="submit" id="dropBtnNID${[i]}" name="${response[i]['nid']}" onclick="leerNIDLed(this.name)">${response[i]['nid']}</button> 
                    `
                
            }
        })
}

function leerNIDLed(NID) { //NID
    var p1 = document.getElementById('inputNID');
    p1.value = NID;
}

 async function formLed(elemento) { //CAMBIO DE NOMENCLATURA
    var instalacion = document.getElementById("inputInstalacion");

    //desactivarBotones();
   // var ac=document.getElementById("btnLed");
    //ac.classList.add("active");
    var inputElemento = document.getElementById("inputElemento");
    inputElemento.value=elemento;

    if (instalacion.value != "") {
        var f1 = document.getElementById("formIntroducir");
        f1.innerHTML = `
        
        <!-- Títulos Form Nuevo-->
 <div class="row ml-1">

        <div class="col-1 pl-0">
        <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="btnNID" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    NID
                </button>
                <div class="dropdown-menu" id="dropdownNIDLed" aria-labelledby="dropdownNID">
                            <!-- Aquí se iyecta el código mediante JS -->
                </div>
         
            </div>
        </div>

        <div class="col-2 pl-0">
            F.Actuación
        </div>
        <div class="col-1 pl-0">
            <div class="dropdown" >
              <button class="btn btn-secondary dropdown-toggle" type="button"  id="btnTipo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tipo
              </button>
                <div class="dropdown-menu" id="dropdownTipo" aria-labelledby="dropdownTipo">
                    <button class="dropdown-item" onclick="escribirTipo('100 mm')" >100 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200 mm')" >200 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200 mm Peatón')" >200 mm Peatón</button>
                    <button class="dropdown-item" onclick="escribirTipo('200 mm Bici')" >200 mm Bici</button>
                    <button class="dropdown-item" onclick="escribirTipo('300 mm')" >300 mm</button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" onclick="escribirTipo('200x200 Peatón')" >200x200 Peatón</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200 Bici')" >200x200 Bici</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200 Peatón/Bici')" >200x200 Bici/Peatón</button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" onclick="escribirTipo('Descontador Verde')" >Descontador Verde</button>
                    <button class="dropdown-item" onclick="escribirTipo('Descontador Rojo/Verde')" >Descontador Rojo/Verde</button>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" onclick="escribirTipo('CyberPass')" >CyberPass</button>
                    <button class="dropdown-item" onclick="escribirTipo('PassBlue Peatón')" >PassBlue Peatón</button>
                    <button class="dropdown-item" onclick="escribirTipo('PassBlue Peatón/Bici')" >PassBlue Peatón/Bici</button>
                </div>
            </div>
        </div>
        <div class="col-1 pl-0">
            <div class="dropdown" >
              <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Color
              </button>
                <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                    <button class="dropdown-item" onclick="escribirColor('Rojo')" >Rojo</button>
                    <button class="dropdown-item" onclick="escribirColor('Ámbar')" >Ámbar</button>
                    <button class="dropdown-item" onclick="escribirColor('Verde')" >Verde</button>
                    <button class="dropdown-item" onclick="escribirColor('Rojo Flecha')" >Rojo Flecha</button>
                    <button class="dropdown-item" onclick="escribirColor('Ámbar Flecha')" >Ámbar Flecha</button>
                    <button class="dropdown-item" onclick="escribirColor('Verde Flecha')" >Verde Flecha</button>
                    <button class="dropdown-item" onclick="escribirColor('Blanco Horizontal')" >Blanco Horizontal</button>
                    <button class="dropdown-item" onclick="escribirColor('Blanco Vertical')" >Blanco Vertical</button>
                    <button class="dropdown-item" onclick="escribirColor('Blanco Triángulo')" >Blanco Triángulo</button>
                </div>
            </div>
        </div>
        <div class="col-1 pl-0">
            <div class="dropdown" >
              <button class="btn btn-secondary dropdown-toggle" type="button" id="btnFabricacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Fabricacion
              </button>
                <div class="dropdown-menu" id="dropdownFabricacion" aria-labelledby="dropdownFabricacion">
                    <button class="dropdown-item" onclick="escribirFabricacion('Matricial')" >Matricial</button>
                    <button class="dropdown-item" onclick="escribirFabricacion('Alta Potencia')" >Alta Potencia</button>
                </div>
            </div>
        </div>
              <div class="col-1 pl-0">
              Num. Serie     
              </div>
              <div class="col-1 pl-0">
                 Albarán
              </div>
              <div class="col-2 pl-0">
                  Observaciones
              </div>
              <div class="col-1 pl-0">
                <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Activa</span> 
                <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Instalada</span>
                <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Almacén</span> 
                <span class="ml-0 mb-0" style="writing-mode: vertical-lr;transform: rotate(180deg);">Residuos</span> 
  
              </div>
        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1 ml-1" id="formGuardar">
              <div class="col-1 pl-0">
                <input type="text" class="form-control mt-1" name="inputNID" id="inputNID">
              </div>
              <div class="col-2  pl-0">
                  <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
              </div>
              <div class="col-1  pl-0">
                  <input type="text" class="form-control mt-1" name="inputTipo" id="inputTipo" >
              </div>
              <div class="col-1  pl-0">
                  <input type="text" class="form-control mt-1" name="inputColor" id="inputColor">
              </div>
              <div class="col-1  pl-0">
                    <input type="text" class="form-control mt-1" name="inputFabricacion" id="inputFabricacion">
              </div>
              <div class="col-1  pl-0">
                  <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie" onfocusout="comprobarNumSerieLed()">
              </div>
              <div class="col-1  pl-0">
                  <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
              </div>
              <div class="col-2  pl-0">
                  <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones">
              </div>
              <div class="col-1  pl-0">
              <!-- ALERTAAAAA ESTÁ AL REVES PERO FUNCIONA ASÍ POR NO CAMBIAR TODO EL CÓDIGO!!! INSTALADA ES ACTIVO Y ACTIVO ES INSTALADA -->
                    <input type="checkbox" class=" mt-3 ml-2" name="inputInstaladaLed" id="inputInstaladaLed" onclick="checkLedInstalada()"> 
                    <input type="checkbox" class=" mt-3 ml-2" name="inputActivoLed" id="inputActivoLed" onclick="checkLedActiva()">

             </div>
              <div class="col-1  pl-0">
                <div class="btn btn-primary ml-3" onclick="nuevaLed()"><i class="fas fa-save"></i></div>
              
              </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        
        `
      
        // rellenar todos los registros 
       await rellenarNIDLed();//NID
       await rellenarTodosLed();//CAMBIO DE NOMENCLATURA
    }
}

function escribirTipo(param) {
    var p1=document.getElementById("inputTipo");    
    p1.value=param;
}

function escribirTipo2(param,id) {
    var p1=document.getElementById("inputTipoTar"+id);    
    p1.value=param;
}

function escribirColor(param) {
    var p1=document.getElementById("inputColor");    
    p1.value=param;
}


function escribirColor2(param,id) {
    var p1=document.getElementById("inputColorTar"+id);    
    p1.value=param;
}

function escribirFabricacion(param) {
    var p1=document.getElementById("inputFabricacion");    
    p1.value=param;
}
function escribirFabricacion2(param,id) {
    var p1=document.getElementById("inputFabricacionTar"+id);    
    p1.value=param;
}

async function rellenarTodosLed() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;

    var url = 'http://172.27.120.120/gestin/public/api/led/' + idInstalacion
     
    
   await fetch(url, {
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
                    if (response[i]['activo'] == "true") {
                        var activo = "checked";
                    } else {
                        var activo = "";
                    }
            
                    if (response[i]['almacen'] == "true") {
                        var almacen = "checked";
                    } else {
                        var almacen = "";
                    }
                    if (response[i]['residuos'] == "true") {
                        var residuos = "checked";
                    } else {
                        var residuos = "";
                    }
                    if (response[i]['instalada'] == "true") {
                        var instalada = "checked";
                    } else {
                        var instalada = "";
                    }
                    
                    p.innerHTML += `
                 <div class="row mt-1 ml-1" id="">
                 <div class="col-1 pl-0">
                     <input type="text" class="form-control mt-1" name="" id="inputNIDTar${response[i]['id']}"  value="${response[i]['nid']}">
                 </div>

                        <div class="col-2 pl-0">
                            <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                            <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                        </div>

                        <div class="col-1 mt-1 pl-0" >
                            <div class="input-group">
                                <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipoTar${response[i]['id']}" value="${response[i]['tipo']}">
                                <div class="input-group-append">

                                        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>

                                        <div class="dropdown-menu">
                                                <button class="dropdown-item" onclick="escribirTipo2('100 mm',${response[i]['id']})" >100 mm</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('200 mm',${response[i]['id']})" >200 mm</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('200 mm Peatón',${response[i]['id']})" >200 mm Peatón</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('200 mm Bici',${response[i]['id']})" >200 mm Bici</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('300 mm',${response[i]['id']})" >300 mm</button>
                                            <div class="dropdown-divider"></div>
                                                <button class="dropdown-item" onclick="escribirTipo2('200x200 Peatón',${response[i]['id']})" >200x200 Peatón</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici',${response[i]['id']})" >200x200 Bici</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici/Peatón',${response[i]['id']})" >200x200 Bici/Peatón</button>
                                            <div class="dropdown-divider"></div>
                                                <button class="dropdown-item" onclick="escribirTipo2('Descontador Verde',${response[i]['id']})" >Descontador Verde</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('Descontador Rojo/Verde',${response[i]['id']})" >Descontador Rojo/Verde</button>
                                            <div class="dropdown-divider"></div>
                                                <button class="dropdown-item" onclick="escribirTipo2('CyberPass',${response[i]['id']})" >CyberPass</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('PassBlue Peatón',${response[i]['id']})" >PassBlue Peatón</button>
                                                <button class="dropdown-item" onclick="escribirTipo2('PassBlue Peatón/Bici',${response[i]['id']})" >PassBlue Peatón/Bici</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1 mt-1 pl-0" >


                                    <div class="input-group">
                                        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputColorTar${response[i]['id']}" value="${response[i]['color']}">
                                        <div class="input-group-append">

                                                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span class="sr-only">Toggle Dropdown</span>
                                                </button>

                                                <div class="dropdown-menu">
                                                    <button class="dropdown-item" onclick="escribirColor2('Rojo',${response[i]['id']})" >Rojo</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Ámbar',${response[i]['id']})" >Ámbar</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Verde',${response[i]['id']})" >Verde</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Rojo Flecha',${response[i]['id']})" >Rojo Flecha</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Ámbar Flecha',${response[i]['id']})" >Ámbar Flecha</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Verde Flecha',${response[i]['id']})" >Verde Flecha</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Blanco Horizontal',${response[i]['id']})" >Blanco Horizontal</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Blanco Vertical',${response[i]['id']})" >Blanco Vertical</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Blanco Triángulo',${response[i]['id']})" >Blanco Triángulo</button>
                                                </div>
                                        </div>
                                    </div>
                        </div>
                        <div class="col-1 mt-1 pl-0">
                                <div class="dropdown" >
                                
                                        <div class="input-group">
                                        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputFabricacionTar${response[i]['id']}" value="${response[i]['fabricacion']}">
                                            <div class="input-group-append">

                                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span class="sr-only">Toggle Dropdown</span>
                                                    </button>

                                                    <div class="dropdown-menu">
                                                    <button class="dropdown-item" onclick="escribirFabricacion2('Matricial',${response[i]['id']})" >Matricial</button>
                                                    <button class="dropdown-item" onclick="escribirFabricacion2('Alta Potencia',${response[i]['id']})" >Alta Potencia</button>
                                                    </div>
                                            </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-1 pl-0">
                           <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}" onfocusout="comprobarNumSerieLed()">
                        </div>
                        <div class="col-1 pl-0">
                           <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                        </div>
                        <div class="col-2 pl-0">
                            <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                        </div>
                        <div class="col-1 pl-0">
                            <input type="checkbox" class=" mt-3 ml-2" name="" id="inputActivoLedTar${response[i]['id']}" onclick="checkLedActiva(${response[i]['id']})" ${activo}>
                            <input type="checkbox" class=" mt-3 ml-2" name="" id="inputInstaladaLedTar${response[i]['id']}" onclick="checkLedInstalada(${response[i]['id']})"  ${instalada}>
                            <input type="checkbox" class=" mt-3 ml-3" name="" id="inputAlmacenLedTar${response[i]['id']}" onclick="checkLedAlmacen(${response[i]['id']})"  ${almacen}>
                            <input type="checkbox" class=" mt-3 ml-2" name="" id="inputResiduosLedTar${response[i]['id']}" onclick="checkLedResiduos(${response[i]['id']})" ${residuos}>
                        </div>
                        <div class="col-1 pl-0">
                            <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarLed(this.id)" title="Guardar edición"><i class="fas fa-pencil-alt"></i></div>
                            <div class="btn btn-danger" title="Eliminar registro" id="${response[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
                        </div>

              </div>  
                 
                 `

                }
            }
        })
        await  comprobarNumSerieLed2();
        await  rellenarFooterLed();//CAMBIO DE NOMENCLATURA
}

function rellenarFooterLed(){//CAMBIO DE NOMENCLATURA
    var idInstalacion = document.getElementById('inputInstalacion').value;
    var url = 'http://172.27.120.120/gestin/public/api/ledi/activas/'+ idInstalacion;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response == "No se han encontrado resultados activos") {
                alert(response);

            } else {
                var p = document.getElementById('cabecera');
                p.innerHTML = '';
                p.innerHTML=`
                <h3><b>Instalaciones</b></h3>
                <span class="ml-1">Total de <b>Señales Leds</b> Activos: ${response[0]['c']}</span>
                `
            }
        })

}


async function borrarLed(param) {
    //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/led/borrar/' + param
   await fetch(url, {
            method: 'DELETE'

        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })
   
        rellenarTodosLed();//CAMBIO DE NOMENCLATURA
  
}

async function editarSimpleLed(param) {//CAMBIO DE NOMENCLATURA
    var inputIdTar = param;
    var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
    var inputColorTar = document.getElementById('inputColorTar' + param).value;
    var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
    var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
    var inputNIDTar = document.getElementById('inputNIDTar' + param).value;
    var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
    var inputFabricacionTar = document.getElementById('inputFabricacionTar' + param).value;
    var inputTipoTar = document.getElementById('inputTipoTar' + param).value;
    var inputActivoLedTar = document.getElementById('inputActivoLedTar' + param).checked;
    var inputAlmacenLedTar = document.getElementById('inputAlmacenLedTar' + param).checked;
    var inputInstaladaLedTar = document.getElementById('inputInstaladaLedTar' + param).checked;
    var inputResiduosLedTar = document.getElementById('inputResiduosLedTar' + param).checked;



    inputActivoLedTar = String(inputActivoLedTar);
    inputAlmacenLedTar = String(inputAlmacenLedTar);
    inputResiduosLedTar = String(inputResiduosLedTar);
    inputInstaladaLedTar = String(inputInstaladaLedTar);

    var idUsuario = document.getElementById('inputIdUsuario').value;

    //  console.log(inputIdTar);
    //  console.log(inputFechaActuacionTar);
    //  console.log(inputColorTar);
    //  console.log(inputObservacionesTar);
    //  console.log(inputNumSerieTar);
    //  console.log(inputFabricacionTar);
    //  console.log(inputActivoLedTar);
    //  console.log(idUsuario);
    //  console.log(inputNIDTar);


    //validar fecha correcta
    if (validarFormatoFechaLed(inputFechaActuacionTar)) {
        if (existeFechaLed(inputFechaActuacionTar)) {

        } else {
            alert("La fecha introducida no existe.");
            return;
        }
    } else {
        alert("El formato de la fecha es incorrecto.");
        return;
    }
    var url = 'http://172.27.120.120/gestin/public/api/led/modificar/' + param;

    await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: inputIdTar,
                color: inputColorTar,
                idNumSerie: inputNumSerieTar,
                albaran:inputAlbaranTar,
                nid:inputNIDTar,
                observaciones: inputObservacionesTar,
                fechaActuacion: inputFechaActuacionTar,
                idUsuario: idUsuario,
                fabricacion: inputFabricacionTar,
                tipo: inputTipoTar,
                activo: inputActivoLedTar,
                almacen:inputAlmacenLedTar,                
                instalada: inputInstaladaLedTar,
                residuos: inputResiduosLedTar
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


   
        rellenarTodosLed(); //CAMBIO DE NOMENCLATURA

}


async function editarLed(param) {


    if  (document.getElementById('inputAlmacenLedTar' + param).checked){
        if (confirm("El registro actual se borrará de la instalación y pasará a Almacén.")){
           
            var c=document.getElementById("modalFechaAlmacenBody");
            c.innerHTML=`
                        <!-- Inicio body 1 -->
                        <div class="row" id="">
                            <div class="col">
                                <b>F.Actuación</b>
                            </div>                  
                        </div>
        
                        <div class="row" id="">
                            <div class="col p-3">
                                Nueva Fecha de Actuación:
                                <input type="date" class="form-control mt-1" name="inputFechaActuacionAlmacen" id="inputFechaActuacionAlmacen" placeholder="DD/MM/YYYY">
                                <input type="hidden" id="claveid" value="${param}">
                            </div>           
                        </div>        
                        <!-- fin body 1  -->
                    `;  
        
            $('#staticBackdrop3').modal('show');
        
            return;

        }else{
            //alert("Es un no");
            return;
        }
    
    }else{
        if  (document.getElementById('inputResiduosLedTar' + param).checked){
            if (confirm("El registro actual se borrará de la instalación y pasará a Residuos.")){
               
                var c=document.getElementById("modalFechaResiduosBody");
                c.innerHTML=`
                            <!-- Inicio body 1 -->
                            <div class="row" id="">
                                <div class="col">
                                    <b>F.Actuación</b>
                                </div>                  
                            </div>
            
                            <div class="row" id="">
                                <div class="col p-3">
                                    Nueva Fecha de Actuación:
                                    <input type="date" class="form-control mt-1" name="inputFechaActuacionResiduos" id="inputFechaActuacionResiduos" placeholder="DD/MM/YYYY">
                                    <input type="hidden" id="claveid" value="${param}">
                                </div>           
                            </div>        
                            <!-- fin body 1  -->
                        `;  
            
                $('#staticBackdrop4').modal('show');
            
                return;
                
            }else{
                //alert("Es un no");
                return;
            }
        }else{
            editarSimpleLed(param);
        }

    }
}



function comprobarNumSerieLed() {
    var idNumSerie = document.getElementById('inputNumSerie').value;

    if (idNumSerie) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/led/' + idNumSerie;
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

                if ((response != "No se han encontrado resultados") && (response.length > 0)) {

                    var res = "Número de Serie repetido en: ";

                    for (i in response) {
                        res += "\n Cruce: " + response[i]['idInstalacion'];
                    }
                    alert(res);
                    var clase = document.getElementById('inputNumSerie');
                    clase.classList.add("bg-danger");
                } else {
                    var clase = document.getElementById('inputNumSerie');
                    clase.classList.remove("bg-danger");
                }
            })
    }
}


function comprobarNumSerieLed2() {
    var idInstalacion = document.getElementById('inputInstalacion').value;
  
    if (idInstalacion) {

        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/led';
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

                if ((response.length > 0)) {


                    for (i in response) {

                        if (response[i]['idInstalacion'] == idInstalacion) {
                            var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                            if (clase) {
                                comprobarNumSerieLed3(response[i]['id'],response[i]['idNumSerie']);
                              
                                clase.classList.add("bg-danger");

                            }
                        } else {

                            var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                            if (clase) {
                                clase.classList.remove("bg-danger");


                            }
                        }
                    }

                } else {

                }
            })
    }
}


function comprobarNumSerieLed3(id,idNumSerie) {
    
    if (idNumSerie) {

       // var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/' + idNumSerie;
        var url = 'http://172.27.120.120/gestin/public/api/numserierepetidos/led/' + idNumSerie;
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

                if ((response.length > 0)) {

                    var res = "Número de Serie repetido en: ";
                    var clase = document.getElementById('inputNumSerieTar' + id);

                    for (i in response) {
                        res += "\n Cruce: " + response[i]['idInstalacion'];
                    }
                  
                    clase.setAttribute("data-toggle", "tooltip");
                    clase.setAttribute("data-placement", "top");
                    clase.setAttribute("title", "Repetido en cruce " + res);
                    
                }

            })
    }
}

/*
document.addEventListener("DOMContentLoaded", async function(event) {
 
    await checkTarjetaInstalada();
    await checkTarjetaActiva();
    await checkTarjetaAlmacen();
    await checkTarjetaResiduos();
    // Aquí puedes escribir el código adicional que quieres que se ejecute cuando se dispara el evento DOMContentLoaded
  });
*/

function checkLedInstalada(id) {

    if (id){

        if (document.getElementById('inputInstaladaLedTar'+id).checked) {
          //  document.getElementById('inputActivoLedTar'+id).checked=true;
            document.getElementById('inputAlmacenLedTar'+id).checked=false;
            document.getElementById('inputResiduosLedTar'+id).checked=false;
        
        }else{
            document.getElementById('inputActivoLedTar'+id).checked=false;
            document.getElementById('inputInstaladaLedTar'+id).checked=false;
            document.getElementById('inputAlmacenLedTar'+id).checked=false;
            document.getElementById('inputResiduosLedTar'+id).checked=false;

        }
    }else{
        if (document.getElementById('inputInstaladaLed').checked) {
            document.getElementById('inputActivoLed').checked=true;
        
        }else{
            document.getElementById('inputActivoLed').checked=false;
            document.getElementById('inputInstaladaLed').checked=false;


        }
    }
}
function checkLedActiva(id) {

    if (id){


        if (document.getElementById('inputActivoLedTar'+id).checked) {
        
            document.getElementById('inputInstaladaLedTar'+id).checked=true;
            document.getElementById('inputAlmacenLedTar'+id).checked=false;
            document.getElementById('inputResiduosLedTar'+id).checked=false;      
    
        }else{
            document.getElementById('inputActivoLedTar'+id).checked=false;
            document.getElementById('inputInstaladaLedTar'+id).checked=false;
            document.getElementById('inputAlmacenLedTar'+id).checked=false;
            document.getElementById('inputResiduosLedTar'+id).checked=false;
        }


    }else{

        if (document.getElementById('inputActivoLed').checked) {
        
     
    
        }else{
            document.getElementById('inputActivoLed').checked=false;
            document.getElementById('inputInstaladaLed').checked=false;

        }
    }
}
function checkLedAlmacen(id) {

    if (id){

        if ( document.getElementById('inputAlmacenLedTar'+id).checked) {
            document.getElementById('inputActivoLedTar'+id).checked=false;
            document.getElementById('inputInstaladaLedTar'+id).checked=false;
            document.getElementById('inputResiduosLedTar'+id).checked=false;
    
        }else{
            document.getElementById('inputActivoLedTar'+id).checked=false;
            document.getElementById('inputInstaladaLedTar'+id).checked=false;
            document.getElementById('inputAlmacenLedTar'+id).checked=false;
            document.getElementById('inputResiduosLedTar'+id).checked=false;
        }
    }else{
            if ( document.getElementById('inputAlmacen').checked) {
                document.getElementById('inputActivoLed').checked=false;
                document.getElementById('inputInstaladaLed').checked=false;

        
            }else{
                document.getElementById('inputActivoLed').checked=false;
                document.getElementById('inputInstaladaLed').checked=false;

            }
        }
}
function checkLedResiduos(id) {

    if (id){

        if (document.getElementById('inputResiduosLedTar'+id).checked) {
        
            document.getElementById('inputInstaladaLedTar'+id).checked=false;
            document.getElementById('inputActivoLedTar'+id).checked=false;
            document.getElementById('inputAlmacenLedTar'+id).checked=false;
        //  document.getElementById('inputResiduos').checked=true;
    
        }else{
            document.getElementById('inputActivoLedTar'+id).checked=false;
            document.getElementById('inputInstaladaLedTar'+id).checked=false;
            document.getElementById('inputAlmacenLedTar'+id).checked=false;
            document.getElementById('inputResiduosLedTar'+id).checked=false;
        }
    }else{
        if (document.getElementById('inputResiduos').checked) {
        
            document.getElementById('inputInstaladaLed').checked=false;
            document.getElementById('inputActivoLed').checked=false;

    
        }else{
            document.getElementById('inputActivoLed').checked=false;
            document.getElementById('inputInstaladaLed').checked=false;

        }
    }
}
