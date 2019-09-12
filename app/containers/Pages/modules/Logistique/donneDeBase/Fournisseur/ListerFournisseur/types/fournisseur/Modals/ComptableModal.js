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

export default function ComptableModal({ value }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  console.log(value);
  return (
    <div>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" color="primary" gutterBottom>
            {"Données comptables  "}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Code fournisseur : "}
            {value.code}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Désignation : "}
            {value.designation}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" color="primary" gutterBottom>
            {"Informations comptables  "}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Compte fournisseur : "}
            {value.compte}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Mode de paiement : "}
            {value.mode_paiement}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Condition de paiement : "}
            {value.condition_paiement}
          </Typography>
        </Grid>
        {value.condition_paiement === "Après N jours" && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Désignation : "}
              {value.nombre_jours}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Devise : "}
            {value.devise}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={2}>
          <Typography variant="subtitle1" gutterBottom>
            {"Honoraire : "}
            {value.honoraire ? "Oui" : "Non"}
          </Typography>
        </Grid>
        {value.honoraire && (
          <>
            <Grid item xs={7}>
              <Typography variant="subtitle1" gutterBottom>
                {"Status honoraire : "}
                {value.status_honoraire}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" gutterBottom>
                {"Taux de tva : "}
                {value.taux_tva}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
