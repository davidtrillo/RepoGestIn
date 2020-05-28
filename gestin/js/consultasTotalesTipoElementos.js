 inicio();

 
 async function inicio(){
    await queryInca(); 
    await queryElements();
 }




async function queryElements() {
    

    var url = 'http://172.27.120.120/gestin/public/api/consultatotaleselementos/';
   await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            var p = document.getElementById('tabla');
            
            // p.innerHTML +=`               
            // <thead>
            //     <tr>
            //      <th scope="col">Elemento</th>
            //      <th scope="col">Total</th>
            //     </tr>
            //  </thead>
            //  `;

            for (var i in response) {
                p.innerHTML += `
             <tr>
                <th scope="row">${response[i][0]}</th>
                <td>${response[i][1]}</td>
            
             </tr>
             `
            } 
        })
}

async function queryInca() {
    
    var url = 'http://172.27.120.120/gestin/public/api/consultatipo/inca/';
   await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
              
             var p = document.getElementById('tabla');
             p.innerHTML = '';
             p.innerHTML =`               
             <thead>
                 <tr>
                  <th scope="col">Elemento</th>
                  <th scope="col">Total</th>
                 </tr>
              </thead>
              `;
             

             for (var i in response) {
                 
                 p.innerHTML += `
              <tr>
                 <th scope="row">${response[i][""]}</th>
                 <td>${response[i]["Total"]}</td>
                         </tr>
              `
             } 
        })
}


// Aquí meter el código para consular en el INCA

        // var url = 'http://172.27.120.120/gestin/public/api/consultatotalestarjetas/';
        // fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(res => res.json())
        //     .catch(error => console.error('Error:', error))
        //     .then(response => {
        //         var p = document.getElementById('tabla');
        //         p.innerHTML = '';
        //         p.innerHTML =`               
        //         <thead>
        //             <tr>
        //              <th scope="col">Elemento</th>
        //              <th scope="col">Total</th>
        //             </tr>
        //          </thead>
        //          `;
                
        //         var grupo1,grupo2,grupo3,grupo4;


        //         for (var i in response) {
        //            if (response[i][0]>=1 && response[i][0]<=4){
        //                grupo1++;
        //            }
        //            if (response[i][0]>=5 && response[i][0]<=10){
        //                 grupo2++;
        //             }
        //             if (response[i][0]>=11 && response[i][0]<=14){
        //                 grupo3++;
        //             }
        //             if (response[i][0]>=15){
        //                 grupo4++;
        //             }
        //         } 
                
        //         p.innerHTML += `
        //          <tr>
        //             <th scope="row">Grupo 1</th>
        //             <td>${grupo1}</td>
        //             <th scope="row">Grupo 2</th>
        //             <td>${grupo2}</td>
        //             <th scope="row">Grupo 3</th>
        //             <td>${grupo3}</td>
        //             <th scope="row">Grupo 4</th>
        //             <td>${grupo4}</td>
        //          </tr>
        //          `
        //     })