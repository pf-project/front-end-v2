import React from "react";
import { MenuChooser, PageTitle } from "enl-components";

const index = () => {
  const images = [
    {
      url: "/app/logistique/paramétrage/configuration-Service/CreeCategorie",
      title: "Ajouter",
      width: "33%"
    }
    // {
    //   url: "#",
    //   title: "Lister",
    //   width: "33%"
    // },
    // {
    //   url: "#",
    //   title: "Gerer",
    //   width: "33%"
    // }
  ];
  return (
    <>
      <PageTitle
        title="Configuration : service"
        pathname="/ Logistique/Paramétrage/Configuration : service"
      />{" "}
      <MenuChooser images={images} />
    </>
  );
};

export default index;
