import dataset from '../data/dataset.js';
import { filterData, renderItems, sortData } from './components/App.js';

const tarjeta = renderItems(dataset)

document.getElementById("cartelera").innerHTML = tarjeta;
//console.log(tarjeta);


// Variables de filtros
let peliculaGenero = "Default";
let peliculaAño = "Default";

//filtros y ordenar
function applyFilters() {
    let dataFiltrada = dataset;
    
    if (peliculaGenero !== "Default") {
        dataFiltrada = filterData(dataFiltrada, "genres", peliculaGenero);
    }
    
    if (peliculaAño !== "Default") {
        dataFiltrada = sortData(dataFiltrada, "release_date", peliculaAño);
    }
    
    const result = renderItems(dataFiltrada);
    document.getElementById("cartelera").innerHTML = result;
}

const filtroGeneros = document.getElementById("generos");//Listener filtro de generos.
filtroGeneros.addEventListener("change", function () {
    peliculaGenero = filtroGeneros.value;
    applyFilters();
});

const filtroOrden = document.getElementById("añoEstreno");//listener filtro por fecha.
filtroOrden.addEventListener("change", function () {
    peliculaAño = filtroOrden.value;
    applyFilters();
});

const resetButton = document.getElementById("reset-button");//Listener boton limpiar
resetButton.addEventListener("click", function () {
    peliculaGenero = "Default";
    peliculaAño = "Default";
    filtroGeneros.value = "Default";
    filtroOrden.value = "Default";
    document.getElementById("cartelera").innerHTML = tarjeta;
});




// const filtroGeneros = document.getElementById("generos");
// filtroGeneros.addEventListener("change", function () {
//     const datoSeleccionado = filtroGeneros.value;
//     const dataFiltrada = filterData(dataset, "genres", datoSeleccionado)
//     const titulosGenero = renderItems(dataFiltrada)
//     document.getElementById("cartelera").innerHTML = titulosGenero;
// })

// const filtroOrden = document.getElementById("añoEstreno");
// filtroOrden.addEventListener("change", function () {
//     const datoSeleccionado = filtroOrden.value;
//     const dataOrdenada = sortData(dataset, "release_date", datoSeleccionado)
//     const fechasEstreno = renderItems(dataOrdenada)
//     document.getElementById("cartelera").innerHTML = fechasEstreno;
// });

// const resetButton = document.getElementById("reset-button")
// resetButton.addEventListener("click", function () {
//     filtroGeneros.value = "Default";
//     filtroOrden.value = "Default";
//     document.getElementById("cartelera").innerHTML = tarjeta;
// });
