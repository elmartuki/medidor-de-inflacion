import React, { useState } from "react";
import { createWeek } from "../../services/createweek";
import "../../css/weekform.css";

export default function CreateWeeks({
  openCreate,
  setOpenCreate,
  onSemanasUpdate,
}) {
  const [week, setWeek] = useState("");
  const [variacion, setVariacion] = useState("");

  const handleFormSubmit = async (event) => {
    const success = await createWeek(event, week, variacion, onSemanasUpdate);

    if (success) {
      setOpenCreate(false);
      setWeek("");
      setVariacion("");
    }
  };

  if (openCreate)
    return (
      <section
        className="week-form-section"
        onClick={() => setOpenCreate(false)}
      >
        <form
          onClick={(event) => event.stopPropagation()}
          className="week-form"
          onSubmit={handleFormSubmit}
        >
          <p>Crear una semana</p>
          <input
            onChange={(event) => setWeek(event.target.value)}
            type="text"
            placeholder="Agregar semana"
            value={week}
          />
          <input
            onChange={(event) => setVariacion(event.target.value)}
            type="number"
            step="any"
            placeholder="Variacion"
            value={variacion}
          />

          <button type="submit">Guardar</button>
        </form>
      </section>
    );
}
