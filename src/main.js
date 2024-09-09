import { filterData, sortData } from './components/App.js';

// Variables de filtros
let peliculaGenero = "Default";
let peliculaAño = "Default";

// Función para obtener datos de la API
const obtenerDatosPeliculas = async () => {
    const respuesta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=773c6baabd1f5b0e1801b4ac0b0cc444');
    return await respuesta.json();
};

// Función para aplicar filtros y mostrar películas
const applyFilters = async () => {
  const datos = await obtenerDatosPeliculas();
  let dataFiltrada = datos.results;
  if (peliculaGenero !== "Default") {
    dataFiltrada = filterData(dataFiltrada, "genre_ids", peliculaGenero);
  }
  if (peliculaAño !== "Default") {
    dataFiltrada = sortData(dataFiltrada, "release_date", peliculaAño);
  }
  mostrarPeliculas(dataFiltrada);
};

// Función para mostrar películas en el DOM
const mostrarPeliculas = (datos) => {
  let peliculas = '';
  datos.forEach(pelicula => {
    peliculas += `  
      <div class="contenedor" id="${pelicula.id}">
        <img class="tarjetaImg" src="https://image.tmdb.org/t/p/original${pelicula.poster_path}" alt="${pelicula.original_title}">
        <h2 class="infoTarjeta">${pelicula.original_title}</h2>
        <h3 class="infoTarjeta">Fecha Estreno: ${pelicula.release_date}</h3>
      </div>`;
  });

  document.getElementById('contenedor').innerHTML = peliculas;

  // Reasigna eventos de clic a las nuevas tarjetas
  assignClickEventsToCards();
};

// Función para mostrar la información dentro del modal 
function assignClickEventsToCards() {
  const peliculaTarjetas = document.querySelectorAll(".contenedor");
  const modal = document.querySelector('.dialog');

  peliculaTarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', async () => {
      const id = tarjeta.id;
      const datos = await obtenerDatosPeliculas();
      const peliculaModal = datos.results.find(pelicula => pelicula.id === parseInt(id));

      if (peliculaModal) {
        const infoPelicula = `  
          <div>
            <button id="cerrarModal" class="cerrarModal"> x </button>
            <img class="modalImg" src="https://image.tmdb.org/t/p/original${peliculaModal.poster_path}" alt="${peliculaModal.original_title}">
            <p class="tituloModal">${peliculaModal.original_title}</p>
            <p class="infoModal">Fecha Estreno: ${peliculaModal.release_date}</p>
            <p class="infoModal">Genero Pelicula: ${peliculaModal.genre_ids.join(" - ")}</p>
            <p class="infoModal">Media de Votos: ${peliculaModal.vote_average}</p>
            <p class="infoModal">Votos Totales: ${peliculaModal.vote_count}</p>
          </div>
        `;

        // Actualiza el modal con la información de la tarjeta
        modal.innerHTML = infoPelicula;
        modal.showModal(); // Muestra el modal

      
        const cerrarBtn = document.getElementById('cerrarModal');
        if (cerrarBtn) {
          cerrarBtn.addEventListener('click', () => {
            modal.close(); // Cierra el modal
            modal.innerHTML = ''; // Limpia el contenido del modal
          });
        }
      }
    });
  });
}

// Event listeners para filtros y botón de reset
const filtroGeneros = document.querySelector("#generos");
filtroGeneros.addEventListener("change", function () {
  peliculaGenero = filtroGeneros.value;
  console.log(peliculaGenero)
  applyFilters();
});

const filtroOrden = document.querySelector("#añoEstreno");
filtroOrden.addEventListener("change", function () {
  peliculaAño = filtroOrden.value;
  applyFilters();
});

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", function () {
  peliculaGenero = "Default";
  peliculaAño = "Default";
  filtroGeneros.value = "Default";
  filtroOrden.value = "Default";
  applyFilters();
});

// Inicializa la carga de películas al cargar la página
applyFilters();
