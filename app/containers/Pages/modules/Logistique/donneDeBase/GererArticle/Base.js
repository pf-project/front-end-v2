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
import FormControl from "@material-ui/core/FormControl";
import InputSelect from "./InputSelect";
import FormGroup from "@material-ui/core/FormGroup";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCategorie } from "../../reducers/crudLogisticActions";
import Grid from "@material-ui/core/Grid";

class Base extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  //   console.log(this.props.data);
  //   this.props.fetchCategorie(this.props.state.element.categorie);
  // }

  render() {
    const {
      handleChange,
      caracteristiques_conditions,
      data,
      handleBack,
      classes,
      handleValeursChange,
      designations,
      categorie
    } = this.props;
    const articlesMetaData = categorie.articlesMetaData;
    return (
      <Grid container spacing={1} className={classes.grid} direction="column">
        {/* <ValidatorForm onSubmit={handleSubmitBase} autoComplete="off"> */}
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
                  // onChange={handleChange}
                  name="code"
                  value={data.code}
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
                  errorMessages={["champ obligatoire", "maximum 25 char"]}
                  value={data.designation}
                  label="Désignation *"
                  id="#designation"
                />
              </Grid>

              <Grid item xs={4}>
                <TextValidator
                  className={classes.field}
                  value={data.categorie}
                  // onChange={handleChange}
                  name="categorie"
                  label="Catégorie d'article *"
                  validators={["required"]}
                  errorMessages={["Ce Champ est Obligatoire : "]}
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
            <Typography variant="h6">Information de base</Typography>
          </div>
        </Toolbar>
        <Grid item>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={6}>
                <TextValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="ancienCode"
                  // validators={["required", "maxStringLength:25"]}
                  // errorMessages={["champ obligatoire", "maximum 25 char"]}
                  value={data.ancienCode}
                  label="Ancien code "
                  id="#ancienCode"
                />
              </Grid>
              <Grid item xs={6} direction="column">
                <TextValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="fabriquant"
                  // validators={["required", "maxStringLength:25"]}
                  // errorMessages={["champ obligatoire", "maximum 25 char"]}
                  value={data.fabriquant}
                  label="Fabriquant"
                  id="#fabriquant"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item>
          <FormGroup>
            <Grid container direction="row">
              <Grid item xs={6}>
                <TextValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="note"
                  // validators={["required", "isNumber", "maxNumber:999999"]}
                  // errorMessages={[
                  //   "champ obligatoire",
                  //   "Ce champ doit étre un nombre",
                  //   "maximum 6 taille du nombre"
                  // ]}
                  value={data.note}
                  label="Note"
                  id="#note"
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  className={classes.field}
                  onChange={handleChange}
                  name="num_piece_fabriquant"
                  // validators={["required", "isNumber", "maxNumber:999999"]}
                  // errorMessages={[
                  //   "champ obligatoire",
                  //   "Ce champ doit étre un nombre",
                  //   "maximum 6 taille du nombre"
                  // ]}
                  value={data.num_piece_fabriquuant}
                  label="N° pièce fabirquant"
                  id="#num_piece_fabriquuant"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <FormGroup>
          <Paper
            className={{
              width: "100%",
              marginTop: "3em",
              overflowX: "auto"
            }}
          >
            {articlesMetaData && articlesMetaData.length > 0 && (
              <Table className={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Caratéristique</TableCell>
                    <TableCell>
                      Valeur <span style={{ color: "red" }}>*</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articlesMetaData.map((element, idx) => {
                    // element = element.toObject();
                    // console.log(data.caracteristiques);
                    element.valeurs = element.valeurs ? element.valeurs : [];
                    if (element) {
                      let validators = [];
                      let errorMessages = [];
                      if (element.type)
                        switch (element.type) {
                          case "number":
                            validators.push("isNumber");
                            errorMessages.push("Ce champ doit étre un nombre");
                            break;
                          case "alphabetical":
                            break;
                          case "alphanumeric":
                            break;
                          case "date":
                            break;
                          case "time":
                            break;
                          default:
                            validators.push("isNumber");
                            errorMessages.push("Ce champ doit étre un nombre");

                          // case "float":
                          //   validators.push("isFloat");
                          //   errorMessages.push(
                          //     "Ce champ doit étre un Decimal"
                          //   );
                          //   break;
                          // case "float-1":
                          //   validators.push("matchRegexp:^[0-9]*.[0-9]$");
                          //   errorMessages.push(
                          //     "un  nombre(s) apres la virgule !"
                          //   );
                          //   break;
                          // case "float-2":
                          //   validators.push("matchRegexp:^[0-9]*.[0-9]{2}$");
                          //   errorMessages.push(
                          //     "deux  nombre(s) apres la virgule !"
                          //   );
                          //   break;
                          // case "float-3":
                          //   validators.push("matchRegexp:^[0-9]*.[0-9]{3}$");
                          //   errorMessages.push(
                          //     "trois  nombre(s) apres la virgule !"
                          //   );
                          //   break;
                          // case "float-4":
                          //   validators.push("matchRegexp:^[0-9]*.[0-9]{4}$");
                          //   errorMessages.push(
                          //     "quatre nombre(s) apres la virgule !"
                          //   );
                          //   break;
                        }
                      if (element.obligatoire) {
                        validators.push("required");
                        errorMessages.push("Ce champ est obligatoire");
                      }
                      if (element.longueur) {
                        let l = element.longueur;
                        validators.push("maxStringLength:" + l);
                        errorMessages.push("Max longeur " + l);
                      }
                      return (
                        <TableRow key={idx}>
                          <TableCell component="th" scope="row">
                            {element.nom}
                          </TableCell>
                          <TableCell>
                            <FormControl style={{ minWidth: 250 }}>
                              <Grid container direction="row">
                                <Grid item xs={6}>
                                  <TextValidator
                                    className={classes.valuesFields}
                                    InputProps={{
                                      readOnly: element.limite
                                    }}
                                    onChange={handleValeursChange(idx)}
                                    name={element.nom}
                                    type={element.type}
                                    validators={validators}
                                    errorMessages={errorMessages}
                                    value={
                                      data.caracteristiques[idx][element.nom]
                                    }
                                  />
                                </Grid>
                                {element.valeurs && element.valeurs.length > 0 && (
                                  <Grid item xs={6}>
                                    <SelectValidator
                                      className={classes.valuesFields}
                                      oonChange={handleValeursChange(idx)}
                                      name={element.nom}
                                      autoWidth="true"
                                      // style={{ minWidth: 15 }}
                                    >
                                      {element.valeurs &&
                                        element.valeurs.map(valeur => (
                                          <MenuItem value={valeur}>
                                            {valeur}{" "}
                                          </MenuItem>
                                        ))}
                                    </SelectValidator>
                                  </Grid>
                                )}
                              </Grid>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            )}{" "}
          </Paper>
        </FormGroup>
      </Grid>
    );
  }
}

export default Base;
