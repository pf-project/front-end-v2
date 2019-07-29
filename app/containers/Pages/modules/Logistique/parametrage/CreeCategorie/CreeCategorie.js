import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Container, Card, Row, Col } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import AjoutAttribut from "./ajoutAttribut";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Notification } from "enl-components";
// import fetchApi from "../../../utils/fetchApi";
// import SnackBar from "../../../utils/SnackBar";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import {
  addCategorie,
  closeNotifAction
} from "../../reducers/crudLogisticActions";
// import Initiale from "./Initiale";
// import Base from "./Base";
// import Stockage from "./Stockage";
// import Commerciale from "./Commerciale";

const styles = theme => ({
  root: {
    width: "90%",
    margin: "2em"
  },
  field: {
    width: "30%",
    marginBottom: 20,
    marginRight: 20
  },
  typography: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }
});

const CreerCategorie = ({
  loading,
  closeNotif,
  notifMsg,
  classes,
  addCategorie
}) => {
  console.log(loading);
  // state :
  const [data, setData] = React.useState({ articlesMetaData: [] });
  const [nbrAttributes, setNbrAttributes] = React.useState(0);

  // handle change :
  const handleChange = event => {
    let { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  //  add and remove a value :
  const addValues = key => position => event => {
    let articlesMetaData = [...data.articlesMetaData];
    let item = articlesMetaData[key];
    if (typeof item === "undefined") {
      item = { obligatoire: false, valeurs: [], limite: false };
    }
    item.valeurs[position] = event.target.value;

    articlesMetaData[key] = item;
    let Elementexists =
      articlesMetaData[key].valeurs.length == 0
        ? false
        : articlesMetaData[key].valeurs.some(
            elmnt => elmnt !== null && elmnt !== ""
          );

    if (!Elementexists) articlesMetaData[key].limite = false;
    setData({ ...data, articlesMetaData });
  };

  const removeAllValues = position => {
    let articlesMetaData = [...data.articlesMetaData];
    if (
      !(typeof articlesMetaData[position] === "undefined") &&
      !(typeof articlesMetaData[position].valeurs === "undefined")
    ) {
      articlesMetaData[position].valeurs = [];
      articlesMetaData[position].limite = false;
      setData({ ...data, articlesMetaData });
    }
  };

  const removeLastValue = ({ position, nbrValues }) => {
    let articlesMetaData = [...data.articlesMetaData];
    if (
      !(typeof articlesMetaData[position] === "undefined") &&
      !(typeof articlesMetaData[position].valeurs === "undefined")
    ) {
      articlesMetaData[position].valeurs.splice(nbrValues, 1);
      let Elementexists =
        articlesMetaData[position].valeurs.length == 0
          ? false
          : articlesMetaData[position].valeurs.some(
              elmnt => elmnt !== null && elmnt !== ""
            );

      if (!Elementexists) articlesMetaData[position].limite = false;
    }
    setData({ ...data, articlesMetaData });
  };
  const handleMetaDataChange = key => event => {
    let { name, value } = event.target;
    let articlesMetaData = [...data.articlesMetaData];
    let item = articlesMetaData[key];
    // console.log(key);
    if (typeof item === "undefined") {
      item = { obligatoire: false, valeurs: [], limite: false };
    }

    switch (name) {
      case "limite":
        item.limite = !item.limite;
        break;
      case "obligatoire":
        item.obligatoire = !item.obligatoire;
        break;
      default:
        item[name] = value;
        break;
    }
    articlesMetaData[key] = item;
    setData({ ...data, articlesMetaData });
  };

  // incriment and sicriment nbrAttributes :
  const incrimentNbrAttributes = () => {
    setNbrAttributes(nbrAttributes + 1);
  };

  const dicrimentNbrAttributes = () => {
    if (nbrAttributes > 0) {
      let { articlesMetaData } = data;
      articlesMetaData.splice(nbrAttributes - 1, 1);
      setData({ ...data, articlesMetaData });
      setNbrAttributes(nbrAttributes - 1);
    }
  };

  // handle submit :

  const handleSubmit = () => {
    addCategorie(data);
    // alert(data);
    setData({ groupe: "", code: "", designation: "", articlesMetaData: [] });
    setNbrAttributes(0);
    // let token = window.localStorage.getItem("token");
    // let body = { ...data };
    // let method = "POST";
    // let url = "/api/logistic/categorie/create";
    // fetchApi({ token, body, method, url })
    //   .then(res => {
    //     // setData({ articlesMetaData: [] });
    //     succes("success");
    //   })
    //   .catch(error => {
    //     failure("danger");
    //   });
  };

  // errors messages :
  const errors = {
    required: "Ce champ est obligatoire !",
    size: "taille max de : ",
    positive: "Veuiller entrer des  nombres protifs :",
    number: "veuiller entrer des nombres :"
  };

  return (
    <div className={classes.root}>
      <ValidatorForm onSubmit={handleSubmit} autoComplete="off">
        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <TextValidator
          onChange={handleChange}
          className={classes.field}
          name="code"
          validators={["required", "maxStringLength:5"]}
          errorMessages={[errors.required, `${errors.size} ${5} characters `]}
          value={data.code}
          label="Code de Categorie  *"
        />

        <TextValidator
          className={classes.field}
          onChange={handleChange}
          name="designation"
          validators={["required", "maxStringLength:25"]}
          errorMessages={[errors.required, `${errors.size} ${25} characters `]}
          value={data.designation}
          label="Désignation *"
        />

        <SelectValidator
          className={classes.field}
          value={data.groupe}
          onChange={handleChange}
          name="groupe"
          label="Groupe Comptable :  *"
          validators={["required"]}
          errorMessages={[errors.required]}
        >
          <MenuItem value={"CONS-Achat pour consomation"}>Groupe 1</MenuItem>
          <MenuItem value={"MRCH-Achat pour vente"}>Groupe 2</MenuItem>
        </SelectValidator>

        {/* <Breadcrumb>
              <BreadcrumbItem active>
                Ajouter Des attributs a votre nouvelle Categorie :
              </BreadcrumbItem>
            </Breadcrumb> */}
        <Divider />

        <Table>
          {nbrAttributes > 0 && (
            <TableHead>
              <TableRow>
                <TableCell>Nom d'attribut : *</TableCell>
                <TableCell>Type d'attribut :</TableCell>
                <TableCell>Langueur max :</TableCell>
                <TableCell>Obligatoire ?</TableCell>
                <TableCell>Valeurs :</TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {[...Array(nbrAttributes).keys()].map(key => (
              <AjoutAttribut
                item={
                  typeof data.articlesMetaData[key] === "undefined"
                    ? { valeurs: [] }
                    : data.articlesMetaData[key]
                }
                classes={classes}
                errors={errors}
                handleChange={handleMetaDataChange}
                key={key}
                position={key}
                addValues={addValues}
                removeLastValue={removeLastValue}
                removeAllValues={removeAllValues}
              />
            ))}
            <IconButton
              color="primary"
              className={classes.button}
              // aria-label="Upload picture"
              // component="span"
              onClick={incrimentNbrAttributes}
            >
              +
            </IconButton>
            <IconButton
              onClick={dicrimentNbrAttributes}
              color="primary"
              className={classes.button}
            >
              -
            </IconButton>
            <Button
              disabled={loading}
              color="primary"
              variant="contained"
              type="submit"
            >
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}{" "}
              Sauvgarder{" "}
            </Button>
          </TableBody>
        </Table>
      </ValidatorForm>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addCategorie: bindActionCreators(addCategorie, dispatch),
  closeNotif: () => dispatch(closeNotifAction())
});

const mapStateToProps = state => ({
  notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
  loading: state.get("crudLogisticReducer").get("loading")
});

// //const reducer = "initval";
const CreerCategorieReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerCategorie);

export default withStyles(styles)(CreerCategorieReduxed);
