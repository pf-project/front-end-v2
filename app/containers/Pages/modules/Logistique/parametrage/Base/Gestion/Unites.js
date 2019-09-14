import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import {
  lighten,
  darken,
  fade
} from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PageTitle, Notification } from "enl-components";
import Grid from "@material-ui/core/Grid";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import { SimpleTable } from "enl-components";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Modal from "@material-ui/core/Modal";

import {
  fetchAction,
  updateAction,
  closeNotifAction
} from "../reducers/crudTbBaseActions";

const styles = theme => ({
  root: {
    width: "90%",
    margin: "2em"
  },
  paper: {
    position: "absolute",
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4)
  },
  backButton: {
    marginRight: "1em"
  },
  instructions: {
    marginTop: "1em",
    marginBottom: "1em"
  },
  field: {
    width: "90%"
  },
  initialeFields: {
    width: "60%"
  },
  grid: {
    flexGrow: 1
  },
  checkBoxMarginTop: {
    marginTop: "20px"
  },
  toolbar: {
    marginTop: "1em",
    marginBottom: "1em",
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.primary.light, 0.6)
        : theme.palette.primary.light,
    minHeight: 60
  },
  title: {
    flex: "0 0 auto",
    "& h6": {
      fontSize: 16,
      color:
        theme.palette.type === "dark"
          ? darken(theme.palette.primary.light, 0.2)
          : darken(theme.palette.primary.dark, 0.2)
    }
  },
  // buttons: {
  //   marginTop: "30px"
  // },

  pageTitle: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(1),
    // width: "80",
    // display: "flex",
    // alignItems: "flex-end",
    position: "sticky",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "flex-end"
    },
    zIndex: theme.zIndex.drawer + 10,
    // alignItems: "center",
    // marginBottom: theme.spacing(10),
    // [theme.breakpoints.up("sm")]: {
    //   // display: "flex",
    //   alignItems: "flex-end"
    // },
    "& h4": {
      fontWeight: 700,
      fontSize: 24,
      paddingLeft: 10,
      paddingRight: theme.spacing(1),
      // textTransform: "capitalize",
      color:
        theme.palette.type === "dark"
          ? theme.palette.secondary.light
          : theme.palette.primary.dark,
      [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(3)
      }
    }
  }
});
const branch = "unites";
class Unites extends React.Component {
  state = {
    id: "",
    devise: [],
    poids: [],
    volume: [],
    longueur: [],
    duree: [],
    physiquo_chimique: [],
    selectedRows: [],
    code: "",
    designation: "",
    facteur_conversion: "",
    unite_conversion: "",
    type: "Devise"
  };

  getModalStyle = () => {
    return {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    };
  };

  componentWillMount() {
    this.props.fetchListesDeBase(branch);
  }

  componentWillReceiveProps(newprops) {
    const dataTable = this.props.dataTable;
    const tables = [
      "devise",
      "poids",
      "volume",
      "longueur",
      "duree",
      "physiquo_chimique"
    ];
    if (newprops.branch === "unites") {
      const response = dataTable.toArray()[0];
      this.setState({ id: response.get("id") });
      let data = [];
      tables.map(table => {
        let data = [];
        let newData = [];
        data = response.get(table).toArray();
        data.map(row => {
          newData.push(row.toObject());
        });
        this.setState({ [table]: newData });
      });
    }
  }

  handleSelect = index => () => {
    const { selectedRows } = this.state;
    if (selectedRows.includes(index)) {
      const newSelectedRows = [...selectedRows];
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
      this.setState({ selectedRows: newSelectedRows });
    } else {
      this.setState({ selectedRows: [...selectedRows, index] });
    }
  };

  getId = data => {
    let id = 1;
    data.map(row => {
      if (row.id >= id) id = row.id + 1;
    });
    return id;
  };

  showTable = () => {
    const {
      devise,
      poids,
      volume,
      longueur,
      duree,
      physiquo_chimique,
      type
    } = this.state;

    switch (type) {
      case "Devise":
        return {
          data: devise,
          headers: [
            "ID Unité",
            "Code unité",
            "Désignation",
            "Facteur de conversion",
            "Unité conversion"
          ]
        };
      case "Poids":
        return {
          data: poids,
          headers: [
            "ID Unité",
            "Code unité",
            "Désignation",
            "Facteur de conversion",
            "Unité conversion"
          ]
        };
      case "Volume":
        return {
          data: volume,
          headers: [
            "ID Unité",
            "Code unité",
            "Désignation",
            "Facteur de conversion",
            "Unité conversion"
          ]
        };
      case "Longuer":
        return {
          data: longueur,
          headers: [
            "ID Unité",
            "Code unité",
            "Désignation",
            "Facteur de conversion",
            "Unité conversion"
          ]
        };
      case "Durée":
        return {
          data: duree,
          headers: [
            "ID Unité",
            "Code unité",
            "Désignation",
            "Facteur de conversion",
            "Unité conversion"
          ]
        };
      case "Unité physiquo-chimique":
        return {
          data: physiquo_chimique,
          headers: [
            "ID Unité",
            "Code unité",
            "Désignation",
            "Facteur de conversion",
            "Unité conversion"
          ]
        };
    }
    this.setState({ selectedRows: [] });
  };
  handleAdd = () => {
    const {
      devise,
      poids,
      volume,
      longueur,
      duree,
      physiquo_chimique,
      code,
      designation,
      facteur_conversion,
      unite_conversion,
      type
    } = this.state;

    switch (type) {
      case "Devise":
        devise.push({
          id: this.getId(devise),
          code,
          designation,
          facteur_conversion,
          unite_conversion
        });
        this.setState({ devise });
        break;
      case "Poids":
        poids.push({
          id: this.getId(poids),
          code,
          designation,
          facteur_conversion,
          unite_conversion
        });
        this.setState({ poids });
        break;
      case "Volume":
        volume.push({
          id: this.getId(volume),
          code,
          designation,
          facteur_conversion,
          unite_conversion
        });
        this.setState({ volume });
        break;
      case "Longuer":
        longueur.push({
          id: this.getId(longueur),
          code,
          designation,
          facteur_conversion,
          unite_conversion
        });
        this.setState({ longueur });
        break;
      case "Durée":
        duree.push({
          id: this.getId(duree),
          code,
          designation,
          facteur_conversion,
          unite_conversion
        });
        this.setState({ duree });
        break;
      case "Unité physiquo-chimique":
        physiquo_chimique.push({
          id: this.getId(physiquo_chimique),
          code,
          designation,
          facteur_conversion,
          unite_conversion
        });
        this.setState({ physiquo_chimique });
        break;
    }
    this.setState({
      code: "",
      designation: "",
      facteur_conversion: "",
      unite_conversion: ""
    });
  };
  handleDelete = () => {
    const {
      devise,
      poids,
      volume,
      longueur,
      duree,
      physiquo_chimique,
      code,
      designation,
      facteur_conversion,
      unite_conversion,
      type,
      selectedRows
    } = this.state;
    let newData = [];

    switch (type) {
      case "Devise":
        newData = devise.filter((_, idx) => !selectedRows.includes(idx));

        this.setState({ devise: newData, selectedRows: [] });
        break;
      case "Poids":
        newData = poids.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ poids: newData, selectedRows: [] });
        break;
      case "Volume":
        newData = volume.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ volume: newData, selectedRows: [] });
        break;
      case "Longuer":
        newData = longueur.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ longueur: newData, selectedRows: [] });
        break;
      case "Durée":
        newData = duree.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ duree: newData, selectedRows: [] });
        break;
      case "Unité physiquo-chimique":
        newData = physiquo_chimique.filter(
          (_, idx) => !selectedRows.includes(idx)
        );
        this.setState({ physiquo_chimique: newData, selectedRows: [] });
        break;
    }
    this.setState({ selectedRows: [] });
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (name === "type") this.setState({ selectedRows: [] });
    this.setState({ [name]: value });
  };

  updateListesDeBase = () => {
    const {
      id,
      devise,
      poids,
      longueur,
      volume,
      physiquo_chimique,
      duree
    } = this.state;
    const data = {
      id,
      devise,
      poids,
      longueur,
      volume,
      physiquo_chimique,
      duree
    };
    this.props.updateListesDeBase(data, branch);
  };

  render() {
    const { classes, notifMsg, closeNotif } = this.props;
    const {
      devise,
      poids,
      volume,
      longueur,
      duree,
      physiquo_chimique,
      code,
      designation,
      facteur_conversion,
      unite_conversion,
      selectedRows,
      type
    } = this.state;

    const unites = [];
    this.showTable().data.map(unite => {
      if (unites.filter(code => code === unite.code).length === 0) {
        unites.push(unite.code);
      }
    });

    const elements = (
      <>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={this.updateListesDeBase}
          form="ListesDeBase"
        >
          Sauvegarder
        </Button>
      </>
    );
    return (
      <div>
        <PageTitle
          title="Unités"
          pathname="/Logistique/Paramétrage/Configuration de base/Unités"
          elements={elements}
          withBackOption={true}
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <ValidatorForm onSubmit={this.handleAdd}>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.loading}
          >
            <center>
              <div style={this.getModalStyle()} className={classes.paper}>
                <CircularProgress
                  size={100}
                  thickness={1.2}
                  className={classes.buttonProgress}
                />{" "}
                <div className={classes.encours}>En cours de chargement</div>
              </div>
            </center>
          </Modal>
          <Grid container>
            <Grid item md={12}>
              <Grid item md={4}>
                <SelectValidator
                  label="Type unité"
                  value={type}
                  style={{ width: "80%" }}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "type",
                    id: "type-unite"
                  }}
                >
                  <MenuItem value={"Devise"}>Devise</MenuItem>
                  <MenuItem value={"Poids"}>Poids</MenuItem>
                  <MenuItem value={"Volume"}>Volume</MenuItem>
                  <MenuItem value={"Longuer"}>Longuer</MenuItem>
                  <MenuItem value={"Durée"}>Durée</MenuItem>
                  <MenuItem value={"Unité physiquo-chimique"}>
                    Unité physiquo-chimique
                  </MenuItem>
                </SelectValidator>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Toolbar className={classes.toolbar}>
                <div className={classes.title}>
                  <Typography variant="h6" />
                </div>
              </Toolbar>
            </Grid>
            <Grid container>
              <Grid item md={3}>
                <TextValidator
                  onChange={this.handleChange}
                  name="code"
                  style={{ width: "80%" }}
                  value={code}
                  validators={["required", "maxStringLength:6"]}
                  errorMessages={["champ obligatoire", "maximum 6 char"]}
                  label="Code Unité *"
                  id="#codearticle"
                />
              </Grid>
              <Grid item md={3}>
                <TextValidator
                  style={{ width: "80%" }}
                  // className={classes.field}
                  onChange={this.handleChange}
                  name="designation"
                  validators={["required", "maxStringLength:25"]}
                  errorMessages={["champ obligatoire", "maximum 25 char"]}
                  value={designation}
                  label="Désignation *"
                  id="#designation"
                />
              </Grid>
              <Grid item md={3}>
                <TextValidator
                  onChange={this.handleChange}
                  name="facteur_conversion"
                  style={{ width: "80%" }}
                  value={facteur_conversion}
                  validators={["isFloat"]}
                  errorMessages={["ce champs doit étre un nombre"]}
                  label="Facteur de conversion "
                  id="#facteur_conversion"
                />
              </Grid>
              <Grid item md={3}>
                <SelectValidator
                  label="Unité de conversion"
                  value={unite_conversion}
                  style={{ width: "80%" }}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "unite_conversion",
                    id: "type-unite"
                  }}
                >
                  {unites.map(unite => (
                    <MenuItem value={unite}>{unite}</MenuItem>
                  ))}
                </SelectValidator>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }}>
              <Grid item md={1}>
                <Button type="submit" variant="contained" color="primary">
                  Ajouter{" "}
                </Button>
              </Grid>
              <Grid item md={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={selectedRows.length == 0}
                  onClick={this.handleDelete}
                >
                  Supprimer{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </ValidatorForm>
        <SimpleTable
          data={this.showTable().data}
          selectedRows={selectedRows}
          handleSelect={this.handleSelect}
          headers={this.showTable().headers}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
  fetchListesDeBase: bindActionCreators(fetchAction, dispatch),
  updateListesDeBase: bindActionCreators(updateAction, dispatch)
});
const reducer = "ListesDeBase";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg"),
  loading: state.get(reducer).get("loading"),
  dataTable: state.get(reducer).get("dataTable"),
  branch: state.get(reducer).get("branch")
});

// //const reducer = "initval";
const UnitesReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Unites);

export default withStyles(styles)(UnitesReduxed);
