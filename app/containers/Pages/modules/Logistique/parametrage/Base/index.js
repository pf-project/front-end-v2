import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url: "/app/logistique/paramétrage/configuration-de-base/cours-de-change",
      title: "Cours de change",
      width: "33%"
    },
    {
      url: "/app/logistique/paramétrage/configuration-de-base/listes-de-base",
      title: "Listes de base",
      width: "33%"
    },
    {
      url: "/app/logistique/paramétrage/configuration-de-base/unites",
      title: "Unites",
      width: "33%"
    }
  ];
  return (
    <>
      <PageTitle
        title="Configuration de base"
        pathname="/ Logistique/Paramétrage/Configuration de base"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
