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
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function Initiale({
  state,
  handleChange,
  handleSubmitInitial,
  handleBack,
  classes
}) {
  const { designations } = state;

  return (
    <ValidatorForm onSubmit={handleSubmitInitial} autoComplete="off">
      <FormGroup>
        <TextValidator
          onChange={handleChange}
          name="code"
          validators={["required", "maxStringLength:25"]}
          errorMessages={["champ obligatoire", "maximum 25 char"]}
          value={state.data.code}
          label="Code Article *"
        />
      </FormGroup>
      <FormGroup>
        <SelectValidator
          value={state.data.categorie}
          onChange={handleChange}
          name="categorie"
          label="Catégorie d'article"
          style={{ minWidth: 300 }}
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire : "]}
        >
          {designations.map(designation => (
            <MenuItem value={designation}>{designation}</MenuItem>
          ))}
        </SelectValidator>
      </FormGroup>
      <FormGroup>
        <SelectValidator
          value={state.data.utilite}
          onChange={handleChange}
          name="utilite"
          label="Utilité "
          style={{ minWidth: 300 }}
          validators={["required"]}
          errorMessages={["Ce Champ est Obligatoire : "]}
        >
          <MenuItem value={"CONS-Achat pour consomation<"}>
            CONS-Achat pour consomation
          </MenuItem>
          <MenuItem value={"MRCH-Achat pour vente"}>
            MRCH-Achat pour vente{" "}
          </MenuItem>
        </SelectValidator>
      </FormGroup>
      <FormGroup>
        <TextValidator
          onChange={handleChange}
          name="designation"
          validators={["required", "maxStringLength:25"]}
          errorMessages={["champ obligatoire", "maximum 25 char"]}
          value={state.data.designation}
          label="Désignation*"
        />
      </FormGroup>
      <FormGroup>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            label="Fin de validité "
            clearable
            name="findvalidite"
            onChange={handleChange}
            value={state.data.findvalidite}
          />
        </MuiPickersUtilsProvider>
      </FormGroup>
      <div>
        <Button
          disabled={state.activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Précedent
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {state.activeStep === state.steps.length - 1
            ? "Sauvegarder"
            : "Suivant"}
        </Button>
      </div>
    </ValidatorForm>
  );
}
