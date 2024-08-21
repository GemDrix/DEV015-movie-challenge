export const renderItems = (dataset) => {

    const tarjeta = dataset.map(pelicula => `
      <div class="contenedor">
        <img src= "https://image.tmdb.org/t/p/original${pelicula.poster_path}" alt="${pelicula.title}">
         <h2>${pelicula.title}</h2>
         <h3 class = "fecha">${pelicula.release_date}</h3>
      </div>
    `).join('');

    
    return tarjeta;
};
