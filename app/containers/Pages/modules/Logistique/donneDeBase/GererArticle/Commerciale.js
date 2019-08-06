import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// import SnackBar from "../../../utils/SnackBar";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default function Commerciale({
  handleChange,
  data,
  handleSubmitCommerciale,
  handleFixPrecisionValeurs,
  classes,
  loading
}) {
  const { designations } = data;
  // const [loading, setLoading] = React.useState(false);
  // const handleClickVariant = SnackBar({
  //   message: "L'article a été créer avec succes",
  //   variant: "success"
  // });

  return (
    <Grid container spacing={1} className={classes.grid} direction="column">
      {/* <ValidatorForm autoComplete="off" onSubmit={handleSubmit}> */}
      <Grid item xs={12}>
        <FormGroup>
          <Grid container>
            <Grid item xs={4}>
              <TextValidator
                className={classes.field}
                InputProps={{
                  readOnly: true,
                  fullWidth: true
                }}
                // onChange={handleChange}
                name="code"
                value={data.code}
                label="Code d'article *"
                id="#codearticle"
              />
            </Grid>
            <Grid item xs={4}>
              <TextValidator
                // fullWidth={true}
                className={classes.field}
                onChange={handleChange}
                name="designation"
                validators={["required", "maxStringLength:25"]}
                errorMessages={["Ce champ est obligatoire", "maximum 25 char"]}
                value={data.designation}
                label="Désignation *"
                id="#designation"
              />
            </Grid>

            <Grid item xs={4}>
              <TextValidator
                className={classes.field}
                value={data.categorie}
                // onChange={handleChange}
                name="categorie"
                label="Catégorie d'article *"
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Informations d'achat</Typography>
        </div>
      </Toolbar>
      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <FormGroup>
              <SelectValidator
                className={classes.field}
                value={data.unite_de_quantite_achat}
                // value="25"
                onChange={handleChange}
                name="unite_de_quantite_achat"
                label="Unité de quantité d'achat *"
                style={{ minWidth: 300 }}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire "]}
              >
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"25"}>25</MenuItem>
                <MenuItem value={"50"}>50</MenuItem>
                <MenuItem value={"100"}>100</MenuItem>
              </SelectValidator>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                name="prix_moyen_pendere"
                onBlur={handleFixPrecisionValeurs(false)(false)}
                value={data.prix_moyen_pendere}
                label="Prix moyen pondéré *"
                validators={[
                  "required",
                  "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/
                ]}
                errorMessages={[
                  "Ce champ est obligatoire",
                  "Chmap doit étre un nombre : ex 4.57 "
                  // "deux  nombre(s) apres la virgule !"
                ]}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <FormGroup>
              <TextValidator
                onChange={handleChange}
                className={classes.field}
                name="prix_de_vente_de_base_HT"
                value={data.prix_de_vente_de_base_HT}
                onBlur={handleFixPrecisionValeurs(false)(false)}
                label="Prix de vente de base HT *"
                validators={[
                  "required",
                  "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/
                ]}
                errorMessages={[
                  "Ce champ est obligatoire",
                  "Chmap doit étre un nombre : ex 4.57 "
                  // "deux  nombre(s) apres la virgule !"
                ]}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      {data.utilite === "MRCH-Achat-pour-vente" && (
        <div>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Informations de vente</Typography>
            </div>
          </Toolbar>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <TextValidator
                  onChange={handleChange}
                  className={classes.field}
                  name="prix_de_vente_de_base_TTC"
                  onBlur={handleFixPrecisionValeurs(false)(false)}
                  value={data.prix_de_vente_de_base_TTC}
                  label="Prix de vente de base TTC *"
                  validators={[
                    "required",
                    "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/
                  ]}
                  errorMessages={[
                    "Ce champ est obligatoire",
                    "Chmap doit étre un nombre : ex 4.57 "
                    // "deux  nombre(s) apres la virgule !"
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <FormGroup>
                  <SelectValidator
                    value={data.taux_tva}
                    className={classes.field}
                    onChange={handleChange}
                    name="taux_tva"
                    label="Taux de TVA *"
                    style={{ minWidth: 300 }}
                    validators={["required"]}
                    errorMessages={["Ce champ est obligatoire"]}
                  >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"25"}>25</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                    <MenuItem value={"100"}>100</MenuItem>
                  </SelectValidator>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <SelectValidator
                    value={data.unite_de_vente}
                    onChange={handleChange}
                    className={classes.field}
                    name="unite_de_vente"
                    label="Unité de vente *"
                    style={{ minWidth: 300 }}
                    validators={[
                      "required",
                      "isNumber",
                      "isPositive",
                      "maxNumber:999999"
                    ]}
                    errorMessages={[
                      "Ce champ est obligatoire",
                      "Ce champ doit étre un nombre",
                      "Ce champ doit étre un nombre positive",
                      "maximum 6 taille du nombre"
                    ]}
                  >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"25"}>25</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                    <MenuItem value={"100"}>100</MenuItem>
                  </SelectValidator>
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </Grid>
  );
}
