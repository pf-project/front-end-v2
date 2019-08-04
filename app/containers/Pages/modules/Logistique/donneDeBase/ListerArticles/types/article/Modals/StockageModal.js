import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  rootTable: {
    width: "40%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },

  stripped: {
    "& tbody tr:nth-child(even)": {
      background:
        theme.palette.type === "dark"
          ? fade(theme.palette.grey[900], 0.5)
          : theme.palette.grey[50]
    }
  },
  dividerMargin: {
    margin: 8
  }
}));

export default function StockageModal({ value }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {"Données de stockage  "}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Code d'article : "}
            {value.code}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Désignation : "}
            {value.designation}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Catégorie d'article : "}
            {value.categorie}
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.dividerMargin} />
      <Grid container className={classes.root} xs={12} spacing={2}>
        {value.unite_de_quantite_de_base && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"unité de quantité de base : "}
              {value.unite_de_quantite_de_base}
            </Typography>
          </Grid>
        )}
        {value.emplacement && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Emplacement : "}
              {value.emplacement}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider className={classes.dividerMargin} />
      <Grid container className={classes.root} xs={12} spacing={2}>
        {value.poids && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Poids : "}
              {value.poids}
            </Typography>
          </Grid>
        )}
        {value.unite1 && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Unité : "}
              {value.unite1}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider className={classes.dividerMargin} />
      <Grid container className={classes.root} xs={12} spacing={2}>
        {value.dimension_H && (
          <React.Fragment>
            <Grid item xs={2}>
              <Typography variant="subtitle1" gutterBottom>
                {"Dimension(L) : "}
                {value.dimension_L}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" gutterBottom>
                {"Dimension(I) : "}
                {value.dimension_I}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" gutterBottom>
                {"Dimension(H) : "}
                {value.dimension_H}
              </Typography>
            </Grid>
          </React.Fragment>
        )}
        <Grid item xs={2} />
        {value.unite2 && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Unité : "}
              {value.unite2}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider className={classes.dividerMargin} />
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Gestion par lot : "}
            {value.gestion_par_lot ? "Oui" : "Non"}
          </Typography>
        </Grid>
        {value.lot_standard && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Lot standard : "}
              {value.lot_standard}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Divider className={classes.dividerMargin} />

      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Controle qualité exigé : "}
            {value.controle_qualite_exige ? "Oui" : "Non"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
