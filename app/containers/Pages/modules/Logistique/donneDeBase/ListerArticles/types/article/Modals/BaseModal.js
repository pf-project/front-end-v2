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
  return (
    <div>
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {"Données de base  "}
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
      <Grid container className={classes.root} xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography color="primary" variant="subtitle1" gutterBottom>
            {"Données de base :  "}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root} xs={12} spacing={2}>
        {value.ancienCode && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Ancien Code : "}
              {value.ancienCode}
            </Typography>
          </Grid>
        )}
        {value.fabriquant && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Fabriquant : "}
              {value.fabriquant}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Divider className={classes.dividerMargin} />
      <Grid container className={classes.root} xs={12} spacing={2}>
        {value.note && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"Note : "}
              {value.note}
            </Typography>
          </Grid>
        )}
        {value.num_piece_fabriquuant && (
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              {"N° pièce fabriquant : "}
              {value.num_piece_fabriquuant}
            </Typography>
          </Grid>
        )}
      </Grid>
      {value.caracteristiques.size && (
        <div>
          <div className={classes.rootTable}>
            <Grid item xs={6}>
              <Typography color="primary" variant="subtitle1" gutterBottom>
                {"Valeurs :  "}
              </Typography>
            </Grid>
            <Table className={classes.stripped}>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Valeur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.caracteristiques.toArray().map((row, i) => {
                  let myRow = row.toObject();
                  return [
                    <TableRow key={i}>
                      <TableCell>{myRow.nom}</TableCell>
                      <TableCell>{myRow.valeur}</TableCell>
                    </TableRow>
                  ];
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
