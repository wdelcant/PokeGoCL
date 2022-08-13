

const trainers = obtenerEntrenadores();



const formulario = document.getElementById('formulario');
const button = document.getElementById('button');

const filtrar = (e) => {
    e.preventDefault();
    console.log(formulario.value);

    const text = formulario.value.toLowerCase();
    for (let i = 0; i < trainers.length; i++) {
        let entrenador = trainers[i];
        let nick = entrenador.nick.toLowerCase();
        if (nick.includes(text)) {
            entrenador.parentElement.style.display = 'block';
        } else {
            entrenador.parentElement.style.display = 'none';
        }
    }
}

button.addEventListener('click', filtrar);