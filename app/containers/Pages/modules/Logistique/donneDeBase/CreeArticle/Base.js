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

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

export default class Base extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCategorie();
  }

  render() {
    const {
      handleChange,
      handleSubmitBase,
      state,
      handleBack,
      classes,
      handleValeursChange,
      categorie
    } = this.props;
    const { designations } = state;
    console.log(categorie);
    const articlesMetaData = [];
    // console.log(categorie);
    if (articlesMetaData) {
      return (
        <div>
          <ValidatorForm onSubmit={handleSubmitBase} autoComplete="off">
            <FormGroup>
              <Row>
                <Col md="3">
                  <TextValidator
                    disabled
                    onChange={handleChange}
                    name="code"
                    value={state.data.code}
                    label="Code Article *"
                    id="#codearticle"
                  />
                </Col>
                <Col md="3">
                  <TextValidator
                    onChange={handleChange}
                    name="designation"
                    validators={["required", "maxStringLength:25"]}
                    errorMessages={["champ obligatoire", "maximum 25 char"]}
                    value={state.data.designation}
                    label="Désignation *"
                    id="#designation"
                  />
                </Col>
                <Col md="3">
                  <FormControl style={{ minWidth: 300 }}>
                    <SelectValidator
                      value={state.data.categorie}
                      onChange={handleChange}
                      name="categorie"
                      label="Catégorie d'article"
                      style={{ minWidth: 300 }}
                      validators={["required"]}
                      errorMessages={["Ce Champ est Obligatoire : "]}
                    >
                      {designations.map(designation => (
                        <MenuItem value={designation}>{designation}</MenuItem>
                      ))}
                    </SelectValidator>
                  </FormControl>
                </Col>
              </Row>
            </FormGroup>
            {/* <Breadcrumb>
              <BreadcrumbItem active>Information de base</BreadcrumbItem>
            </Breadcrumb> */}
            <FormGroup>
              <Row>
                <Col md="4">
                  <TextValidator
                    onChange={handleChange}
                    name="ancienCode"
                    validators={["required", "maxStringLength:25"]}
                    errorMessages={["champ obligatoire", "maximum 25 char"]}
                    value={state.data.ancienCode}
                    label="Ancien Code "
                    id="#ancienCode"
                  />
                </Col>
                <Col md="4">
                  <TextValidator
                    onChange={handleChange}
                    name="fabriquant"
                    validators={["required", "maxStringLength:25"]}
                    errorMessages={["champ obligatoire", "maximum 25 char"]}
                    value={state.data.fabriquant}
                    label="Fabriquant"
                    id="#fabriquant"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md="4">
                  <TextValidator
                    onChange={handleChange}
                    name="note"
                    validators={["required", "isNumber", "maxNumber:999999"]}
                    errorMessages={[
                      "champ obligatoire",
                      "Ce champ doit étre un nombre",
                      "maximum 6 taille du nombre"
                    ]}
                    value={state.data.note}
                    label="Note"
                    id="#note"
                  />
                </Col>
                <Col md="4">
                  <TextValidator
                    onChange={handleChange}
                    name="num_piece_fabriquuant"
                    validators={["required", "isNumber", "maxNumber:999999"]}
                    errorMessages={[
                      "champ obligatoire",
                      "Ce champ doit étre un nombre",
                      "maximum 6 taille du nombre"
                    ]}
                    value={state.data.num_piece_fabriquuant}
                    label="N° pièce fabirquant"
                    id="#num_piece_fabriquuant"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Col md="8">
                <Paper
                  className={{
                    width: "100%",
                    marginTop: "3em",
                    overflowX: "auto"
                  }}
                >
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
                        data.valeurs = data.valeurs
                          ? data.valeurs.toArray()
                          : [];
                        if (data) {
                          let validators = [];
                          let errorMessages = [];
                          // console.log(data.caracteristiques[idx]);
                          if (data.obligatoire === "true") {
                            validators.push("required");
                            errorMessages.push("champ obligatoire");
                          }
                          if (data.longueur) {
                            let l = data.longueur;
                            validators.push("maxStringLength:" + l);
                            errorMessages.push("max longeur " + l);
                          }
                          return (
                            <TableRow key={idx}>
                              <TableCell component="th" scope="row">
                                {data.nom}
                              </TableCell>
                              <TableCell>
                                <FormControl style={{ minWidth: 250 }}>
                                  <Row>
                                    <TextValidator
                                      InputProps={{
                                        readOnly: data.limite === "true"
                                      }}
                                      onChange={handleValeursChange}
                                      name={idx}
                                      validators={validators}
                                      errorMessages={errorMessages}
                                      value={
                                        state.data.caracteristiques[idx].valeur
                                      }
                                    />
                                    <SelectValidator
                                      onChange={handleValeursChange}
                                      name={idx}
                                      style={{ minWidth: 15 }}
                                    >
                                      {data.valeurs &&
                                        data.valeurs.map(valeur => (
                                          <MenuItem value={valeur}>
                                            {valeur}{" "}
                                          </MenuItem>
                                        ))}
                                    </SelectValidator>
                                  </Row>
                                </FormControl>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </Col>
            </FormGroup>
            <div>
              <Button
                disabled={state.activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Précedent
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {state.activeStep === state.steps.length - 1
                  ? "Sauvegarder"
                  : "Suivant"}
              </Button>
            </div>
          </ValidatorForm>
        </div>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}
