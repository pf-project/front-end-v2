import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url: "/app/logistique/Données-de-base/service/ajouter-service",
      title: "Ajouter",
      width: "33%"
    },
    {
      url: "/app/logistique/Données-de-base/service/lister-services",
      title: "Liste",
      width: "33%"
    },
    {
      url: "/app/logistique/Données-de-base/service/GererService",
      title: "Gerer",
      width: "33%"
    }
  ];
  return (
    <>
      <PageTitle
        title="Service"
        pathname="/ Logistique/Données de base/Service"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
