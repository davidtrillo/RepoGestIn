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
 <div class="row ml-1">
        <div class="col-2">
            F.Actuación
        </div>
        <div class="col-1">
            <div class="dropdown" >
              <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tipo
              </button>
                <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                    <button class="dropdown-item" onclick="escribirTipo('100 mm')" >100 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200 mm')" >200 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200 mm Bici')" >200 mm Bici</button>
                    <button class="dropdown-item" onclick="escribirTipo('300 mm')" >300 mm</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200')" >200x200</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200 Bici')" >200x200 Bici</button>
                    <button class="dropdown-item" onclick="escribirTipo('200x200 Bici/Peatón')" >200x200 Bici/Peatón</button>
                
                </div>
            </div>
        </div>
        <div class="col-1">
            <div class="dropdown" >
              <button class="btn btn-secondary dropdown-toggle" type="button" id="btnTipoActuacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Color
              </button>
                <div class="dropdown-menu" id="dropdownTipoActuacion" aria-labelledby="dropdownTipoActuacion">
                    <button class="dropdown-item" onclick="escribirColor('Rojo')" >Rojo</button>
                    <button class="dropdown-item" onclick="escribirColor('Ambar')" >Ambar</button>
                    <button class="dropdown-item" onclick="escribirColor('Verde')" >Verde</button>
                </div>
            </div>
        </div>
              <div class="col-1">
                  Grupo
              </div>
              <div class="col-1">
                  Num. Serie
              </div>
              <div class="col-1">
                 Albarán
              </div>
              <div class="col-2">
                  Observaciones
              </div>
              <div class="col-1">
                  Activo
              </div>
        </div>
        <!-- Fin Titulos -->
        <!-- Form Introducir Nuevo -->
        <div class="row mt-1 ml-1" id="formGuardar">
              <div class="col-2">
                  <input type="date" class="form-control mt-1" name="inputFechaActuacion" id="inputFechaActuacion" placeholder="DD/MM/YYYY">
              </div>
              <div class="col-1">
                  <input type="text" class="form-control mt-1" name="inputTipo" id="inputTipo">
              </div>
              <div class="col-1">
                  <input type="text" class="form-control mt-1" name="inputColor" id="inputColor">
              </div>
              <div class="col-1">
                  <input type="text" class="form-control mt-1" name="inputGrupo" id="inputGrupo">
              </div>
              <div class="col-1">
                  <input type="text" class="form-control mt-1" name="inputNumSerie" id="inputNumSerie">
              </div>
              <div class="col-1">
                  <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaran">
              </div>
              <div class="col-2">
                  <input type="text" class="form-control mt-1" name="inputObservaciones" id="inputObservaciones">
              </div>
              <div class="col-1">
                  <input type="checkbox" class=" mt-3 ml-3" name="inputActivo" id="inputActivo">
              </div>
              <div class="col-1">
                  <div class="btn btn-primary" onclick="nuevaLed()">Guardar</div>
              </div>
        </div>  
        <!-- Fin Form Introducir nuevo -->
        <div class="row mt-1 ml-1" id="">
                        
                        <div class="col-2">
                            <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">       
                            <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}" placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
                        </div>

                        <div class="col-1 mt-1" >
                            <div class="input-group">
                                <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputTipo${response[i]['id']}" value="${response[i]['tipo']}">
                                <div class="input-group-append">

                                        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>

                                        <div class="dropdown-menu">
                                            <button class="dropdown-item" onclick="escribirColor2('100 mm',${response[i]['id']})" >100 mm</button>
                                            <button class="dropdown-item" onclick="escribirColor2('200 mm',${response[i]['id']})" >200 mm</button>
                                            <button class="dropdown-item" onclick="escribirColor2('200 mm Bici',${response[i]['id']})" >200 mm Bici</button>
                                            <button class="dropdown-item" onclick="escribirColor2('300 mm',${response[i]['id']})" >300 mm</button>
                                            <button class="dropdown-item" onclick="escribirColor2('200x200',${response[i]['id']})" >200x200</button>
                                            <button class="dropdown-item" onclick="escribirColor2('200x200 Bici',${response[i]['id']})" >200x200 Bici</button>
                                            <button class="dropdown-item" onclick="escribirColor2('200x200 Bici/Peatón',${response[i]['id']})" >200x200 Bici/Peatón</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1 mt-1" >


                                    <div class="input-group">
                                        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="inputColor${response[i]['id']}" value="${response[i]['color']}">
                                        <div class="input-group-append">

                                                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span class="sr-only">Toggle Dropdown</span>
                                                </button>

                                                <div class="dropdown-menu">
                                                    <button class="dropdown-item" onclick="escribirColor2('Rojo',${response[i]['id']})" >Rojo</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Ambar',${response[i]['id']})" >Ambar</button>
                                                    <button class="dropdown-item" onclick="escribirColor2('Verde',${response[i]['id']})" >Verde</button>
                                                </div>
                                        </div>
                                    </div>
                        </div>
                        <div class="col-1">
                           <input type="text" class="form-control mt-1" name="" id="inputGrupoTar${response[i]['id']}"  value="${response[i]['grupo']}">
                        </div>
                        <div class="col-1">
                           <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"  value="${response[i]['idNumSerie']}">
                        </div>
                        <div class="col-1">
                           <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}" value="${response[i]['albaran']}">
                        </div>
                        <div class="col-2">
                            <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"  value="${response[i]['observaciones']}">
                        </div>
                        <div class="col-1">
                          <input type="checkbox" class=" mt-3 ml-3" name="" id="inputActivoTar${response[i]['id']}"  ${activo}>
                        </div>

                        <div class="col-1">
                           <div class="btn btn-primary" id="${response[i]['id']}" onclick="editarLed(this.id)"><i class="fas fa-pencil-alt"></i></div>
                           <div class="btn btn-danger" id="${response[i]['id']}" onclick="borrarLed(this.id)"><i class="fas fa-trash-alt"></i></div>
                        </div>

              </div>  
<!-- 
  <div class="row mt-1 ml-1" id="">
    <div class="col-2">
      <input type="hidden" id="inputIdTar${response[i]['id']}" value="${response[i]['id']}">
      <input type="date" class="form-control mt-1" name="" id="inputFechaActuacionTar${response[i]['id']}"
        placeholder="DD/MM/YYYY" value="${response[i]['fechaActuacion']}">
    </div>
    <div class="col-2 mt-1">
      <div class="input-group">
        <button type="button" class="btn btn-secondary dropdown-toggle" name="btnTipoActuacion${response[i]['id']}"
          value="${response[i]['id']}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          onclick="rellenarTipoActuacion2Columnas(this.value)">
          Tipo A.
        </button>
        <div class="dropdown-menu" id="dropTipoActuacion2${response[i]['id']}">

        </div>
        <input type="text" class="form-control" name="" id="inputTipoActuacion2${response[i]['id']}"
          value="${response[i]['descripcion']}">
        <input type="hidden" class="form-control" name="" id="inputTipoActuacionTar${response[i]['id']}"
          value="${response[i]['idTipoActuacion']}">
      </div>

    </div>
    <div class="col-1 mt-1">
            <div class="input-group">
              <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" id="input">
              <div class="input-group-append">
         
                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item" onclick="escribirTipoColumna('0,8 m.',${response[i]['id']})" >0,8 m.</button>
                    <button class="dropdown-item" onclick="escribirTipoColumna('2 m.',${response[i]['id']})" >2 m.</button>
                    <button class="dropdown-item" onclick="escribirTipoColumna('4 m.',${response[i]['id']})" >4 m.</button>
                    <button class="dropdown-item" onclick="escribirTipoColumna('Báculo',${response[i]['id']})" >Báculo</button>
                </div>
              </div>
            </div>
    </div>

    <div class="col-2">
      <input type="text" class="form-control mt-1" name="" id="inputObservacionesTar${response[i]['id']}"
        value="${response[i]['observaciones']}">
    </div>
    <div class="col-1">
      <input type="text" class="form-control mt-1" name="inputAlbaran" id="inputAlbaranTar${response[i]['id']}"
        value="${response[i]['albaran']}">
    </div>
    <div class="col-1">
      <input type="text" class="form-control mt-1" name="" id="inputNumSerieTar${response[i]['id']}"
        value="${response[i]['idNumSerie']}">
    </div>
    <div class="col-1">
      <input type="text" class="form-control mt-1" name="" id="inputPrecioTar${response[i]['id']}"
        value="${response[i]['precio']}">
    </div>
    <div class="col-1">
      <input type="checkbox" class=" mt-3 ml-1" name="" id="inputActivoTar${response[i]['id']}" ${activo}>
      <div class="btn btn-primary ml-1" id="${response[i]['id']}" onclick="editarColumnas(this.id)"><i
          class="fas fa-pencil-alt"></i></div>
      <div class="btn btn-danger ml-1" id="${response[i]['id']}" onclick="borrarColumnas(this.id)"><i
          class="fas fa-trash-alt"></i></div>
    </div>
    <div class="col-1">
    </div>
  </div> -->






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

      doc.text(10, 20, 'Elementos Activos según Tipo de Instalación');
      doc.setFontSize(14);
      doc.text(10, 30, 'Tipo de Instalación:  Número:');
      doc.text(10, 40, 'Tarjetas');


      // Or use javascript directly:
      doc.autoTable({
        startY: 50,
        head: [
          ['F. Actuación', 'Tipo Actuación', 'Observaciones', 'Albarán', 'Precio']
        ],
        body: [
          ['David', 'david@example.com', 'Sweden', 'Sweden', 'Sweden'],
          ['Castille', 'castille@example.com', 'Norway', 'Sweden', 'Sweden'],
          // ...
        ]

      });
      var posy = doc.lastAutoTable.finalY + 30;
      doc.text(10, posy, 'Bus/Tren');


      doc.autoTable({
        head: [
          ['F. Actuación', 'Tipo Actuación', 'Observaciones', 'Albarán', 'Precio']
        ],
        body: [
          ['David', 'david@example.com', 'Sweden', 'Sweden', 'Sweden'],
          ['Castille', 'castille@example.com', 'Norway', 'Sweden', 'Sweden'],
          // ...
        ],
        startY: doc.lastAutoTable.finalY + 50
      });
      doc.save('table.pdf');
    }
  </script>

</body>

</html>