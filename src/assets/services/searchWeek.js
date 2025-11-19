export function searchWeek(search, semanas) {
  if (!search) return semanas;

  return semanas.filter((semana) =>
    semana.week.toLowerCase().includes(search.toLowerCase())
  );
} 
