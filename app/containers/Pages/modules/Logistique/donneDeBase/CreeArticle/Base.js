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

  componentWillMount() {
    this.props.fetchCategorie(this.props.state.data.categorie);
  }

  render() {
    const {
      handleChange,
      handleSubmitBase,
      state,
      handleBack,
      classes,
      handleValeursChange,
      loading
    } = this.props;
    const categorie = this.props.categorie.toObject();
    const articlesMetaData = [];
    if (loading) {
      return (
        <center>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </center>
      );
    }
    if (typeof categorie.articlesMetaData == !"undefined")
      articlesMetaData = categorie.articlesMetaData.toArray();
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
                  errorMessages={["champ obligatoire", "maximum 25 char"]}
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
                  value={state.data.ancienCode}
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
                  value={state.data.fabriquant}
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
                  value={state.data.note}
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
                  value={state.data.num_piece_fabriquuant}
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
                  {articlesMetaData.map((data, idx) => {
                    data = data.toObject();

                    data.valeurs = data.valeurs ? data.valeurs.toArray() : [];
                    if (data) {
                      let validators = [];
                      let errorMessages = [];
                      if (data.type)
                        switch (data.type) {
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
                      if (data.obligatoire) {
                        validators.push("required");
                        errorMessages.push("Ce champ est obligatoire");
                      }
                      if (data.longueur) {
                        let l = data.longueur;
                        validators.push("maxStringLength:" + l);
                        errorMessages.push("Max longeur " + l);
                      }

                      return (
                        <TableRow key={idx}>
                          <TableCell component="th" scope="row">
                            {data.nom}
                          </TableCell>
                          <TableCell>
                            <FormControl style={{ minWidth: 250 }}>
                              <Grid container direction="row">
                                <Grid item xs={6}>
                                  <TextValidator
                                    className={classes.field}
                                    InputProps={{
                                      readOnly: data.limite
                                    }}
                                    onChange={handleValeursChange}
                                    name={idx}
                                    type={data.type}
                                    validators={validators}
                                    errorMessages={errorMessages}
                                    value={
                                      state.data.caracteristiques[idx].valeur
                                    }
                                  />
                                </Grid>
                                {data.valeurs && data.valeurs.length > 0 && (
                                  <Grid item xs={6}>
                                    <SelectValidator
                                      className={classes.field}
                                      onChange={handleValeursChange}
                                      name={idx}
                                      autoWidth="true"
                                      // style={{ minWidth: 15 }}
                                    >
                                      {data.valeurs &&
                                        data.valeurs.map(valeur => (
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

const mapDispatchToProps = dispatch => ({
  fetchCategorie: bindActionCreators(fetchCategorie, dispatch),
  closeNotif: () => dispatch(closeNotifAction())
});

const mapStateToProps = state => ({
  // state: state.get("crudLogisticReducer"),
  categorie: state.get("crudLogisticReducer").get("categorie")
});

// //const reducer = "initval";
const BaseMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Base);

export default BaseMapped;
