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
  data,
  handleFixPrecisionValeurs,
  classes,
  poids,
  langueur
}) {
  let dimensionValidator = {
    validators: [],
    errors: []
  };
  if (data.dimension_H || data.dimension_I || data.dimension_L) {
    dimensionValidator.validators = [
      "required",
      "isFloat",
      "isPositive",
      "maxNumber:999999"
    ];
    dimensionValidator.errors = [
      "champ obligatoire",
      "Chmap doit étre un nombre : ex 4.57 ",
      "Ce champ doit étre un nombre positive",
      "maximum 6 nombres"
    ];
  } else {
    dimensionValidator.validators = [];
    dimensionValidator.errors = [];
  }
  console.log(langueur);
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
                  value={data.code}
                  label="Code Article *"
                  id="#codearticle"
                />
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  fullWidth={true}
                  className={classes.field}
                  onChange={handleChange}
                  name="designation"
                  validators={["required", "maxStringLength:25"]}
                  errorMessages={["champ obligatoire", "maximum 25 char"]}
                  value={data.designation}
                  label="Désignation *"
                  id="#designation"
                />
              </Grid>

              <Grid item xs={4}>
                <TextValidator
                  className={classes.field}
                  value={data.categorie}
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
                {/* <FormControl> */}
                <SelectValidator
                  className={classes.field}
                  value={data.unite_de_quantite_de_base}
                  onChange={handleChange}
                  name="unite_de_quantite_de_base"
                  label="Unité de quantité de base"
                  // style={{ width: 190 }}
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
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={6} direction="column">
                <TextValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="emplacement"
                  // validators={["maxStringLength:10"]}
                  // errorMessages={["maximum 10 char"]}
                  value={data.emplacement}
                  label="Emplacement "
                  id="#emplacement"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Grid container>
              <Grid item xs={6}>
                <TextValidator
                  onChange={handleChange}
                  className={classes.field}
                  name="poids"
                  value={data.poids}
                  onBlur={handleFixPrecisionValeurs(false)(3)}
                  type="number"
                  step="0.01"
                  label="Poids"
                  id="#emplacement"
                  validators={["maxNumber:999", "isFloat", "isPositive"]}
                  errorMessages={[
                    "Maximum 3 nombres !",
                    "Poids doit etre un nombre",
                    "Ce champ doit étre un nombre positive"
                  ]}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <FormControl> */}
                <SelectValidator
                  className={classes.field}
                  value={data.unite_poid}
                  onChange={handleChange}
                  name="unite_poid"
                  label="Unité"
                >
                  {poids &&
                    poids.length > 0 &&
                    poids.map(element => (
                      <MenuItem value={element.code}>
                        {element.designation}
                      </MenuItem>
                    ))}
                </SelectValidator>
                {/* </FormControl> */}
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
                  onBlur={handleFixPrecisionValeurs(false)(3)}
                  name="dimension_L"
                  type="number"
                  step="0.01"
                  value={data.dimension_L}
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
                  onBlur={handleFixPrecisionValeurs(false)(3)}
                  type="number"
                  step="0.01"
                  value={data.dimension_I}
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
                  onBlur={handleFixPrecisionValeurs(false)(3)}
                  type="number"
                  step="0.01"
                  value={data.dimension_H}
                  validators={dimensionValidator.validators}
                  errorMessages={dimensionValidator.errors}
                  label="H"
                  id="#h"
                />
              </Grid>
              <Grid item xs={6} direction="column">
                {/* <FormControl> */}
                <SelectValidator
                  value={data.unite_dim}
                  onChange={handleChange}
                  className={classes.field}
                  name="unite_dim"
                  label="Unité"
                >
                  {langueur &&
                    langueur.length > 0 &&
                    langueur.map(element => (
                      <MenuItem value={element.code}>
                        {element.designation}
                      </MenuItem>
                    ))}
                </SelectValidator>
                {/* </FormControl> */}
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.controle_qualite_exige}
                    onChange={handleChange}
                    color="primary"
                    name="controle_qualite_exige"
                  />
                }
                label="Contrôle qualité exigé"
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.gestion_par_lot}
                    onChange={handleChange}
                    color="primary"
                    name="gestion_par_lot"
                  />
                }
                label="Gestion par lot"
              />
            </Grid>{" "}
            <Grid item xs={6}>
              {data.gestion_par_lot && (
                <TextValidator
                  onChange={handleChange}
                  name="lot_standard"
                  className={classes.field}
                  validators={["isNumber", "isPositive"]}
                  errorMessages={[
                    "Ce champ doit étre un nombre",
                    "Ce champ doit étre un nombre positive"
                  ]}
                  value={data.lot_standard}
                  label="Lot standard"
                  id="lot_standard"
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
