 //document.onload =   function rellenarNIDTotalLed()();
 //document.onload = rellenarCruceLed2();
 //document.onload = rellenarLed();
 //document.onload = nPaginas("led");


 async function nPaginas(param, total) {
     var p = document.getElementById("nPag");
     p.innerHTML = "";

     var cruce = document.getElementById("inputIdFiltroCruce").value;


     if (param == "led") {

         var nTotal = total;

     } else {
         var url = 'http://172.27.120.120/gestin/public/api/ledi/repes/0';
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

         x = 1;
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
         if (index < x - 1) {
             line += '<li class="page-item"><a class="page-link" href="#" onclick="filtrarCruce(this.id)" id="' + parseInt(muestra) * (parseInt(index)) + ' ">' + (parseInt(index) + parseInt(1)) + '</a></l>';
         } else {
             console.log('Estoy en la última linea, regis: ' + (Math.floor(x) * parseInt(muestra)));
             line += '<li class="page-item"><a class="page-link" href="#" onclick="filtrarCruce(this.id)" id="' + (Math.floor(x) * parseInt(muestra)) + ' ">' + (parseInt(index) + parseInt(1)) + '</a></l>';
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
         var url = 'http://172.27.120.120/gestin/public/api/ledi/repes/0';
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
         var totalLedsRepes = vCount[0]['c'];
         var ftTotal = document.getElementById('footerTotal');
         ftTotal.innerHTML = ` <span>Total de Leds Repetidos: ${totalLedsRepes}</span>`
         if (totalLedsRepes > 0) {
             //pintar los repetidos
             var s = document.getElementById("spinner");
             s.innerHTML = `   <span class="spinner-border spinner-border-sm mr-2 style="width: 2rem; height: 2rem;"" role="status" aria-hidden="true"></span> Cargando Datos...`;

             var limite = document.getElementById('dropdownLimit').innerText;

             var url = 'http://172.27.120.120/gestin/public/api/ledi/repes/' + limite;
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
        <input type="text" class="form-control mt-1" name="" id="inputNIDTar${param[i]['id']}"  value="${param[i]['nid']}" disabled>
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
                            <button class="dropdown-item" onclick="escribirTipo2('200 mm Peatón',${param[i]['id']})" >200 mm Peatón</button>
                            <button class="dropdown-item" onclick="escribirTipo2('200 mm Bici',${param[i]['id']})" >200 mm Bici</button>
                            <button class="dropdown-item" onclick="escribirTipo2('300 mm',${param[i]['id']})" >300 mm</button>
                            <button class="dropdown-item" onclick="escribirTipo2('200x200 Peatón',${param[i]['id']})" >200x200 Peatón</button>
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
                                    <button class="dropdown-item" onclick="escribirColor2('Ámbar',${param[i]['id']})" >Ámbar</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Verde',${param[i]['id']})" >Verde</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Rojo Flecha',${param[i]['id']})" >Rojo Flecha</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Ámbar Flecha',${param[i]['id']})" >Ámbar Flecha</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Verde Flecha',${param[i]['id']})" >Verde Flecha</button>
                                    <button class="dropdown-item" onclick="escribirColor2('Blanco',${param[i]['id']})" >Blanco</button>
                                </div>
                        </div>
                    </div>
        </div>
        <div class="col-1 mt-1 pl-2">
                <div class="dropdown" >
                
                        <div class="input-group">
                        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputFabricacionTar${param[i]['id']}" value="${param[i]['fabricacion']}">
                            <div class="input-group-append">

                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>

                                    <div class="dropdown-menu">
                                    <button class="dropdown-item" onclick="escribirFabricacion2('Matricial',${param[i]['id']})" >Matricial</button>
                                    <button class="dropdown-item" onclick="escribirFabricacion2('Alta Potencia',${param[i]['id']})" >Alta Potencia</button>
                                    </div>
                            </div>
                        </div>
                </div>
        </div>
        <div class="col-1">
           <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${param[i]['id']}"  value="${param[i]['idNumSerie']}" >
        </div>
        <div class="col-1">
           <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${param[i]['id']}" value="${param[i]['albaran']}">
        </div>
        <div class="col-2">
            <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${param[i]['id']}"  value="${param[i]['observaciones']}" data-toggle="tooltip" data-placement="top" title="${param[i]['observaciones']}" >
        </div>
        <div class="col-1">

          <div class="btn btn-primary ml-3" id="${param[i]['id']}" onclick="editarLed(this.id)" title="Guardar edición"><i class="fas fa-pencil-alt"></i></div>
          <div class="btn btn-danger" title="Eliminar registro" id="${param[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
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
 //     var url = 'http://172.27.120.120/gestin/public/api/cruces'
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
     var url = 'http://172.27.120.120/gestin/public/api/led/1/50'
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



 //  function rellenarCruceLed() { //Llamada a la API según el dato obtenido del primer combo
 //      var url = 'http://172.27.120.120/gestin/public/api/cruces'
 //      fetch(url, {
 //              method: 'GET',
 //              headers: {
 //                  'Content-Type': 'application/json'
 //              }
 //          })
 //          .then(res => res.json())
 //          .catch(error => console.error('Error:', error))
 //          .then(response => {
 //              var p = document.getElementById('dropdownCruce');
 //              p.innerHTML = '';

 //              for (var i in response) {
 //                  p.innerHTML += `
 //              <button class="dropdown-item" type="submit" id="dropBtnCruce${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceLed(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
 //              `
 //              }
 //          })


 //  }

 function escribirFabricacion(param) {
     var p1 = document.getElementById("inputFabricacion");
     p1.value = param;
 }

 function escribirFabricacion2(param, id) {
     var p1 = document.getElementById("inputFabricacionTar" + id);
     p1.value = param;
 }

 function rellenarNIDTotalLed(id) { //NID


     //var cr=document.getElementById("inputInstalacion");

     var url = 'http://172.27.120.120/gestin/public/api/nid/' + id;
     fetch(url, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         })
         .then(res => res.json())
         .catch(error => console.error('Error:', error))
         .then(response => {
             var p = document.getElementById('dropdownNIDTotalLed');
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
 //     var url = 'http://172.27.120.120/gestin/public/api/cruces'
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



 async function nuevaLed() { //CAMBIO DE NOMENCLATURA
     var idInstalacion = document.getElementById('inputIdFiltroCruce').value;
     var color = document.getElementById('inputColor').value ? document.getElementById('inputColor').value : "";
     var nid = document.getElementById('inputNID').value ? document.getElementById('inputNID').value : "";
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
         var fabricacion = document.getElementById('inputFabricacion').value ? document.getElementById('inputFabricacion').value : "";
         var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value : "";
         var activo = document.getElementById('inputActivo').checked;
         var almacen = document.getElementById('inputAlmacen').checked;


         activo = String(activo);
         almacen = String(almacen);

         var idUsuario = document.getElementById('inputIdUsuario').value;
         var url = 'http://172.27.120.120/gestin/public/api/led/nueva';

         await fetch(url, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     idInstalacion: idInstalacion,
                     color: color,
                     nid: nid,
                     idNumSerie: idNumSerie,
                     albaran: albaran,
                     observaciones: observaciones,
                     fechaActuacion: fechaActuacion,
                     idUsuario: idUsuario,
                     tipo: tipo,
                     fabricacion: fabricacion,
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

     //borrar los campos después de haber introducido un led nuevo
     
     document.getElementById('inputNID').value = null;
     document.getElementById('inputColor').value = null;
     document.getElementById('inputFechaActuacion').value = null;
     document.getElementById('inputNumSerie').value = null;
     document.getElementById('inputAlbaran').value = null;
     document.getElementById('inputTipo').value = null;
     document.getElementById('inputFabricacion').value = null;
     document.getElementById('inputObservaciones').value = null;
     document.getElementById('inputActivo').checked = null;
     document.getElementById('inputAlmacen').checked = null;


     filtrarCruce();
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
     rellenarNIDTotalLed(cruceFil);

     //consultar total de leds
     var url = 'http://172.27.120.120/gestin/public/api/ledc/cont/' + cruceFil;
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
     var totalLedsRepes = vCount[0]['c'];
     var ftTotal = document.getElementById('footerTotal');
     ftTotal.innerHTML = ` <span class="mt-0">Total de Leds Activos: ${totalLedsRepes}</span>`


     //pinta las páginas que tendrá según el límite a mostrar

     await nPaginas('led', totalLedsRepes);



     if (offset == null) {
         var url = 'http://172.27.120.120/gestin/public/api/ledi/' + cruceFil + '/0/' + limite;

     } else {
         // offset= offset*limite;
         var url = 'http://172.27.120.120/gestin/public/api/ledi/' + cruceFil + '/' + offset + '/' + limite;
         console.log("El Offset es :" +offset);
         console.log("El limit es:"+ limite);
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
                     <div class="row mt-1 ml-1" id="">
                     <div class="col text-right pl-0 mt-1">
                        <div class="btn btn-primary " title="Substituir Led" onclick="guardarIdLed(${response[i]['id']})" id="inputIdMod${response[i]['id']}" data-toggle="modal" data-target="#staticBackdrop" ><i class="icon-refresh"></i></div>

                     </div>

                     <div class="col-1 pl-0">
                        <input type="text" class="form-control mt-1" name="inputNIDTar" id="inputNIDTar${response[i]['id']}"  value="${response[i]['nid']}" disabled>
                     </div>
    
                            <div class="col-2 pl-0">
                                <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                                <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                            </div>
    
                            <div class="col-1 mt-1 pl-1" >
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
                            <div class="col-1 mt-1 pl-1" >
    
    
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
                            <div class="col-1 mt-1 pl-2">
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
                            <div class="col-1 pl-2">
                               <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}" onfocusout="comprobarNumSerieLed()">
                            </div>
                            <div class="col-1 pl-2">
                               <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                            </div>
                            <div class="col-2 pl-2">
                                <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}" data-toggle="tooltip" data-placement="top" title="${response[i]['observaciones']}">
                            </div>
                            <div class="col-1 pl-0">
                                <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarLed(this.id)" title="Guardar edición"><i class="fas fa-pencil-alt"></i></div>
                                <div class="btn btn-danger" title="Eliminar registro" id="${response[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
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


 async function borrarLed(id) {

     var url = 'http://172.27.120.120/gestin/public/api/led/borrar/' + id;
     await fetch(url, {
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

     filtrarCruce();


     //rellenarLed();
 }

 async function editarLed(param) { //CAMBIO DE NOMENCLATURA
     var inputIdTar = param;
     //var inputIdCruceTar = document.getElementById('inputIdCruceTar' + param).value;
     var inputFechaActuacionTar = document.getElementById('inputFechaActuacionTar' + param).value;
     var inputColorTar = document.getElementById('inputColorTar' + param).value ? document.getElementById('inputColorTar' + param).value : "";
     var inputObservacionesTar = document.getElementById('inputObservacionesTar' + param).value ? document.getElementById('inputObservacionesTar' + param).value : "";
     var inputAlbaranTar = document.getElementById('inputAlbaranTar' + param).value ? document.getElementById('inputAlbaranTar' + param).value : 0;
     var inputNumSerieTar = document.getElementById('inputNumSerieTar' + param).value ? document.getElementById('inputNumSerieTar' + param).value : 0;
     var inputFabricacionTar = document.getElementById('inputFabricacionTar' + param).value ? document.getElementById('inputFabricacionTar' + param).value : "";
     var inputTipoTar = document.getElementById('inputTipoTar' + param).value ? document.getElementById('inputTipoTar' + param).value : "";
     var inputNIDTar = document.getElementById('inputNIDTar' + param).value ? document.getElementById('inputNIDTar' + param).value : "";
     var inputActivoTar = "true";
     var inputAlmacenTar = "false";
    // inputActivoTar = String(inputActivoTar);
     //inputAlmacenTar = String(inputAlmacenTar);
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
     var url = 'http://172.27.120.120/gestin/public/api/led/modificar/' + param;

     await fetch(url, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 id: inputIdTar,
                 //idInstalacion:inputIdCruceTar,
                 color: inputColorTar,
                 idNumSerie: inputNumSerieTar,
                 albaran: inputAlbaranTar,
                 nid: inputNIDTar,
                 observaciones: inputObservacionesTar,
                 fechaActuacion: inputFechaActuacionTar,
                 idUsuario: idUsuario,
                 fabricacion: inputFabricacionTar,
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

     filtrarCruce();

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

 function comprobarNumSerieLed4(id, value) {
     var idNumSerie = document.getElementById('inputNumSerieTar' + id).value;

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
 function leerNIDTotalLed(NID) { //NID
     var p1 = document.getElementById('inputNID');
     p1.value = NID;
 }

 
async function guardarIdLed(id) {
  
    //Leer valores del Led 

 var url = 'http://172.27.120.120/gestin/public/api/ledid/' + id;
 var ledId= await fetch(url, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then(res => res.json())
             .catch(error => console.error('Error:', error))
             .then(response => {
                 return response;
             });

     //Mostrar valores del Led
     var c=document.getElementById("modalLedBody");
     c.innerHTML=`
                <!-- Inicio body 1 -->
                <div class="row" id="">

                    <div class="col">
                        <b>NID</b>
                    </div>

                    <div class="col">
                        <b>F.Actuación</b>
                    </div>

                    <div class="col">
                        <b>Tipo  </b>                             
                    </div>
                    <div class="col">
                            <b>Color</b>                
                    </div>
                    <div class="col">
                            <b>Fabricación</b>
                    </div>
                    <div class="col">
                        <b>Num. Serie</b>
                    </div>
                    <div class="col">
                        <b> Albarán</b>
                    </div>
                    <div class="col">
                        <b>Almacén</b>
                    </div>                    
                    
                    <div class="col">
                        <b>Residuos</b>
                    </div>

                </div>
                <div class="row" id="">

                    <div class="col">
                        <span id="inputNIDMod">${ledId[0].nid}</span>
                        <input type="hidden" id="inputIdLed" value="${id}">
                        <input type="hidden" id="inputObservacionesMod" value="${ledId[0].observaciones}">
                    </div>

                    <div class="col">
                        <span id="">${ledId[0].fechaActuacion}</span>
                    </div>

                    <div class="col">
                        <span id="inputTipoMod">${ledId[0].tipo}</span>                              
                    </div>
                    <div class="col">
                        <span id="inputColorMod" >${ledId[0].color}</span>                
                    </div>
                    <div class="col">
                        <span id="inputFabricacionMod">${ledId[0].fabricacion}</span>
                    </div>
                    <div class="col">
                        <span id="inputNumSerieAntiguo">${ledId[0].idNumSerie}</span>
                    </div>
                    <div class="col">
                        <span id="inputAlbaranAntiguo">${ledId[0].albaran}</span>
                    </div>

                    <div class="col mt-1">
                        <input type="checkbox" class=" mt-3 ml-3" name="" id="inputAlmacenTotalLedTar" onclick="checkTotalLedAlmacen(${id})" checked>                                     
                    </div>

                    <div class="col mt-1">
                        <input type="checkbox" class=" mt-3 ml-2" name="" id="inputResiduosTotalLedTar" onclick="checkTotalLedResiduos(${id})" >                                      
                    </div>
                </div>


            <div class="row" id="">

                <div class="col">
                    Nueva Fecha de Actuación:
                    <input type="date" class="form-control mt-1" name="inputFechaActuacionMod" id="inputFechaActuacionMod" placeholder="DD/MM/YYYY">
                </div>

                <div class="col">
                    Nuevo Núm. Serie:
                    <input type="text" class="form-control mt-1" name="inputNumSerieMod" id="inputNumSerieMod">
                </div>

                <div class="col">
                    Nuevo Num. Albarán: 
                    <input type="text" class="form-control mt-1" name="inputAlbaranMod" id="inputAlbaranMod">                              
                </div>
                
                <div class="col mt-3">

                </div>


            </div>

                <!-- fin body 1  -->
            `;
     
    }

function checkTotalLedAlmacen(){
    var a=document.getElementById('inputAlmacenTotalLedTar')
    var r=document.getElementById('inputResiduosTotalLedTar')
    if (a.checked){
        r.checked=null;
    }
}

function checkTotalLedResiduos(){
    var a=document.getElementById('inputAlmacenTotalLedTar')
    var r=document.getElementById('inputResiduosTotalLedTar')
    if (r.checked){
        a.checked=null;
    }
}

async function sustituirLed() {
  
    var inputIdTar=document.getElementById('inputIdLed').value;
    var inputFechaActuacionLed = document.getElementById('inputFechaActuacionMod').value;
    var inputObservacionesLed = document.getElementById('inputObservacionesMod').value ? document.getElementById('inputObservacionesMod').value : "";
    var inputNumSerieLed = document.getElementById('inputNumSerieMod').value ? document.getElementById('inputNumSerieMod').value : 0;
    var inputAlbaranLed = document.getElementById('inputAlbaranMod').value ? document.getElementById('inputAlbaranMod').value : 0;
    var inputNumSerieLedAntiguo = document.getElementById('inputNumSerieAntiguo').innerText;
    var inputResiduosTotalLed = document.getElementById('inputResiduosTotalLedTar').checked;
    var inputAlmacenTotalLed = document.getElementById('inputAlmacenTotalLedTar').checked;
        inputActivoLed = String(inputResiduosTotalLed);
        inputAlmacenLed = String(inputAlmacenTotalLed);
    var idUsuario = document.getElementById('inputIdUsuario').value;

    if (inputAlmacenTotalLed){
                    //nuevaAlmacen

                    var url = 'http://172.27.120.120/gestin/public/api/almacen/nueva';

                    fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                idInstalacion: "ALMACÉN",
                                idTipoInstalacion: "LED",
                                idNumSerie: inputNumSerieLedAntiguo,
                                observaciones: "",
                                fechaActuacion: inputFechaActuacionLed,
                                idUsuario: idUsuario
                            })
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            alert(response)
                        })
                      
        }

    if (inputResiduosTotalLed){
        //nuevaAlmacen


        var url = 'http://172.27.120.120/gestin/public/api/residuos/nueva';

        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: "RESIDUOS",
                    idTipoInstalacion: "LED",
                    idNumSerie: inputNumSerieLedAntiguo,
                    observaciones: "",
                    fechaActuacion: inputFechaActuacionLed,
                    idUsuario: idUsuario
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

            
    }


        var url = 'http://172.27.120.120/gestin/public/api/led/sustituir/' + inputIdTar;

        await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: inputIdTar,
                    idNumSerie:inputNumSerieLed,
                    albaran:inputAlbaranLed,
                    fechaActuacion: inputFechaActuacionLed,
                    idUsuario: idUsuario
                })
            })
            
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
                filtrarCruce();
                $('#staticBackdrop').modal('hide');
            })
    

}



    // console.log(inputIdTar);
    // console.log(inputFechaActuacionTar);
    // console.log(inputColorTar);
    // console.log(inputObservacionesTar);
    // console.log(inputNumSerieTar);
    // console.log(inputGrupoTar);
    // console.log(inputActivoTar);
    // console.log(idUsuario);


    //validar fecha correcta
    /*
     if (validarFormatoFechaLed(inputFechaActuacionLed)) {
         if (existeFechaLed(inputFechaActuacionLed)) {

         } else {
             alert("La fecha introducida no existe.");
             return;
         }
     } else {
         alert("El formato de la fecha es incorrecto.");
         return;
     }
*/
    
    //Aquí damos de baja activo=false el led sustituido y si almacen está activo o no
  



//Aquí damos de baja activo=false el led sustituido y si almacen está activo o no
/*var url = 'http://172.27.120.120/gestin/public/api/led/nueva';

await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idInstalacion:inputIdCruceLed,
            color: inputColorLed,
            idNumSerie: inputNumSerieLed,
            albaran: inputAlbaranLed,
            nid: inputNIDLed,
            observaciones: "",
            fechaActuacion: inputFechaActuacionLed,
            idUsuario: idUsuario,
            fabricacion: inputFabricacionLed,
            tipo: inputTipoLed,
            activo: "true",
            almacen: "false"
        })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        alert(response)
    })

*/

   

