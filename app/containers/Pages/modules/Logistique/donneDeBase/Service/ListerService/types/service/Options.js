import React from "react";
import CustomToolbarSelect from "./CustomToolbarSelect";

export default {
  textLabels: {
    body: {
      noMatch: "Désolé, Aucune Résultat à Afficher",
      toolTip: "Trier"
    },
    pagination: {
      next: "Page Suivante",
      previous: "Page Précedente",
      rowsPerPage: "Lines par page:",
      displayRows: "sur"
    },
    toolbar: {
      search: "Rechercher",
      viewColumns: "Afficher Les Colonnes",
      filterTable: "Filtrer La Table"
    },
    filter: {
      all: "All",
      title: "FILTRES",
      reset: "ANNULER"
    },
    selectedRows: {
      text: "ligne(s) selectionnée(s)",
      delete: "Supprimer",
      deleteAria: "Supprimer Les Lignes Selectionées"
    },
    viewColumns: {
      title: "Afficher Les Colonnes",
      titleAria: "Afficher/Cacher Les Colonnes"
    }
  },
  filterType: "checkbox",
  // showResponsive: true,
  responsive: "stacked",
  print: false,
  download: false,
  filterList: ["categorie", "utilite"],
  customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
    <CustomToolbarSelect
      selectedRows={selectedRows}
      displayData={displayData}
      setSelectedRows={setSelectedRows}
    />
  )
};
