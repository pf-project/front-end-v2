import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url:
        "/app/Comptabilite/Données-de-base/comptes-comptables/ajouter-compte-comptable",
      title: "Ajouter",
      width: "33%"
    },
    {
      url:
        "/app/Comptabilite/Données-de-base/comptes-comptables/lister-comptes-comptables",
      title: "Liste",
      width: "33%"
    },
    {
      url:
        "/app/Comptabilite/Données-de-base/comptes-comptables/gerer-compte-comptable",
      title: "Gerer",
      width: "33%"
    }
  ];
  return (
    <>
      <PageTitle
        title="Comptes comptables"
        pathname="/ Comptabilité/Données de base/Comptes comptables"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
