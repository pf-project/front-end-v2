import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Grid,
  Card,
  Row,
  FormGroup,
  MenuItem,
  Toolbar,
  TextField,
  Select,
  InputLabel
} from "@material-ui/core";
import {
  lighten,
  darken,
  fade
} from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import CardContent from "@material-ui/core/CardContent";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PageTitle, Notification, SimpleTable } from "enl-components";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { grey } from "@material-ui/core/colors";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Undo, Done, Close } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  addItem,
  closeNotifAction,
  fetchUnites,
  fetchDesignation
} from "../../../reducers/crudComptabiliteActions";

const styles = theme => ({
  root: {
    width: "90%",
    margin: "2em"
  },
  backButton: {
    marginRight: "1em"
  },
  done: {
    color: "white",
    backgroundColor: "#4db6ac",
    "&:hover": {
      color: "white",
      backgroundColor: "#009688"
    }
  },
  cancel: {
    marginRight: "1em",
    backgroundColor: "#e57373",
    "&:hover": {
      backgroundColor: "#f44336"
    }
  },
  fermer: {
    marginRight: "1em",
    color: "#e57373",
    "&:hover": {
      color: "#f44336"
    }
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

class CreerCaisse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      classe: "1",
      rubrique: "11",
      poste: "111",
      comptepere: "1111.Capital social",
      comptegeneral: "",
      designation: "",
      credit: 0,
      debit: 0,
      data: {
        dateComptable: "2019-01-01",
        lettrageManuel: "",
        libelleOperation: "",
        reference: "",
        journal: "",
        dataTable: []
      },
      open: false,
      errorMsg: "",
      showButton: false,
      editing: false,
      rowIndex: -1
    };
  }

  handleFocus = () => {
    this.setState({
      showButton: true
    });
  };

  componentWillReceiveProps(nextProps) {
    const { designation, data } = nextProps;
    let state = {};

    if (designation) {
      state.designation = designation;
    }
    if (data) {
      state.data = data;
    }
    this.setState(state);
  }

  handleOnBlur = () => {
    const { fetchDesignation } = this.props;
    const { comptegeneral } = this.state.data;
    if (comptegeneral) {
      fetchDesignation(
        "donneedebase/comptegeneral/findDesignation/" + comptegeneral
      );
    }
    // this.setState({ showButton: false });
  };

  handleChange = event => {
    const { value, name } = event.target;
    const { data } = this.state;
    switch (name) {
      case "classe":
        this.props.fetchUnites(
          "donneedebase/comptegeneral/findRubriquesByClasse/" + value,
          "rubriques",
          true
        );

        this.setState({ [name]: value });
        break;
      case "rubrique":
        this.props.fetchUnites(
          "donneedebase/comptegeneral/findPostesByRubrique/" + value,
          "postes",
          true
        );

        this.setState({ [name]: value });
        break;
      case "poste":
        this.props.fetchUnites(
          "donneedebase/comptegeneral/findComptesByPoste/" + value,
          "comptes",
          true
        );
        this.setState({ [name]: value });
        break;
      case "comptepere":
        this.setState({
          [name]: value
        });

        break;
      case "comptegeneral":
        if (value) {
          this.setState({
            designation: this.props.designation
          });
        } else {
          this.setState({
            designation: ""
          });
        }
        break;
    }
    this.setState({
      data: { ...this.state.data, [name]: value },
      [name]: value,
      formChanged: true
    });
  };

  componentWillMount() {
    this.props.fetchUnites(
      "donneedebase/comptegeneral/findClasses",
      "lesclasses",
      true
    );
    this.props.fetchUnites(
      "donneedebase/comptegeneral/findRubriquesByClasse/1",
      "rubriques",
      true
    );
    this.props.fetchUnites(
      "donneedebase/comptegeneral/findPostesByRubrique/11",
      "postes",
      true
    );

    this.props.fetchUnites(
      "donneedebase/comptegeneral/findComptesByPoste/111",
      "comptes",
      true
    );
  }

  handleSelect = index => () => {
    const { selectedRows } = this.state;
    if (selectedRows.includes(index)) {
      const newSelectedRows = [...selectedRows];
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1);
      this.setState({
        selectedRows: newSelectedRows,
        editing: false,
        rowIndex: -1,
        comptegeneral: "",
        designation: "",
        debiterCrediter: "Crédit",
        montant: ""
      });
    } else {
      this.handleEdit(index);
      this.setState({
        selectedRows: [index]
      });
    }
  };

  handleEdit = index => {
    const { dataTable } = this.state.data;
    const data = dataTable.filter((_, idx) => idx === index)[0];
    this.setState({
      ...this.state,
      editing: true,
      rowIndex: index,
      comptegeneral: data.comptegeneral + "",
      designation: data.designation,
      debiterCrediter: data.debiterCrediter,
      montant: data.montant
    });
  };

  handleEditClick = () => {
    const { dataTable } = this.state.data;
    const {
      rowIndex,
      comptegeneral,
      designation,
      montant,
      debiterCrediter
    } = this.state;

    dataTable[rowIndex] = {
      comptegeneral,
      designation,
      montant,
      debiterCrediter,
      debit: debiterCrediter === "Crédit" ? 0 : montant,
      credit: debiterCrediter === "Crédit" ? montant : 0
    };
    this.setState({
      ...this.state,
      selectedRows: [],
      data: { ...this.state.data, dataTable }
    });
    this.calculDebitCredit(dataTable);
  };

  handleAdd = () => {
    const { dataTable } = this.state.data;
    const { comptegeneral, designation, debiterCrediter, montant } = this.state;
    const existedCompte = dataTable.filter(
      item => item.comptegeneral === parseInt(comptegeneral)
    );

    if (!existedCompte.length) {
      dataTable.push({
        comptegeneral: parseInt(comptegeneral),
        designation,
        debiterCrediter,
        montant,
        debit: debiterCrediter === "Crédit" ? 0 : montant,
        credit: debiterCrediter === "Crédit" ? montant : 0
      });
      this.setState({
        data: { ...this.state.data, dataTable },
        comptegeneral: "",
        designation: "",
        debiterCrediter: "Crédit",
        montant: ""
      });
      this.calculDebitCredit(dataTable);
    } else {
      this.setState({
        errorMsg:
          "Vous pouvez pas utiliser le même compte en débit et en crédit"
      });
    }
  };

  handleDelete = () => {
    const { selectedRows } = this.state;
    const { dataTable } = this.state.data;
    let newData = [];
    newData = dataTable.filter((_, idx) => !selectedRows.includes(idx));
    this.setState({
      data: { ...this.setState.data, dataTable: newData },
      selectedRows: []
    });
    this.calculDebitCredit(newData);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleValider = () => {
    const { comptepere } = this.state;
    this.setState({
      comptegeneral: String(comptepere).slice(0, 4),
      designation: String(comptepere).slice(5, String(comptepere).length)
    });
    this.handleClose();
  };

  calculDebitCredit = dataTable => {
    let credit = 0;
    let debit = 0;
    dataTable.map(operation => {
      switch (operation.debiterCrediter) {
        case "Crédit":
          credit += parseInt(operation.montant);
          break;
        case "Débit":
          debit += parseInt(operation.montant);
          break;
      }
    });
    this.setState({ credit, debit });
  };

  handleReset = () => {
    this.setState({
      selectedRows: [],
      comptegeneral: "",
      credit: 0,
      debit: 0,
      comptegeneral: "",
      designation: "",
      debiterCrediter: "Crédit",
      montant: "",
      data: {
        dateComptable: "2019-01-01",
        lettrageManuel: "",
        libelleOperation: "",
        reference: "",
        journal: "",
        dataTable: []
      }
    });
  };

  handleClickAway = () => {
    this.setState({ showButton: false });
  };

  handleComptabiliseSubmit = () => {
    const { credit, debit, data } = this.state;
    const { onClose, fetch_ecritures_comptable } = this.props;

    // minimum two operation to comptabilise
    if (data.dataTable.length < 2) {
      this.setState({
        errorMsg: "Il faut que il y a au moins deux opérations"
      });
    } else if (credit !== debit) {
      this.setState({
        errorMsg: "Total débit et total crédit ne sont pas égaux !"
      });
    } else {
      this.props.addEcritureComptable(
        data,
        "comptabilitegenerale/ecriturecomptable"
      );

      if (onClose) {
        fetch_ecritures_comptable(
          "find",
          "comptabilitegenerale/ecriturecomptable",
          true
        );
        onClose();
      }
      this.handleReset();
    }
  };

  render() {
    // let data;
    // if (this.props.data) data = this.props.data;
    // else data = this.state.data;

    const {
      classes,
      closeNotif,
      notifMsg,
      lesclasses,
      rubriques,
      postes,
      comptes,
      loading
    } = this.props;
    const {
      data,
      selectedRows,
      open,
      classe,
      rubrique,
      poste,
      comptepere,
      comptegeneral,
      designation,
      debiterCrediter,
      montant,
      errorMsg,
      showButton,
      editing
    } = this.state;

    const headers = [
      "Compte général",
      "Désignation de compte",
      "Débit/Crédit",
      "Montant",
      "Débit",
      "Crédit"
    ];

    const elements = (
      <>
        {/* <Grid item sm={2} lg={2}> */}
        <Tooltip title="Vider">
          <IconButton
            // className={classes.cancel}
            onClick={this.handleReset}
            variant="contained"
            color="primary"
            size="small"
          >
            <Undo />
          </IconButton>
        </Tooltip>
        {/* </Grid> */}
        {/* <Grid item sm={2} lg={2}> */}
        <Tooltip title="Comptabiliser">
          <IconButton
            // className={classes.done}
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.handleSubmit}
            form="comptabiliser"
            size="small"
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        {/* </Grid> */}
      </>
    );
    return (
      <div>
        <PageTitle
          title={Boolean(this.props.data) ? "" : "Créer une écriture comptable"}
          pathname={
            Boolean(this.props.data)
              ? "/"
              : "/Comptabilite/Comptabilité générale/Écriture comptable/créer une écriture comptable"
          }
          elements={elements}
          withBackOption={!Boolean(this.props.data)}
          formChanged={this.state.formChanged}
        />
        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <Notification
          close={() => {
            this.setState({ errorMsg: "" });
            closeNotif();
          }}
          message={errorMsg}
          branch=""
        />
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            className={classes.grid}
            direction="column"
          >
            <ValidatorForm
              id="comptabiliser"
              onSubmit={this.handleComptabiliseSubmit}
            >
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <SelectValidator
                        onChange={this.handleChange}
                        className={classes.field}
                        value={data.journal}
                        name="journal"
                        validators={["required"]}
                        errorMessages={["champ obligatoire"]}
                        label="Journal *:"
                      >
                        <MenuItem value="Ventes">Ventes</MenuItem>

                        <MenuItem value="Achats">Achats</MenuItem>

                        <MenuItem value="Opérations diverses">
                          Opérations diverses
                        </MenuItem>

                        <MenuItem value="Trésorerie">Trésorerie</MenuItem>
                      </SelectValidator>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <TextValidator
                        // fullWidth={true}
                        className={classes.field}
                        onChange={this.handleChange}
                        name="reference"
                        validators={["required"]}
                        errorMessages={["champ obligatoire"]}
                        value={data.reference}
                        label="Référence *:"
                        id="#reference"
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <TextValidator
                        // fullWidth={true}
                        className={classes.field}
                        onChange={this.handleChange}
                        name="dateComptable"
                        value={data.dateComptable}
                        type="date"
                        label="Date comptable : "
                        id="#dateComptable"
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <TextValidator
                        // fullWidth={true}
                        className={classes.field}
                        onChange={this.handleChange}
                        name="lettrageManuel"
                        value={data.lettrageManuel}
                        label="Lettrage manuel "
                        id="#lettrageManuel"
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <TextValidator
                        onChange={this.handleChange}
                        className={classes.field}
                        value={data.libelleOperation}
                        name="libelleOperation"
                        validators={["required"]}
                        errorMessages={["champ obligatoire"]}
                        label="Libellé d'opération* :"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Grid>
            </ValidatorForm>

            {/* choisir compte general dialog */}
            <ValidatorForm>
              <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
              >
                {" "}
                <DialogTitle id="alert-dialog-title">
                  {" "}
                  Choisir un compte général
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <FormGroup>
                      <Grid item xs={10}>
                        <SelectValidator
                          className={classes.field}
                          onChange={this.handleChange}
                          disabled={loading}
                          name="classe"
                          value={classe}
                          id="#classe"
                          label="Classe"
                        >
                          {lesclasses &&
                            lesclasses.map(compte => (
                              <MenuItem value={compte.compte}>
                                {compte.compte + "." + compte.designation}
                              </MenuItem>
                            ))}
                        </SelectValidator>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid item xs={10}>
                        <SelectValidator
                          className={classes.field}
                          onChange={this.handleChange}
                          disabled={loading}
                          name="rubrique"
                          value={rubrique}
                          id="#rubrique"
                          label="Rubrique"
                        >
                          {rubriques &&
                            rubriques.map(compte => (
                              <MenuItem value={compte.compte}>
                                {compte.compte + "." + compte.designation}
                              </MenuItem>
                            ))}
                        </SelectValidator>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid item xs={10}>
                        <SelectValidator
                          className={classes.field}
                          onChange={this.handleChange}
                          disabled={loading}
                          name="poste"
                          value={poste}
                          id="#poste"
                          label="Poste"
                        >
                          {postes &&
                            postes.map(compte => (
                              <MenuItem value={compte.compte}>
                                {compte.compte + "." + compte.designation}
                              </MenuItem>
                            ))}
                        </SelectValidator>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                      <Grid item xs={10}>
                        <SelectValidator
                          className={classes.field}
                          onChange={this.handleChange}
                          disabled={loading}
                          name="comptepere"
                          value={comptepere}
                          id="#comptepere"
                          label="Compte général"
                        >
                          {comptes &&
                            comptes.map(compte => (
                              <MenuItem
                                value={compte.compte + "." + compte.designation}
                              >
                                {compte.compte + "." + compte.designation}
                              </MenuItem>
                            ))}
                        </SelectValidator>
                      </Grid>
                    </FormGroup>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Tooltip title="Valider">
                    <IconButton
                      onClick={this.handleValider}
                      color="primary"
                      autoFocus
                      // className={classes.done}
                      size="small"
                    >
                      <Done />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Fermer">
                    <IconButton
                      onClick={this.handleClose}
                      // className={classes.fermer}
                      color="primary"
                      autoFocus
                      size="small"
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </DialogActions>
              </Dialog>
            </ValidatorForm>
          </Grid>
          <Grid item xs={12}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <Typography variant="h6">Les opérations</Typography>
              </div>
            </Toolbar>
          </Grid>
          <ValidatorForm onSubmit={this.handleAdd}>
            <Grid container>
              <Grid container>
                <Grid item xs={12} md={2}>
                  <ClickAwayListener onClickAway={this.handleClickAway}>
                    <TextValidator
                      onChange={this.handleChange}
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleFocus}
                      name="comptegeneral"
                      type="number"
                      // style={{ width: "80%" }}
                      value={comptegeneral}
                      validators={["required", "maxStringLength:8"]}
                      errorMessages={[
                        "champ obligatoire",
                        "maximum 8 chiffres"
                      ]}
                      label="Code général "
                      id="#comptegeneral"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {showButton && (
                              <IconButton
                                edge="start"
                                aria-label="toggle password visibility"
                                // onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                              >
                                <IconButton
                                  onClick={this.handleClickOpen}
                                  size="small"
                                >
                                  <i className="material-icons">list_alt</i>
                                </IconButton>
                              </IconButton>
                            )}
                          </InputAdornment>
                        )
                      }}
                    />
                  </ClickAwayListener>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextValidator
                    style={{ width: "80%" }}
                    // className={classes.field}
                    onChange={this.handleChange}
                    name="designation"
                    validators={["required"]}
                    errorMessages={["champ obligatoire"]}
                    value={this.props.loading ? "" : designation}
                    label="Désignation "
                    inputProps={{ readOnly: true }}
                    id="#designation"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <SelectValidator
                    onChange={this.handleChange}
                    name="debiterCrediter"
                    style={{ width: "80%" }}
                    value={debiterCrediter}
                    validators={["required"]}
                    errorMessages={["champ obligatoire"]}
                    label="Débiter/Créditer "
                    id="#debiterCrediter"
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    <MenuItem value="Débit">Débit</MenuItem>
                    <MenuItem value="Crédit">Crédit</MenuItem>
                  </SelectValidator>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextValidator
                    style={{ width: "80%" }}
                    // className={classes.field}
                    onChange={this.handleChange}
                    name="montant"
                    validators={["required", "isFloat"]}
                    errorMessages={[
                      "champ obligatoire",
                      "champ doit étre un nombre"
                    ]}
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={montant}
                    label="Montant"
                    id="#montant"
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 15 }}>
                <Grid item xs={1}>
                  <Tooltip title="Ajouter">
                    <IconButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Modifier">
                    <IconButton
                      onClick={this.handleEditClick}
                      disabled={!editing}
                      color="primary"
                      autoFocus
                      // className={classes.done}
                      size="small"
                    >
                      <Done />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Supprimer">
                    <IconButton
                      variant="contained"
                      // className={classes.cancel}
                      color="primary"
                      disabled={selectedRows.length == 0}
                      onClick={this.handleDelete}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>

                <Grid item md={6} />
                <Grid item xs={12} md={3}>
                  <Typography variant="h6" component="h2">
                    Total débit : {this.state.debit + " DH"}
                  </Typography>

                  <Typography variant="h6" component="h2">
                    Total crédit : {this.state.credit + " DH"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </ValidatorForm>

          <SimpleTable
            data={data.dataTable}
            selectedRows={selectedRows}
            handleSelect={this.handleSelect}
            headers={headers}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeNotif: () => dispatch(closeNotifAction()),
  addEcritureComptable: bindActionCreators(addItem, dispatch),
  fetchUnites: bindActionCreators(fetchUnites, dispatch),
  fetchDesignation: bindActionCreators(fetchDesignation, dispatch)
});
const reducer = "crudComptabiliteReducer";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg"),
  loading: state.get(reducer).get("loading"),
  designation: state.get(reducer).get("designation"),
  rubriques: state.get(reducer).get("rubriques"),
  postes: state.get(reducer).get("postes"),
  comptes: state.get(reducer).get("comptes"),
  lesclasses: state.get(reducer).get("lesclasses")
});

const CreerCaisseReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerCaisse);

export default withStyles(styles)(CreerCaisseReduxed);
