import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import InputSelect from "./InputSelect";
import FormGroup from "@material-ui/core/FormGroup";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import Grid from "@material-ui/core/Grid";

const Base = ({
  handleChange,
  data,
  classes,
  handleBlur,
  handleChangeWithIntitialValue,
  devises,
  pays
}) => {
  return (
    <Grid container spacing={1} className={classes.grid} direction="column">
      {/* <ValidatorForm onSubmit={handleSubmitBase} autoComplete="off"> */}
      <Grid item xs={12}>
        <FormGroup>
          <Grid container>
            <Grid item xs={12} md={5}>
              <TextValidator
                className={classes.field}
                InputProps={{
                  readOnly: true,
                  fullWidth: true
                }}
                onChange={handleChange}
                name="code"
                value={data.code}
                label="Code de caisse  *"
                id="#codearticle"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextValidator
                // fullWidth={true}
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
          <Typography variant="h6">Information Caisse</Typography>
        </div>
      </Toolbar>
      <Grid item>
        <FormGroup>
          <Grid container direction="row">
            <Grid item xs={6} md={5}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="pays"
                value={data.pays}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                label="Pays "
                id="#pays"
              >
                {pays &&
                  pays.map(pay => (
                    <MenuItem value={pay.designation}>
                      {pay.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Grid>
            <Grid item xs={6} md={5} direction="column">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Statu</FormLabel>
                <RadioGroup
                  aria-label="statu"
                  name="statu"
                  value={data.statu}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Ouvert"
                    control={<Radio />}
                    label="Ouvert"
                  />
                  <FormControlLabel
                    value="Bloqué"
                    control={<Radio />}
                    label="Bloqué"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={12} md={5}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="devise"
                value={data.devise}
                validators={["required"]}
                errorMessages={["Ce champ est obligatoire"]}
                label="Devise "
                id="#pays"
              >
                {devises &&
                  devises.map(devise => (
                    <MenuItem value={devise.code}>
                      {devise.designation}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={12} md={5}>
              <TextValidator
                className={classes.field}
                onBlur={handleBlur}
                onChange={handleChange}
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
                id="#compte"
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={12} md={5}>
              <SelectValidator
                className={classes.field}
                onChange={handleChange}
                name="codeJournal"
                value={data.codeJournal}
                label="Code de journal : "
                id="#pays"
              >
                <MenuItem value={"code 1"}>code 1</MenuItem>
              </SelectValidator>
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Base;
