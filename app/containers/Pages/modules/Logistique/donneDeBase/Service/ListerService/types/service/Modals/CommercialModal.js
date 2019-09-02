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
          {value.prix_achat_HT && (
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                {"Prix d'achat standard HT : "}
                {value.prix_achat_HT}
              </Typography>
            </Grid>
          )}
          {value.devise_achat && (
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom>
                {"Devise : "}
                {value.devise_achat}
              </Typography>
            </Grid>
          )}
          {value.unite_achat && (
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom>
                {"Unité d'achat : "}
                {value.unite_achat}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container className={classes.root} xs={12} spacing={2}>
          {value.prix_achat_TTC && (
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                {"Prix d'achat standard TTC : "}
                {value.prix_achat_TTC}
              </Typography>
            </Grid>
          )}
          {value.devise_achat && (
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom>
                {"TVA : "}
                {value.taux_tva_achat + " %"}
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
      {/* <Divider className={classes.dividerMargin} /> */}
      {value.utilite === "MRCH" && (
        <div>
          <Grid container className={classes.root} xs={12} spacing={2}>
            <Grid item xs={6}>
              <Typography color="primary" variant="subtitle1" gutterBottom>
                {"Information de vente  "}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.root} xs={12} spacing={2}>
            {value.marge == true && (
              <>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    {"Marge  "}
                    {value.taux_marge + " %"}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    {"Montant de marge : "}
                    {value.montant_marge}
                  </Typography>
                </Grid>
              </>
            )}
            {value.marge == false && (
              <Grid item xs={4}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Prix fixe : Oui"}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid container className={classes.root} xs={12} spacing={2}>
            {value.prix_vente_HT && (
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Prix de vente HT : "}
                  {value.prix_vente_HT}
                </Typography>
              </Grid>
            )}
            {value.devise_vente && (
              <Grid item xs={3}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Devise : "}
                  {value.devise_vente}
                </Typography>
              </Grid>
            )}
            {value.unite_vente && (
              <Grid item xs={3}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Unité de vente : "}
                  {value.unite_vente}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid container className={classes.root} xs={12} spacing={2}>
            {value.prix_vente_TTC && (
              <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                  {"Prix de vente TTC : "}
                  {value.prix_vente_TTC}
                </Typography>
              </Grid>
            )}
            {value.taux_tva_vente && (
              <Grid item xs={3}>
                <Typography variant="subtitle1" gutterBottom>
                  {"TVA : "}
                  {value.taux_tva_vente + " %"}
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}
