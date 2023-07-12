
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



async function pintarResultados(tipo, mes, año) {

//Calcula el total de este tipo
    var url = 'http://172.27.120.120/gestin/public/api/consultaintroduccion/count/'  + tipo + '/' + mes + '/' + año;
    
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
    var url = 'http://172.27.120.120/gestin/public/api/consultaintroduccion/' + tipo + '/' + mes + '/' + año;
    
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
                            
                           switch (tipo) {
                                case "led":
                                var t = document.getElementById('titulo');
                                t.innerHTML += `        
                                <!-- Títulos Form Nuevo-->
                                <h4 class="mt-1"><b>${tipo.toUpperCase()}(${count[0][0]})</b></h4>
                                <div class="row ml-1">
                                    <div class="col-1">
                                        Instalación
                                    </div>
                                    <div class="col-1">
                                        Usuario
                                    </div>
                                    <div class="col-2">
                                        F.Actuación
                                    </div>
                                    <div class="col-2">
                                        NID
                                    </div>
                                    <div class="col-2">
                                        Color
                                    </div>
                                    <div class="col-2">
                                        Observaciones
                                    </div>
                                    <div class="col-1">
                                        Albarán
                                    </div>
                                    <div class="col-1">
                                        Num. Serie
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
                                        <input type="text" class="form-control mt-1" name="inputFechaActuacion"  value="${response[i]['fechaActuacion']}" disabled>
                                    </div>
                                    <div class="col-2">
                                        <input type="text" class="form-control mt-1" name="nid"   value="${response[i]['nid']}"  disabled>
                                    </div>
                                    <div class="col-2">
                                        <input type="text" class="form-control mt-1" name="color"   value="${response[i]['color']}"  disabled>
                                    </div>
                                    <div class="col-2">
                                        <input type="text" class="form-control mt-1" name="inputObservaciones"   value="${response[i]['observaciones']}"  disabled>
                                    </div>
                                    <div class="col-1">
                                        <input type="text" class="form-control mt-1" name="inputAlbaran"   value="${response[i]['albaran']}" disabled>
                                    </div>
                                    <div class="col-1">
                                        <input type="text" class="form-control mt-1" name="inputNumSerie"   value="${response[i]['idNumSerie']}" disabled>
                                    </div>

                                </div>  
                                    
                                    `
                                }
                                
                                break;

                                case "tarjetascpu":
                                    var t = document.getElementById('titulo');
                                    t.innerHTML += `        
                                    <!-- Títulos Form Nuevo-->
                                    <h4 class="mt-1"><b>${tipo.toUpperCase()}(${count[0][0]})</b></h4>
                                    <div class="row ml-1">
                                        <div class="col-1">
                                            Instalación
                                         </div>
                                         <div class="col-1">
                                             Usuario
                                        </div>
                                        <div class="col-2">
                                            F.Actuación
                                        </div>
                                        <div class="col-2">
                                            Tipo Actuación
                                        </div>
                                        <div class="col-1">
                                            Tipo Tarjeta
                                        </div>
                                        <div class="col-3">
                                            Observaciones
                                        </div>
                                        <div class="col-1">
                                            Num. Serie
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
                                            <input type="text" class="form-control mt-1" name="inputFechaActuacion"  value="${response[i]['fechaActuacion']}" disabled>
                                        </div>
                                        <div class="col-2">
                                            <input type="text" class="form-control mt-1" name="inputTipoActuacion"   value="${response[i]['idTipoActuacion']}"  disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputTipoActuacion"   value="${response[i]['tipo']}"  disabled>
                                        </div>
                                        <div class="col-3">
                                            <input type="text" class="form-control mt-1" name="inputObservaciones"  value="${response[i]['observaciones']}"  disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputNumSerie"   value="${response[i]['idNumSerie']}" disabled>
                                        </div>


                                    </div>  
                                        
                                        `}
                                    break;
                                
                                case "almacen":

                                case "residuos":
                                    var t = document.getElementById('titulo');
                                    t.innerHTML += `        
                                    <!-- Títulos Form Nuevo-->
                                    <h4 class="mt-1"><b>${tipo.toUpperCase()}(${count[0][0]})</b></h4>
                                    <div class="row ml-1">
                                        <div class="col-1">
                                            Instalación
                                         </div>
                                         <div class="col-1">
                                             Usuario
                                        </div>
                                        <div class="col-2">
                                            F.Actuación
                                        </div>
                                        <div class="col-2">
                                            Tipo Instalación
                                        </div>
                                        <div class="col-3">
                                            Observaciones
                                        </div>
                                        <div class="col-1">
                                            Num. Serie
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
                                            <input type="text" class="form-control mt-1" name="inputFechaActuacion"  value="${response[i]['fechaActuacion']}" disabled>
                                        </div>
                                        <div class="col-2">
                                            <input type="text" class="form-control mt-1" name="inputTipoActuacion"   value="${response[i]['idTipoInstalacion']}"  disabled>
                                        </div>
                                        <div class="col-3">
                                            <input type="text" class="form-control mt-1" name="inputObservaciones"  value="${response[i]['observaciones']}"  disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputNumSerie"   value="${response[i]['idNumSerie']}" disabled>
                                        </div>


                                    </div>  
                                        
                                        `
                                    }
                                    break;

                                default:
                                    var t = document.getElementById('titulo');
                                    t.innerHTML += `        
                                    <!-- Títulos Form Nuevo-->
                                    <h4 class="mt-1"><b>${tipo.toUpperCase()}(${count[0][0]})</b></h4>
                                    <div class="row ml-1">
                                        <div class="col-1">
                                            Instalación
                                         </div>
                                         <div class="col-1">
                                             Usuario
                                        </div>
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
                                            <input type="text" class="form-control mt-1" name="inputFechaActuacion"  value="${response[i]['fechaActuacion']}" disabled>
                                        </div>
                                        <div class="col-2">
                                            <input type="text" class="form-control mt-1" name="inputTipoActuacion"   value="${response[i]['idTipoActuacion']}"  disabled>
                                        </div>
                                        <div class="col-3">
                                            <input type="text" class="form-control mt-1" name="inputObservaciones"  value="${response[i]['observaciones']}"  disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputAlbaran"   value="${response[i]['albaran']}" disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputNumSerie"   value="${response[i]['idNumSerie']}" disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputPrecio"  value="${response[i]['precio']}"  disabled>
                                        </div>

                                    </div>  
                                        
                                        `
                                    }
                                    break;
                                  
                                
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


//async function imprimir() {

    colLed=[
        {header: 'NID', dataKey: 'NID'},
        {header: 'Fecha Actuacion', dataKey: 'fechaActuacion'},
        {header: 'Tipo', dataKey: 'tipo'},
        {header: 'Color', dataKey: 'color'},
        {header: 'Fabricación', dataKey: 'fabricacion'},
        {header: 'Num. Serie', dataKey: 'idNumSerie'},
        {header: 'Albaran', dataKey: 'albaran'},
        {header: 'Observaciones', dataKey: 'observaciones'}
    ];

    col=[
        {header: 'Fecha Actuacion', dataKey: 'fechaActuacion'},
        {header: 'Tipo Actuación', dataKey: 'descripcion'},
        {header: 'Observaciones', dataKey: 'observaciones'},
        {header: 'Albaran', dataKey: 'albaran'},
        {header: 'Num. Serie', dataKey: 'idNumSerie'},
        {header: 'Precio', dataKey: 'precio'}
    ];



    var doc = new jsPDF();
    let pageNumber = doc.getNumberOfPages();

    doc.setFontSize(22);
    doc.text("Elementos de un cruce",14,20);

    doc.setFontSize(18);
    doc.text("Tarjetas",14,30);

    if (rowTarjetas!='No se han encontrado resultados') {

        doc.autoTable({
            columns:col,
            body:rowTarjetas,
            startY:32,
            pageBreak: 'avoid',
        });
    }

    if (rowTarjetasCPU!='No se han encontrado resultados') {

        doc.autoTable({
            columns:col,
            body:rowTarjetasCPU,
            startY:32,
            pageBreak: 'avoid',
        });
    }      

    // if (rowTarjetasAmp!='No se han encontrado resultados') {

    //     doc.autoTable({
    //         columns:col,
    //         body:rowTarjetasAmp,
    //         startY:32,
    //         pageBreak: 'avoid',
    //     });
    // } 

    if (rowTarjetasFA!='No se han encontrado resultados') {

        doc.autoTable({
            columns:col,
            body:rowTarjetasFA,
            startY:32,
            pageBreak: 'avoid',
        });
    }      

    if (rowBusTren!='No se han encontrado resultados') {

        doc.text("Bus/Tren",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowBusTren,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }


doc.setFontSize(18);
doc.text("Elementos",14,30);

    if (rowOculta!='No se han encontrado resultados') {
        doc.text("Oculta",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowOculta,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }


    // if (rowInvidentes!='No se han encontrado resultados') {

    //     doc.text("Sonoros",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowInvidentes,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (rowDescontadores!='No se han encontrado resultados') {

    //     doc.text("Descontadores",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowDescontadores,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }
    
    //     if (rowBaculos!='No se han encontrado resultados') {
    //         doc.text("Báculos",14,doc.autoTable.previous.finalY + 10);
    //         doc.autoTable({
    //             columns:col,
    //             body:rowBaculos,
    //             startY: doc.autoTable.previous.finalY + 12,
    //             pageBreak: 'avoid',
    //         }); 
    //     }

    // if (rowColumnas!='No se han encontrado resultados') {
    //     doc.text("columnas",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowColumnas,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (rowBrazos!='No se han encontrado resultados') {
    //     doc.text("Brazos",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowBrazos,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (rowBajantes!='No se han encontrado resultados') {
    //     doc.text("Bajantes",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowBajantes,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (rowAlargaderas!='No se han encontrado resultados') {
    //     doc.text("pulsadores",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowAlargaderas,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (rowPulsadores!='No se han encontrado resultados') {
    //     doc.text("Pulsadores",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowPulsadores,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    if (rowEspiras!='No se han encontrado resultados') {
        doc.text("Espiras",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowEspiras,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }


    if (rowLed!='No se han encontrado resultados') {
        doc.text("Leds",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:colLed,
            body:rowLed,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }
    doc.setPage(pageNumber);


        //abrir PDF en otra ventana nueva
        var string=doc.output('datauristring');
        var embed='<embed src="'+ string +'" type="application/pdf" width="100%" height="100%">'
        var x=window.open();
        x.document.open(); 
        x.document.write(embed); 
        x.document.close();
//    }

