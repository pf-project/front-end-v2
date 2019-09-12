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

export default function BancaireModal({ value }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  // console.log(value);
  return (
    <div>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography color="inherit" variant="h5" gutterBottom>
            {"Données bancaires  "}
          </Typography>
        </Grid>
      </Grid>
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

      {value.coord_bancaire.length && (
        <>
          <Grid container className={classes.root} xs={12} spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                {"Cordonnées bancaires   "}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.root} xs={12} spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID compte</TableCell>
                      <TableCell>Pays</TableCell>
                      <TableCell>Banque</TableCell>
                      <TableCell>Clé RIB</TableCell>
                      <TableCell>Type de compte</TableCell>
                      <TableCell>Titulaire</TableCell>
                      <TableCell>Ville d'agence</TableCell>
                      <TableCell>Nom d'agence</TableCell>
                      <TableCell>IBAN</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {value.coord_bancaire &&
                      value.coord_bancaire.map(data => {
                        return (
                          <TableRow key={data.id_compte}>
                            <TableCell component="th" scope="row">
                              {data.pays}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.banque}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.cle_RIB}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.type_compte}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.titulalre}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.ville_agence}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.nom_agence}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.IBAN}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
