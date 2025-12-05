import { useState } from "react";
import add from "../img/add.svg";
import CreateWeeks from "../components/admin/CreateWeeks";
import ShowWeeks from "../components/admin/ShowWeeks";
import { getSemanas } from "../services/getSemanas";

export default function WeeksPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [search, setSearch] = useState("");
  const { semanas, obtenerSemanas, setSemanas } = getSemanas();


  return (
    <section className="weeks-section">
      <div className="weeks_create">
        <button className="btn-agregar" onClick={() => setOpenCreate(true)}>
          <img src={add} />
        </button>

        <CreateWeeks
          onSemanasUpdate={obtenerSemanas}
          openCreate={openCreate}
          setOpenCreate={setOpenCreate}
        />
      </div>

      <section className="weeks-show-section">
        <p className="weeks-show-title">Administrar semanas</p>

        <input
          className="weeks-show_search"
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value.trim());
          }}
        />

        <ShowWeeks
          listaDeSemanas={semanas}
          setSemanas={setSemanas}
          onSemanasUpdate={obtenerSemanas}
          search={search}
        />
      </section>
    </section>
  );
}
