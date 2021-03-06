import React, { Component } from "react";
import { PageTitle, Notification } from "enl-components";
import { withStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import {
  Chip,
  Grid,
  Card,
  MenuItem,
  Toolbar,
  IconButton
} from "@material-ui/core";
import {
  closeNotifAction,
  fetchItem
} from "../../reducers/crudComptabiliteActions";
import LivreElement from "./LivreElement";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreeEcrtitureComptable from "../EcritureComptable/CreerEcritureComptable/index";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Undo, Add, Close } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { Paper } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
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
  paperCard: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 1000
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
  chip: {
    margin: theme.spacing(0.5)
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
  modal: {
    position: "absolute",
    // top: 1000,
    // left: "10%",
    overflow: "scroll",
    height: "80%",
    width: "80%",
    display: "block"
  },
  headerButton: {
    marginLeft: theme.spacing(1)
  },
  LivreElement: {
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

class GrandLivre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { journal: "Grand Livre" },
      index: -1,
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ index: -1, element: {}, open: false });
  };

  componentWillMount = () => {
    const { fetch_ecritures_comptable } = this.props;
    fetch_ecritures_comptable(
      "find",
      "comptabilitegenerale/ecriturecomptable",
      true
    );
  };

  handleChange = event => {
    const { name, value } = event.target;

    if (value === "") return false;
    return this.setState({
      filters: { ...this.state.filters, [name]: value }
    });
  };

  deleteFromFilters = element => () => {
    let { filters } = this.state;
    delete filters[element];
    this.setState({ filters });
  };

  findSimilarLettrage = lettrage => () => {
    const { filters } = this.state;
    filters["lettrageManuel"] = lettrage;
    this.setState({ filters });
  };

  handleSelect = ({ element, index }) => event => {
    let prevIndex = this.state.index;
    if (prevIndex === index) return this.setState({ index: -1, element: {} });
    let reversedDataTable = element.dataTable.map(row => {
      return {
        ...row,
        credit: row.debit,
        debit: row.credit,
        debiterCrediter: row.debiterCrediter === "Débit" ? "Crédit" : "Débit"
      };
    });
    // element.dataTable = reversedDataTable;
    this.setState({
      index,
      element: { ...element, dataTable: reversedDataTable }
    });
  };

  filterTable = ({ table, filters }) => {
    let filtredTable = table.filter(element => {
      for (var key in filters) {
        let dateComptable;
        let createdAt;
        switch (key) {
          case "dateCreationDebut":
            createdAt = new Date(element.createdAt);
            let dateCreationDebut = new Date(filters.dateCreationDebut);
            if (createdAt.getTime() < dateCreationDebut.getTime()) return false;
            break;

          case "dateCreationFin":
            createdAt = new Date(element.createdAt);
            let dateCreationFin = new Date(filters.dateCreationFin);
            if (createdAt.getTime() > dateCreationFin.getTime()) return false;
            break;
          case "dateComptableDebut":
            dateComptable = new Date(element.dateComptable);
            let dateComptableDebut = new Date(filters.dateComptableDebut);
            if (dateComptable.getTime() < dateComptableDebut.getTime())
              return false;
            break;
          case "dateComptableFin":
            dateComptable = new Date(element.dateComptable);
            let dateComptableFin = new Date(filters.dateComptableFin);
            if (dateComptable.getTime() > dateComptableFin.getTime())
              return false;
            break;
          case "codeGenerale":
            let found = element.dataTable.find(
              row => row.comptegeneral === filters.codeGenerale
            );
            if (!Boolean(found)) return false;
            break;
          case "journal":
            if (filters["journal"] === "Grand Livre") break;
            if (element["journal"] != filters["journal"]) return false;
          default:
            if (element[key] === undefined || element[key] != filters[key])
              return false;
            break;
        }
      }
      return true;
    });
    return filtredTable;
  };

  getAppliyedFilter = filters => {
    let appliyedFilter = [];
    let { classes } = this.props;
    let keys = Object.keys(filters);
    keys.map(element =>
      appliyedFilter.push(
        <Chip
          label={element + ": " + filters[element]}
          onDelete={this.deleteFromFilters(element)}
          className={classes.chip}
        />
      )
    );
    return appliyedFilter;
  };

  render() {
    const {
      classes,
      closeNotif,
      notifMsg,
      ecritures_comptable,
      fetch_ecritures_comptable,
      loading,
      width
    } = this.props;
    const { filters, index, open, element } = this.state;
    const {
      dateComptableDebut,
      journal,
      lettrageManuel,
      dateComptableFin,
      dateCreationFin,
      dateCreationDebut,
      codeGenerale
    } = filters;
    let dataTable;
    if (ecritures_comptable)
      dataTable = this.filterTable({ filters, table: ecritures_comptable });

    const appliyedFilter = this.getAppliyedFilter(filters);

    // change buttons props based on breakpoints xs/sm/lg ...
    const isSmallScreen = /xs|sm/.test(width);

    const buttonProps = {
      size: isSmallScreen ? "small" : "medium"
    };

    const elements = (
      <>
        <Tooltip
          title="
          Contre-passation"
        >
          <IconButton
            disabled={index < 0}
            variant="contained"
            className={classes.headerButton}
            color="primary"
            onClick={this.handleOpen}
            {...buttonProps}
          >
            <Undo />
          </IconButton>
        </Tooltip>

        <NavLink to="/app/Comptabilite/Comptabilité-générale/Ecriture-comptable/créer-écriture-comptable">
          <Tooltip
            title="
          Ajouter une nouvelle écriture"
          >
            <IconButton
              variant="contained"
              className={classes.headerButton}
              color="primary"
              {...buttonProps}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </NavLink>
      </>
    );

    return (
      <div>
        <PageTitle
          title="Grand livre"
          pathname="/Comptabilité/Comptablité générale/Grand livre"
          withBackOption
          elements={elements}
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <div className={classes.root}>
          <Grid
            container
            //   spacing={1}
            className={classes.grid}
            direction="column"
          >
            {" "}
            <Dialog
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullScreen
            >
              {" "}
              <DialogActions>
                <Tooltip title="Fermer">
                  <IconButton
                    onClick={this.handleClose}
                    className={classes.fermer}
                    color="primary"
                    autoFocus
                    {...buttonProps}
                  >
                    <Close />
                  </IconButton>
                </Tooltip>
              </DialogActions>
              <DialogTitle id="alert-dialog-title">
                {" "}
                Countre passer l'ecriture{" "}
                {this.state.element && this.state.element.ecriture_comptable}
              </DialogTitle>
              <DialogContent>
                <CreeEcrtitureComptable
                  onClose={this.handleClose}
                  data={this.state.element}
                  fetch_ecritures_comptable={fetch_ecritures_comptable}
                />
                <DialogContentText id="alert-dialog-description" />
              </DialogContent>
            </Dialog>{" "}
            <Card className={classes.LivreElement}>
              <ValidatorForm>
                <Grid container direction="row">
                  <Grid item md={6} xs={12}>
                    <SelectValidator
                      onChange={this.handleChange}
                      className={classes.field}
                      value={journal}
                      name="journal"
                      validators={["required"]}
                      errorMessages={["champ obligatoire"]}
                      label="Journal "
                    >
                      <MenuItem value="Grand Livre">Grand Livre</MenuItem>
                      <MenuItem value="Ventes">Ventes</MenuItem>

                      <MenuItem value="Achats">Achats</MenuItem>
                      <MenuItem value="Opérations diverses">
                        Opérations diverses
                      </MenuItem>

                      <MenuItem value="Trésorerie">Trésorerie</MenuItem>
                    </SelectValidator>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      InputLabelProps={{
                        shrink: true
                      }}
                      name="lettrageManuel"
                      onBlur={this.handleChange}
                      value={lettrageManuel}
                      label="Lettrage manuel"
                      className={classes.field}
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      name="dateComptableDebut"
                      onBlur={this.handleChange}
                      value={dateComptableDebut}
                      type="date"
                      label="Date comptable debut"
                      InputLabelProps={{
                        shrink: true
                      }}
                      className={classes.field}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      name="dateComptableFin"
                      onBlur={this.handleChange}
                      value={dateComptableFin}
                      type="date"
                      label="Date comptable fin"
                      InputLabelProps={{
                        shrink: true
                      }}
                      className={classes.field}
                    />
                  </Grid>
                </Grid>

                <Grid container direction="row">
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      name="dateCreationDebut"
                      onBlur={this.handleChange}
                      value={dateCreationDebut}
                      type="date"
                      label="Date création debut"
                      InputLabelProps={{
                        shrink: true
                      }}
                      className={classes.field}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      name="dateCreationFin"
                      onBlur={this.handleChange}
                      value={dateCreationFin}
                      type="date"
                      label="Date création fin"
                      InputLabelProps={{
                        shrink: true
                      }}
                      className={classes.field}
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item md={6} xs={12}>
                    <TextValidator
                      name="codeGenerale"
                      onBlur={this.handleChange}
                      value={codeGenerale}
                      type="number"
                      label="Compte comptable "
                      className={classes.field}
                    />
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Card>
          </Grid>
          <Toolbar className={classes.toolbar}>
            filters :{appliyedFilter}
          </Toolbar>

          {loading && (
            <center>
              <CircularProgress size={24} className={classes.buttonProgress} />
            </center>
          )}

          {!loading &&
            dataTable &&
            dataTable.map((element, index) => (
              <>
                {" "}
                <Paper className={classes.paperCard}>
                  <LivreElement
                    handleSelect={this.handleSelect}
                    findSimilarLettrage={this.findSimilarLettrage}
                    ecritureData={element}
                    classes={classes}
                    index={index}
                    selectedIndex={this.state.index}
                  />{" "}
                </Paper>
              </>
            ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeNotif: () => dispatch(closeNotifAction()),
  fetch_ecritures_comptable: bindActionCreators(fetchItem, dispatch)
});
const reducer = "crudComptabiliteReducer";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg"),
  loading: state.get(reducer).get("loading"),
  ecritures_comptable: state.get(reducer).get("item")
});

const GrandLivreReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrandLivre);

export default withStyles(styles)(withWidth()(GrandLivreReduxed));
