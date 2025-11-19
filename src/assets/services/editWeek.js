import { guardarEnLocalStorage } from "../utils/localStorage";

export function handleSubmit({ edit, index }, semana, semanas, setSemanas) {
  if (!edit) return;

  const nuevoListado = [...semanas];
  nuevoListado[index] = semana;

  guardarEnLocalStorage("Semanas", nuevoListado);
  setSemanas(nuevoListado);
}

export const handleChange = (index, campo, valor, semana, setSemana) => {
  const newWeek = [...semana];
  newWeek[index][campo] = valor;
  setSemana(newWeek);
};
