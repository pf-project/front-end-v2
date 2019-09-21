import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url:
        "/app/Comptabilite/Données-de-base/comptes-généraux/ajouter-compte-gérénal",
      title: "Ajouter",
      width: "33%"
    },
    {
      url:
        "/app/Comptabilite/Données-de-base/comptes-généraux/lister-comptes-généraux",
      title: "Liste",
      width: "33%"
    },
    {
      url:
        "/app/Comptabilite/Données-de-base/comptes-généraux/gerer-compte-général",
      title: "Gerer",
      width: "33%"
    }
  ];
  return (
    <>
      <PageTitle
        title="Comptes généraux"
        pathname="/ Comptabilité/Données de base/Comptes généraux"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
