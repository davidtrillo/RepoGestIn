
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
                            // Para Leds;
                            if(tipo!=='led'){
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
                                    }else{
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


async function imprimir() {

/*
    var id=document.getElementById("inputInstalacion").value;
    //conseguir el json
    var rowTarjetas= await getJsonAPI('tarjetas',id);
    var rowTarjetasCPU= await getJsonAPI('tarjetascpu',id);
   // var rowTarjetasAmp= await getJsonAPI('tarjetasamp',id);
    var rowTarjetasFA= await getJsonAPI('tarjetasFA',id);
    var rowBusTren= await getJsonAPI('bustren',id);

    // var row11_200= await getJsonAPI('11_200',id);
    // var row11_300= await getJsonAPI('11_300',id);

    // var row12_100= await getJsonAPI('12_100',id);
    // var row12_200= await getJsonAPI('12_200',id);
    // var row12_300= await getJsonAPI('12_300',id);

    // var row13_200= await getJsonAPI('13_200',id);
    // var row13_322= await getJsonAPI('13_322',id);
    // var row13_332= await getJsonAPI('13_332',id);

    var rowOculta= await getJsonAPI('oculta',id);
    var rowLed= await getJsonAPI('led',id);
    // // var rowInvidentes= await getJsonAPI('invidentes',id);
    // var rowDescontadores= await getJsonAPI('descontadores',id);
    // var rowBaculos= await getJsonAPI('baculos',id);
    // var rowColumnas= await getJsonAPI('columnas',id);
    // var rowBrazos= await getJsonAPI('brazos',id);
    // var rowBajantes= await getJsonAPI('bajantes',id);
    // var rowAlargaderas= await getJsonAPI('alargaderas',id);
    // var rowPulsadores= await getJsonAPI('pulsadores',id);
    var rowEspiras= await getJsonAPI('espiras',id);
    // var rowPantallascon= await getJsonAPI('pantallascon',id);
*/
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

    colCarcasa[
        {header: 'NID', dataKey: 'NID'},
        {header: 'Fecha Actuacion', dataKey: 'fechaActuacion'},
        {header: 'Tipo Actuación', dataKey: 'descripcion'},
        {header: 'Observaciones', dataKey: 'observaciones'},
        {header: 'Albaran', dataKey: 'albaran'},
        {header: 'Num. Serie', dataKey: 'idNumSerie'},
        {header: 'Precio', dataKey: 'precio'}
    ];

////////////////////////////////////////////////////////////////////////////////////////////////// ME HE QUEDADO AQUÍ PARA INSERTAR UN NUEVO CAMPO FABRICACIÓN EN LED

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

//-----------------------------------------------------------
doc.setFontSize(18);
doc.text("Cuerpos",14,30);


    // if (row11_200!='No se han encontrado resultados') {

    //     doc.text("11_200",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row11_200,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (row11_300!='No se han encontrado resultados') {

    //     doc.text("11_300",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row11_300,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }




    // if (row12_100!='No se han encontrado resultados') {

    //     doc.text("12_100",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row12_100,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (row12_200!='No se han encontrado resultados') {

    //     doc.text("12_200",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row12_200,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }


    // if (row12_300!='No se han encontrado resultados') {

    //     doc.text("12_300",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row12_300,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }





    // if (row13_200!='No se han encontrado resultados') {

    //     doc.text("13_200",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row13_200,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

    // if (row13_322!='No se han encontrado resultados') {

    //     doc.text("13_322",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row13_322,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }


    // if (row13_332!='No se han encontrado resultados') {

    //     doc.text("13_332",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:row13_332,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

//-----------------------------------------------------------
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

    // if (rowPantallascon!='No se han encontrado resultados') {
    //     doc.text("Pantallascon",14,doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //         columns:col,
    //         body:rowPantallascon,
    //         startY: doc.autoTable.previous.finalY + 12,
    //         pageBreak: 'avoid',
    //     });
    // }

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
    }

