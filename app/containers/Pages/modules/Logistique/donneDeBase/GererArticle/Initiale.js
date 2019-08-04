import React from "react";

import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import MomentUtils from "@date-io/moment";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function Initiale({
  state,
  handleChange,
  handleSubmitInitial,
  handleBack,
  classes,
  designations
}) {
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
          value={state.data.code}
          label="Code d'article *"
        />
      </FormGroup>
      <FormGroup>
        <TextValidator
          className={classes.field}
          value={state.data.categorie}
          onChange={handleChange}
          name="categorie"
          label="Catégorie d'article *"
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire : "]}
          InputProps={{
            readOnly: true
          }}
        />
      </FormGroup>
      <FormGroup>
        <SelectValidator
          value={state.data.utilite}
          className={classes.initialeFields}
          onChange={handleChange}
          name="utilite"
          label="Utilité *"
          style={{ minWidth: 300 }}
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire"]}
        >
          <MenuItem value={"CONS-Achat-pour-consomation<"}>
            CONS-Achat pour consomation
          </MenuItem>
          <MenuItem value={"MRCH-Achat-pour-vente"}>
            MRCH-Achat pour vente{" "}
          </MenuItem>
        </SelectValidator>
      </FormGroup>
      <FormGroup>
        <TextValidator
          onChange={handleChange}
          className={classes.initialeFields}
          name="designation"
          validators={["required", "maxStringLength:25"]}
          errorMessages={["Ce Champ est Obligatoire", "maximum 25 char"]}
          value={state.data.designation}
          label="Désignation *"
        />
      </FormGroup>
      <FormGroup>
        <TextField
          name="findvalidite"
          handleChange={handleChange}
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