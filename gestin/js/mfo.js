//document.onload = rellenarMFO();

document.getElementById("inputIdCruces")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        var id2=document.getElementById('inputIdCruces').value;
         filtrarCruce(id2);
        
    }
});

function rellenarCruceMFO() { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/cruces'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropInstalacionPintura');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceMFO(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}

/*
function rellenarCruceMFO2(param) { //Llamada a la API según el dato obtenido del primer combo
    var url = 'http://172.27.120.120/gestin/public/api/cruces'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('dropInstalacionPintura'+param);
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceMFO2(${param},this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}
*/

function rellenarCruceMFOFiltro() { //Llamada a la API según el dato obtenido del primer combo


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
            var p = document.getElementById('dropCruces');
            p.innerHTML = '';
            for (var i in response) {
                p.innerHTML += `
             <button class="dropdown-item" type="submit" id="dropBtnTipoActuacion${[i]}" name="${response[i]['ubicacion']}" onclick="leerCruceMFO3(this.value,this.name)" value="${response[i]['id']}">${response[i]['id']} - ${response[i]['ubicacion']}</button>
             `
            }
        })

}

/*
function leerCruceMFO(id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce');
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion');
    p2.value = ubicacion;
    var resolucion = document.getElementById('inputOk'); // mirar si guarda uno o guarda true 
    resolucion.checked=false;
   
    var precio = document.getElementById('inputPrecio');
    precio.value="";
}
*/
/*
async function leerCruceMFO2(param, id, ubicacion) {
    var p1 = document.getElementById('inputIdCruce2'+param);
    p1.value = id;
    var p2 = document.getElementById('inputUbicacion2'+param);
    p2.value = ubicacion;
    await calcularPrecio2(param,id);
}
*/

function leerCruceMFO3(id,ubicacion) {
    var p1 = document.getElementById('inputIdCruces');
    p1.value = id + " " + ubicacion;
    var p2 = document.getElementById('inputIdCruce');
    p2.value = id;
    var p3 = document.getElementById('inputUbicacion');
    p3.value = ubicacion;
    filtrarCruce(id);

}

async function nuevoMFO() {

    var idInstalacion = document.getElementById('inputIdCruce').value;

    if (idInstalacion.value != "") {
        var fechaActuacion = document.getElementById('inputFechaActuacion').value ? document.getElementById('inputFechaActuacion').value : null;
        var fechaInspeccion = document.getElementById('inputFechaInspeccion').value ? document.getElementById('inputFechaInspeccion').value : null;
        var observaciones = document.getElementById('inputObservaciones').value ? document.getElementById('inputObservaciones').value : "";
        var resolucion = document.getElementById('inputOk').checked; // mirar si guarda uno o guarda true 
        var idUsuario = document.getElementById('inputIdUsuario').value ? document.getElementById('inputIdUsuario').value : null;
        var precio = document.getElementById('inputPrecio').value ? document.getElementById('inputPrecio').value : 0;
        resolucion = String(resolucion);


        var url = 'http://172.27.120.120/gestin/public/api/mfo/nueva';

     await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idInstalacion: idInstalacion,
                    fechaActuacion: fechaActuacion,
                    fechaInspeccion: fechaInspeccion,
                    observaciones: observaciones,
                    idUsuario: idUsuario,
                    resolucion: resolucion,
                    precio:precio
                })
            })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                alert(response)
            })

    }
    var resolucion = document.getElementById('inputOk'); // mirar si guarda uno o guarda true 
    resolucion.checked=false;
   
    var precio = document.getElementById('inputPrecio');
    precio.value="";

    filtrarCruce(idInstalacion);
}



function filtrarCruce(id) {
    var cruceFil = document.getElementById('inputIdCruce').value;
    var inputIdCruce = document.getElementById('inputIdCruce');
    inputIdCruce.value=cruceFil
    
    
    //borrar precio anterior y resolución
    var resolucion = document.getElementById('inputOk'); // mirar si guarda uno o guarda true 
    resolucion.checked=false;
   
    var precio = document.getElementById('inputPrecio');
    precio.value="";



    var url = 'http://172.27.120.120/gestin/public/api/mfo/'+id;
    fetch(url, {
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

                var ubi = document.getElementById('inputUbicacion');
                ubi.value=response[0]['ubicacion'];


                var p = document.getElementById('formBody');
                p.innerHTML = '';
                for (var i in response) {
                    if (response[i]['resolucion'] == "true") {
                        var activo = "checked";
                    } else {
                        var activo = "";
                    }
                    var fechaActuacion= response[i]['fechaActuacion'] ;
                    if (fechaActuacion==null){
                        fechaActuacion="";
                    }

                    var fechaInspeccion= response[i]['fechaInspeccion'] ;
                    if (fechaInspeccion==null){
                        fechaInspeccion="";
                    }

                    p.innerHTML += `
                    <div class="container-fluid mt-1 ml-1 ">
                    <div class="row">
                        <div class="col-1 p-1">

                                <input type="text" class="form-control mt-2" name="" id="inputIdCruce2${response[i]['id']}" value="${response[i]['idInstalacion']}" onfocusout="rellenarUbicacion(${response[i]['id']})" disabled>                          
                            
                        </div>
           
                       <div class="col-2 p-1">
                          <input type="text" class="form-control mt-2" name="" id="inputUbicacion2${response[i]['id']}" placeholder="Ubicación" value="${response[i]['ubicacion']}"
                             disabled>
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" name="" id="inputFechaActuacion2${response[i]['id']}" value="${fechaActuacion}">
                       </div>
                       <div class="col-xd-1 p-1">
                          <input type="date" class="form-control mt-2" name="" id="inputFechaInspeccion2${response[i]['id']}" value="${fechaInspeccion}">
                       </div>
                       <div class="col-3 p-1">
                          <input type="text" class="form-control mt-2" name="" id="observaciones2${response[i]['id']}" value="${response[i]['observaciones']}">
                       </div>
                       <div class="col-1 p-1">
                             <input type="text" class="form-control mt-2" name="" id="precio2${response[i]['id']}" value="${response[i]['precio']}" disabled>
                        </div>
                       <div class="col-1 p-1">
                          <input type="checkbox" class="mt-3 ml-5" name="resolucion" onclick="rellenarPrecio2(${response[i]['id']})" id="resolucion2${response[i]['id']}" ${activo}>
                       </div>
                       <div class="col-1 p-1 mt-2">

                                             
                       <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarMFO(this.id)"><i
                                class="fas fa-pencil-alt"></i></div>
                         
                        <div class="btn btn-danger" title="Eliminar registro" id="${response[i]['id']}" onclick="borrarMFO(this.id)"><i
                                class="fas fa-trash-alt"></i></div>

                       </div>
                    </div>
                 </div>
                 
                 `

                }
            }
        })


}

function rellenarUbicacion(param) {

    var p1=document.getElementById("inputIdCruce2"+param);

    var url = 'http://172.27.120.120/gestin/public/api/cruce/'+p1.value;
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            //console.log(p1.value+' '+param+' '+response[0]['ubicacion']);
            var p = document.getElementById('inputUbicacion2'+param);
                p.innerHTML='';
                p.value=response[0]['ubicacion'];     
        })
}

async function borrarMFO(id) {

        var url = 'http://172.27.120.120/gestin/public/api/mfo/borrar/'+id;
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

            var id2=document.getElementById('inputIdCruce').value;
            await  filtrarCruce(id2);
            // setTimeout(() => {
            //     rellenarMFO(); 
            // }, 1000);
}


async function editarMFO(param) {
    var id= param;
    var inputIdCruce2 = document.getElementById('inputIdCruce2' + param).value ? document.getElementById('inputIdCruce2' + param).value : null ;
    var inputFechaActuacion2 = document.getElementById('inputFechaActuacion2' + param).value ? document.getElementById('inputFechaActuacion2' + param).value : null ;
    var inputFechaInspeccion2 = document.getElementById('inputFechaInspeccion2' + param).value ? document.getElementById('inputFechaInspeccion2' + param).value : null ;
    var observaciones2 = document.getElementById('observaciones2' + param).value ? document.getElementById('observaciones2' + param).value : "" ;
    var resolucion2 = document.getElementById('resolucion2' + param).checked;
    resolucion2 = String(resolucion2);
    var idUsuario = document.getElementById('inputIdUsuario').value ;
    var precio = document.getElementById('precio2' + param).value ? document.getElementById('precio2' + param).value : 0 ;

    //  console.log(id);
    //  console.log(inputIdCruce2);
    //  console.log(inputFechaActuacion2);
    //  console.log(inputFechaInspeccion2);
    //  console.log(observaciones2);
    //  console.log(resolucion2);
    //  console.log(idUsuario);
    //  console.log(precio);

    var url = 'http://172.27.120.120/gestin/public/api/mfo/modificar/' + param;
    
    await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                idInstalacion:inputIdCruce2,
                idUsuario:idUsuario,
                observaciones:observaciones2,
                fechaActuacion:inputFechaActuacion2,
                fechaInspeccion:inputFechaInspeccion2,
                resolucion:resolucion2,
                precio:precio    
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })

        var id2=document.getElementById('inputIdCruce').value;
        await  filtrarCruce(id2);
    // setTimeout(() => {
    //     rellenarMFO(); //CAMBIO DE NOMENCLATURA
    // }, 1000);
}

async function imprimir() {
    var p1=document.getElementById('inputMes').value;

    var fecha=new Date(p1);
    var mes=fecha.getMonth()+1;
    var año=fecha.getFullYear();

    var url = 'http://172.27.120.120/gestin/public/api/mfo/imprimir/' + mes +'/'+año;
    var listado= await fetch(url, {
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
                                    return (response);
                                    }
                                })

    var url2 = 'http://172.27.120.120/gestin/public/api/mfo/imprimir/fechainspeccion/' + mes +'/'+año;
    var recuentoFechaInspeccion= await fetch(url2, {
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
                                    return (response);
                                    }
                                })
  //  console.log(listado);

    //calcular el precio total
    var precioTotal=0;
   
    for (let index = 0; index < listado.length; index++) {
       
       var var1=parseFloat(precioTotal);
       var var2=parseFloat(listado[index]['precio']);
       // console.log(index+'- var1='+var1);
       // console.log(index+'- var2='+var2);
        precioTotal =parseFloat(var2+var1).toFixed(2);//parseFloat(precioTotal+listado[index]['precio']).toFixed(2);

        // let var3=parseFloat('2.2').toFixed(2);
        // let var4=parseFloat('1.1').toFixed(2);
        // let var5=var3+var4;
        // console.log('resultat var3+var4: '+var3+var4);
        // console.log('resultat var5: '+var5);
        // console.log('resultat parse: '+ parseFloat(var3+var4).toFixed(2));
        
        
        
        
    }
    
    var recuento= listado.length;
   // console.log('precioTotal='+precioTotal);


    col=[
        {header: 'Cruce', dataKey: 'idInstalacion'},
        {header: 'Ubicación', dataKey: 'ubicacion'},
        {header: 'F. Actuación', dataKey: 'fechaActuacion'},
        {header: 'F. Inspección', dataKey: 'fechaInspeccion'},
        {header: 'Observaciones', dataKey: 'observaciones'},
        {header: 'Precio', dataKey: 'precio'},
    ]

    var doc = new jsPDF('landscape');
    let pageNumber = doc.getNumberOfPages();

    doc.setFontSize(22);
    doc.text("MFO de cruces",14,20);

        doc.autoTable({
            columns:col,
            body:listado,
            startY:32,
            pageBreak: 'avoid',
            theme : 'grid',
            styles: {overflow: 'linebreak'},
            cellWidth: 'wrap',
            headStyles:{
                0:{halign: 'right'}
            },
            columnStyles:{
                0: {cellWidth:15,halign: 'right'},
                1: {cellWidth: 70}, 
                2: {cellWidth: 15},
                3: {cellWidth: 15},
                4: {cellWidth: 70},
                5: {cellWidth: 1,halign: 'right'},             
            },

            

        });
    
    doc.setPage(pageNumber);

    doc.setFontSize(10);
    doc.text("Precio Total: "+ precioTotal + "€",14,doc.autoTable.previous.finalY+8);
    doc.text("Recuento Fecha Actuación: "+ recuento,14,doc.autoTable.previous.finalY+12);
    doc.text("Recuento Fecha Inspección: "+ recuentoFechaInspeccion[0][0],14,doc.autoTable.previous.finalY+16);

    doc.setProperties({
        title: 'MFO Cruces',
        subject: 'Info',
        author: 'Ajuntament de Palma',
        keywords: 'generated, javascript, web 2.0, ajax',
        creator: 'Departament de Mobilitat'
    });

    //abrir PDF en otra ventana nueva
    var string=doc.output('datauristring');
    var embed='<embed src="'+ string +'" type="application/pdf" width="100%" height="100%">'
    var x=window.open();
    x.document.open(); 
    x.document.write(embed); 
    x.document.close();


}


async function imprimirNoOk() {
    var p1=document.getElementById('inputMes').value;

    var fecha=new Date(p1);
    var mes=fecha.getMonth()+1;
    var año=fecha.getFullYear();

    var url = 'http://172.27.120.120/gestin/public/api/mfo/imprimirnook/' + mes +'/'+año;
    var listado= await fetch(url, {
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
                                    return (response);
                                    }
                                })
    
    var url2 = 'http://172.27.120.120/gestin/public/api/mfo/imprimirnook/fechainspeccion/' + mes +'/'+año;
    var countFechaInspeccion= await fetch(url2, {
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
                                    return (response);
                                    }
                                })
  //  console.log(listado);

    //calcular el precio total
    var precioTotal=0;
   
    for (let index = 0; index < listado.length; index++) {
       
       var var1=parseFloat(precioTotal);
       var var2=parseFloat(listado[index]['precio']);
       // console.log(index+'- var1='+var1);
       // console.log(index+'- var2='+var2);
        precioTotal =parseFloat(var2+var1).toFixed(2);//parseFloat(precioTotal+listado[index]['precio']).toFixed(2);

        // let var3=parseFloat('2.2').toFixed(2);
        // let var4=parseFloat('1.1').toFixed(2);
        // let var5=var3+var4;
        // console.log('resultat var3+var4: '+var3+var4);
        // console.log('resultat var5: '+var5);
        // console.log('resultat parse: '+ parseFloat(var3+var4).toFixed(2));   
        
        
    }
    
    var recuentoFechaActuacion= listado.length;
   // console.log('precioTotal='+precioTotal);


    col=[
        {header: 'Cruce', dataKey: 'idInstalacion'},
        {header: 'Ubicación', dataKey: 'ubicacion'},
        {header: 'F. Actuación', dataKey: 'fechaActuacion'},
        {header: 'F. Inspección', dataKey: 'fechaInspeccion'},
        {header: 'Observaciones', dataKey: 'observaciones'},
        {header: 'Precio', dataKey: 'precio'},
    ]

    var doc = new jsPDF('landscape');
    let pageNumber = doc.getNumberOfPages();

    doc.setFontSize(22);
    doc.text("MFO de cruces No Ok",14,20);

        doc.autoTable({
            columns:col,
            body:listado,
            startY:32,
            pageBreak: 'avoid',
            theme : 'grid',
            styles: {overflow: 'linebreak'},
            cellWidth: 'wrap',
            headStyles:{
                0:{halign: 'right'}
            },
            columnStyles:{
                0: {cellWidth:15,halign: 'right'},
                1: {cellWidth: 70}, 
                2: {cellWidth: 15},
                3: {cellWidth: 15},
                4: {cellWidth: 70},
                5: {cellWidth: 1,halign: 'right'},             
            },

            

        });
    
    doc.setPage(pageNumber);

    doc.setFontSize(10);
    doc.text("Precio Total: "+ precioTotal + "€",14,doc.autoTable.previous.finalY+4);
    doc.text("Recuento Fecha Actuación: "+ recuentoFechaActuacion,14,doc.autoTable.previous.finalY+8);
    doc.text("Recuento Fecha Inspección: "+ countFechaInspeccion[0][0],14,doc.autoTable.previous.finalY+12);

    doc.setProperties({
        title: 'MFO Cruces No Ok',
        subject: 'Info',
        author: 'Ajuntament de Palma',
        keywords: 'generated, javascript, web 2.0, ajax',
        creator: 'Departament de Mobilitat'
    });

    //abrir PDF en otra ventana nueva
    var string=doc.output('datauristring');
    var embed='<embed src="'+ string +'" type="application/pdf" width="100%" height="100%">'
    var x=window.open();
    x.document.open(); 
    x.document.write(embed); 
    x.document.close();


}


async function calcularPrecio() {

                    // cuantas tarjetas activas tiene el cruce
                        var idInstalacion=document.getElementById("inputIdCruce").value;
                        var url = 'http://172.27.120.120/gestin/public/api/tarjetas/activas/' + idInstalacion
                        var count= await fetch(url, {
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
                                                        return (response[0]['c']);
                                                        }
                                                    })
                    

                    //que tipo de regulador es ¿es city?
                    var url = 'http://172.27.120.120/gestin/public/api/regulador/' + idInstalacion
                    var city=  await fetch(url, {method: 'GET',
                                        headers: {'Content-Type': 'application/json' }
                                        })
                                        .then(res => res.json())
                                        .catch(error => console.error('Error:', error))
                                        .then(response => {return response});                           

                    var url = 'http://172.27.120.120/gestin/public/api/preciosmfo'
                    var precios=  await fetch(url, {method: 'GET',
                                        headers: {'Content-Type': 'application/json' }
                                        })
                                        .then(res => res.json())
                                        .catch(error => console.error('Error:', error))
                                        .then(response => {return response});    
                    
                    var url = 'http://172.27.120.120/gestin/public/api/configuracionpliego'
                    var pliego=  await fetch(url, {method: 'GET',
                                        headers: {'Content-Type': 'application/json' }
                                        })
                                        .then(res => res.json())
                                        .catch(error => console.error('Error:', error))
                                        .then(response => {return response});  
                    
                    console.log(city);
                    console.log(pliego[0][0]);
                    
                        if (pliego[0][0]==2021) {
                        
                        if (city==true) {
                            var x=count*4;
                            console.log('city*4');
                
                        }else{
                            var x=count*2;
                        
                        }
                    }else{
                        var x= count;
                    }
               // var x= count;
                        
                        console.log('Es city?: '+ city);
                        console.log('Num Grupos del cruce: '+ x);

                            switch (true) {
                                case (parseInt(x)>=precios[0]['numerogrupo11'] && parseInt(x)<=precios[0]['numerogrupo12']):                                      
                                    document.getElementById("inputPrecio").value=precios[0]['preciogrupo1'];
                                    console.log('Precio 1: '+precios[0]['preciogrupo1']);
                                    break;
                                case (parseInt(x)>=precios[0]['numerogrupo21'] && parseInt(x)<=precios[0]['numerogrupo22']):                                       
                                    document.getElementById("inputPrecio").value=precios[0]['preciogrupo2'];
                                    console.log('Precio 2: '+precios[0]['preciogrupo2']);
                                    break;
                                case (parseInt(x)>=precios[0]['numerogrupo31'] && parseInt(x)<=precios[0]['numerogrupo32']):                                       
                                    document.getElementById("inputPrecio").value=precios[0]['preciogrupo3'];
                                    console.log('Precio 3: '+precios[0]['preciogrupo3']);
                                break;
                                case (parseInt(x)>=precios[0]['numerogrupo41']):                                       
                                    document.getElementById("inputPrecio").value=precios[0]['preciogrupo4'];
                                    console.log('Precio 4: '+precios[0]['preciogrupo4']);
                                break;

                                default:
                                    break;
                            }

       
}


async function calcularPrecio2(param,id) {

    // cuantas tarjetas activas tiene el cruce
        var idInstalacion=document.getElementById("inputIdCruce2"+ param).value;
        var url = 'http://172.27.120.120/gestin/public/api/tarjetas/activas/' + idInstalacion
        var count= await fetch(url, {
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
                                        return (response[0]['c']);
                                        }
                                    })
    

    //que tipo de regulador es ¿es city?
    var url = 'http://172.27.120.120/gestin/public/api/regulador/' + idInstalacion
    var city=  await fetch(url, {method: 'GET',
                        headers: {'Content-Type': 'application/json' }
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {return response});                           

    var url = 'http://172.27.120.120/gestin/public/api/preciosmfo'
    var precios=  await fetch(url, {method: 'GET',
                        headers: {'Content-Type': 'application/json' }
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {return response});   
                        
    var url = 'http://172.27.120.120/gestin/public/api/configuracionpliego'
    var pliego=  await fetch(url, {method: 'GET',
                        headers: {'Content-Type': 'application/json' }
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {return response});  
    
    console.log(city);
    console.log(pliego[0][0]);
   
     if (pliego[0][0]==2021) {
        
        if (city==true) {
            var x=count*4;
            console.log('city*4');

        }else{
            var x=count*2;
        
     }
    //console.log('Num Grupos del cruce: '+ x);
 }else{
         var x= count;
     }
                
                console.log("holis");
                console.log('Es city?: '+ city);
                console.log('Num Grupos del cruce: '+ x);

    switch (true) {
        case (parseInt(x)>=precios[0]['numerogrupo11'] && parseInt(x)<=precios[0]['numerogrupo12']):                                      
            document.getElementById("precio2"+param).value=precios[0]['preciogrupo1'];
            console.log('Precio 1: '+precios[0]['preciogrupo1']);
            break;
        case (parseInt(x)>=precios[0]['numerogrupo21'] && parseInt(x)<=precios[0]['numerogrupo22']):                                       
            document.getElementById("precio2"+param).value=precios[0]['preciogrupo2'];
            console.log('Precio 2: '+precios[0]['preciogrupo2']);
            break;
        case (parseInt(x)>=precios[0]['numerogrupo31'] && parseInt(x)<=precios[0]['numerogrupo32']):                                       
            document.getElementById("precio2"+param).value=precios[0]['preciogrupo3'];
            console.log('Precio 3: '+precios[0]['preciogrupo3']);
        break;
        case (parseInt(x)>=precios[0]['numerogrupo41']):                                       
            document.getElementById("precio2"+param).value=precios[0]['preciogrupo4'];
            console.log('Precio 4: '+precios[0]['preciogrupo4']);
        break;

        default:
            break;
    }


}

function rellenarPrecio() {

    var c=document.getElementById("inputOk");
    var p= document.getElementById("inputPrecio");
    if (c.checked){
      
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

                p.value=response[0]['preciomfocruce'];
          
            })
    }else{          
            p.value="0.00";

           
    }
}

function rellenarPrecio2(id) {

    var c= document.getElementById("resolucion2"+id);

    if (c.checked){
    var p= document.getElementById("precio2"+id);
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

            p.value=response[0]['preciomfoacire'];
      
        })
    }else{
        var p= document.getElementById("precio2"+id);
        p.value="0.00";
        
    }
}