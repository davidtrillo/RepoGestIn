 document.onload = rellenarCruceLed();
 //document.onload = rellenarCruceLed2();
 //document.onload = rellenarLed();
 //document.onload = nPaginas("led");

 async function nPaginas(param,total) {
    var p = document.getElementById("nPag");
    p.innerHTML="";

     var cruce = document.getElementById("inputIdFiltroCruce").value;


     if (param == "led") {

        var nTotal = total;
  
     } else {
         var url = 'http://webserver.mobilitat.local/gestin/public/api/ledi/repes/0';
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
             var nTotal = vCount[0]['c'];
     }


     
     console.log('nTotal:' + nTotal);
     var muestra = document.getElementById("dropdownLimit").innerText;

     var x = parseInt(nTotal) / parseInt(muestra);

     console.log(parseInt(nTotal) + "-----" + muestra + "-----" + x);

     if (parseInt(x) < 1) {

         x = 1
     } else {

         if (parseInt(nTotal) % parseInt(muestra) > 0) {
           //  x = x + 1;
         }
     };
     console.log(x);
     if (x > 10) {
         alert("La paginación es mayor a 10, se recomienda aumentar el número de registros por página.");
         //return;
     }


     console.log("x= " + x);

     var p = document.getElementById("nPag");
    //  p.innerHTML = `<li class="page-item">
    //                 <a class="page-link" href="#" aria-label="Previous">
    //                     <span aria-hidden="true">&laquo;</span>
    //                 </a>
    //                 </li>`

     let line = "";
     for (let index = 0; index < x; index++) {
         if (index < x-1){
            line += '<li class="page-item"><a class="page-link" href="#" onclick="filtrarCruce(this.id)" id="' + parseInt(muestra)*(parseInt(index)) +' ">' + (parseInt(index) + parseInt(1)) + '</a></l>';
         }else{
             console.log('Estoy en la última linea, regis: '+(Math.floor(x)* parseInt(muestra)));
            line += '<li class="page-item"><a class="page-link" href="#" onclick="filtrarCruce(this.id)" id="' + (Math.floor(x)* parseInt(muestra)) +' ">' + (parseInt(index) + parseInt(1)) + '</a></l>';
         }
     }

     p.innerHTML += line;
    //devuelve el número total de páginas
    
    //  p.innerHTML += `  <li class="page-item">
    //                 <a class="page-link" href="#" aria-label="Next">
    //                     <span aria-hidden="true">&raquo;</span>
    //                 </a>
    //                 </li>
    //              `

 }


 async function repes() {

     //borrado de input del filtro
     document.getElementById('inputIdFiltroCruce').value = "";
     //proceso de repetidos      
     var ac = document.getElementById("repes").checked;


     if (ac) {
        //pintar footer del total de repetidos
        var url = 'http://webserver.mobilitat.local/gestin/public/api/ledi/repes/0';
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
            var totalLedsRepes=vCount[0]['c'];
            var ftTotal= document.getElementById('footerTotal');
            ftTotal.innerHTML=` <span>Total de Leds: ${totalLedsRepes}</span>`

        //pintar los repetidos
         var s = document.getElementById("spinner");
         s.innerHTML = `   <span class="spinner-border spinner-border-sm mr-2 style="width: 2rem; height: 2rem;"" role="status" aria-hidden="true"></span> Cargando Datos...`;

         var limite = document.getElementById('dropdownLimit').innerText;

         var url = 'http://webserver.mobilitat.local/gestin/public/api/ledi/repes/' + limite;
         vRepes = await fetch(url, {
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

         //  console.log(vRepes);
         await rellenarRepes(vRepes);
         s.innerHTML = ""
     } else {
         var p = document.getElementById('formBody');
         p.innerHTML = '';
     }
 }



 function rellenarRepes(param) {
     var c = document.getElementById('repes');




     if (c.checked) {
         // console.log(param);
         var p = document.getElementById('formBody');
         p.innerHTML = '';
         for (var i in param) {
             if (param[i]['activo'] == "true") {
                 var activo = "checked";
             } else {
                 var activo = "";
             }

             if (param[i]['almacen'] == "true") {
                 var almacen = "checked";
             } else {
                 var almacen = "";
             }

             p.innerHTML += `
        <div class="row mt-1" id="">
          
        <div class="col-1 mt-1 ml-0" >
             <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputIdCruceTar${param[i]['id']}" value="${param[i]['idInstalacion']}">
        </div>
        
        <div class="col-1 pl-0">
        <input type="text" class="form-control mt-1" name="" id="inputNIDTar${param[i]['id']}"  value="${param[i]['nid']}">
        </div>

        <div class="col-auto">
            <input type="hidden" id="inputIdTar${param[i]['id']}" value="${param[i]['id']}">       
            <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${param[i]['id']}" placeholder="DD/MM/YYYY" value="${param[i]['fechaActuacion']}">
        </div>

        <div class="col-auto mt-1" >
            <div class="input-group">
                <input type="text" class="form-control" style="width:150px" aria-label="Text input with segmented dropdown button" id="inputTipoTar${param[i]['id']}" value="${param[i]['tipo']}">
                <div class="input-group-append">

                        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>

                        <div class="dropdown-menu">
                            <button class="dropdown-item" onclick="escribirTipo2('100 mm',${param[i]['id']})" >100 mm</button>
                            <button class="dropdown-item" onclick="escribirTipo2('200 mm',${param[i]['id']})" >200 mm</button>
                            <button class="dropdown-item" onclick="escribirTipo2('200 mm Bici',${param[i]['id']})" >200 mm Bici</button>
                            <button class="dropdown-item" onclick="escribirTipo2('300 mm',${param[i]['id']})" >300 mm</button>
                            <button class="dropdown-item" onclick="escribirTipo2('200x200',${param[i]['id']})" >200x200</button>
                            <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici',${param[i]['id']})" >200x200 Bici</button>
                            <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici/Peatón',${param[i]['id']})" >200x200 Bici/Peatón</button>
                        </div>
                </div>
            </div>
        </div>
        <div class="col-1 mt-1" >


                    <div class="input-group">
                        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputColorTar${param[i]['id']}" value="${param[i]['color']}">
                        <div class="input-group-append">

                                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>

                                <div class="dropdown-menu">
                                    <button class="dropdown-item" onclick="escribirColor2('Rojo',${param[i]['id']})" >Rojo</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Ambar',${param[i]['id']})" >Ambar</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Verde',${param[i]['id']})" >Verde</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Blanco',${param[i]['id']})" >Blanco</button>
                                </div>
                        </div>
                    </div>
        </div>
        <div class="col-1">
           <input type="text" class="form-control mt-1" name="" id="inputGrupoTar${param[i]['id']}"  value="${param[i]['grupo']}">
        </div>
        <div class="col-1">
           <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${param[i]['id']}"  value="${param[i]['idNumSerie']}" >
        </div>
        <div class="col-1">
           <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${param[i]['id']}" value="${param[i]['albaran']}">
        </div>
        <div class="col-2">
            <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${param[i]['id']}"  value="${param[i]['observaciones']}">
        </div>
        <div class="col-auto">
          <input type="checkbox" class=" mt-3 ml-2" name="" id="inputActivoTar${param[i]['id']}"  ${activo}>
          <input type="checkbox" class=" mt-3 ml-2" name="" id="inputAlmacenTar${param[i]['id']}"  ${almacen}>
          <div class="btn btn-primary ml-3" id="${param[i]['id']}" onclick="editarLed(this.id)"><i class="fas fa-pencil-alt"></i></div>
          <div class="btn btn-danger" id="${param[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
        </div>

        <div class="col-1">
        </div>

        </div>  

     `
         }
     } else {
         //rellenarLed();
     }

 }


 // cargarCruces();
 // misCruces();


 // function misCruces(){
 //     var url = 'http://webserver.mobilitat.local/gestin/public/api/cruces'
 //    vCruces= fetch(url, {
 //             method: 'GET',
 //             headers: {
 //                 'Content-Type': 'application/json'
 //             }
 //         })
 //         .then(res => res.json())
 //         .catch(error => console.error('Error:', error))
 //         .then(response => {return response;})

 //         return vCruces;
 // }

 function filtrarCruce2() {
     var url = 'http://webserver.mobilitat.local/gestin/public/api/led/1/50'
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
            <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceLed(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
            `
             }
         })
 }



 function rellenarCruceLed() { //Llamada a la API según el dato obtenido del primer combo
     var url = 'http://webserver.mobilitat.local/gestin/public/api/cruces'
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
             <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceLed(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
             }
         })

        
 }

 function rellenarNIDTotalLed(id) { //NID


    //var cr=document.getElementById("inputInstalacion");
    
    var url = 'http://webserver.mobilitat.local/gestin/public/api/nid/'+ id;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropdownNID');
            p.innerHTML = '';
            for (var i in response) {
                
                p.innerHTML += `
                    <button class="dropdown-item" type="submit" id="dropBtnNID${[i]}" name="${response[i]['nid']}" onclick="leerNIDTotalLed(this.name)">${response[i]['nid']}</button> 
                    `
                
            }
        })
}
function leerNIDTotalLed(NID) { //NID
    var p1 = document.getElementById('inputNID');
    p1.value = NID;
}
 //  function rellenarCruceLed2(id) { //Llamada a la API según el dato obtenido del primer combo
 //     var url = 'http://webserver.mobilitat.local/gestin/public/api/cruces'
 //     fetch(url, {
 //             method: 'GET',
 //             headers: {
 //                 'Content-Type': 'application/json'
 //             }
 //         })
 //         .then(res => res.json())
 //         .catch(error => console.error('Error:', error))
 //         .then(response => {

 //             var p = document.getElementById('dropdownCruce2'+id);
 //             if (id!=null){
 //                 p.innerHTML = '';

 //                 for (var i in response) {
 //                     p.innerHTML += `
 //                 <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceLed2(this.value,${id})" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
 //                 `
 //                 }
 //             }
 //         })
 // var p = document.getElementById('dropdownCruce2'+id);

 // p.innerHTML = '';

 // for (var i in vCruces) {
 //     console.log(id);
 //     console.log(vCruces[i]['id']+' - '+vCruces[i]['ubicacion']);
 //     p.innerHTML += `
 // <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${vCruces[i]['ubicacion']}" onclick="leerCruceLed2(this.value,${id})" value="${vCruces[i]['id']}">${vCruces[i]['id']} - ${vCruces[i]['ubicacion']}</button>
 // `
 // }
 //      console.log(vCruces[1]['id'] + ' - ' + vCruces[1]['ubicacion']);
 //      console.log(globalCruces);
 //      console.log(id + '- Estoy en el segundo rellenarCruceLed2')
 //      console.log(vCruces[1]['id'] + ' - ' + vCruces[1]['ubicacion']);

 //      var p = document.getElementById('dropdownCruce2' + id);
 //      p.innerHTML = '';

 //      for (var i in vCruces) {
 //          p.innerHTML += `
 //             <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${vCruces[i]['ubicacion']}" onclick="leerCruceLed2(this.value,${id})" value="${vCruces[i]['id']}">${vCruces[i]['id']} - ${vCruces[i]['ubicacion']}</button>
 //             `
 //      }

 //  }

 function leerCruceLed(id) {
     var p1 = document.getElementById('inputIdCruce');
     p1.value = id;
     rellenarNIDTotalLed(id);
 }

 function leerCruceLed2(id, value) {
     var p1 = document.getElementById('inputIdCruceTar' + value);
     p1.value = id;
 }

 function escribirTipo(id) {
     var p1 = document.getElementById('inputTipo');
     p1.value = id;
 }

 function escribirTipo2(value, id) {
     var p1 = document.getElementById('inputTipoTar' + id);
     p1.value = value;
 }

 function escribirColor(id) {
     var p1 = document.getElementById('inputColor');
     p1.value = id;
 }

 function escribirColor2(value, id) {
     var p1 = document.getElementById('inputColorTar' + id);
     p1.value = value;
 }



 function nuevaLed() { //CAMBIO DE NOMENCLATURA
     var idInstalacion = document.getElementById('inputIdCruce').value;
     var color = document.getElementById('inputColor').value ? document.getElementById('inputColor').value : "";
     var fechaActuacion = document.getElementById('inputFechaActuacion').value;

     if (idInstalacion.value != "") {

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
         var idNumSerie = document.getElementById('inputNumSerie').value ? document.getElementById('inputNumSerie').value : "0";
         var albaran = document.getElementById('inputAlbaran').value ? document.getElementById('inputAlbaran').value : "0";
         var tipo = document.getElementById('inputTipo').value ? document.getElementById('inputTipo').value : "";
         var grupo = document.getElementById('inputGrupo').value ? document.getElementById('inputGrupo').value : "";
         var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value : "";
         var activo = document.getElementById('inputActivo').checked;
         var almacen = document.getElementById('inputAlmacen').checked;


         activo = String(activo);

         var idUsuario = document.getElementById('inputIdUsuario').value;
         var url = 'http://webserver.mobilitat.local/gestin/public/api/led/nueva';

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
                     observaciones: observaciones,
                     fechaActuacion: fechaActuacion,
                     idUsuario: idUsuario,
                     tipo: tipo,
                     grupo: grupo,
                     activo: activo,
                     almacen: almacen
                 })
             })
             .then(res => res.json())
             .catch(error => console.error('Error:', error))
             .then(response => {
                 alert(response)
             })

     }

     var p = document.getElementById('formBody');
     p.innerHTML = '';

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


 async function filtrarCruce(offset) { //rellenarLed() { //Llamada a la API  //CAMBIO DE NOMENCLATURA
    

     //quitar check de Repetidos
     document.getElementById("repes").checked = false;

     //activar spinner
     var s = document.getElementById("spinner");
     s.innerHTML = `   <span class="spinner-border spinner-border-sm mr-2 style="width: 2rem; height: 2rem;"" role="status" aria-hidden="true"></span> Cargando Datos...`;

     
     var limite = document.getElementById('dropdownLimit').innerText;
     var cruceFil = document.getElementById('inputIdFiltroCruce').value;
     
     
     //consultar total de leds
     var url = 'http://webserver.mobilitat.local/gestin/public/api/ledc/cont/' + cruceFil;
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
         var totalLedsRepes=vCount[0]['c'];
         var ftTotal= document.getElementById('footerTotal');
         ftTotal.innerHTML=` <span class="mt-0">Total de Leds: ${totalLedsRepes}</span>`


//pinta las páginas que tendrá según el límite a mostrar
    
      await nPaginas('led',totalLedsRepes);

      

         if (offset==null){
            var url = 'http://webserver.mobilitat.local/gestin/public/api/ledi/' + cruceFil + '/0/'+ limite;
           
         }else{
            // offset= offset*limite;
            var url = 'http://webserver.mobilitat.local/gestin/public/api/ledi/' + cruceFil + '/'+ offset +'/'+ limite;
         }


     //Borrado de la pantalla
     var p = document.getElementById('formBody');
     p.innerHTML = '';



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


                 alert(response);

             } else {
                 // var p = document.getElementById('formBody');
                 // p.innerHTML = '';
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

                     p.innerHTML += `
                    <div class="row mt-1" id="">
                      
                    <div class="col-1 mt-1 ml-0" >
                         <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputIdCruceTar${response[i]['id']}" value="${response[i]['idInstalacion']}">
                    </div>

                    <div class="col-1 pl-0">
                        <input type="text" class="form-control mt-1" name="inputNID" id="inputNID${response[i]['id']}">
                    </div>

                    <div class="col-auto">
                        <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                        <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                    </div>

                    <div class="col-auto mt-1" >
                        <div class="input-group">
                            <input type="text" class="form-control" style="width:150px" aria-label="Text input with segmented dropdown button" id="inputTipoTar${response[i]['id']}" value="${response[i]['tipo']}">
                            <div class="input-group-append">

                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>

                                    <div class="dropdown-menu">
                                        <button class="dropdown-item" onclick="escribirTipo2('100 mm',${response[i]['id']})" >100 mm</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200 mm',${response[i]['id']})" >200 mm</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200 mm Bici',${response[i]['id']})" >200 mm Bici</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('300 mm',${response[i]['id']})" >300 mm</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200x200',${response[i]['id']})" >200x200</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici',${response[i]['id']})" >200x200 Bici</button>
                                        <button class="dropdown-item" onclick="escribirTipo2('200x200 Bici/Peatón',${response[i]['id']})" >200x200 Bici/Peatón</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-1 mt-1" >


                                <div class="input-group">
                                    <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputColorTar${response[i]['id']}" value="${response[i]['color']}">
                                    <div class="input-group-append">

                                            <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>

                                            <div class="dropdown-menu">
                                                <button class="dropdown-item" onclick="escribirColor2('Rojo',${response[i]['id']})" >Rojo</button>
                                                <button class="dropdown-item" onclick="escribirColor2('Ambar',${response[i]['id']})" >Ambar</button>
                                                <button class="dropdown-item" onclick="escribirColor2('Verde',${response[i]['id']})" >Verde</button>
                                                <button class="dropdown-item" onclick="escribirColor2('Blanco',${response[i]['id']})" >Blanco</button>
                                            </div>
                                    </div>
                                </div>
                    </div>
                    <div class="col-1">
                       <input type="text" class="form-control mt-1" name="" id="inputGrupoTar${response[i]['id']}"  value="${response[i]['grupo']}">
                    </div>
                    <div class="col-1">
                       <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}" >
                    </div>
                    <div class="col-1">
                       <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                    </div>
                    <div class="col-2">
                        <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                    </div>
                    <div class="col-auto">
                      <input type="checkbox" class=" mt-3 ml-2" name="" id="inputActivoTar${response[i]['id']}"  ${activo}>
                      <input type="checkbox" class=" mt-3 ml-2" name="" id="inputAlmacenTar${response[i]['id']}"  ${almacen}>
                      <div class="btn btn-primary ml-3" id="${response[i]['id']}" onclick="editarLed(this.id)"><i class="fas fa-pencil-alt"></i></div>
                      <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
                    </div>

                    <div class="col-1">
                    </div>

          </div>  
         
                 `

                     //script para rellenar los números de cruce en cada registro

                     //  var p3 = document.getElementById('dropdownCruce2'+response[i]['id']);
                     //  p3.innerHTML = '';

                     //  for (var a in vCruces) {
                     //          p3.innerHTML += `<button class="dropdown-item" type="submit" id="dropBtnCruce${[a]}" name="${vCruces[a]['ubicacion']}" onclick="leerCruceLed2(this.value,${vCruces[a]['id']})" value="${vCruces[a]['id']}">${vCruces[a]['id']} - ${vCruces[a]['ubicacion']}</button>`
                     //  }

                     //  rellenarCruceLed2(response[i]['id']); 

                 }
             }
         })

     comprobarNumSerieLed2();

     //desactivar spinner
     s.innerHTML = '';
 }


 function borrarLed(id) {

     var url = 'http://webserver.mobilitat.local/gestin/public/api/led/borrar/' + id;
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
         
         var c=document.getElementById("inputIdFiltroCruce");
         if (c.value){
            filtrarCruce(c.value);
         }

     //rellenarLed();
 }

 function editarLed(param) { //CAMBIO DE NOMENCLATURA
     var inputIdTar = param;
     var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
     var inputColorTar = document.getElementById('inputColorTar' + param).value;
     var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value;
     var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value;
     var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value;
     var inputGrupoTar = document.getElementById('inputGrupoTar' + param).value;
     var inputTipoTar = document.getElementById('inputTipoTar' + param).value;
     var inputActivoTar = document.getElementById('inputActivoTar' + param).checked;
     var inputAlmacenTar = document.getElementById('inputAlmacenTar' + param).checked;
     inputActivoTar = String(inputActivoTar);
     inputAlmacenTar = String(inputAlmacenTar);
     var idUsuario = document.getElementById('inputIdUsuario').value;

     // console.log(inputIdTar);
     // console.log(inputFechaActuacionTar);
     // console.log(inputColorTar);
     // console.log(inputObservacionesTar);
     // console.log(inputNumSerieTar);
     // console.log(inputGrupoTar);
     // console.log(inputActivoTar);
     // console.log(idUsuario);


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
     var url = 'http://webserver.mobilitat.local/gestin/public/api/led/modificar/' + param;

     fetch(url, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 id: inputIdTar,
                 color: inputColorTar,
                 idNumSerie: inputNumSerieTar,
                 albaran: inputAlbaranTar,
                 observaciones: inputObservacionesTar,
                 fechaActuacion: inputFechaActuacionTar,
                 idUsuario: idUsuario,
                 grupo: inputGrupoTar,
                 tipo: inputTipoTar,
                 activo: inputActivoTar,
                 almacen: inputAlmacenTar
             })
         })
         .then(res => res.json())
         .catch(error => console.error('Error:', error))
         .then(response => {
             alert(response)
         })


     setTimeout(() => {
        var c=document.getElementById("inputIdFiltroCruce");
        if (c.value){
           filtrarCruce(c.value);
        }
     }, 500);
 }

 function comprobarNumSerieLed() {
     var idNumSerie = document.getElementById('inputNumSerie').value;

     if (idNumSerie) {

         var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/led/' + idNumSerie;
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

 function comprobarNumSerieLed4(id, value) {
     var idNumSerie = document.getElementById('inputNumSerieTar' + id).value;

     if (idNumSerie) {

         var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/led/' + idNumSerie;
         fetch(url, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then(res => res.json())
             .catch(error => console.error('Error:', error))
             .then(response => {
                 // console.log(idNumSerie+" "+response.length  );
                 if ((response.length > 1)) {

                     var res = "Número de Serie repetido en: ";

                     for (i in response) {
                         res += "\n Cruce: " + response[i]['idInstalacion'];
                     }
                     // alert(res);
                     var clase = document.getElementById('inputNumSerieTar' + id);
                     clase.classList.add("bg-danger");
                 } else {
                     var clase = document.getElementById('inputNumSerieTar' + id);
                     clase.classList.remove("bg-danger");
                 }
             })
     }
 }


 function comprobarNumSerieLed2() {

     var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/led';
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

                     //console.log(response[i]['id']);
                     var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                     if (clase) {
                         //    comprobarNumSerieLed3(response[i]['id'],clase.value);         
                         clase.classList.add("bg-danger");
                     } else {
                         var clase = document.getElementById('inputNumSerieTar' + response[i]['id']);
                         if (clase) {
                             clase.classList.remove("bg-danger");
                         }
                     }
                 }

             }
         })
 }


 function comprobarNumSerieLed3(id, idNumSerie) {

     if (idNumSerie) {

         // var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/' + idNumSerie;
         var url = 'http://webserver.mobilitat.local/gestin/public/api/numserierepetidos/led/' + idNumSerie;
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


 async function paginacion(param) {

     var c = document.getElementById('repes');

     var p = document.getElementById("dropdownLimit");
     p.innerText = param;

     if (c.checked) {

         await repes();
         await nPaginas("repe");
     } else {
         await filtrarCruce();
         await nPaginas("led");
     }

 }


 // async function cargarCruces(){
 //     globalCruces=  await misCruces();
 //    // console.log('Función Cargar Cruce '+ globalCruces[0]['id']);
 //     return globalCruces;

 // }