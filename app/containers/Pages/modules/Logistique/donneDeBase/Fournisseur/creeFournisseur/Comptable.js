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
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function Comptable({
  data,
  handleChange,
  classes,
  loading,
  handleSubmit,
  devises,
  honoraires
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
      {" "}
      <ValidatorForm id="addfourni" onSubmit={handleSubmit} autoComplete="off">
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
            <Typography variant="h6">Information Comptables</Typography>
          </div>
        </Toolbar>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item md={6} xs={12}>
              <TextValidator
                onChange={handleChange}
                className={classes.field}
                name="compte"
                InputProps={{
                  readOnly: true
                }}
                value={data.compte}
                label="Compte  fournisseur "
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="mode_paiement"
                value={data.mode_paiement}
                InputProps={{ fullWidth: true }}
                label="Mode de paiement"
              >
                <MenuItem value="chèque">Chèque</MenuItem>
                <MenuItem value="carte_bancaire">Carte bancaire</MenuItem>
                <MenuItem value="espece">Espèce</MenuItem>
                <MenuItem value="virement">virement</MenuItem>
              </SelectValidator>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item md={3} xs={5}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="condition_paiement"
                value={data.condition_paiement}
                label="condition de paiement"
              >
                <MenuItem value="Immédiat">Immédiat</MenuItem>
                <MenuItem value="Après N jours">Après N jours</MenuItem>
              </SelectValidator>
            </Grid>

            <Grid item md={3} xs={5}>
              {data.condition_paiement === "Après N jours" && (
                <TextValidator
                  onChange={handleChange}
                  name="nombre_jours"
                  className={classes.field}
                  validators={["required"]}
                  errorMessages={[]}
                  validators={["required", "isNumber", "isPositive"]}
                  errorMessages={[
                    "champ obligatoire",
                    "Ce champ doit étre un nombre",
                    "Ce champ doit étre un nombre positive"
                  ]}
                  value={data.nombre_jours}
                  label="Nombre de jours "
                />
              )}
            </Grid>

            <Grid item md={6} xs={12}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="devise"
                value={data.devise}
                label="Devise"
              >
                {devises &&
                  devises.length > 0 &&
                  devises.map(element => (
                    <MenuItem value={element.code}>
                      {element.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item md={3} xs={5}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.honoraire}
                  name="honoraire"
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Honoraire"
            />
          </Grid>
          {data.honoraire && (
            <>
              <Grid item md={5} xs={12}>
                <SelectValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="status_honoraire"
                  value={data.status_honoraire}
                  label="status honoraire"
                >
                  {honoraires &&
                    honoraires.length > 0 &&
                    honoraires.map(element => (
                      <MenuItem value={element.code}>
                        {element.designation}
                      </MenuItem>
                    ))}
                </SelectValidator>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextValidator
                  // onChange={handleChange}
                  InputProps={{ readOnly: true }}
                  name="taux_tva"
                  className={classes.field}
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  value={data.taux_tva}
                  label="Taux de tva   "
                />
              </Grid>
            </>
          )}
        </Grid>

        {data.pays === "Maroc" && (
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item md={3} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={data.retenu_a_la_source}
                      name="retenu_a_la_source"
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Retenu à la source "
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">Information Fiscales</Typography>
          </div>
        </Toolbar>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item md={6} xs={12}>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                name="regestre_commerce"
                value={data.regestre_commerce}
                label="Registre de commerce"
                type="number"
                validators={["isNumber", "isPositive", "maxStringLength:16"]}
                errorMessages={[
                  "Ce champ doit étre un nombre",
                  "Ce champ doit étre un nombre positive",
                  "Maximum 16 nombres !"
                ]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                name="cnss"
                value={data.cnss}
                label="C.N.S.S"
                type="number"
                type="number"
                validators={["isNumber", "isPositive", "maxStringLength:16"]}
                errorMessages={[
                  "Ce champ doit étre un nombre",
                  "Ce champ doit étre un nombre positive",
                  "Maximum 16 nombres !"
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item md={6} xs={12}>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                name="patente"
                value={data.patente}
                label="Patente"
                type="number"
                validators={["isNumber", "isPositive", "maxStringLength:12"]}
                errorMessages={[
                  "Ce champ doit étre un nombre",
                  "Ce champ doit étre un nombre positive",
                  "Maximum 12 nombres !"
                ]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                name="ice"
                value={data.ice}
                label="I.C.E"
                type="number"
                validators={["isNumber", "isPositive", "maxStringLength:12"]}
                errorMessages={[
                  "Ce champ doit étre un nombre",
                  "Ce champ doit étre un nombre positive",
                  "Maximum 12 nombres !"
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item md={6} xs={12}>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                name="identifiant_fiscale"
                value={data.identifiant_fiscale}
                label="Identifiant Fiscale"
                validators={["maxStringLength:18"]}
                errorMessages={["Maximum 18 nombres !"]}
              />
            </Grid>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Grid>
  );
}
