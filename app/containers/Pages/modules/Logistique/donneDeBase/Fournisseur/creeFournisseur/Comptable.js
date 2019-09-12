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
      {" "}
      <ValidatorForm id="addfourni" onSubmit={handleSubmit} autoComplete="off">
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
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">Information Comptables</Typography>
          </div>
        </Toolbar>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="mode_paiement"
                value={data.mode_paiement}
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
            <Grid item xs={3}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="condition_paiement"
                value={data.condition_paiement}
                label="condition de paiement"
              >
                <MenuItem value="Immédiat">Immédiat</MenuItem>
                <MenuItem value="apres_N_jours">Après N jours</MenuItem>
              </SelectValidator>
            </Grid>

            <Grid item xs={3}>
              {data.condition_paiement === "apres_N_jours" && (
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

            <Grid item xs={6}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="devise"
                value={data.devise}
                label="Devise"
              >
                <MenuItem value="List_Devise">List de divise</MenuItem>
              </SelectValidator>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row">
          <Grid item xs={3}>
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
              <Grid item xs={5}>
                <SelectValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="status_honoraire"
                  value={data.status_honoraire}
                  label="status honoraire"
                >
                  <MenuItem value="Administrateur judiciaire,">
                    Administrateur judiciaire,
                  </MenuItem>
                  <MenuItem value="Agent général d’assurance,">
                    Agent général d’assurance,
                  </MenuItem>
                  <MenuItem value="Architecte (à noter l’existence d’un ordre professionnel),">
                    Architecte (à noter l’existence d’un ordre professionnel),
                  </MenuItem>
                  <MenuItem value="Avocat (là encore, il y a un ordre professionnel),">
                    Avocat (là encore, il y a un ordre professionnel),
                  </MenuItem>
                  <MenuItem value="Avocat au conseil d’Etat et à la Cour de Cassation (officier public),">
                    Avocat au conseil d’Etat et à la Cour de Cassation (officier
                    public),
                  </MenuItem>
                  <MenuItem value="Avoué auprès des cours d’appel (officier public / ministériel),">
                    Avoué auprès des cours d’appel (officier public /
                    ministériel),
                  </MenuItem>
                  <MenuItem value="Chiropracteur,">Chiropracteur,</MenuItem>
                  <MenuItem value="Chirurgien-dentiste (à noter l’existence d’un ordre professionnel),">
                    Chirurgien-dentiste (à noter l’existence d’un ordre
                    professionnel),
                  </MenuItem>
                  <MenuItem value="Commissaire aux comptes,">
                    Commissaire aux comptes,
                  </MenuItem>
                  <MenuItem value="Commissaire-priseur (officier public),">
                    Commissaire-priseur (officier public),
                  </MenuItem>
                  <MenuItem value="Conseiller en investissements financiers,">
                    Conseiller en investissements financiers,
                  </MenuItem>
                  <MenuItem value="Conseiller en propriété industrielle,">
                    Conseiller en propriété industrielle,
                  </MenuItem>
                  <MenuItem value="Diététicien (selon le code de la santé),">
                    Diététicien (selon le code de la santé),
                  </MenuItem>
                  <MenuItem value="Ergothérapeute (selon le code de la santé),">
                    Ergothérapeute (selon le code de la santé),
                  </MenuItem>
                  <MenuItem value="Expert agricole ou foncier,">
                    Expert agricole ou foncier,
                  </MenuItem>
                  <MenuItem value="Expert-comptable (ordre professionnel),">
                    Expert-comptable (ordre professionnel),
                  </MenuItem>
                  <MenuItem value="Expert forestier,">
                    Expert forestier,
                  </MenuItem>
                  <MenuItem value="Expert géomètre (ordre professionnel),">
                    Expert géomètre (ordre professionnel),
                  </MenuItem>
                  <MenuItem value="Greffier auprès des tribunaux de commerce (officier ministériel),">
                    Greffier auprès des tribunaux de commerce (officier
                    ministériel),
                  </MenuItem>
                  <MenuItem value="Huissier de justice (officier ministériel),">
                    Huissier de justice (officier ministériel),
                  </MenuItem>
                  <MenuItem value="Infirmier libéral (selon le code de la santé),">
                    Infirmier libéral (selon le code de la santé),
                  </MenuItem>
                  <MenuItem value="Directeur de laboratoire d’analyses médicales (selon le code de la santé),">
                    Directeur de laboratoire d’analyses médicales (selon le code
                    de la santé),
                  </MenuItem>
                  <MenuItem value="Mandataire judiciaire,">
                    Mandataire judiciaire,
                  </MenuItem>
                  <MenuItem value="Masseur-kinésithérapeute (selon le code de la santé ; existence d’un ordre professionnel),">
                    Masseur-kinésithérapeute (selon le code de la santé ;
                    existence d’un ordre professionnel),
                  </MenuItem>
                  <MenuItem value="Médecin (ordre professionnel),">
                    Médecin (ordre professionnel),
                  </MenuItem>
                  <MenuItem value="Notaire (officier ministériel),">
                    Notaire (officier ministériel),
                  </MenuItem>
                  <MenuItem value="Orthophoniste (selon le code de la santé),">
                    Orthophoniste (selon le code de la santé),
                  </MenuItem>
                  <MenuItem value="Orthoptiste (selon le code de la santé),">
                    Orthoptiste (selon le code de la santé),
                  </MenuItem>
                  <MenuItem value="Ostéopathe,">Ostéopathe,</MenuItem>
                  <MenuItem value="Pédicure-podologue (selon le code de la santé),">
                    Pédicure-podologue (selon le code de la santé),
                  </MenuItem>
                  <MenuItem value="Psychologue,">Psychologue,</MenuItem>
                  <MenuItem value="Psychomotricien (selon le code de la santé),">
                    Psychomotricien (selon le code de la santé),
                  </MenuItem>
                  <MenuItem value="Psychothérapeute,">
                    Psychothérapeute,
                  </MenuItem>
                  <MenuItem value="Sage-femme,">Sage-femme,</MenuItem>
                  <MenuItem value="Vétérinaire (ordre professionnel).">
                    Vétérinaire (ordre professionnel).
                  </MenuItem>
                  <MenuItem value="Autres ....">Autres ....</MenuItem>
                </SelectValidator>
              </Grid>
              <Grid item xs={4}>
                <TextValidator
                  onChange={handleChange}
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
              <Grid item xs={3}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
