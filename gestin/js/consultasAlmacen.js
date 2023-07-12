   pintarResultados();

 async function consulta() {
    var p1=document.getElementById('inputMes').value;

    var fecha=new Date(p1);
    var mes=fecha.getMonth()+1;
    var año=fecha.getFullYear();

     var t = document.getElementById('titulo');
     t.innerHTML='';

    await   pintarResultados("camtv", mes,año);
    await   pintarResultados("cargadores", mes,año);
    await   pintarResultados("centrales", mes,año);
    await   pintarResultados("controlaccesos", mes,año);
    await   pintarResultados("oculta", mes,año);
    await   pintarResultados("tarjetas", mes,año);
    await   pintarResultados("bustren", mes,año);
    await   pintarResultados("tarjetascpu", mes,año);
    await   pintarResultados("tarjetasfa", mes,año);
    await   pintarResultados("detectores", mes,año);
    await   pintarResultados("modulo", mes,año);
    await   pintarResultados("led", mes,año);
    await   pintarResultados("fotorojo", mes,año);
    await   pintarResultados("nodo", mes,año);
    await   pintarResultados("panelinformativo", mes,año);
    await   pintarResultados("puntomedida", mes,año);
    await   pintarResultados("radares", mes,año);
    await   pintarResultados("sector", mes,año);
    await   pintarResultados("señalesluminosas", mes,año);
    await   pintarResultados("almacen", mes,año);
    await   pintarResultados("residuos", mes,año); 
    
}

function imprimir2(){
    var doc = new jsPDF('p', 'pt', 'a1');
    var options = {
        pagesplit: false
   };
 
  // All units are in the set measurement for the document
  // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
  
  doc.addHTML(document.getElementById('titulo')[0],  options, function(){
  doc.save('ConsultaIntroduccionDatos.pdf');
    })

}



async function pintarResultados() {

//Calcula el total de este tipo
    var url = 'http://172.27.120.120/gestin/public/api/consultaalmacen/count';
    
      let count= await   fetch(url, {method: 'GET',
         headers: {
             'Content-Type': 'application/json'
         }
     })
     .then(res => res.json())
     .catch(error => console.error('Error:', error))
     .then(response => {return response});
     

    //console.log(count[0][0]);
//calcula los registros
    var url = 'http://172.27.120.120/gestin/public/api/consultaalmacen' ;
    
    await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
                        if (response!=='No se han encontrado resultados'){
                           // console.log(response[0]['id']);

                                var t = document.getElementById('titulo');
                                t.innerHTML += `        
                                <!-- Títulos Form Nuevo-->
                                <h4 class="mt-1"><b>Total de Elementos(${count[0][0]})</b></h4>
                                <div class="row ml-1">
                                    <div class="col-1">
                                        Instalación
                                    </div>
                                    <div class="col-1">
                                        Usuario
                                    </div>
                                    <div class="col-2">
                                        Tipo Instalacion
                                    </div>
                                    <div class="col-2">
                                        Observaciones
                                    </div>
                                    <div class="col-2">
                                        F. Actuación
                                    </div>
                                    <div class="col-1">
                                        Núm. Serie
                                    </div>

                                    
    
                                </div>
                            <!-- Fin Titulos -->
                            `;
                            for (var i in response) {
                                t.innerHTML += `
                                <div class="row mt-0" id="">
                                   <div class="col-1">
                                       <input type="text" class="form-control mt-1" name="inputFechaActuacion"  value="${response[i]['idInstalacion']}" disabled>
                                   </div>
                                    <div class="col-1">
                                       <input type="text" class="form-control mt-1" name="inputFechaActuacion"  value="${response[i]['idUsuario']}" disabled>
                                    </div>
                                    <div class="col-2">
                                        <input type="text" class="form-control mt-1" name="inputFechaActuacion"  value="${response[i]['idTipoInstalacion']}" disabled>
                                    </div>
                                    <div class="col-2">
                                        <input type="text" class="form-control mt-1" name="observaciones"   value="${response[i]['observaciones']}"  disabled>
                                    </div>
                                    <div class="col-2">
                                        <input type="text" class="form-control mt-1" name="color"   value="${response[i]['fechaActuacion']}"  disabled>
                                    </div>
                                    <div class="col-1">
                                        <input type="text" class="form-control mt-1" name="inputObservaciones"   value="${response[i]['idNumSerie']}"  disabled>
                                    </div>

                                </div>  
                                    
                                    `
                                }                               
                           }                        
                        })
}


function getJsonAPI(tipo,id) {
           
            var url = 'http://172.27.120.120/gestin/public/api/' + tipo + '/' + id;
           // var url = 'http://172.27.120.120/gestin/public/api/led/'+id;
  let response=  fetch(url, {method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {return response});
            return response;
}




