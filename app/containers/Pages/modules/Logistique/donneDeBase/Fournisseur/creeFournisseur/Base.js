import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FormGroup } from "@material-ui/core/";
import { SimpleTable } from "enl-components";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterNone from "@material-ui/icons/FilterNone";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

export default function Base({
  handleChange,
  data,
  classes,
  addContact,
  removeContact,
  handleSubmit,
  pays,
  villes,
  langues
}) {
  const initialState = {
    nom: "",
    fonction: "",
    email: "",
    tel: ""
  };
  const [contacts, setContacts] = useState(initialState);
  const [clearContactsFileds, setClearContactsFileds] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const addCopyContact = idx => {
    setContacts({ ...data.contacts[idx] });
  };

  const handleDelete = () => {
    removeContact(selectedRows);
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

  const addItem = () => {
    addContact(contacts);
    if (clearContactsFileds) {
      setContacts(initialState);
    }
  };
  const handleContactsChange = e => {
    setContacts({
      ...contacts,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Grid container spacing={1} className={classes.grid} direction="column">
        <ValidatorForm
          id="addfourni"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {/* <ValidatorForm onSubmit={handleSubmitStockage} autoComplete="off"> */}
          <Grid item xs={12}>
            <FormGroup>
              <Grid container>
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Information Fournisseur</Typography>
            </div>
          </Toolbar>
          <Grid xs={12}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="raised"
                component="span"
                className={classes.button}
              >
                Upload
              </Button>
            </label>{" "}
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <Grid container direction="row">
                <Grid item md={6} xs={12}>
                  {/* <FormControl> */}
                  <SelectValidator
                    className={classes.field}
                    value={data.group}
                    onChange={handleChange}
                    name="group"
                    label="Group frounisseur"
                    validators={["required"]}
                    errorMessages={["Ce champ est obligatoire"]}
                  >
                    <MenuItem value={"list"}>list</MenuItem>
                  </SelectValidator>
                  {/* </FormControl> */}
                </Grid>
                <Grid item md={6} xs={12} direction="column">
                  <SelectValidator
                    className={classes.field}
                    value={data.pays}
                    onChange={handleChange}
                    name="pays"
                    label="Pays"
                  >
                    {pays &&
                      pays.length > 0 &&
                      pays.map(element => (
                        <MenuItem value={element.code}>
                          {element.designation}
                        </MenuItem>
                      ))}
                  </SelectValidator>
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <SelectValidator
                    className={classes.field}
                    value={data.civilite}
                    onChange={handleChange}
                    name="civilite"
                    label="Titre de civilité"
                    // style={{ width: 190 }}
                    validators={["required"]}
                    errorMessages={["Ce champ est obligatoire"]}
                  >
                    <MenuItem value={"Entreprise"}>Entreprise</MenuItem>
                    <MenuItem value={"Madame"}>Madame</MenuItem>
                    <MenuItem value={"Monsieur"}>Monsieur</MenuItem>
                    <MenuItem value={"Madame et Monsieur"}>
                      Madame et Monsieur
                    </MenuItem>
                  </SelectValidator>
                </Grid>
                <Grid item md={6} xs={12}>
                  {/* <FormControl> */}
                  <SelectValidator
                    className={classes.field}
                    value={data.ville}
                    onChange={handleChange}
                    name="ville"
                    label="Ville"
                  >
                    {villes &&
                      villes.length > 0 &&
                      villes.map(element => {
                        if (element.pays === data.pays) {
                          return (
                            <MenuItem value={element.code}>
                              {element.designation}
                            </MenuItem>
                          );
                        }
                      })}
                  </SelectValidator>
                  {/* </FormControl> */}
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <Grid container direction="row">
                <Grid item md={6} xs={12}>
                  <SelectValidator
                    className={classes.field}
                    value={data.langue}
                    onChange={handleChange}
                    name="langue"
                    label="Langue"
                  >
                    {langues &&
                      langues.length > 0 &&
                      langues.map(element => (
                        <MenuItem value={element.code}>
                          {element.designation}
                        </MenuItem>
                      ))}
                  </SelectValidator>
                </Grid>
                <Grid item md={6} xs={12} direction="column">
                  <TextValidator
                    onChange={handleChange}
                    name="code_postal"
                    className={classes.field}
                    validators={[
                      "isNumber",
                      "isPositive",
                      "maxNumber:999999999"
                    ]}
                    errorMessages={[
                      "Ce champ doit étre un nombre",
                      "Ce champ doit étre un nombre positive",
                      "maximum 10 nombres "
                    ]}
                    value={data.code_postal}
                    label="Code postal"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row">
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      onChange={handleChange}
                      name="libelle_additionnel"
                      className={classes.field}
                      label="Libellé  additionnel"
                      value={data.libelle_additionnel}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} direction="column">
                    <TextValidator
                      onChange={handleChange}
                      name="adresse"
                      className={classes.field}
                      value={data.adresse}
                      label="Adresse"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
        </ValidatorForm>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">Contact</Typography>
          </div>
        </Toolbar>

        <ValidatorForm id="addContact" onSubmit={addItem} autoComplete="off">
          <Grid
            container
            spacing={1}
            className={classes.grid}
            direction="column"
          >
            <Grid item xs={12}>
              <Grid container direction="row">
                <Grid item md={6} xs={12}>
                  <TextValidator
                    onChange={handleContactsChange}
                    name="nom"
                    className={classes.field}
                    label="Nom"
                    value={contacts.nom}
                    validators={["required", "maxStringLength:40"]}
                    errorMessages={["champ obligatoire", "maximum 40 char"]}
                  />
                </Grid>
                <Grid item md={6} xs={12} direction="column">
                  <TextValidator
                    onChange={handleContactsChange}
                    name="email"
                    className={classes.field}
                    validators={["required", "maxStringLength:40", "isEmail"]}
                    errorMessages={[
                      "champ obligatoire",
                      "maximum 40 char",
                      "email invalide "
                    ]}
                    value={contacts.email}
                    label="Email"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row">
                <Grid item md={6} xs={12}>
                  <TextValidator
                    onChange={handleContactsChange}
                    name="fonction"
                    className={classes.field}
                    label="Fonction"
                    value={contacts.fonction}
                  />
                </Grid>
                <Grid item md={6} xs={12} direction="column">
                  <TextValidator
                    onChange={handleContactsChange}
                    name="tel"
                    className={classes.field}
                    validators={[
                      "required",
                      "maxStringLength:30",
                      "matchRegexp:\\+[0-9]"
                    ]}
                    errorMessages={[
                      "champ obligatoire",
                      "maximum 30 char",
                      "tel invalide ex : +212123456678"
                    ]}
                    value={contacts.tel}
                    label="Téléphone"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
      <Grid container spacing={1} className={classes.grid} direction="column">
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={3} md={1}>
              <Tooltip title="Ajouter">
                <IconButton
                  type="submit"
                  form="addContact"
                  variant="contained"
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={3} md={1}>
              <Tooltip title="Supprimer">
                <IconButton
                  variant="contained"
                  color="primary"
                  disabled={selectedRows.length == 0}
                  onClick={handleDelete}
                  className={classes.cancel}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={3} md={1}>
              <Tooltip title="Créer une copie">
                <IconButton
                  variant="contained"
                  className={classes.copy}
                  color="primary"
                  disabled={!(selectedRows.length === 1)}
                  onClick={() => addCopyContact(selectedRows[0])}
                >
                  <FilterNone />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!clearContactsFileds}
                    onChange={() =>
                      setClearContactsFileds(!clearContactsFileds)
                    }
                    color="primary"
                  />
                }
                label="Ajouter un autre"
              />{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <SimpleTable
        data={data.contacts}
        selectedRows={selectedRows}
        handleSelect={handleSelect}
      />
    </div>
  );
}
