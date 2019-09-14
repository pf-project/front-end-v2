import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url: "/app/Comptabilite/Données-de-base/caisse/ajouter-caisse",
      title: "Ajouter",
      width: "33%"
    },
    {
      url: "/app/Comptabilite/Données-de-base/article/lister-caisse",
      title: "Liste",
      width: "33%"
    }
    // {
    //   url: "/app/Comptabilite/Données-de-base/article/GererCaisse",
    //   title: "Gerer",
    //   width: "33%"
    // }
  ];
  return (
    <>
      <PageTitle
        title="Caisse"
        pathname="/ Comptabilité/Données de base/Caisse"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
