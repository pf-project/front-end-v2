import React from "react";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";

export default function Commerciale({
  handleChange,
  state,
  handleSubmitCommerciale,
  handleFixPrecisionValeurs,
  classes,
  loading
}) {
  const { designations } = state;
  // const [loading, setLoading] = React.useState(false);
  // const handleClickVariant = SnackBar({
  //   message: "L'article a été créer avec succes",
  //   variant: "success"
  // });

  const handleSubmit = () => {
    // setLoading(true);
    handleSubmitCommerciale();
    // handleClickVariant("success");
  };
  return (
    <Grid container spacing={1} className={classes.grid} direction="column">
      {/* <ValidatorForm autoComplete="off" onSubmit={handleSubmit}> */}
      <Grid item xs={12}>
        <FormGroup>
          <Grid container>
            <Grid item xs={4}>
              <TextValidator
                className={classes.field}
                InputProps={{
                  readOnly: true,
                  fullWidth: true
                }}
                onChange={handleChange}
                name="code"
                value={state.data.code}
                label="Code d'article *"
                id="#codearticle"
              />
            </Grid>
            <Grid item xs={4}>
              <TextValidator
                // fullWidth={true}
                className={classes.field}
                onChange={handleChange}
                name="designation"
                validators={["required", "maxStringLength:25"]}
                errorMessages={["Ce champ est obligatoire", "maximum 25 char"]}
                value={state.data.designation}
                label="Désignation *"
                id="#designation"
              />
            </Grid>

            <Grid item xs={4}>
              <TextValidator
                className={classes.field}
                value={state.data.categorie}
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
          <Grid item xs={6}>
            <FormGroup>
              <TextValidator
                onChange={handleChange}
                className={classes.field}
                defaultValue={" "}
                type="number"
                step="0.01"
                name="prix_chat_HT"
                onBlur={handleFixPrecisionValeurs(false)(false)}
                value={state.data.prix_chat_HT}
                label="Prix d'achat de base HT *"
                validators={[
                  "required",
                  "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                  "maxNumber:999999"
                ]}
                errorMessages={[
                  "Ce champ est obligatoire",
                  "Chmap doit étre un nombre : ex 4.57 ",
                  "Maximum 6 nombres !"
                ]}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={2}>
            <FormGroup>
              <SelectValidator
                value={state.data.devise_achat}
                onChange={handleChange}
                className={classes.field}
                name="devise_achat"
                label="Devise *"
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
              >
                <MenuItem value={"MAD"}>MAD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </SelectValidator>
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <SelectValidator
                className={classes.field}
                value={state.data.unite_achat}
                onChange={handleChange}
                name="unite_achat"
                label="Unité  d'achat *"
                // style={{ minWidth: 300 }}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire "]}
              >
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"25"}>25</MenuItem>
                <MenuItem value={"50"}>50</MenuItem>
                <MenuItem value={"100"}>100</MenuItem>
              </SelectValidator>
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <FormGroup>
              <SelectValidator
                value={state.data.taux_tva_achat}
                className={classes.field}
                onChange={handleChange}
                name="taux_tva_achat"
                label="Taux de TVA *"
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
              >
                <MenuItem value={"20"}>20</MenuItem>
                <MenuItem value={"14"}>14</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"7"}>7</MenuItem>
                <MenuItem value={"Exonérer"}>Exonérer</MenuItem>
              </SelectValidator>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <TextValidator
              onChange={handleChange}
              className={classes.field}
              type="number"
              step="0.01"
              onBlur={handleFixPrecisionValeurs(false)(false)}
              name="prix_achat_TTC"
              value={state.data.prix_achat_TTC}
              defaultValue={" "}
              label="Prix d'achat de base TTC *"
              validators={[
                "required",
                "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                "maxNumber:999999"
              ]}
              errorMessages={[
                "Ce champ est obligatoire",
                "Chmap doit étre un nombre : ex 4.57 ",
                "Maximum 6 nombres !"
              ]}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={4} />
          <Grid item xs={4}>
            <FormGroup>
              <TextValidator
                className={classes.field}
                onChange={handleChange}
                onBlur={handleFixPrecisionValeurs(false)(false)}
                name="prix_moyen_pendere"
                value={state.data.prix_moyen_pendere}
                label="Prix moyen pondéré *"
                type="number"
                step="0.01"
                validators={[
                  "required",
                  "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                  "maxNumber:999999"
                ]}
                errorMessages={[
                  "Ce champ est obligatoire",
                  "Chmap doit étre un nombre : ex 4.57 ",
                  "Maximum 6 nombres !"
                  // "deux  nombre(s) apres la virgule !"
                ]}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="row" />
      </Grid>
      {/* state.data.utilite === "MRCH-Achat-pour-vente" */}
      {true && (
        <div>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="h6">Informations de vente</Typography>
            </div>
          </Toolbar>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={2}>
                <RadioGroup
                  name="marge"
                  className={classes.group}
                  value={state.data.marge}
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
              {state.data.marge && (
                <>
                  {" "}
                  <Grid item xs={2}>
                    {" "}
                    <TextValidator
                      onChange={handleChange}
                      className={classes.field}
                      type="number"
                      step="0.01"
                      // onBlur={handleFixPrecisionValeurs(false)(false)}
                      name="taux_marge"
                      value={state.data.taux_marge}
                      label="Marge  %*"
                      validators={[
                        "required",
                        "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                        "maxNumber:100"
                      ]}
                      errorMessages={[
                        "Ce champ est obligatoire",
                        "Chmap doit étre un nombre : ex 4.57 ",
                        "Maximum 100%  !"
                      ]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextValidator
                      onChange={handleChange}
                      className={classes.field}
                      defaultValue={" "}
                      onBlur={handleFixPrecisionValeurs(false)(false)}
                      name="montant_marge"
                      value={state.data.montant_marge}
                      label="Montant  de marge*"
                      type="number"
                      step="0.01"
                      validators={[
                        "required",
                        "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                        "maxNumber:999999"
                      ]}
                      errorMessages={[
                        "Ce champ est obligatoire",
                        "Chmap doit étre un nombre : ex 4.57 ",
                        "Maximum 6  nombres  !"
                      ]}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <FormGroup>
                  <TextValidator
                    onChange={handleChange}
                    className={classes.field}
                    defaultValue={" "}
                    name="prix_vente_HT"
                    type="number"
                    step="0.01"
                    onBlur={handleFixPrecisionValeurs(false)(false)}
                    value={state.data.prix_vente_HT}
                    label="Prix de vente de base HT *"
                    validators={[
                      "required",
                      "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                      "maxNumber:999999"
                    ]}
                    errorMessages={[
                      "Ce champ est obligatoire",
                      "Chmap doit étre un nombre : ex 4.57 ",
                      "Maximum 6 nombres !"
                    ]}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={2}>
                <FormGroup>
                  <SelectValidator
                    value={state.data.devise_vente}
                    onChange={handleChange}
                    className={classes.field}
                    name="devise_vente"
                    label="Devise *"
                    validators={["required"]}
                    errorMessages={["Ce champ est obligatoire"]}
                  >
                    <MenuItem value={"MAD"}>MAD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                  </SelectValidator>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <FormGroup>
                  <SelectValidator
                    value={state.data.unite_de_vente}
                    onChange={handleChange}
                    className={classes.field}
                    name="unite_de_vente"
                    label="Unité de vente *"
                    validators={[
                      "required",
                      "isNumber",
                      "isPositive",
                      "maxNumber:999999"
                    ]}
                    errorMessages={[
                      "Ce champ est obligatoire",
                      "Ce champ doit étre un nombre",
                      "Ce champ doit étre un nombre positive",
                      "maximum 6 taille du nombre"
                    ]}
                  >
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"25"}>25</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                    <MenuItem value={"100"}>100</MenuItem>
                  </SelectValidator>
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <FormGroup>
                  <SelectValidator
                    value={state.data.taux_tva_vente}
                    className={classes.field}
                    onChange={handleChange}
                    defaultValue={" "}
                    name="taux_tva_vente"
                    label="Taux de TVA *"
                    validators={["required"]}
                    errorMessages={["Ce champ est obligatoire"]}
                  >
                    <MenuItem value={"20"}>20</MenuItem>
                    <MenuItem value={"14"}>14</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"Exonérer"}>Exonérer</MenuItem>
                  </SelectValidator>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  onChange={handleChange}
                  className={classes.field}
                  defaultValue=" "
                  type="number"
                  step="0.01"
                  onBlur={handleFixPrecisionValeurs(false)(false)}
                  name="prix_vente_TTC"
                  value={state.data.prix_vente_TTC}
                  label="Prix de vente de base TTC *"
                  validators={[
                    "required",
                    "isFloat" /*, "matchRegexp:^[0-9]*.[0-9]{2}$"*/,
                    "maxNumber:999999"
                  ]}
                  errorMessages={[
                    "Ce champ est obligatoire",
                    "Chmap doit étre un nombre : ex 4.57 ",
                    "Maximum 6 nombres !"
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </Grid>
  );
}
