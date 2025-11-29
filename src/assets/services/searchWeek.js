export function searchWeek(search, listaDeSemanas) {
  if (!search) return listaDeSemanas;

  return listaDeSemanas.filter((semana) =>
    semana.semana.toLowerCase().includes(search.toLowerCase())
  );
} 
