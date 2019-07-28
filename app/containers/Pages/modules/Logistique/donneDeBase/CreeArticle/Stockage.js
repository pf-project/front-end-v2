import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import {
  FormGroup,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem
} from "@material-ui/core/";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

export default function Stockage({
  handleChange,
  state,
  handleSubmitStockage,
  handleBack,
  classes
}) {
  const { designations } = state;
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmitStockage} autoComplete="off">
        <FormGroup>
          <Row>
            <Col md="3">
              <TextValidator
                disabled
                onChange={handleChange}
                name="code"
                value={state.data.codearticle}
                label="Code Article *"
                id="#code"
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
        <Breadcrumb>
          <BreadcrumbItem active>Information de Stockage</BreadcrumbItem>
        </Breadcrumb>
        <FormGroup>
          <Row>
            <Col md="4">
              <FormControl style={{ minWidth: 300 }}>
                <SelectValidator
                  value={state.data.unite_de_quantite_de_base}
                  onChange={handleChange}
                  name="unite_de_quantite_de_base"
                  label="Unité de quantité de base"
                  style={{ minWidth: 300 }}
                  validators={[
                    "required",
                    "isNumber",
                    "isPositive",
                    "maxNumber:999999"
                  ]}
                  errorMessages={[
                    "champ obligatoire",
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
              </FormControl>
            </Col>

            <Col md="4">
              <TextValidator
                onChange={handleChange}
                name="emplacement"
                validators={["required", "maxStringLength:10"]}
                errorMessages={["champ obligatoire", "maximum 10 char"]}
                value={state.data.emplacement}
                label="Emplacement *"
                id="#emplacement"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md="4">
              <FormControl style={{ minWidth: 300 }}>
                <SelectValidator
                  value={state.data.poids}
                  onChange={handleChange}
                  name="poids"
                  label="Poids"
                  style={{ minWidth: 300 }}
                  validators={["required", "maxNumber:100"]}
                  errorMessages={[
                    "Ce Champ est Obligatoire : ",
                    "taille maximale est 100"
                  ]}
                >
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"25"}>25</MenuItem>
                  <MenuItem value={"50"}>50</MenuItem>
                  <MenuItem value={"100"}>100</MenuItem>
                </SelectValidator>
              </FormControl>
            </Col>
            <Col md="4">
              <FormControl style={{ minWidth: 300 }}>
                <SelectValidator
                  value={state.data.unite1}
                  onChange={handleChange}
                  name="unite1"
                  label="Unité"
                  style={{ minWidth: 300 }}
                  validators={["required", "maxNumber:100"]}
                  errorMessages={[
                    "Ce Champ est Obligatoire : ",
                    "taille maximale est 100"
                  ]}
                >
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"25"}>25</MenuItem>
                  <MenuItem value={"50"}>50</MenuItem>
                  <MenuItem value={"100"}>100</MenuItem>
                </SelectValidator>
              </FormControl>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md="4">
              <Row>
                <Col md="3">
                  <TextValidator
                    onChange={handleChange}
                    name="dimension_L"
                    validators={[
                      "required",
                      "isNumber",
                      "isPositive",
                      "maxNumber:99"
                    ]}
                    errorMessages={[
                      "champ obligatoire",
                      "Ce champ doit étre un nombre",
                      "Ce champ doit étre un nombre positive",
                      "maximum 2 taille du nombre"
                    ]}
                    value={state.data.dimension_L}
                    label="L"
                    id="#l"
                  />
                </Col>
                <Col md="3">
                  <TextValidator
                    onChange={handleChange}
                    name="dimension_I"
                    validators={[
                      "required",
                      "isNumber",
                      "isPositive",
                      "maxNumber:99"
                    ]}
                    errorMessages={[
                      "champ obligatoire",
                      "Ce champ doit étre un nombre",
                      "Ce champ doit étre un nombre positive",
                      "maximum 2 taille du nombre"
                    ]}
                    value={state.data.dimension_I}
                    label="I"
                    id="#i"
                  />
                </Col>
                <Col md="3">
                  <TextValidator
                    onChange={handleChange}
                    name="dimension_H"
                    validators={[
                      "required",
                      "isNumber",
                      "isPositive",
                      "maxNumber:99"
                    ]}
                    errorMessages={[
                      "champ obligatoire",
                      "Ce champ doit étre un nombre",
                      "Ce champ doit étre un nombre positive",
                      "maximum 2 taille du nombre"
                    ]}
                    value={state.data.dimension_H}
                    label="H"
                    id="#h"
                  />
                </Col>
              </Row>
            </Col>
            <Col md="4">
              <FormControl style={{ minWidth: 300 }}>
                <SelectValidator
                  value={state.data.unite2}
                  onChange={handleChange}
                  name="unite2"
                  label="Unité"
                  style={{ minWidth: 300 }}
                  validators={["required", "maxNumber:100"]}
                  errorMessages={[
                    "Ce Champ est Obligatoire : ",
                    "taille maximale est 100"
                  ]}
                >
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"25"}>25</MenuItem>
                  <MenuItem value={"50"}>50</MenuItem>
                  <MenuItem value={"100"}>100</MenuItem>
                </SelectValidator>
              </FormControl>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.data.gestion_par_lot}
                  onChange={handleChange}
                  color="primary"
                  name="gestion_par_lot"
                />
              }
              label="Gestion par lot"
            />
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.data.controle_qualite_exige}
                  onChange={handleChange}
                  color="primary"
                  name="controle_qualite_exige"
                />
              }
              label="Controle qualité exigé"
            />
          </Row>
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
}
