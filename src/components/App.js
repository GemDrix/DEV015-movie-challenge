






//Creacion de divs con los datos a mostrar.
// export const renderItems = (dataset) => {
//   const tarjeta = dataset.map(pelicula => `
//       <div class="" id=${pelicula.id}>
//         <img class= "tarjetaImg" src= "https://image.tmdb.org/t/p/original${pelicula.poster_path}" alt="${pelicula.original_title}">
//          <h2 class= infoTarjeta>${pelicula.original_title}</h2>
//          <h3 class= infoTarjeta>Fecha Estreno: ${pelicula.release_date}</h3>
//       </div>
//     `).join('');
//   return tarjeta;
// };


export const filterData = (dataset, filterBy, value) => {                           //Exporta la funcion para filtrar por genero
  const dataFiltrada = dataset.filter(pelicula => pelicula.genres.includes(value)); //Indica donde buscar dentro de la dataset para filtrar
  return dataFiltrada;                                                              //Regresa la data filtrada
};

export const sortData = (data, sortBy, sortOrder) => {
  const comparator = (a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return sortOrder === 'asc' ? 1 : -1;
    } else if (a[sortBy] < b[sortBy]) {
      return sortOrder === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  };
  return data.slice().sort(comparator); // Ordenar usando el comparador
};




