import "../../css/modal.css";

export default function ModalConfirmar({
  openConfirmDelente,
  producto,
  onConfirm,
  onCancel,
}) {
  if (openConfirmDelente)
    return (
      <>
        <section className="section-modal-confirm">
          <article className="modal">
            <p>¿Deseas eliminar este articulo {producto.nombre}?</p>

            <div>
              <button onClick={onConfirm}>Confirmar</button>

              <button onClick={onCancel}>Cancelar</button>
            </div>
          </article>
        </section>
      </>
    );
}
