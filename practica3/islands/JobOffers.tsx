import { useState } from "preact/hooks";
import { jobOffer } from "../types.ts";

export const JobOffers = (props: {
  jobs: jobOffer[];
}) => {
  const [job, setJob] = useState<number>(0);
  const offers = props.jobs;
  return (
    <div class="container">
      <div class="vetical">
        <div class="encabezado">
          <h2>Principales empleos que te recomendamos</h2>
          {offers.length} resultados
        </div>
        <div class="offersShow">
          {offers.map((e, index) => {
            return (
              <>
                <div class="Dbutton2" onClick={(e) => setJob(index)} key={e.slug}>
                  <p class="letrabuena">{e.title}</p>
                  <p>{e.company_name}</p>
                  <p class="gris">{e.location}</p>
                </div>
            <hr/>
            </>
            );

          })}
        </div>
      </div>
      <div class="vertical2">
        <h2>{offers[job].title}</h2>
        {offers[job].company_name} · {offers[job].location}
        <br />
        {offers[job].remote ? "Remoto" : "Presencial"}
        <br />
        <button
          onClick={(e) => window.location.href = offers[job].url}
          class="Dbutton"
        >
          Solicitar
          <image src={"/external-link-icon.png"} class="linkImage" />
        </button>
        <div
          class="descriptionShow"
          dangerouslySetInnerHTML={{ __html: offers[job].description }}
        />
      </div>
    </div>
  );
};
//index set index y que el botón ponga la función setIndex con el Index del arr
