import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url: "/app/logistique/Données-de-base/article/ajouter-article",
      title: "Ajouter",
      width: "33%"
    },
    {
      url: "/app/logistique/Données-de-base/article/lister-articles",
      title: "Liste",
      width: "33%"
    },
    {
      url: "/app/logistique/Données-de-base/article/GererArticle",
      title: "Gerer",
      width: "33%"
    }
  ];
  return (
    <>
      <PageTitle
        title="Article"
        pathname="/ Logistique/Données de base/Article"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
