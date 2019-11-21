
// console.log('ok');

var botonTipologia=document.getElementById('dropBtnTipologia');
var formulario=document.getElementById('formulario');







//trabajar con eventos para detectarlos

botonTipologia.addEventListener('click',function(){
   // e.preventDefault() //evita que en el form se ejecute el ?user
    //console.log('me diste un clic')
    
   // var datos= new FormData(formulario) //Nueva informacion de formulario para recibir lo que hay en los inputs
    console.log(botonTipologia.value)
    var data=[{"id": botonTipologia.value}];
    //var data2=JSON.stringify(data);
    console.log(data[0].id)
    //var jsonData = JSON.stringify(data);
    // console.log(datos.get('usuario')) //el metodo get usa en name de cada input para detectarlo
    // console.log(datos.get('pass')) //el metodo get usa en name de cada input para detectarlo
     fetch('postSQL.php',{
         method:'POST',
         body:JSON.stringify({"id":botonTipologia.value})
     })
     .then(res=>res.json())
     .then(res=>{
         console.log(res)
    //     if (data==='Llena los campos vacios'){
    //         respuesta.innerHTML=`
    //         <div class="alert alert-danger" role="alert">
    //         Llena los campos vacios
    //         </div>
            
    //         `
    //     }else{
    //         respuesta.innerHTML=`
    //         <div class="alert alert-primary" role="alert">
    //         ${data}
    //         </div>
    //         `

    //     }
     })
})