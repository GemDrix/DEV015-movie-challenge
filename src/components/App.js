export const renderItems = (dataset) => {
    const tarjetas = dataset.map(pelicula => {
      const tarjeta = document.createElement("ul");  // Crea un elemento "ul" para cada campeona
      tarjeta.setAttribute("itemscope", "");
      tarjeta.setAttribute("itemtype", " cartelera de peliculas")
      tarjeta.classList.add("tarjeta");  //clase para CSS


      const imgTarjeta = document.createElement("li"); // Crea un elemento "li" que contiene la imagen
      const imgElemento = document.createElement("img"); // Crea el elemento "img" y se asignan sus atributos
      imgElemento.src = pelicula.poster_path;           // Establece la fuente de la imagen
      imgElemento.alt = pelicula.original_title;               // Texto alternativo si no carga la imagen
      imgElemento.classList.add("imagen");           // Asigna una clase "imagen" para utilizarlo con CSS
      imgElemento.setAttribute("itemprop", "imagen")
      imgTarjeta.appendChild(imgElemento);           // Añade la imagen al 'li'
      tarjeta.appendChild(imgTarjeta);   

      const cartelera = document.createElement("li");
      tarjeta.classList.add("tarjeta");                // Crea un 'li' que contendrá la información adicional
      const carteleraVista = [
        { prop: "original_title", text: pelicula.name },
        { prop: "release_date", text: pelicula.release_date },
        
        ];

        carteleraVista.forEach((item, index) => {             // Recorrer el array y crear un <li> para cada elemento
            const carteleraPeliculas = document.createElement('li'); // Crear un nuevo elemento <li>
            carteleraPeliculas.id = `elementoVisible${index + 1}`;          // Asignar un ID único a cada <li>
            carteleraPeliculas.textContent = item.text;                  // Agregar texto al <li>
            carteleraPeliculas.setAttribute("itemprop", item.prop);
            tarjeta.appendChild(carteleraPeliculas);                 // Añadir el <li> al <ul>
          });

      tarjeta.appendChild(cartelera); 

      return tarjeta;
    });
    return tarjetas;
    
};
    