import React from "react";

import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function Initiale({
  data,
  handleChange,
  fetchCategorie,
  classes,
  designations,
  loading
}) {
  if (loading) {
    return (
      <center>
        <CircularProgress size={24} className={classes.buttonProgress} />
      </center>
    );
  }
  return (
    <Grid
      container
      spacing={1}
      className={classes.grid}
      direction="column"
      justify="center"
    >
      {/* <ValidatorForm onSubmit={handleSubmitInitial} autoComplete="off"> */}
      <FormGroup>
        <TextValidator
          onChange={handleChange}
          className={classes.initialeFields}
          name="code"
          validators={["required", "maxStringLength:25"]}
          errorMessages={["Ce champ est obligatoire", "maximum 25 char"]}
          value={data.code}
          label="Code d'article *"
        />
      </FormGroup>
      <FormGroup>
        <SelectValidator
          value={data.categorie}
          className={classes.initialeFields}
          onChange={handleChange}
          onBlur={() => {
            if (data.categorie) fetchCategorie(data.categorie);
          }}
          name="categorie"
          label="Catégorie d'article *"
          style={{ minWidth: 300 }}
          validators={["required"]}
          errorMessages={["Ce champ est obligatoire "]}
        >
          {designations.map(designation => (
            <MenuItem value={designation}>{designation}</MenuItem>
          ))}
        </SelectValidator>
      </FormGroup>
      <FormGroup>
        <SelectValidator
          value={data.utilite}
          className={classes.initialeFields}
          onChange={handleChange}
          name="utilite"
          label="Utilité *"
          style={{ minWidth: 300 }}
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire"]}
        >
          <MenuItem value="CONS">Achat pour consomation</MenuItem>
          <MenuItem value="MRCH">Achat pour vente </MenuItem>
        </SelectValidator>
      </FormGroup>
      <FormGroup>
        <TextValidator
          onChange={handleChange}
          className={classes.initialeFields}
          name="designation"
          validators={["required", "maxStringLength:25"]}
          errorMessages={["Ce Champ est Obligatoire", "maximum 25 char"]}
          value={data.designation}
          label="Désignation *"
        />
      </FormGroup>
      <FormGroup>
        <TextField
          name="findvalidite"
          value={data.findvalidite}
          onChange={handleChange}
          className={classes.initialeFields}
          label="Fin de validité"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormGroup>
    </Grid>
  );
}
