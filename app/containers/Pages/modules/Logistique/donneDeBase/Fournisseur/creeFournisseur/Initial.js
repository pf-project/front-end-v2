import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";

export default function Initiale({
  data,
  handleChange,
  classes,
  loading,
  handleSubmit
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
      <ValidatorForm id="addfourni" onSubmit={handleSubmit} autoComplete="off">
        <FormGroup>
          <TextValidator
            onChange={handleChange}
            className={classes.initialeFields}
            name="code"
            validators={["required", "maxStringLength:16"]}
            errorMessages={[
              "Ce champ est obligatoire",
              "maximum 16 characteres !"
            ]}
            value={data.code}
            label="Code fournisseur *"
          />
        </FormGroup>
        <FormGroup>
          <TextValidator
            onChange={handleChange}
            className={classes.initialeFields}
            name="designation"
            validators={["required", "maxStringLength:40"]}
            errorMessages={[
              "Ce champ est obligatoire",
              "maximum 40 characteres !"
            ]}
            value={data.designation}
            label="Désignation *"
          />
        </FormGroup>
        <FormGroup>
          <SelectValidator
            value={data.group}
            className={classes.initialeFields}
            onChange={handleChange}
            name="group"
            label="Group fournisseurs *"
            validators={["required"]}
            errorMessages={["Ce Champ est Obligatoire"]}
          >
            <MenuItem value="STDR">Standard</MenuItem>
          </SelectValidator>
        </FormGroup>
      </ValidatorForm>
    </Grid>
  );
}
