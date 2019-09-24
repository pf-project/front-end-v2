import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FormGroup } from "@material-ui/core/";
import { SimpleTable } from "enl-components";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterNone from "@material-ui/icons/FilterNone";

export default function Bancaire({
  handleChange,
  data,
  classes,
  addCoordonneBancaire,
  removeCoordonne,
  handleSubmit
}) {
  const initialState = {
    pays: "",
    banque: "",
    cle_RIB: "",
    type_compte: "",
    titulaire: "",
    ville_agence: "",
    nom_agence: "",
    IBAN: "",
    devise: ""
  };
  const [coordonnes, setCoordonnes] = useState(initialState);
  const [clearCoordonnesFileds, setClearCoordonnesFileds] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const addCopyCoordonne = idx => {
    setCoordonnes({ ...data.coord_bancaire[idx], IBAN: "" });
    setSelectedRows([]);
  };

  const handleDelete = () => {
    removeCoordonne(selectedRows);
    setSelectedRows([]);
  };

  const handleSelect = index => () => {
    if (selectedRows.includes(index)) {
      let newSelectedRows = [...selectedRows];
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const addCoordonne = () => {
    addCoordonneBancaire(coordonnes);
    if (clearCoordonnesFileds) {
      setCoordonnes({
        ...coordonnes,
        cle_RIB: "",
        ville_agence: "",
        nom_agence: "",
        IBAN: ""
      });
    } else setCoordonnes(initialState);
  };
  const handleCoordonnesChange = e => {
    setCoordonnes({
      ...coordonnes,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div>
      <Grid container spacing={1} className={classes.grid} direction="column">
        {/* <ValidatorForm onSubmit={handleSubmitStockage} autoComplete="off"> */}
        <ValidatorForm
          id="addfourni"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
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
                    label="Code fournisseur *"
                  />
                </Grid>
                <Grid item xs={6}>
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
              </Grid>
            </FormGroup>
          </Grid>
        </ValidatorForm>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">Ajout d'un compte bancaire</Typography>
          </div>
        </Toolbar>
        <ValidatorForm
          id="addCoordonne"
          onSubmit={addCoordonne}
          autoComplete="off"
          instantValidate={false}
        >
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6} direction="column">
                <TextValidator
                  onChange={handleCoordonnesChange}
                  name="titulaire"
                  className={classes.field}
                  value={coordonnes.titulaire}
                  label="Titulaire"
                />
              </Grid>
              <Grid item xs={6} direction="column">
                <SelectValidator
                  className={classes.field}
                  value={coordonnes.pays}
                  onChange={handleCoordonnesChange}
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
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <TextValidator
                  onChange={handleCoordonnesChange}
                  name="banque"
                  className={classes.field}
                  label="Banque"
                  value={coordonnes.banque}
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  onChange={handleCoordonnesChange}
                  name="type_compte"
                  className={classes.field}
                  label="Type de compte"
                  value={coordonnes.type_compte}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={4}>
                <SelectValidator
                  className={classes.field}
                  value={coordonnes.ville_agence}
                  onChange={handleCoordonnesChange}
                  name="ville_agence"
                  label="Ville d'agence"
                >
                  <MenuItem value={"marakesh"}>marakesh</MenuItem>
                  <MenuItem value={"casa"}>casa</MenuItem>
                  <MenuItem value={"Tanger"}>Tanger</MenuItem>
                </SelectValidator>
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  onChange={handleCoordonnesChange}
                  name="nom_agence"
                  className={classes.field}
                  label="Nom d'agence"
                  value={coordonnes.nom_agence}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectValidator
                  className={classes.field}
                  onChange={handleCoordonnesChange}
                  name="devise"
                  value={coordonnes.devise}
                  label="Devise"
                >
                  <MenuItem value="List_Devise">List de divise</MenuItem>
                </SelectValidator>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <TextValidator
                  onChange={handleCoordonnesChange}
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
                  value={coordonnes.IBAN}
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  onChange={handleCoordonnesChange}
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
                  value={coordonnes.cle_RIB}
                />
              </Grid>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
      <Grid container spacing={1} className={classes.grid} direction="column">
        <Grid item xs={12} className={classes.grid}>
          <Grid container direction="row">
            <Grid item xs={3} md={1}>
              <Tooltip title="Ajouter">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  form="addCoordonne"
                >
                  <AddIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={3} md={1}>
              <Tooltip title="Supprimer">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={selectedRows.length == 0}
                  onClick={handleDelete}
                  className={classes.cancel}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={3} md={1}>
              <Tooltip title="Créer une copie">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.copy}
                  disabled={!(selectedRows.length === 1)}
                  onClick={() => addCopyCoordonne(selectedRows[0])}
                >
                  <FilterNone />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={clearCoordonnesFileds}
                    onChange={() =>
                      setClearCoordonnesFileds(!clearCoordonnesFileds)
                    }
                    color="primary"
                  />
                }
                label="Ajouter un autre"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Cordonnées bancaires</Typography>
        </div>
      </Toolbar>
      <Grid item xs={12}>
        <SimpleTable
          selectedRows={selectedRows}
          handleSelect={handleSelect}
          data={data.coord_bancaire}
        />
      </Grid>
    </div>
  );
}
