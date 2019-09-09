import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url: "/app/logistique/Données-de-base/Fournisseur/ajouter-fournisseur",
      title: "Ajouter",
      width: "33%"
    },
    {
      url: "/app/logistique/Données-de-base/Fournisseur/lister-fournisseurs",
      title: "Lister",
      width: "33%"
    },
    {
      url: "/app/logistique/Données-de-base/Fournisseur/Gererfournisseur",
      title: "Gerer",
      width: "33%"
    }
  ];
  return (
    <>
      <PageTitle
        title="Fournisseur"
        pathname="/ Logistique/Données de base/Fournisseur"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
