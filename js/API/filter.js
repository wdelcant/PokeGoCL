function renderResults(results) {
    const list = document.getElementById('busqueda');
    list.innerHTML = '';
    results.forEach(result => {
        const trainer = document.createElement('tr');
        trainer.innerText = result
        list.appendChild(trainer);
    })
}

window.onload = () => {
    const searchFieldElement = document.getElementById('formulario');
    searchFieldElement.addEventListener('keyup', (event) => {

        clearTimeout(searchTimeoutToken);

        if (searchFieldElement.value.length === 0) {
            return;
        }

        searchTimeoutToken = setTimeout(() => {
            obtenerEntrenadores(searchFieldElement.value);
        }, 250);
    });
}