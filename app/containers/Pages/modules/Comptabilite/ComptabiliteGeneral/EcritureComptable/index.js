import React from "react";
import {
  MenuChooser,
  PageTitle
} from "enl-components";

const index = () => {
  const images = [{
      url: "/app/Comptabilite/Comptabilité-générale/Ecriture-comptable/créer-écriture-comptable",
      title: "Ajouter",
      width: "33%"
    }
    // {
    //   url:
    //     "/app/Comptabilite/Comptabilité-générale/Ecriture-comptable/liser-écritures-comptables",
    //   title: "Liste",
    //   width: "33%"
    // }
    // {
    //   url: "/app/Comptabilite/Données-de-base/article/GererCaisse",
    //   title: "Gerer",
    //   width: "33%"
    // }
  ];
  return ( <
    >
    <
    PageTitle title = "Ecriture comptable"
    pathname = "/ Comptabilité/Comptabilité générale/Ecriture comptable" /
    > {
      " "
    } <
    MenuChooser images = {
      images
    }
    /> <
    />
  );
};

export default index;