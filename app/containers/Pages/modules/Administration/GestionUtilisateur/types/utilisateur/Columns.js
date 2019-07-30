import React from "react";
import Chip from "@material-ui/core/Chip";
export default [
  {
    name: "Identifiant",
    label: "Identifiant",
    options: {
      filter: false,
      sort: true,
      display: false
    }
  },
  {
    name: "Nom d'utilisateur",
    label: "Nom d'utilisateur",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Prévilège",
    label: "Prévilège",
    options: {
      filter: true,
      sort: true,
      customBodyRender: value => {
        if (value === "ROLE_ADMIN") {
          return "Administrateur";
        }
        if (value === "ROLE_USER") {
          return "Staff";
        }
        return <Chip label="Unknown" />;
      }
    }
  },
  {
    name: "Statut de compte",
    label: "Statut de compte",
    options: {
      filter: true,
      sort: true,
      customBodyRender: value => {
        if (value === "Actif") {
          return <Chip label="Actif" color="secondary" />;
        }
        if (value === "Bloqué") {
          return <Chip label="Bloqué" color="primary" />;
        }
        return <Chip label="Unknown" />;
      }
    }
  }
];
