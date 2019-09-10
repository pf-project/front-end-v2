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
const branch = "coursdechange";
class Unites extends React.Component {
  state = {
    id: "",
    coursdechange: [],

    selectedRows: [],
    dateDebut: "2019-01-01",
    dateFin: "2019-01-31",
    type: "Cours de change"
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
    const tables = ["coursdechange"];
    if (newprops.branch === "coursdechange") {
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
    const { coursdechange, type } = this.state;

    switch (type) {
      case "Cours de change":
        return {
          data: coursdechange,
          headers: [
            "ID Unité",
            "Date de début",
            "Date de fin",
            "Convertir",
            "Taux",
            "Devise cible"
          ]
        };
    }
    this.setState({ selectedRows: [] });
  };
  handleAdd = () => {
    const {
      coursdechange,
      dateDebut,
      dateFin,
      convertir,
      taux,
      deviseCible,
      type
    } = this.state;

    switch (type) {
      case "Cours de change":
        coursdechange.push({
          id: this.getId(coursdechange),
          dateDebut,
          dateFin,
          convertir,
          taux,
          deviseCible
        });
        this.setState({ coursdechange });
        break;
    }
    this.setState({
      convertir: "",
      taux: "",
      deviseCible: ""
    });
  };
  handleDelete = () => {
    const {
      coursdechange,
      dateDebut,
      dateFin,
      convertir,
      taux,
      deviseCible,
      type,
      selectedRows
    } = this.state;
    let newData = [];

    switch (type) {
      case "Cours de change":
        newData = coursdechange.filter((_, idx) => !selectedRows.includes(idx));

        this.setState({ coursdechange: newData, selectedRows: [] });
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
    const { id, coursdechange } = this.state;
    const data = {
      id,
      coursdechange
    };
    this.props.updateListesDeBase(data, branch);
  };

  render() {
    const { classes, notifMsg, closeNotif } = this.props;
    const {
      coursdechange,
      dateDebut,
      dateFin,
      convertir,
      taux,
      deviseCible,
      selectedRows,
      type
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
          pathname="/Logistique/Paramétrage/Configuration de base/Cours de change"
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
                <CircularProgress disableShrink /> Veuillez patienter ...
              </div>
            </center>
          </Modal>
          <Grid container>
            <Grid container>
              <Grid item md={2}>
                <TextValidator
                  style={{ width: "80%" }}
                  // className={classes.field}
                  onChange={this.handleChange}
                  type="date"
                  name="dateDebut"
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  value={dateDebut}
                  label="Date de début *"
                  id="#dateDebut"
                />
              </Grid>
              <Grid item md={2}>
                <TextValidator
                  onChange={this.handleChange}
                  name="dateFin"
                  style={{ width: "80%" }}
                  value={dateFin}
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  label="Date de fin * "
                  id="#dateFin"
                />
              </Grid>
              <Grid item md={2}>
                <TextValidator
                  onChange={this.handleChange}
                  name="convertir"
                  style={{ width: "80%" }}
                  value={convertir}
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  label="Convertir * "
                  id="#convertir"
                />
              </Grid>
              <Grid item md={2}>
                <TextValidator
                  onChange={this.handleChange}
                  name="taux"
                  style={{ width: "80%" }}
                  value={taux}
                  validators={["required", "isFloat"]}
                  errorMessages={[
                    "champ obligatoire",
                    "Champ doit étre un nombre"
                  ]}
                  label="Taux * "
                  id="#convertir"
                />
              </Grid>
              <Grid item md={2}>
                <TextValidator
                  onChange={this.handleChange}
                  name="deviseCible"
                  style={{ width: "80%" }}
                  value={deviseCible}
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  label="Devise cible * "
                  id="#deviseCible"
                />
              </Grid>
              <Grid item md={2} />
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
