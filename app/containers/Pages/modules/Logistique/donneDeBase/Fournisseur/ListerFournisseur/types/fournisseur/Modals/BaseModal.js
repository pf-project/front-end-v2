import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";

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

export default function BaseModal({ value }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  // console.log(value);
  return (
    <div>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {"Information Fournisseur   "}
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
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Groupe  fournisseur : "}
            {value.group}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Pays : "}
            {value.pays}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Titre de civilité : "}
            {value.civilite}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Ville : "}
            {value.ville}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Langue : "}
            {value.langue}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Code postal : "}
            {value.code_postal}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Libellé  additionnel : "}
            {value.libelle_additionnel}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" gutterBottom>
            {"Adresse : "}
            {value.adresse}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {"Contact   "}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Fonction</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Tel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.contacts &&
                  value.contacts.map(data => {
                    return (
                      <TableRow key={data.id_compte}>
                        <TableCell component="th" scope="row">
                          {data.id_compte}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.nom}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.fonction}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.tel}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
