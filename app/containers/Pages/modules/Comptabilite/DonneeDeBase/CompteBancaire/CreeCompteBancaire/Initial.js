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

export default function Initial({ handleChange, classes, data }) {
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
          label="
          Code du compte bancaire*"
        />
      </FormGroup>
      <FormGroup>
        <TextValidator
          onChange={handleChange}
          className={classes.initialeFields}
          name="designation"
          validators={["required", "maxStringLength:25"]}
          errorMessages={["Ce champ est obligatoire", "maximum 25 char"]}
          value={data.designation}
          label="Designation *"
        />
      </FormGroup>
      <FormGroup>
        <SelectValidator
          value={data.pays}
          className={classes.initialeFields}
          onChange={handleChange}
          name="pays"
          label="Utilité *"
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire"]}
        >
          <MenuItem value="pays">List pays</MenuItem>
        </SelectValidator>
      </FormGroup>
      <FormGroup>
        <SelectValidator
          value={data.banque}
          className={classes.initialeFields}
          onChange={handleChange}
          name="banque"
          label="Utilité *"
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire"]}
        >
          <MenuItem value="banque">List banques</MenuItem>
        </SelectValidator>
      </FormGroup>
    </Grid>
  );
}
