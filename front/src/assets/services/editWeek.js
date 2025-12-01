import { BASEURL } from "../db/connectURL";

export async function handleSubmit(
  { edit, index },
  listaDeSemanas,
  setSemanas,
  onSemanasUpdate
) {
  if (!edit) return;

  const semanaAEditar = listaDeSemanas[index];
  const semanaID = semanaAEditar._id;

  const datosActualizados = semanaAEditar;

  try {
    const response = await fetch(
      `${BASEURL}/api/semanas/${semanaID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      }
    );

    const data = await response.json();

    if (response.ok) {
    } else {
    }
  } catch (error) {
    console.error("Error al conectar con el servicor");
    alert("Error al conectar con el servidor");
  }
}

export const handleChange = (index, campo, valor, semana, setSemana) => {
  const newWeek = [...semana];
  newWeek[index][campo] = valor;
  setSemana(newWeek);
};
