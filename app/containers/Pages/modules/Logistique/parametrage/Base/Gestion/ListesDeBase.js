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
const branch = "listesdebase";
class ListesDeBase extends React.Component {
  state = {
    id: "",
    pays: [],
    villes: [],
    tva: [],
    langues: [],
    mode_payment: [],
    honoraires: [],
    banques: [],
    selectedRows: [],
    code: "",
    designation: "",
    type: "Pays"
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
      "pays",
      "villes",
      "langues",
      "mode_payment",
      "tva",
      "banques",
      "honoraires"
    ];
    if (newprops.branch === "listesdebase") {
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

  getPaysFromId = id => {
    const { pays } = this.state;
    const data = pays.filter(pay => pay.id === id);
    if (data[0]) {
      return data[0].designation;
    }
    return "";
  };

  getTvaFromId = id => {
    const { tva } = this.state;
    const data = tva.filter(tva_ => tva_.id === id);
    if (data[0]) {
      return data[0].designation;
    }
    return "";
  };

  mapPropsToState = () => {};

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
      pays,
      villes,
      tva,
      langues,
      mode_payment,
      honoraires,
      banques,
      type
    } = this.state;
    switch (type) {
      case "Pays":
        return {
          data: pays,
          headers: ["ID Unité", "Code unité", "Désignation"]
        };
      case "Villes":
        return {
          data: villes,
          headers: ["ID Unité", "Code unité", "Désignation", "Pays"]
        };
      case "TVA":
        return {
          data: tva,
          headers: ["ID Unité", "Code unité", "Désignation"]
        };
      case "Langues":
        return {
          data: langues,
          headers: ["ID Unité", "Code unité", "Désignation"]
        };
      case "Mode de paymenet":
        return {
          data: mode_payment,
          headers: ["ID Unité", "Code unité", "Désignation"]
        };
      case "Honoraire":
        return {
          data: honoraires,
          headers: ["ID Unité", "Code unité", "Désignation", "TVA"]
        };
      case "Banques":
        return {
          data: banques,
          headers: ["ID Unité", "Code unité", "Désignation"]
        };
    }
    this.setState({ selectedRows: [] });
  };
  handleAdd = () => {
    const {
      pays,
      villes,
      tva,
      langues,
      mode_payment,
      honoraires,
      banques,
      code,
      designation,
      pay,
      type,
      honoraire_tva
    } = this.state;

    switch (type) {
      case "Pays":
        pays.push({ id: this.getId(pays), code, designation });
        this.setState({ pays });
        break;
      case "Villes":
        villes.push({
          id: this.getId(villes),
          code,
          designation,
          pay: this.getPaysFromId(pay)
        });
        this.setState({ villes });
        break;
      case "TVA":
        tva.push({ id: this.getId(tva), code, designation });
        this.setState({ tva });
        break;
      case "Langues":
        langues.push({ id: this.getId(langues), code, designation });
        this.setState({ langues });
        break;
      case "Mode de paymenet":
        mode_payment.push({ id: this.getId(mode_payment), code, designation });
        this.setState({ mode_payment });
        break;
      case "Honoraire":
        honoraires.push({
          id: this.getId(honoraires),
          code,
          designation,
          tva: this.getTvaFromId(honoraire_tva)
        });
        this.setState({ honoraires });
        break;
      case "Banques":
        banques.push({ id: this.getId(banques), code, designation });
        this.setState({ banques });
        break;
    }
    this.setState({ code: "", designation: "", pay: "" });
  };
  handleDelete = () => {
    const {
      pays,
      villes,
      tva,
      langues,
      mode_payment,
      honoraires,
      banques,
      code,
      designation,
      selectedRows,
      type
    } = this.state;
    let newData = [];
    switch (type) {
      case "Pays":
        newData = pays.filter((_, idx) => !selectedRows.includes(idx));

        this.setState({ pays: newData, selectedRows: [] });
        break;
      case "Villes":
        newData = villes.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ villes: newData, selectedRows: [] });
        break;
      case "TVA":
        newData = tva.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ tva: newData, selectedRows: [] });
        break;
      case "Langues":
        newData = langues.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ langues: newData, selectedRows: [] });
        break;
      case "Mode de paymenet":
        newData = mode_payment.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ mode_payment: newData, selectedRows: [] });
        break;
      case "Honoraire":
        newData = honoraires.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ honoraires: newData, selectedRows: [] });
        break;
      case "Banques":
        newData = banques.filter((_, idx) => !selectedRows.includes(idx));
        this.setState({ banques: newData, selectedRows: [] });
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
      pays,
      villes,
      tva,
      langues,
      honoraires,
      mode_payment,
      banques
    } = this.state;
    const data = {
      id,
      pays,
      villes,
      tva,
      langues,
      honoraires,
      mode_payment,
      banques
    };
    this.props.updateListesDeBase(data, branch);
  };

  render() {
    const { classes, notifMsg, closeNotif } = this.props;
    const {
      pays,
      selectedRows,
      code,
      designation,
      type,
      pay,
      honoraire_tva
    } = this.state;

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
          title="Listes de base"
          pathname="/Logistique/Paramétrage/Configuration de base/Listes de base"
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
            <Grid item xs={12}>
              <Grid item xs={4}>
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
                  <MenuItem value={"Pays"}>Pays</MenuItem>
                  <MenuItem value={"Villes"}>Villes</MenuItem>
                  <MenuItem value={"TVA"}>TVA</MenuItem>
                  <MenuItem value={"Langues"}>Langues</MenuItem>
                  <MenuItem value={"Mode de paymenet"}>
                    Mode de paymenet
                  </MenuItem>
                  <MenuItem value={"Honoraire"}>Honoraire</MenuItem>
                  <MenuItem value={"Banques"}>Banques</MenuItem>
                </SelectValidator>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Toolbar className={classes.toolbar}>
                <div className={classes.title}>
                  <Typography variant="h6" />
                </div>
              </Toolbar>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                {type === "Villes" && (
                  <SelectValidator
                    label="Pays"
                    value={pay}
                    style={{ width: "80%" }}
                    onChange={this.handleChange}
                    validators={["required"]}
                    errorMessages={["champ obligatoire"]}
                    inputProps={{
                      name: "pay",
                      id: "type-unite"
                    }}
                  >
                    {this.state.pays.map(pay => (
                      <MenuItem value={pay.id}>{pay.designation}</MenuItem>
                    ))}
                  </SelectValidator>
                )}
                {type === "Honoraire" && (
                  <SelectValidator
                    label="TVA"
                    value={honoraire_tva}
                    style={{ width: "80%" }}
                    onChange={this.handleChange}
                    validators={["required"]}
                    errorMessages={["champ obligatoire"]}
                    inputProps={{
                      name: "honoraire_tva",
                      id: "type-unite"
                    }}
                  >
                    {this.state.tva.map(tva => (
                      <MenuItem value={tva.id}>{tva.designation}</MenuItem>
                    ))}
                  </SelectValidator>
                )}
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }}>
              <Grid item xs={1}>
                <Button type="submit" variant="contained" color="primary">
                  Ajouter{" "}
                </Button>
              </Grid>
              <Grid item xs={1}>
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
const ListesDeBaseReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListesDeBase);

export default withStyles(styles)(ListesDeBaseReduxed);
