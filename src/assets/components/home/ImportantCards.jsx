import React, { useState } from "react";
import "../../css/importantCard.css";
import upArrow from "../..//img/upArrow.svg";
import downArrow from "../..//img/downArrow.svg";
import { importantVariant } from "../../db/importantVariants";

export default function ImportantCards() {
  return (
    <>
      <p className="variaciones-card-title">
        Inflacion - Mi canasta frecuente de compras
      </p>
      <section className="variaciones-card-section">
        {importantVariant.map((week) => {
          const { nombre, variacion } = week;
          return (
            <article
              className={
                variacion < 0
                  ? "variaciones-card-negative"
                  : "variaciones-card-positive"
              }
            >
              <div className="variaciones-card_name">
                <p>{nombre}</p>
              </div>
              <div className="variaciones-card_data">
                {variacion < 0 ? (
                  <>
                    <img src={downArrow} alt="" />
                    <p>{variacion}%</p>
                  </>
                ) : (
                  <>
                    <img src={upArrow} alt="" />
                    <p>{variacion}%</p>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
