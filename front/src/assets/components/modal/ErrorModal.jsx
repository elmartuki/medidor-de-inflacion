import "../../css/modal.css";

export default function ErrorModal({ openModal, message }) {
  if (openModal) {
    return (
      <>
        <section className="section-modal">
          <article className="modal-neged">
            <p>{message}</p>
          </article>
        </section>
      </>
    );
  }
}
