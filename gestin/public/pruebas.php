<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <title>Hello, world!</title>
</head>

<body>

  <h3>Elementos Activos según Tipo de Instalación</h3>
  <br>
  <h4>Tipo de Instalación: Número: Ubicación:</h4>
  <hr>
  <h5>Tarjetas</h5>

  <button onclick="imprimir()">Imprimir</button>
 <!-- Títulos Form Nuevo-->
 <div class="container-fluid" id="pdf">
 <embed src="" type="application/pdf" width="100%" height="100%">
 </div>





  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
  </script>

  <script src="pruebas.js"></script>
  <script src="../js/columnas.js"></script>
  <script src="../node_modules/jspdf/dist/jspdf.min.js"></script>
  <script src="../node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js"></script>

  <script>




    function imprimir() {
      var doc = new jsPDF();

      doc.setFontSize(22);
      doc.text("Multiple tables", 14, 20);

  
col=[
        {header: 'id', dataKey: 'id'},
        {header: 'idTipoActuacion', dataKey: 'idTipoActuacion'},
        {header: 'descripcion', dataKey: 'descripcion'},
        {header: 'idNumSerie', dataKey: 'idNumSerie'},
        {header: 'observaciones', dataKey: 'observaciones'},
        {header: 'fechaActuacion', dataKey: 'fechaActuacion'},
        {header: 'activo', dataKey: 'activo'},
        {header: 'instalada', dataKey: 'instalada'},
    ]
row=[{"id":"17","idTipoActuacion":"4","descripcion":"MFO","idNumSerie":"3334","albaran":"34","observaciones":"asdfsdf","fechaActuacion":"2019-09-13","precio":"0","activo":"true","instalada":"true"},{"id":"18","idTipoActuacion":"1","descripcion":"Correctivo","idNumSerie":"44","albaran":"1","observaciones":"sdf","fechaActuacion":"2019-09-13","precio":"0","activo":"true","instalada":"true"},{"id":"16","idTipoActuacion":"1","descripcion":"Correctivo","idNumSerie":"44","albaran":"66","observaciones":"ihihigijjlol","fechaActuacion":"2019-09-12","precio":"0","activo":"true","instalada":"true"},{"id":"1","idTipoActuacion":"3","descripcion":"Preventivo","idNumSerie":"1","albaran":"11","observaciones":"asdfd","fechaActuacion":"2019-08-29","precio":"0","activo":"false","instalada":"true"}]


      doc.autoTable(col,row,{startY:30});

      //abrir PDF en otra ventana nueva
      var string=doc.output('datauristring');
      var embed='<embed src="'+ string +'" type="application/pdf" width="100%" height="100%">'
      var x=window.open();
        x.document.open(); 
        x.document.write(embed); 
        x.document.close();
    }
  </script>

</body>

</html>