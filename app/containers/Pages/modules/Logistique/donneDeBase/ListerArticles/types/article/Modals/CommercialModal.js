import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { fade } from "@material-ui/core/styles/colorManipulator";

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

export default function CommercialModal({ value }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography color="inherit" variant="h5" gutterBottom>
            {"Données commerciales  "}
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

      <div>
        <Grid container className={classes.root} xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography color="primary" variant="subtitle1" gutterBottom>
              {"Information d'achat  "}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.root} xs={12} spacing={2}>
          {value.prix_standar_achat && (
            <Grid item xs={4}>
              <Typography variant="subtitle1" gutterBottom>
                {"Prix standard d'achat : "}
                {value.prix_standar_achat}
              </Typography>
            </Grid>
          )}
          {value.unite_de_quantite_achat && (
            <Grid item xs={4}>
              <Typography variant="subtitle1" gutterBottom>
                {"Unité de quantité d'achat : "}
                {value.unite_de_quantite_achat}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Divider className={classes.dividerMargin} />
        <Grid container className={classes.root} xs={12} spacing={2}>
          {value.prix_moyen_pendere && (
            <Grid item xs={4}>
              <Typography variant="subtitle1" gutterBottom>
                {"Prix moyenne pondéré : "}
                {value.prix_moyen_pendere}
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>

      {value.utilite === "MRCH-Achat-pour-vente" && (
        <div>
          <Grid container className={classes.root} xs={12} spacing={2}>
            <Grid item xs={6}>
              <Typography color="primary" variant="subtitle1" gutterBottom>
                {"Information de vente  "}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.root} xs={12} spacing={2}>
            {value.prix_de_vente_de_base_HT && (
              <Grid item xs={4}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Prix de vente de base HT   : "}
                  {value.prix_de_vente_de_base_HT}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Divider className={classes.dividerMargin} />
          <Grid container className={classes.root} xs={12} spacing={2}>
            {value.taux_tva && (
              <Grid item xs={4}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Taux de TVA : "}
                  {value.taux_tva}
                </Typography>
              </Grid>
            )}
            {value.prix_de_vente_de_base_TTC && (
              <Grid item xs={4}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Prix de vente de base TTC : "}
                  {value.prix_de_vente_de_base_TTC}
                </Typography>
              </Grid>
            )}
          </Grid>
          {value.unite_de_vente && (
            <>
              <Divider className={classes.dividerMargin} />

              <Grid container className={classes.root} xs={12} spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    {"Unité de vente : "}
                    {value.unite_de_vente}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      )}
    </div>
  );
}
