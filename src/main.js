//import dataset from '../data/dataset.js';
import { filterData, sortData } from './components/App.js';

//const tarjeta = renderItems(dataset)

//document.getElementById("cartelera").innerHTML = tarjeta;


const cargarPeliculas = async () => {
  const respuesta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=773c6baabd1f5b0e1801b4ac0b0cc444');
  console.log(respuesta)

  const datos = await respuesta.json();

  let peliculas = '';
  datos.results.forEach(pelicula => {
       peliculas = peliculas + `  
        <div class="contenedor" id=${pelicula.id}>
        <img class= "tarjetaImg" src= "https://image.tmdb.org/t/p/original${pelicula.poster_path}" alt="${pelicula.original_title}">
         <h2 class= infoTarjeta>${pelicula.original_title}</h2>
         <h3 class= infoTarjeta>Fecha Estreno: ${pelicula.release_date}</h3>
      </div>`
  });
    document.getElementById('contenedor').innerHTML = peliculas;
 

  console.log(datos)
}
cargarPeliculas();


// Variables de filtros
let peliculaGenero = "Default";
let peliculaAño = "Default";

//filtros y ordenar
function applyFilters() {
  let dataFiltrada = dataset;

  if (peliculaGenero !== "Default") {
    dataFiltrada = filterData(dataFiltrada, "genres_ids", peliculaGenero);
  }

  if (peliculaAño !== "Default") {
    dataFiltrada = sortData(dataFiltrada, "release_date", peliculaAño);
  }

  const result = cargarPeliculas(dataFiltrada);
  document.getElementById("contenedor").innerHTML = result;

  // Reasigna eventos de clic a las nuevas tarjetas
  assignClickEventsToCards();
}


const filtroGeneros = document.querySelector("#generos");//Listener filtro de generos.
filtroGeneros.addEventListener("change", function () {
  peliculaGenero = filtroGeneros.value;
  applyFilters();
});

const filtroOrden = document.querySelector("#añoEstreno");//listener filtro por fecha.
filtroOrden.addEventListener("change", function () {
  peliculaAño = filtroOrden.value;
  applyFilters();
});

const resetButton = document.querySelector("#reset-button");//Listener boton limpiar
resetButton.addEventListener("click", function () {
  peliculaGenero = "Default";
  peliculaAño = "Default";
  filtroGeneros.value = "Default";
  filtroOrden.value = "Default";
  document.querySelector("#contenedor").innerHTML =applyFilters();

  // Reasigna eventos de clic a las nuevas tarjetas
  assignClickEventsToCards();
});


// Función para asignar eventos de clic a las tarjetas
function assignClickEventsToCards() {
  const peliculaTarjetas = document.querySelectorAll(".contenedor");
  const modal = document.querySelector('.dialog');

  // Agrega el manejador de eventos para cada tarjeta
  peliculaTarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      const id = tarjeta.id;
      const peliculaModal = dataset.find(pelicula => pelicula.id === parseInt(id));

      // Construye el contenido del modal con template literals
      const infoPelicula = `  
            <div>
                <button id="cerrarModal" class="cerrarModal"> x </button>
                <img class="modalImg"src= "https://image.tmdb.org/t/p/original${peliculaModal.poster_path}" alt="${peliculaModal.original_title}">
                <p class= "tituloModal">${peliculaModal.original_title}</p>
                <p class= "infoModal">Fecha Estreno: ${peliculaModal.release_date}</p>
                <p class= "infoModal">Genero Pelicula: ${peliculaModal.genres.join(" - ")}</p>
                <p class= "infoModal">Media de Votos: ${peliculaModal.vote_average}</p>
                <p class= "infoModal">Votos Totales: ${peliculaModal.vote_count}</p>
            </div>
        `;

      // Actualiza el modal con la información de la tarjeta
      modal.innerHTML = infoPelicula;

      modal.showModal();// Muestra el modal

      const cerrarBtn = document.getElementById('cerrarModal');
      cerrarBtn.addEventListener('click', () => {
        modal.close();
        // Elimina el contenido del modal para limpiar el DOM
        modal.innerHTML = '';
      });
    });
  });
}
// Asigna eventos de clic a las tarjetas iniciales
assignClickEventsToCards();