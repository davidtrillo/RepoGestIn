// Detect when dorpdownList is changing jquery
$("#dropdown-menu1 button").click(function () {
    var a = $(this).text();
    $("#inputTipologia").val($(this).text());
    var datoInput = document.getElementById('inputTipologia').value;
    enviarInput(datoInput);

})

function enviarInput(datoInput) { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://webserver.mobilitat.local/gestin/public/api/instalaciones/' + datoInput;
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
    var url = 'http://webserver.mobilitat.local/gestin/public/api/cruces';
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

 async function leerInstalacion(idInstalacion, ubicacion) {
    var inputInst = document.getElementById('inputInstalacion');
    inputInst.value = idInstalacion;
    
    var inputUbi = document.getElementById('inputUbicacion');
    inputUbi.value = ubicacion;
    
     // aquí poner el codigo para ejecutar la consulta
     var t = document.getElementById('titulo');
     t.innerHTML='';

    await   pintarResultados("tarjetas", idInstalacion);
    await   pintarResultados("bustren", idInstalacion);
    await   pintarResultados("13_322", idInstalacion);
    await   pintarResultados("12_300", idInstalacion);
    await   pintarResultados("13_200", idInstalacion);
    await   pintarResultados("12_200", idInstalacion);
    await   pintarResultados("11_200", idInstalacion);
    await   pintarResultados("12_pp", idInstalacion);
    await   pintarResultados("invidentes", idInstalacion);
    await   pintarResultados("descontadores", idInstalacion);
    await   pintarResultados("baculos", idInstalacion);
    await   pintarResultados("columnas", idInstalacion);
    await   pintarResultados("pulsadores", idInstalacion);
    await   pintarResultados("espiras", idInstalacion);
    await   pintarResultados("pantallascon", idInstalacion);
    await   pintarResultados("oculta", idInstalacion);
    await   pintarResultados("led", idInstalacion);
    
}


// function lista(id) {

//     pintarResultados("tarjetas", id);

// }


async function pintarResultados(tipo, id) {

    console.log(tipo);
    var url = 'http://webserver.mobilitat.local/gestin/public/api/' + tipo + '/' + id;
    await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
                        if (response!="No se han encontrado resultados"){
                                    var t = document.getElementById('titulo');
                                    t.innerHTML += `        
                                    <!-- Títulos Form Nuevo-->
                                    <h4 class="mt-1"><b>${tipo.toUpperCase()}</b></h4>
                                    <div class="row ml-1">
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
                                // var p = document.getElementById('datos');
                                    for (var i in response) {
                                        t.innerHTML += `
                                    <div class="row mt-0" id="">
                                        <div class="col-2">
                                            <input type="text" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" value="${response[i]['fechaActuacion']}" disabled>
                                        </div>
                                        <div class="col-2">
                                            <input type="text" class="form-control mt-1" name="inputTipoActuacion" id="inputTipoActuacion"  value="${response[i]['descripcion']}"  disabled>
                                        </div>
                                        <div class="col-3">
                                            <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones"  value="${response[i]['observaciones']}"  disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran"  value="${response[i]['albaran']}" disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie"  value="${response[i]['idNumSerie']}" disabled>
                                        </div>
                                        <div class="col-1">
                                            <input type="text" class="form-control mt-1" name="inputPrecio" id="inputPrecio" value="${response[i]['precio']}"  disabled>
                                        </div>

                                    </div>  
                                        
                                        `
                                    }
                        }

        })


}

function getJsonAPI(tipo,id) {
           
            var url = 'http://webserver.mobilitat.local/gestin/public/api/' + tipo + '/' + id;
           // var url = 'http://webserver.mobilitat.local/gestin/public/api/led/'+id;
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


    var id=document.getElementById("inputInstalacion").value;
    //conseguir el json
    var rowTarjetas= await getJsonAPI('tarjetas',id);
    var rowBusTren= await getJsonAPI('bustren',id);
    var row11_322= await getJsonAPI('13_322',id);
    var row12_300= await getJsonAPI('12_300',id);
    var row13_200= await getJsonAPI('13_200',id);
    var row12_200= await getJsonAPI('12_200',id);
    var row11_2in= await getJsonAPI('11_200',id);
    var row12_pp= await getJsonAPI('12_pp',id);
    var rowInvidentes= await getJsonAPI('invidentes',id);
    var rowDescontadores= await getJsonAPI('descontadores',id);
    var rowColumnas= await getJsonAPI('columnas',id);
    var rowBaculos= await getJsonAPI('baculos',id);
    var rowPulsadores= await getJsonAPI('pulsadores',id);
    var rowEspiras= await getJsonAPI('espiras',id);
    var rowPantallascon= await getJsonAPI('pantallascon',id);
    var rowOculta= await getJsonAPI('oculta',id);
    var rowLed= await getJsonAPI('led',id);

    colLed=[
        {header: 'Fecha Actuacion', dataKey: 'fechaActuacion'},
        {header: 'Tipo', dataKey: 'tipo'},
        {header: 'Color', dataKey: 'color'},
        {header: 'Grupo', dataKey: 'grupo'},
        {header: 'Num. Serie', dataKey: 'idNumSerie'},
        {header: 'Albaran', dataKey: 'albaran'},
        {header: 'Observaciones', dataKey: 'observaciones'},
    ]
    col=[
        {header: 'Fecha Actuacion', dataKey: 'fechaActuacion'},
        {header: 'Tipo Actuación', dataKey: 'descripcion'},
        {header: 'Observaciones', dataKey: 'observaciones'},
        {header: 'Albaran', dataKey: 'albaran'},
        {header: 'Num. Serie', dataKey: 'idNumSerie'},
        {header: 'Precio', dataKey: 'precio'},
    ]


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
        

    if (rowBusTren!='No se han encontrado resultados') {

        doc.text("Bus/Tren",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowBusTren,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (row11_322!='No se han encontrado resultados') {

        doc.text("13_322",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:row11_322,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (row12_300!='No se han encontrado resultados') {

        doc.text("12_300",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:row12_300,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (row13_200!='No se han encontrado resultados') {

        doc.text("13_200",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:row13_200,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (row12_200!='No se han encontrado resultados') {

        doc.text("12_200",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:row12_200,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }


    if (row12_pp!='No se han encontrado resultados') {

        doc.text("11_200",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:row11_2in,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (row12_pp!='No se han encontrado resultados') {

        doc.text("12_pp",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:row12_pp,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (rowInvidentes!='No se han encontrado resultados') {

        doc.text("Sonoros",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowInvidentes,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (rowDescontadores!='No se han encontrado resultados') {

        doc.text("descontadores",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowDescontadores,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (rowColumnas!='No se han encontrado resultados') {
        doc.text("columnas",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowColumnas,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (rowBaculos!='No se han encontrado resultados') {
        doc.text("baculos",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowBaculos,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        }); 
    }

    if (rowPulsadores!='No se han encontrado resultados') {
        doc.text("pulsadores",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowPulsadores,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (rowEspiras!='No se han encontrado resultados') {
        doc.text("espiras",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowEspiras,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (rowPantallascon!='No se han encontrado resultados') {
        doc.text("pantallascon",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowPantallascon,
            startY: doc.autoTable.previous.finalY + 12,
            pageBreak: 'avoid',
        });
    }

    if (rowOculta!='No se han encontrado resultados') {
        doc.text("oculta",14,doc.autoTable.previous.finalY + 10);
        doc.autoTable({
            columns:col,
            body:rowOculta,
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
    }

