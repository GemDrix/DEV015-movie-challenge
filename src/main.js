
import dataset from '../data/dataset.js';
import { renderItems } from './components/App.js';


const tarjetas = renderItems(dataset)  // Llama a "renderItems" para crear las tarjetas a partir de los datos
const TotalTarjetas = document.getElementById("peliculas") // se obtiene el elemento del DOM donde se agregarán las tarjetas
tarjetas.forEach(tarjeta => {           // Añade cada tarjeta (ul) al contenedor en el DOM
  TotalTarjetas.appendChild(tarjeta)
});




