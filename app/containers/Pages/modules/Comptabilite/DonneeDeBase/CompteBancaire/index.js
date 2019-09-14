import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url:
        "/app/comptabilité/Données-de-base/Compte-bancaire/ajouter-compte-bancaire",
      title: "Ajouter",
      width: "33%"
    }
    // {
    //   url: "/app/Comptabilite/Données-de-base/article/lister-caisse",
    //   title: "Liste",
    //   width: "33%"
    // },
    // {
    //   url: "/app/Comptabilite/Données-de-base/article/GererCaisse",
    //   title: "Gerer",
    //   width: "33%"
    // }
  ];
  return (
    <>
      <PageTitle
        title="Compte bancaire"
        pathname="/Comptabilité/Données de base/Compte bancaire "
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
