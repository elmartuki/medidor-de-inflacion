import "../../css/modal.css";

export default function Confirm({ openModal, message }) {
  if (openModal) {
    return (
      <>
        <section className="section-modal">
          <article className="modal-sucsses">
            <p>{message}</p>
          </article>
        </section>
      </>
    );
  }
}
