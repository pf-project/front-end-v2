import React from "react";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function Commerciale({
  handleChange,
  data,
  onLeavingMarge,
  handleFixPrecisionValeurs,
  classes,
  handle_price_leaving,
  devise,
  poids,
  langueur,
  volume
}) {
  let unites_achat = [];
  let unites_vente = [];
  switch (data.type_unite_achat) {
    case "v":
      unites_achat = volume;

      break;
    case "p":
      unites_achat = poids;
      break;
    case "l":
      unites_achat = langueur;
      break;
  }

  if (!data.type_unite_vente) unites_vente = unites_achat;
  else
    switch (data.type_unite_vente) {
      case "v":
        unites_vente = volume;

        break;
      case "p":
        unites_vente = poids;
        break;
      case "l":
        unites_vente = langueur;
        break;
    }

  return (
    <>
      {/* <ValidatorForm autoComplete="off" onSubmit={handleSubmit}> */}
      <Grid item xs={12}>
        <FormGroup>
          <Grid container>
            <Grid item xs={10} md={4}>
              <TextValidator
                className={classes.field}
                InputProps={{
                  readOnly: true,
                  fullWidth: true
                }}
                onChange={handleChange}
                name="code"
                value={data.code}
                label="Code d'article *"
                id="#codearticle"
              />
            </Grid>
            <Grid item xs={10} md={4}>
              <TextValidator
                // fullWidth={true}
                className={classes.field}
                onChange={handleChange}
                name="designation"
                validators={["required", "maxStringLength:25"]}
                errorMessages={["Ce champ est obligatoire", "maximum 25 char"]}
                value={data.designation}
                label="Désignation *"
                id="#designation"
              />
            </Grid>

            <Grid item xs={10} md={4}>
              <TextValidator
                className={classes.field}
                value={data.categorie}
                onChange={handleChange}
                name="categorie"
                label="Catégorie d'article *"
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Informations d'achat</Typography>
        </div>
      </Toolbar>

      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={10} md={4}>
            <FormGroup>
              <TextValidator
                onChange={handleChange}
                className={classes.field}
                defaultValue={" "}
                type="number"
                step="0.01"
                name="prix_achat_HT"
                // onBlur={handleFixPrecisionValeurs(false)(false)}
                onBlur={handle_price_leaving({ achat: true, ht: true })}
                value={data.prix_achat_HT}
                label="Prix d'achat de base HT *"
                validators={[
                  "required",
                  "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                  "maxNumber:999999",
                  "isPositive"
                ]}
                errorMessages={[
                  "Ce champ est obligatoire",
                  "Chmap doit étre un nombre : ex 4.57 ",
                  "Maximum 6 nombres !",
                  "Ce champ doit étre un nombre positive"
                ]}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={10} md={4}>
            <FormGroup>
              <SelectValidator
                value={data.devise_achat}
                onChange={handleChange}
                className={classes.field}
                name="devise_achat"
                label="Devise *"
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
              >
                {devise &&
                  devise.length > 0 &&
                  devise.map(element => (
                    <MenuItem value={element.code}>
                      {element.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </FormGroup>
          </Grid>
          {/* <FormGroup> */}
          <Grid item xs={10} md={2}>
            <SelectValidator
              className={classes.field}
              value={data.type_unite_achat}
              onChange={handleChange}
              name="type_unite_achat"
              label="Type d'unité"
            >
              <MenuItem value={"v"}>Volume</MenuItem>
              <MenuItem value={"p"}>Poids</MenuItem>
              <MenuItem value={"l"}>Longueur</MenuItem>
            </SelectValidator>
          </Grid>
          <Grid item xs={10} md={2}>
            <SelectValidator
              className={classes.field}
              value={data.unite_achat}
              onChange={handleChange}
              name="unite_achat"
              label="Unité  d'achat *"
              // style={{ minWidth: 300 }}
              validators={["required"]}
              errorMessages={["Ce champ est obligatoire "]}
            >
              {unites_achat.length > 0 &&
                unites_achat.map(element => (
                  <MenuItem value={element.code}>
                    {element.designation}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
          {/* </FormGroup> */}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={10} md={4}>
            <FormGroup>
              <SelectValidator
                value={data.taux_tva_achat}
                className={classes.field}
                onChange={handleChange}
                name="taux_tva_achat"
                label="Taux de TVA *"
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
              >
                <MenuItem value={"0.20"}>20</MenuItem>
                <MenuItem value={"0.14"}>14</MenuItem>
                <MenuItem value={"0.10"}>10</MenuItem>
                <MenuItem value={"0.07"}>7</MenuItem>
                <MenuItem value={"0"}>Exonéré</MenuItem>
              </SelectValidator>
            </FormGroup>
          </Grid>
          <Grid item xs={10} md={4}>
            <TextValidator
              onChange={handleChange}
              className={classes.field}
              type="number"
              step="0.01"
              onBlur={handle_price_leaving({ achat: true, ht: false })}
              name="prix_achat_TTC"
              value={data.prix_achat_TTC}
              defaultValue={" "}
              label="Prix d'achat de base TTC *"
              validators={[
                "required",
                "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                "maxNumber:999999",
                "isPositive"
              ]}
              errorMessages={[
                "Ce champ est obligatoire",
                "Chmap doit étre un nombre : ex 4.57 ",
                "Maximum 6 nombres !",
                "Ce champ doit étre un nombre positive"
              ]}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={10} md={4} />
          <Grid item xs={10} md={4}>
            <FormGroup>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                onBlur={handleFixPrecisionValeurs(false)(3)}
                name="prix_moyen_pendere"
                value={data.prix_moyen_pendere}
                label="Prix moyen pondéré *"
                type="number"
                step="0.01"
                validators={[
                  "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                  "maxNumber:999999",
                  "isPositive"
                ]}
                errorMessages={[
                  "Chmap doit étre un nombre : ex 4.57 ",
                  "Maximum 6 nombres !",
                  "Ce champ doit étre un nombre positive"
                  // "deux  nombre(s) apres la virgule !"
                ]}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      {/* data.utilite === "MRCH" */}
      {data.utilite === "MRCH" && (
        <div>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Informations de vente</Typography>
            </div>
          </Toolbar>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={10} md={2}>
                <RadioGroup
                  name="marge"
                  className={classes.group}
                  value={data.marge}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Prix fix"
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Marge sur achat"
                  />
                </RadioGroup>
              </Grid>
              {data.marge && (
                <>
                  {" "}
                  <Grid item xs={10} md={2}>
                    {" "}
                    <TextValidator
                      onChange={handleChange}
                      className={classes.field}
                      defaultValue=" "
                      type="number"
                      step="0.01"
                      onBlur={onLeavingMarge({ montant: false })}
                      name="taux_marge"
                      value={data.taux_marge}
                      label="Marge  %*"
                      validators={[
                        "required",
                        "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                        "maxNumber:100",
                        "isPositive"
                      ]}
                      errorMessages={[
                        "Ce champ est obligatoire",
                        "Chmap doit étre un nombre : ex 4.57 ",
                        "Maximum 100%  !",
                        "Ce champ doit étre un nombre positive"
                      ]}
                    />
                  </Grid>
                  <Grid item xs={10} md={4}>
                    <TextValidator
                      onChange={handleChange}
                      className={classes.field}
                      defaultValue={" "}
                      onBlur={onLeavingMarge({ montant: true })}
                      name="montant_marge"
                      value={data.montant_marge}
                      label="Montant  de marge*"
                      type="number"
                      step="0.01"
                      validators={[
                        "required",
                        "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                        "maxNumber:999999",
                        "isPositive"
                      ]}
                      errorMessages={[
                        "Ce champ est obligatoire",
                        "Chmap doit étre un nombre : ex 4.57 ",
                        "Maximum 6  nombres  !",
                        "Ce champ doit étre un nombre positive"
                      ]}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={10} md={4}>
                <FormGroup>
                  <TextValidator
                    onChange={handleChange}
                    className={classes.field}
                    defaultValue={" "}
                    name="prix_vente_HT"
                    type="number"
                    step="0.01"
                    onBlur={handle_price_leaving({ achat: false, ht: true })}
                    value={data.prix_vente_HT}
                    label="Prix de vente de base HT *"
                    validators={[
                      "required",
                      "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                      "maxNumber:999999",
                      "isPositive"
                    ]}
                    errorMessages={[
                      "Ce champ est obligatoire",
                      "Chmap doit étre un nombre : ex 4.57 ",
                      "Maximum 6 nombres !",
                      "Ce champ doit étre un nombre positive"
                    ]}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={10} md={2}>
                <FormGroup>
                  <SelectValidator
                    value={data.devise_vente}
                    onChange={handleChange}
                    className={classes.field}
                    name="devise_vente"
                    label="Devise *"
                    validators={["required"]}
                    errorMessages={["Ce champ est obligatoire"]}
                  >
                    {devise &&
                      devise.length > 0 &&
                      devise.map(element => (
                        <MenuItem value={element.code}>
                          {element.designation}
                        </MenuItem>
                      ))}
                  </SelectValidator>
                </FormGroup>
              </Grid>
              <Grid item xs={10} md={2}>
                <SelectValidator
                  className={classes.field}
                  value={data.type_unite_vente}
                  onChange={handleChange}
                  name="type_unite_vente"
                  label="Type d'unité"
                >
                  <MenuItem value={"v"}>Volume</MenuItem>
                  <MenuItem value={"p"}>Poids</MenuItem>
                  <MenuItem value={"l"}>Longueur</MenuItem>
                </SelectValidator>
              </Grid>
              <Grid item xs={10} md={2}>
                <SelectValidator
                  className={classes.field}
                  value={data.unite_vente}
                  onChange={handleChange}
                  name="unite_vente"
                  label="Unité  de vente *"
                  // style={{ minWidth: 300 }}
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire "]}
                >
                  {unites_vente.length > 0 &&
                    unites_vente.map(element => (
                      <MenuItem value={element.code}>
                        {element.designation}
                      </MenuItem>
                    ))}
                </SelectValidator>
              </Grid>{" "}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={10} md={4}>
                <FormGroup>
                  <SelectValidator
                    value={data.taux_tva_vente}
                    className={classes.field}
                    onChange={handleChange}
                    defaultValue={" "}
                    name="taux_tva_vente"
                    label="Taux de TVA *"
                    validators={["required"]}
                    errorMessages={["Ce champ est obligatoire"]}
                  >
                    <MenuItem value={"0.20"}>20</MenuItem>
                    <MenuItem value={"0.14"}>14</MenuItem>
                    <MenuItem value={"0.10"}>10</MenuItem>
                    <MenuItem value={"0.07"}>7</MenuItem>
                    <MenuItem value={"0"}>Exonéré</MenuItem>
                  </SelectValidator>
                </FormGroup>
              </Grid>
              <Grid item xs={10} md={4}>
                <TextValidator
                  onChange={handleChange}
                  className={classes.field}
                  defaultValue=" "
                  type="number"
                  step="0.01"
                  onBlur={handle_price_leaving({ achat: false, ht: false })}
                  name="prix_vente_TTC"
                  value={data.prix_vente_TTC}
                  label="Prix de vente de base TTC *"
                  validators={[
                    "required",
                    "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                    "maxNumber:999999",
                    "isPositive"
                  ]}
                  errorMessages={[
                    "Ce champ est obligatoire",
                    "Chmap doit étre un nombre : ex 4.57 ",
                    "Maximum 6 nombres !",
                    "Ce champ doit étre un nombre positive"
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
