export const filterData = (respuesta, filterBy, value) => {                           //Exporta la funcion para filtrar por genero

  const idGenero = parseInt(value, 10);

  const dataFiltrada = respuesta.filter(pelicula =>
    pelicula[filterBy] && pelicula[filterBy].includes(idGenero)
  );

  return dataFiltrada;
};

export const sortData = (data, sortBy, sortOrder) => {
  return data.slice().sort((a, b) => {
    const dateA = new Date(a[sortBy]);
    const dateB = new Date(b[sortBy]);

    if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
    if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
    return 0;
  });
};
