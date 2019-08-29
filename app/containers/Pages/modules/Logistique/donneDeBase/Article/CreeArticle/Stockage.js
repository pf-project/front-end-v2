import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  FormGroup,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem
} from "@material-ui/core/";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

export default function Stockage({
  handleChange,
  state,
  handleSubmitStockage,
  handleBack,
  classes
}) {
  const { designations } = state;

  let dimensionValidator = {
    validators: [],
    errors: []
  };
  if (
    state.data.dimension_H ||
    state.data.dimension_I ||
    state.data.dimension_L
  ) {
    dimensionValidator.validators = [
      "required",
      "isNumber",
      "isPositive",
      "maxNumber:99"
    ];
    dimensionValidator.errors = [
      "champ obligatoire",
      "Ce champ doit étre un nombre",
      "Ce champ doit étre un nombre positive",
      "maximum 2 taille du nombre"
    ];
  } else {
    dimensionValidator.validators = [];
    dimensionValidator.errors = [];
  }
  return (
    <div>
      <Grid container spacing={1} className={classes.grid} direction="column">
        {/* <ValidatorForm onSubmit={handleSubmitStockage} autoComplete="off"> */}
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
                  onChange={handleChange}
                  name="code"
                  value={state.data.code}
                  label="Code Article *"
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
                  errorMessages={["champ obligatoire", "maximum 25 char"]}
                  value={state.data.designation}
                  label="Désignation *"
                  id="#designation"
                />
              </Grid>

              <Grid item xs={4}>
                <TextValidator
                  className={classes.field}
                  value={state.data.categorie}
                  onChange={handleChange}
                  name="categorie"
                  label="Catégorie d'article"
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
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
            <Typography variant="h6">Données de stockage</Typography>
          </div>
        </Toolbar>

        <Grid item xs={12}>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={6}>
                <FormControl>
                  <SelectValidator
                    className={classes.field}
                    value={state.data.unite_de_quantite_de_base}
                    onChange={handleChange}
                    name="unite_de_quantite_de_base"
                    label="Unité de quantité de base"
                    style={{ width: 190 }}
                    validators={["isNumber", "isPositive", "maxNumber:999999"]}
                    errorMessages={[
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
                </FormControl>
              </Grid>
              <Grid item xs={6} direction="column">
                <TextValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="emplacement"
                  // validators={["maxStringLength:10"]}
                  // errorMessages={["maximum 10 char"]}
                  value={state.data.emplacement}
                  label="Emplacement "
                  id="#emplacement"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={6}>
                <TextValidator
                  style={{ width: "40%" }}
                  onChange={handleChange}
                  name="poids"
                  value={state.data.poids}
                  label="Poids"
                  id="#emplacement"
                  validators={["maxNumber:999", "isFloat"]}
                  errorMessages={[
                    "Maximum 3 nombres !",
                    "Poids doit etre un nombre"
                  ]}
                />
              </Grid>
              <Grid item xs={6} direction="column">
                <FormControl style={{ minWidth: 300 }}>
                  <SelectValidator
                    className={classes.field}
                    value={state.data.unite1}
                    onChange={handleChange}
                    name="unite1"
                    label="Unité"
                    style={{ minWidth: 300 }}
                    validators={["maxNumber:100"]}
                    errorMessages={["taille maximale est 100"]}
                  >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"25"}>25</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                    <MenuItem value={"100"}>100</MenuItem>
                  </SelectValidator>
                </FormControl>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={2}>
                <TextValidator
                  onChange={handleChange}
                  style={{ width: "70%" }}
                  name="dimension_L"
                  value={state.data.dimension_L}
                  label="L"
                  id="#l"
                  validators={dimensionValidator.validators}
                  errorMessages={dimensionValidator.errors}
                />
              </Grid>
              <Grid item xs={2} direction="column">
                <TextValidator
                  onChange={handleChange}
                  name="dimension_I"
                  style={{ width: "70%" }}
                  value={state.data.dimension_I}
                  validators={dimensionValidator.validators}
                  errorMessages={dimensionValidator.errors}
                  label="I"
                  id="#i"
                />
              </Grid>
              <Grid item xs={2} direction="column">
                <TextValidator
                  onChange={handleChange}
                  name="dimension_H"
                  style={{ width: "70%" }}
                  value={state.data.dimension_H}
                  validators={dimensionValidator.validators}
                  errorMessages={dimensionValidator.errors}
                  label="H"
                  id="#h"
                />
              </Grid>
              <Grid item xs={6} direction="column">
                <FormControl style={{ minWidth: 300 }}>
                  <SelectValidator
                    value={state.data.unite2}
                    onChange={handleChange}
                    name="unite2"
                    label="Unité"
                    style={{ minWidth: 300 }}
                    validators={["maxNumber:100"]}
                    errorMessages={["taille maximale est 100"]}
                  >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"25"}>25</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                    <MenuItem value={"100"}>100</MenuItem>
                  </SelectValidator>
                </FormControl>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12} className={classes.checkBoxMarginTop}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.data.gestion_par_lot}
                  onChange={handleChange}
                  color="primary"
                  name="gestion_par_lot"
                />
              }
              label="Gestion par lot"
            />

            {state.data.gestion_par_lot && (
              <TextValidator
                onChange={handleChange}
                name="lot_standard"
                style={{ width: "40%" }}
                // className={classes.field}
                // validators={[
                //   "isNumber",
                //   "isPositive",
                //   "maxNumber:99"
                // ]}
                // errorMessages={[
                //   "Ce champ doit étre un nombre",
                //   "Ce champ doit étre un nombre positive",
                //   "maximum 2 taille du nombre"
                // ]}
                value={state.data.lot_standard}
                label="Lot standard"
                id="lot_standard"
              />
            )}
          </FormGroup>
        </Grid>
        <Grid item xs={12} className={classes.checkBoxMarginTop}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.data.controle_qualite_exige}
                  onChange={handleChange}
                  color="primary"
                  name="controle_qualite_exige"
                />
              }
              label="Contrôle qualité exigé"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
}
