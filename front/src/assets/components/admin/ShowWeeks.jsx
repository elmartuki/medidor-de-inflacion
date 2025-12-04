import { searchWeek } from "../../services/searchWeek";
import deleteIcon from "../../img/delete.svg";
import editIcon from "../../img/edit.svg";
import "../../css/weeksection.css";
import { useState } from "react";
import { handleChange, handleSubmit } from "../../services/editWeek";
import { handleDeleteWeek } from "../../services/deleteWeek";
import Confirm from "../modal/Confirm";
import ModalConfirmar from "../modal/ModalConfirmar";

export default function ShowWeeks({
  listaDeSemanas,
  setSemanas,
  onSemanasUpdate,
  search,
}) {
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [weekToDelete, setWeekToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const listToShow = searchWeek(search, listaDeSemanas);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setSuccessMessage("");
    }, 3000);
  };

  const handleOpenConfirmModal = (semana) => {
    setWeekToDelete(semana);
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setWeekToDelete(null);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (weekToDelete) {
      const success = await handleDeleteWeek(weekToDelete._id, onSemanasUpdate);

      if (success) {
        showSuccess("¡Semana eliminada con éxito!");
      }
      setWeekToDelete(null);
    }
  };

  return (
    <>
      <ModalConfirmar
        openConfirmDelente={showConfirmModal}
        producto={weekToDelete || { semana: "esta semana" }}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <Confirm openModal={showSuccessModal} message={successMessage} />

      {listToShow.map((semana) => {
        const index = listaDeSemanas.indexOf(semana);
        const { semana: week, variacion } = semana;

        return (
          <form
            key={index}
            className="weeks-card"
            onSubmit={async (event) => {
              event.preventDefault();
              const edit = editIndex === index;

              const success = await handleSubmit(
                { index, edit },
                listaDeSemanas,
                setSemanas,
                onSemanasUpdate
              );

              if (success) {
                showSuccess("¡Semana editada con éxito!");
              }
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
                      "semana",
                      event.target.value,
                      listaDeSemanas,
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenConfirmModal(semana);
                  }}
                  type="button"
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
                  listaDeSemanas,
                  setSemanas
                )
              }
            />
          </form>
        );
      })}
    </>
  );
}
