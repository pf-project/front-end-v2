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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";

class Base extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleChange,
      data,
      classes,
      handleBlur,
      handleChangeWithIntitialValue,
      lesclasses
    } = this.props;

    return (
      <Grid container spacing={1} className={classes.grid} direction="column">
        {/* <ValidatorForm onSubmit={handleSubmitBase} autoComplete="off"> */}
        <Grid item xs={12}>
          <FormGroup>
            <Grid container>
              <Grid item xs={5}>
                <TextValidator
                  className={classes.field}
                  InputProps={{
                    readOnly: true,
                    fullWidth: true
                  }}
                  onChange={handleChange}
                  name="compte"
                  value={data.compte}
                  label="Code général "
                  id="#compte"
                />
              </Grid>
              <Grid item xs={5}>
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
            <Typography variant="h6">Information Compte général</Typography>
          </div>
        </Toolbar>
        <Grid item>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={6}>
                <SelectValidator
                  className={classes.field}
                  InputProps={{
                    // readOnly: true,
                    fullWidth: true
                  }}
                  // onChange={handleChange}
                  name="classe"
                  value={data.classe}
                  validators={["required"]}
                  errorMessages={["Ce champ est obligatoire"]}
                  label="Pays "
                  id="#pays"
                >
                  {lesclasses &&
                    lesclasses.map(compte => (
                      <MenuItem value={compte.compte}>
                        {compte.compte + "." + compte.designation}
                      </MenuItem>
                    ))}
                </SelectValidator>
              </Grid>
              <Grid item xs={6} direction="column">
                <TextValidator
                  className={classes.field}
                  readOnly={true}
                  value={data.comptepere}
                  label="Compte père "
                  id="#comptepere"
                />
              </Grid>
            </Grid>

            <Grid container direction="row">
              <Grid item xs={6} />
              <Grid item xs={6} direction="column">
                <TextValidator
                  className={classes.field}
                  name="compteancien"
                  onChange={handleChange}
                  value={data.compteancien}
                  label="Compte ancien "
                  id="#compteancien"
                />
              </Grid>
            </Grid>

            <Grid container direction="row">
              <Grid item xs={6}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Type de compte</FormLabel>
                  <RadioGroup
                    aria-label="statu"
                    name="typecompte"
                    value={data.typecompte}
                  >
                    <FormControlLabel
                      value="Compte de bilan"
                      control={<Radio />}
                      label="Compte de bilan"
                    />
                    <FormControlLabel
                      value="Compte de résultat"
                      control={<Radio />}
                      label="Compte de résultat"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
    );
  }
}

export default Base;
