function rellenarTipologia(){
    fetch('http://webserver.mobilitat.local/gestin/public/api/tipoinstalacion',{mode:'no-cors'})
        .then(datos=>datos.json())
         .then(datos=>{
            var resultado= document.getElementById('dropdownTipologia');
            resultado.innerHTML='';
            for(var i=0,len=datos.length; i<len;i++){
                resultado.innerHTML+=`
                <button class="dropdown-item" type="submit" id="dropBtnTipologia" name="dropBtnTipologia" value="${datos[i]['tipoInstalacion']}"> ${datos[i]['tipoInstalacion']} </button>
            
                `;
            }

            
        
    })
}