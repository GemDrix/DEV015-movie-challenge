import dataset from '../data/dataset.js';
import { renderItems } from './components/App.js';

const tarjeta = renderItems(dataset)

document.getElementById("cartelera").innerHTML = tarjeta;
console.log(tarjeta);