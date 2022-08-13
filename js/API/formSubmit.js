const options = {
    method: 'GET'
}

const obtenerTrainers = document.getElementById('trainers');

function obtenerEntrenadores() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/11NqWwCvuONUB_bjN3QlisupRCDSKFS7bT8RkbIADA7M/values/Respuestas!A2:G?key=AIzaSyASgC40HnjZPwRZ5Jy8VUpw_Vj6IVvXuLc', options)
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((data) => {
            data = data.values;
            // const results = data.map(trainer => trainer[1]);
            // renderResults(results);
            // console.log(results)

            // console.log(data);
            // console.log(data[1][0]);
            for (let i = 0; i < data.length; i++) {
                let entrenadores = [{
                    fecha: data[0][0],
                    nick: data[i][1],
                    code: data[i][2],
                    team: data[i][3],
                    location: data[i][4],
                    phone: data[i][5],
                    image: data[i][6],
                }, ];

                entrenadores.forEach((entrenador) => {
                    let columna = document.createElement('tr')
                    columna.className = 'columna'
                    
                    let nick = document.createElement('td')
                    nick.innerHTML = entrenador.nick
                    nick.classList.add('nick')

                    let code = document.createElement('td')
                    code.innerHTML = entrenador.code
                    code.classList.add('code')

                    let location = document.createElement('td')
                    location.innerHTML = entrenador.location

                    let team = document.createElement('td')
                    if (entrenador.team === 'Instinto (Amarillo)') {
                        team.innerHTML = `<img src="/assets/images/amarillo.png" alt="instinto" class="registros__icon registros__icon--amarillo">`

                    } else if (entrenador.team === 'Sabiduría (Azul)') {
                        team.innerHTML = `<img src="/assets/images/azul.png" alt="sabiduría" class="registros__icon registros__icon--azul">`;

                    } else if (entrenador.team === 'Valor (Rojo)') {
                        team.innerHTML = `<img src="/assets/images/rojo.png" alt="valor" class="registros__icon registros__icon--rojo">`;

                    }

                    let phone = document.createElement('td')
                    phone.classList.add = 'phone'
                    phone.innerHTML = `<td><a href="${entrenador.phone}"><i class="bi bi-whatsapp registros__icon registros__icon--wsp"></i></a></td>`
                    // phone.classList.add('phone')

                    let image = document.createElement('td')
                    image.innerHTML = `<td><a href="${entrenador.image}" alt="${entrenador.nick}"><i class="bi bi-images registros__icon registros__icon--img"></i></a></td>`
                    image.classList.add('image')

                    /* Agregar los elementos secundarios al elemento principal. */

                    columna.appendChild(nick)
                    columna.appendChild(code)
                    columna.appendChild(location)
                    columna.appendChild(team)
                    columna.appendChild(phone)
                    columna.appendChild(image)
                    /* Agregar el elemento principal al contenedor. */
                    obtenerTrainers.appendChild(columna)
                })
            }
        })

        .catch(err => console.error(err));

}
obtenerEntrenadores();

// function renderResults(results) {
//     const list = document.getElementById('busqueda');
//     list.innerHTML = '';
//     results.forEach(result => {
//         const trainer = document.createElement('tr');
//         trainer.innerText = result
//         list.appendChild(trainer);
//     })
// }

// window.onload = () => {
//     const searchFieldElement = document.getElementById('formulario');
//     searchFieldElement.addEventListener('keyup', (event) => {

//         clearTimeout(searchTimeoutToken);

//         if (searchFieldElement.value.length === 0) {
//             return;
//         }

//         searchTimeoutToken = setTimeout(() => {
//             obtenerEntrenadores(searchFieldElement.value);
//         }, 250);
//     });
// }