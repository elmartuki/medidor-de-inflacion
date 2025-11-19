import React, { useState } from "react";
import { createWeek } from "../../services/createweek";
import "../../css/weekform.css";

export default function CreateWeeks({ openCreate, setOpenCreate }) {
  const [week, setWeek] = useState("");
  const [variacion, setVariacion] = useState("");
  if (openCreate)
    return (
      <section
        className="week-form-section"
        onClick={() => setOpenCreate(false)}
      >
        <form
          onClick={(event) => event.stopPropagation()}
          className="week-form"
          onSubmit={() => createWeek(event, week, variacion)}
        >
          <p>Crear una semana</p>
          <input
            onChange={(event) => setWeek(event.target.value)}
            type="text"
            placeholder="Agregar semana"
          />
          <input
            onChange={(event) => setVariacion(event.target.value)}
            type="number"
            step="any"
            placeholder="Variacion"
          />
          <button onClick={() => setOpenCreate(false)}>Guardar</button>
        </form>
      </section>
    );
}
