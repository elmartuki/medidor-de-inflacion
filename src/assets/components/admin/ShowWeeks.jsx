import { searchWeek } from "../../services/searchWeek";
import deleteIcon from "../../img/delete.svg";
import editIcon from "../../img/edit.svg";
import "../../css/weeksection.css";
import { useState } from "react";
// import { handleChange, handleSubmit } from "../../services/editWeek";
import { handleDeleteWeek } from "../../services/deleteWeek";

export default function ShowWeeks({ semanas, setSemanas, search }) {
  const [editIndex, setEditIndex] = useState(null);

  const listToShow = searchWeek(search, semanas);

  return listToShow.map((semana) => {
    const index = semanas.indexOf(semana);
    const { week, variacion } = semana;

    return (
      <form
        key={index}
        className="weeks-card"
        onSubmit={(event) => {
          event.preventDefault();
          const edit = editIndex === index;
          handleSubmit({ index, edit }, semana, semanas, setSemanas);
        }}
      >
        <div className="weeks-card_title">
          <div className="weeks-card_data">
            <p>Semana</p>

            <input
              value={week}
              onChange={(event) =>
                handleChange(
                  index,
                  "week",
                  event.target.value,
                  semanas,
                  setSemanas
                )
              }
            />
          </div>

          <div className="weeks-card_buttons">
            <button
              className="edit-btn"
              onClick={() => setEditIndex(index)}
              type="submit"
            >
              <img src={editIcon} />
            </button>

            <button
              className="delete-btn"
              onClick={(e) => handleDeleteWeek(e, week, semanas, setSemanas)}
            >
              <img src={deleteIcon} />
            </button>
          </div>
        </div>

        <input
          value={variacion}
          type="number"
          onChange={(e) =>
            handleChange(
              index,
              "variacion",
              e.target.value,
              semanas,
              setSemanas
            )
          }
        />
      </form>
    );
  });
}
