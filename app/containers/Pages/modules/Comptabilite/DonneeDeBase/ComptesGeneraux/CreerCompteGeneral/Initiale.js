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
  handleChange,
  classes,
  data,
  handleBlur,
  handleChangeWithIntitialValue,
  rubriques,
  lesclasses,
  comptes,
  postes,
  loading,
  gerer
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
      {!gerer && (
        <>
          <FormGroup>
            <Grid item xs={6}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                disabled={loading}
                name="classe"
                value={data.classe}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                label="Classe "
                id="#classe"
              >
                {lesclasses &&
                  lesclasses.map(compte => (
                    <MenuItem value={compte.compte}>
                      {compte.compte + "." + compte.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Grid>
          </FormGroup>
          <FormGroup>
            <Grid item xs={6}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                disabled={loading}
                name="rubrique"
                value={data.rubrique}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                label="Rubrique "
                id="#rubrique"
              >
                {rubriques &&
                  rubriques.map(compte => (
                    <MenuItem value={compte.compte}>
                      {compte.compte + "." + compte.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Grid>
          </FormGroup>
          <FormGroup>
            <Grid item xs={6}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                disabled={loading}
                name="poste"
                value={data.poste}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                label="Poste "
                id="#poste"
              >
                {postes &&
                  postes.map(compte => (
                    <MenuItem value={compte.compte}>
                      {compte.compte + "." + compte.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Grid>
          </FormGroup>
          <FormGroup>
            <Grid item xs={6}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                disabled={loading}
                name="comptepere"
                value={data.comptepere}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                label="Compte pere "
                id="#comptepere"
              >
                {comptes &&
                  comptes.map(compte => (
                    <MenuItem value={compte.compte}>
                      {compte.compte + "." + compte.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Grid>
          </FormGroup>
        </>
      )}
      <FormGroup>
        <Grid item xs={6}>
          <TextValidator
            className={classes.field}
            onBlur={handleBlur}
            disabled={loading || gerer}
            onChange={handleChangeWithIntitialValue}
            name="compte"
            value={data.compte}
            validators={[
              "required",
              "isNumber",
              "minStringLength:5",
              "maxStringLength:8"
            ]}
            errorMessages={[
              "Ce champ est obligatoire",
              "Ce champ doit etre un nombre entier",
              "min 5 chiffres",
              "max 8 chiffres"
            ]}
            label="Compte général "
            id="#comptegeneral"
          />
        </Grid>
      </FormGroup>
      <FormGroup>
        <Grid item xs={9}>
          <TextValidator
            onChange={handleChange}
            className={classes.initialeFields}
            name="designation"
            validators={["required", "maxStringLength:25"]}
            errorMessages={["Ce champ est obligatoire", "maximum 25 char"]}
            value={data.designation}
            label="Designation *"
          />
        </Grid>
      </FormGroup>
    </Grid>
  );
}
