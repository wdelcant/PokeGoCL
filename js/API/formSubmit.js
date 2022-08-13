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
                    columna.innerHTML = `
                <td>${entrenador.nick}</td>
                <td>${entrenador.code}</td>
                <td>${entrenador.team}</td> 
                <td>${entrenador.location}</td>
                <td><a href="${entrenador.phone}">WhatsApp</a></td>
                <td><a href="${entrenador.image}" alt="${entrenador.nick}">Imagen</a></td>
                `
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