import { BASEURL } from "../db/connectURL";

export async function handleSubmit(
  { edit, index },
  listaDeSemanas,
  setSemanas,
  onSemanasUpdate
) {
  if (!edit) return false;

  const semanaAEditar = listaDeSemanas[index];
  const semanaID = semanaAEditar._id;

  const datosActualizados = semanaAEditar;

  try {
    const response = await fetch(`${BASEURL}/api/semanas/${semanaID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    if (response.ok) {
      if (onSemanasUpdate) {
        await onSemanasUpdate();
      }

      return true;
    } else {
      console.error("Error al editar la semana:", response.status);

      return false;
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert("Error al conectar con el servidor");
    return false;
  }
}

export const handleChange = (index, campo, valor, semana, setSemana) => {
  const newWeek = [...semana];
  newWeek[index][campo] = valor;
  setSemana(newWeek);
};
