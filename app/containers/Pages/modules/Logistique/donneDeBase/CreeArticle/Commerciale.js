import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// import SnackBar from "../../../utils/SnackBar";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default function Commerciale({
  handleChange,
  state,
  handleSubmitCommerciale,
  handleBack,
  classes
}) {
  const { designations } = state;
  // const handleClickVariant = SnackBar({
  //   message: "L'article a été créer avec succes",
  //   variant: "success"
  // });

  const handleSubmit = () => {
    handleSubmitCommerciale();
    handleClickVariant("success");
  };
  return (
    <div>
      <ValidatorForm autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <Col md="3">
              <TextValidator
                disabled
                onChange={handleChange}
                name="code"
                value={state.data.code}
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
          <BreadcrumbItem active>Information d'achat</BreadcrumbItem>
        </Breadcrumb>
        <FormGroup>
          <Row>
            <Col md="4">
              <TextValidator
                onChange={handleChange}
                name="prix_standar_achat"
                value={state.data.prix_standar_achat}
                label="Prix standard d'achat"
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
              />
            </Col>

            <Col md="4">
              <SelectValidator
                value={state.data.unite_de_quantite_achat}
                onChange={handleChange}
                name="unite_de_quantite_achat"
                label="Unité de quantité d'achat"
                style={{ minWidth: 300 }}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoire : "]}
              >
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"25"}>25</MenuItem>
                <MenuItem value={"50"}>50</MenuItem>
                <MenuItem value={"100"}>100</MenuItem>
              </SelectValidator>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md="4">
              <TextValidator
                onChange={handleChange}
                name="prix_moyen_pendere"
                value={state.data.prix_moyen_pendere}
                label="Prix moyen pondéré"
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
              />
            </Col>
          </Row>
        </FormGroup>
        <Breadcrumb>
          <BreadcrumbItem active>Information de vente</BreadcrumbItem>
        </Breadcrumb>
        <FormGroup>
          <Row>
            <Col md="4">
              <TextValidator
                onChange={handleChange}
                name="prix_de_vente_de_base_HT"
                value={state.data.prix_de_vente_de_base_HT}
                label="Prix de vente de base HT"
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
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md="4">
              <SelectValidator
                value={state.data.taux_tva}
                onChange={handleChange}
                name="taux_tva"
                label="Taux de TVA"
                style={{ minWidth: 300 }}
                validators={["required"]}
                errorMessages={["Ce Champ est Obligatoire : "]}
              >
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"25"}>25</MenuItem>
                <MenuItem value={"50"}>50</MenuItem>
                <MenuItem value={"100"}>100</MenuItem>
              </SelectValidator>
            </Col>
            <Col md="4">
              <TextValidator
                onChange={handleChange}
                name="prix_de_vente_de_base_TTC"
                value={state.data.prix_de_vente_de_base_TTC}
                label="Prix de vente de base TTC"
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
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col md="4">
              <SelectValidator
                value={state.data.unite_de_vente}
                onChange={handleChange}
                name="unite_de_vente"
                label="Unité de vente"
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
            </Col>
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // onClick={handleClickVariant}
            // onClick={SnackBar.("message", "Success")}
          >
            {state.activeStep === state.steps.length - 1
              ? "Sauvegarder"
              : "Suivant"}
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
}
