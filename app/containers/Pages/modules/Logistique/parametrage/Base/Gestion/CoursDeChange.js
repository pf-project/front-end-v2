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
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";

import {
  fetchAction,
  updateAction,
  closeNotifAction,
  fetchDevise
} from "../reducers/crudTbBaseActions";

import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

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
  done: {
    backgroundColor: "#4db6ac",
    "&:hover": {
      backgroundColor: "#009688"
    }
  },
  cancel: {
    marginRight: "1em",
    color: "white",
    backgroundColor: "#e57373",
    "&:hover": {
      backgroundColor: "#f44336"
    }
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
    devise: [],
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
    this.props.fetchDevise(branch);
    this.props.fetchListesDeBase(branch);
  }

  componentWillReceiveProps(newprops) {
    const dataTable = this.props.dataTable;
    const tables = ["coursdechange"];
    if (newprops.branch === "coursdechange") {
      const devises = this.props.devise.toArray();
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
      const devise = [];
      devises.map(d => {
        if (devise.filter(code => code === d.toObject().code).length === 0) {
          devise.push(d.toObject().code);
        }
      });
      this.setState({ devise });
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

  handleChovochement = () => {
    const {
      coursdechange,
      dateDebut,
      dateFin,
      convertir,
      taux,
      deviseCible,
      type
    } = this.state;
    // date debut entred
    let dateDebutParts = dateDebut.split("-");
    let myDateDebut = new Date(
      dateDebutParts[0],
      dateDebutParts[1] - 1,
      dateDebutParts[2]
    );
    //date fin entred
    let dateFinParts = dateFin.split("-");
    let myDateFin = new Date(
      dateFinParts[0],
      dateFinParts[1] - 1,
      dateFinParts[2]
    );

    coursdechange.map(change => {
      if (
        change.convertir === convertir &&
        change.deviseCible === deviseCible &&
        change.taux !== taux
      ) {
        // date debut already exist
        let changedateDebutParts = change.dateDebut.split("-");
        let mychangeDateDebut = new Date(
          changedateDebutParts[0],
          changedateDebutParts[1] - 1,
          changedateDebutParts[2]
        );
        // date fin already exist
        let changedateFinParts = change.dateFin.split("-");
        let mychangeDateFin = new Date(
          changedateFinParts[0],
          changedateFinParts[1] - 1,
          changedateFinParts[2]
        );

        // if date fin entred is inbetween date already exist we split this date into two parts
        // if year entred inbetween date already exist

        let year = -1,
          month = -1,
          day = -1;
        if (
          myDateFin.getTime() >= mychangeDateDebut.getTime() &&
          myDateFin.getTime() <= mychangeDateFin.getTime()
        ) {
          year = myDateFin.getFullYear();
          month = myDateFin.getMonth();
          day = myDateFin.getDate() + 1;
          // push the new date to the table ( if only day is setted !!!)

          if (day !== -1 && month !== -1 && year !== -1) {
            // if (day === 32) {
            //   month = month + 1;
            //   day = 1;
            // }
            // if (month === 12) {
            //   year = year + 1;
            //   month = 0;
            // }
            coursdechange.push({
              id: this.getId(coursdechange),
              dateDebut:
                year +
                "-" +
                ("0" + (month + 1)).slice(-2) +
                "-" +
                ("0" + day).slice(-2),
              dateFin: change.dateFin,
              convertir,
              taux: change.taux,
              deviseCible
            });
          }
        }

        // if date debut entred is inbetween date already exist we split this date into two parts
        // if year entred inbetween date already exist
        if (
          myDateDebut.getTime() >= mychangeDateDebut.getTime() &&
          myDateDebut.getTime() <= mychangeDateFin.getTime()
        ) {
          // if month entred inbetween date already exist

          mychangeDateFin.setFullYear(myDateDebut.getFullYear());
          mychangeDateFin.setMonth(myDateDebut.getMonth());
          mychangeDateFin.setDate(myDateDebut.getDate() - 1);
          //change the current date fin

          // if (mychangeDateFin.getDate() === 0) {
          //   mychangeDateFin.setMonth(mychangeDateFin.getMonth() - 1);
          //   mychangeDateFin.setDate(31);
          // }
          // if (mychangeDateFin.getMonth() === -1) {
          //   mychangeDateFin.setFullYear(mychangeDateFin.getFullYear() - 1);
          //   mychangeDateFin.setMonth(11);
          // }
          change.dateFin =
            mychangeDateFin.getFullYear() +
            "-" +
            ("0" + (mychangeDateFin.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + mychangeDateFin.getDate()).slice(-2);
        }
      }
    });

    coursdechange.push({
      id: this.getId(coursdechange),
      dateDebut,
      dateFin,
      convertir,
      taux,
      deviseCible
    });
    this.setState({ coursdechange });
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
        this.handleChovochement();

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
      devise,
      dateDebut,
      dateFin,
      convertir,
      taux,
      deviseCible,
      selectedRows,
      type
    } = this.state;
    const elements = (
      <Tooltip title="Sauvegarder">
        <Button
          className={classes.done}
          variant="contained"
          color="primary"
          onClick={this.updateListesDeBase}
          form="ListesDeBase"
        >
          <SaveIcon />
        </Button>
      </Tooltip>
    );
    return (
      <div>
        <PageTitle
          title="Cours de change"
          pathname="/Logistique/Paramétrage/Configuration de base/Cours de change"
          elements={elements}
          withBackOption={true}
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <ValidatorForm onSubmit={this.handleAdd} className={classes.root}>
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
                  type="date"
                  style={{ width: "80%" }}
                  value={dateFin}
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  label="Date de fin * "
                  id="#dateFin"
                />
              </Grid>
              <Grid item xs={2} md={2}>
                <SelectValidator
                  label="Convertir *"
                  value={convertir}
                  style={{ width: "80%" }}
                  onChange={this.handleChange}
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  inputProps={{
                    name: "convertir",
                    id: "type-unite"
                  }}
                >
                  {devise.map(d => (
                    <MenuItem value={d}>{d}</MenuItem>
                  ))}
                </SelectValidator>
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
              <Grid item xs={2} md={2}>
                <SelectValidator
                  label="Devise cible * "
                  value={deviseCible}
                  style={{ width: "80%" }}
                  onChange={this.handleChange}
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  inputProps={{
                    name: "deviseCible",
                    id: "type-unite"
                  }}
                >
                  {devise.map(d => (
                    <MenuItem value={d}>{d}</MenuItem>
                  ))}
                </SelectValidator>
              </Grid>
              <Grid item md={2} />
            </Grid>
            <Grid container style={{ marginTop: 15 }}>
              <Grid item xs={2} md={1}>
                <Tooltip title="Ajouter">
                  <Button type="submit" variant="contained" color="primary">
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={2} md={1}>
                <Tooltip title="Supprimer">
                  <Button
                    className={classes.cancel}
                    variant="contained"
                    color="primary"
                    disabled={selectedRows.length == 0}
                    onClick={this.handleDelete}
                  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
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
  updateListesDeBase: bindActionCreators(updateAction, dispatch),
  fetchDevise: bindActionCreators(fetchDevise, dispatch)
});
const reducer = "ListesDeBase";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg"),
  loading: state.get(reducer).get("loading"),
  dataTable: state.get(reducer).get("dataTable"),
  devise: state.get(reducer).get("devise"),
  branch: state.get(reducer).get("branch")
});

// //const reducer = "initval";
const UnitesReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Unites);

export default withStyles(styles)(UnitesReduxed);
