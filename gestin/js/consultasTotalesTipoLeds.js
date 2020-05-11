




    var url = 'http://172.27.120.120/gestin/public/api/consultatotalesleds/';
    fetch(url, {
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
                 <th scope="col">Tipo</th>
                 <th scope="col">Color</th>
                 <th scope="col">Total</th>
                </tr>
             </thead>
             `;

            for (var i in response) {
                p.innerHTML += `
             <tr>
                <th scope="row">${response[i][0]}</th>
                <td>${response[i][1]}</td>
                <td>${response[i][2]}</td>
             </tr>
             `
            }
        })


