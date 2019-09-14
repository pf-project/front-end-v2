import React, { useState } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";

import {
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

export default function Base({
  handleChange,
  data,
  classes,
  addContact,
  removeContact,
  handleSubmit
}) {
  //   const initialState = {
  //     nom: "",
  //     fonction: "",
  //     email: "",
  //     tel: ""
  //   };
  //   const [contacts, setContacts] = useState(initialState);
  //   const [clearContactsFileds, setClearContactsFileds] = useState(true);
  //   const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div>
      <Grid container spacing={1} className={classes.grid} direction="column">
        {/* <ValidatorForm onSubmit={handleSubmitStockage} autoComplete="off"> */}
        <Grid item xs={12}>
          <FormGroup>
            <Grid container>
              <Grid item xs={6}>
                <TextValidator
                  className={classes.field}
                  InputProps={{
                    readOnly: true,
                    fullWidth: true
                  }}
                  onChange={handleChange}
                  name="code"
                  value={data.code}
                  label="Code du compte bancaire*"
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
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
            </Grid>
          </FormGroup>
        </Grid>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">Coordonnées de la banque</Typography>
          </div>
        </Toolbar>

        <Grid item xs={12}>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={6} direction="column">
                <SelectValidator
                  className={classes.field}
                  value={data.pays}
                  onChange={handleChange}
                  name="pays"
                  label="Pays"
                >
                  <MenuItem value={"Maroc"}>Maroc</MenuItem>
                  <MenuItem value={"Canada"}>Canada</MenuItem>
                  <MenuItem value={"Australie"}>Australie</MenuItem>
                  <MenuItem value={"Qatar"}>Qatar</MenuItem>
                  <MenuItem value={"Italie"}>Italie</MenuItem>
                </SelectValidator>
              </Grid>
              <Grid item xs={6}>
                <SelectValidator
                  value={data.banque}
                  className={classes.field}
                  onChange={handleChange}
                  name="banque"
                  label="Banque*"
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire"]}
                >
                  <MenuItem value="banque">List banques</MenuItem>
                </SelectValidator>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Grid container>
              <Grid item xs={6}>
                {/* <FormControl> */}
                <SelectValidator
                  className={classes.field}
                  value={data.ville}
                  onChange={handleChange}
                  name="ville"
                  label="Ville"
                >
                  <MenuItem value={"marakesh"}>marakesh</MenuItem>
                  <MenuItem value={"casa"}>casa</MenuItem>
                  <MenuItem value={"Tanger"}>Tanger</MenuItem>
                </SelectValidator>
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={6}>
                {/* <FormControl> */}
                <SelectValidator
                  className={classes.field}
                  value={data.agence}
                  onChange={handleChange}
                  name="agence"
                  label="Agence"
                >
                  <MenuItem value={"agence"}>liste agences</MenuItem>
                </SelectValidator>
                {/* </FormControl> */}
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <TextValidator
                    onChange={handleChange}
                    name="adresse"
                    className={classes.field}
                    value={data.adresse}
                    label="Adresse"
                  />
                </Grid>
                <Grid xs={6}>
                  <SelectValidator
                    className={classes.field}
                    value={data.status_compte}
                    onChange={handleChange}
                    name="status_compte"
                    label="Status du compte "
                  >
                    <MenuItem value={"ouvert"}>ouvert</MenuItem>
                    <MenuItem value={"bloqué"}>bloqué</MenuItem>
                  </SelectValidator>
                </Grid>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6"> Informations de banque</Typography>
          </div>
        </Toolbar>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={6}>
              <TextValidator
                onChange={handleChange}
                name="swift"
                className={classes.field}
                label="Swift"
                value={data.swift}
                validators={["required", "maxStringLength:11"]}
                errorMessages={["champ obligatoire", "maximum 11 char"]}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="type_compte"
                value={data.type_compte}
                label="Type de compte"
              >
                <MenuItem value="listetypecompote">List de types</MenuItem>
              </SelectValidator>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={6}>
              <TextValidator
                onChange={handleChange}
                name="IBAN"
                className={classes.field}
                label="IBAN"
                type="number"
                validators={[
                  "required",
                  "isNumber",
                  "isPositive",
                  "maxStringLength:34"
                ]}
                errorMessages={[
                  "champ obligatoire",
                  "Ce champ doit étre un nombre",
                  "Ce champ doit étre un nombre positive",
                  "maximum 34 char"
                ]}
                value={data.IBAN}
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                onChange={handleChange}
                name="cle_RIB"
                type="number"
                validators={[
                  "required",
                  "isNumber",
                  "isPositive",
                  "maxStringLength:16",
                  "minStringLength:16"
                ]}
                errorMessages={[
                  "champ obligatoire",
                  "Ce champ doit étre un nombre",
                  "Ce champ doit étre un nombre positive",
                  "maximum 16 nombre",
                  "minimum 16 nombre"
                ]}
                className={classes.field}
                label="Cle RIB"
                value={data.cle_RIB}
              />
            </Grid>
          </Grid>
        </Grid>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6"> Comptabilité</Typography>
          </div>
        </Toolbar>
      </Grid>
    </div>
  );
}
