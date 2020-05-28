document.onload = rellenar();

function rellenar(){
    rellenarPrecios();
    getPliego();
}


function rellenarPrecios() {
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
            document.getElementById('numerogrupo11').value=response[0]['numerogrupo11'];
            document.getElementById('numerogrupo12').value=response[0]['numerogrupo12'];
            document.getElementById('numerogrupo21').value=response[0]['numerogrupo21'];
            document.getElementById('numerogrupo22').value=response[0]['numerogrupo22'];
            document.getElementById('numerogrupo31').value=response[0]['numerogrupo31'];
            document.getElementById('numerogrupo32').value=response[0]['numerogrupo32'];
            document.getElementById('numerogrupo41').value=response[0]['numerogrupo41'];
            
            document.getElementById('precioGrupo1').value=response[0]['preciogrupo1'];
            document.getElementById('precioGrupo2').value=response[0]['preciogrupo2'];
            document.getElementById('precioGrupo3').value=response[0]['preciogrupo3'];
            document.getElementById('precioGrupo4').value=response[0]['preciogrupo4'];
            
        })
    
}

function editarPreciosMFO() {
   // var id= param;
    var numerogrupo11 = document.getElementById('numerogrupo11').value ? document.getElementById('numerogrupo11').value : 0 ;
    var numerogrupo12 = document.getElementById('numerogrupo12').value ? document.getElementById('numerogrupo12').value : 0 ;
    var numerogrupo21 = document.getElementById('numerogrupo21').value ? document.getElementById('numerogrupo21').value : 0 ;
    var numerogrupo22 = document.getElementById('numerogrupo22').value ? document.getElementById('numerogrupo22').value : 0 ;
    var numerogrupo31 = document.getElementById('numerogrupo31').value ? document.getElementById('numerogrupo31').value : 0 ;
    var numerogrupo32 = document.getElementById('numerogrupo32').value ? document.getElementById('numerogrupo32').value : 0 ;
    var numerogrupo41 = document.getElementById('numerogrupo41').value ? document.getElementById('numerogrupo41').value : 0 ;

    var precioGrupo1 = document.getElementById('precioGrupo1').value ? document.getElementById('precioGrupo1').value : 0 ;
    var precioGrupo2 = document.getElementById('precioGrupo2').value ? document.getElementById('precioGrupo2').value : 0 ;
    var precioGrupo3 = document.getElementById('precioGrupo3').value ? document.getElementById('precioGrupo3').value : 0 ;
    var precioGrupo4 = document.getElementById('precioGrupo4').value ? document.getElementById('precioGrupo4').value : 0 ;


    var url = 'http://172.27.120.120/gestin/public/api/preciosmfo/modificar';

    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numerogrupo11: numerogrupo11,
                numerogrupo12: numerogrupo12,
                numerogrupo21: numerogrupo21,
                numerogrupo22: numerogrupo22,
                numerogrupo31: numerogrupo31,
                numerogrupo32: numerogrupo32,
                numerogrupo41: numerogrupo41,
                preciogrupo1: precioGrupo1,
                preciogrupo2: precioGrupo2,
                preciogrupo3: precioGrupo3,
                preciogrupo4: precioGrupo4
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            alert(response)
        })


    setTimeout(() => {
        rellenar(); //CAMBIO DE NOMENCLATURA
    }, 1000);
}

function setPliego() {
    // var id= param;
      if (document.getElementById('2018').checked) {
           var n =2018;
      }
      if (document.getElementById('2021').checked) {
        var n =2021;
   }   
 
 
     var url = 'http://172.27.120.120/gestin/public/api/setpliego';
 
     fetch(url, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 n: n,
        
             })
         })
         .then(res => res.json())
         .catch(error => console.error('Error:', error))
         .then(response => {
             alert(response)
         })
 

 }
 function getPliego() {
    var url = 'http://172.27.120.120/gestin/public/api/configuracionpliego'
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {

            if (response[0][0]==2018) {
                document.getElementById('2018').checked=true;
                document.getElementById('2021').checked=false;
            }else{
                document.getElementById('2018').checked=false;
                document.getElementById('2021').checked=true;
            }                  
        })
    
}

function o2018() {
    console.log("estoy en o2018")
    if (document.getElementById("2018").checked==false) {
        console.log["estoy en 2018"]
        document.getElementById("2018").checked=true;
        document.getElementById("2021").checked=false;
        setPliego(2018);
    }
};

function o2021() {
    console.log("estoy en o2021")
    if (document.getElementById("2021").checked==false) {
        document.getElementById("2021").checked=true;
        document.getElementById("2018").checked=false;
        setPliego(2021);
    }
};