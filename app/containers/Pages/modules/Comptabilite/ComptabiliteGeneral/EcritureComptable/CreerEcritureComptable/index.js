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
      showButton: false
    };
  }

  handleFocus = () => {
    this.setState({
      showButton: true
    });
  };

  componentWillReceiveProps(nextProps) {
    const { designation } = nextProps;
    if (designation) {
      this.setState({
        designation
      });
    }
  }

  handleOnBlur = () => {
    const { fetchDesignation } = this.props;
    const { comptegeneral } = this.state.data;
    fetchDesignation(
      "donneedebase/comptegeneral/findDesignation/" + comptegeneral
    );
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
          [name]: value,
          comptegeneral: String(value).slice(0, 4),
          designation: String(value).slice(5, String(value).length)
        });

        break;
      case "comptegeneral":
        if (value) {
          // this.props.fetchDesignation(
          //   "donneedebase/comptegeneral/findDesignation/" + value
          // );

          this.setState({
            designation: this.props.designation,
            showButton: true
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
      [name]: value
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
      this.setState({ selectedRows: newSelectedRows });
    } else {
      this.setState({ selectedRows: [...selectedRows, index] });
    }
  };

  handleAdd = () => {
    const { dataTable } = this.state.data;
    const { comptegeneral, designation, debiterCrediter, montant } = this.state;

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
  };

  handleDelete = () => {
    const { selectedRows } = this.state;
    const { dataTable } = this.state.data;
    let newData = [];
    newData = dataTable.filter((_, idx) => !selectedRows.includes(idx));
    this.setState({ data: { dataTable: newData }, selectedRows: [] });
    this.calculDebitCredit(newData);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
        refenrece: "",
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
      this.handleReset();
    }
  };

  render() {
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
      showButton
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.backButton}
        >
          Comptabiliser
        </Button>
        <Button variant="contained" color="primary" onClick={this.handleReset}>
          Vider
        </Button>
      </>
    );
    return (
      <div>
        <PageTitle
          title="Créer une écriture comptable"
          pathname="/Comptabilite/Comptabilité générale/Écriture comptable/créer une écriture comptable"
          elements={elements}
          withBackOption
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
            <ValidatorForm onSubmit={this.handleComptabiliseSubmit}>
              <Grid item xs={12}>
                <FormGroup>
                  <Grid container>
                    <Grid item xs={5}>
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
                    <Grid item xs={5}>
                      <TextValidator
                        // fullWidth={true}
                        className={classes.field}
                        onChange={this.handleChange}
                        name="refenrece"
                        validators={["required"]}
                        errorMessages={["champ obligatoire"]}
                        value={data.refenrece}
                        label="Référence *:"
                        id="#refenrece"
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5}>
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
                    <Grid item xs={5}>
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
                    <Grid item xs={5}>
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
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Fermer
                  </Button>
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
                <Grid item xs={2}>
                  <TextValidator
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    name="comptegeneral"
                    type="number"
                    // style={{ width: "80%" }}
                    value={comptegeneral}
                    validators={["required", "maxStringLength:8"]}
                    errorMessages={["champ obligatoire", "maximum 8 chiffres"]}
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
                              <ShowButton
                                handleClickOpen={this.handleClickOpen}
                                handleClickAway={this.handleClickAway}
                              />
                            </IconButton>
                          )}
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextValidator
                    style={{ width: "80%" }}
                    // className={classes.field}
                    onChange={this.handleChange}
                    name="designation"
                    validators={["required", "maxStringLength:40"]}
                    errorMessages={["champ obligatoire", "maximum 40 char"]}
                    value={this.props.loading ? "" : designation}
                    label="Désignation "
                    inputProps={{ readOnly: true }}
                    id="#designation"
                  />
                </Grid>
                <Grid item xs={3}>
                  <SelectValidator
                    onChange={this.handleChange}
                    name="debiterCrediter"
                    style={{ width: "80%" }}
                    value={debiterCrediter}
                    validators={["required"]}
                    errorMessages={["champ obligatoire"]}
                    label="Débiter/Créditer "
                    id="#debiterCrediter"
                  >
                    <MenuItem value="Débit">Débit</MenuItem>
                    <MenuItem value="Crédit">Crédit</MenuItem>
                  </SelectValidator>
                </Grid>
                <Grid item xs={3}>
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
                    value={montant}
                    label="Montant"
                    id="#montant"
                  />
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
                <Grid item xs={7} />
                <Grid item xs={3}>
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

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  paper: {
    position: "absolute",
    top: 36,
    right: 0,
    left: 0
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    "&:nth-child(2n)": {
      marginRight: theme.spacing(3)
    }
  }
}));
function ShowButton({ handleClickAway, handleClickOpen }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button onClick={handleClickOpen}>
            <i className="material-icons">list_alt</i>
          </Button>
        </div>
      </ClickAwayListener>
    </div>
  );
}
