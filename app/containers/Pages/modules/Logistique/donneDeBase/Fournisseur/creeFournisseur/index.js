import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Container, Card, Row } from "@material-ui/core/";
import {
  lighten,
  darken,
  fade
} from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PageTitle, Notification, FloatingPanel } from "enl-components";
import Grid from "@material-ui/core/Grid";
import {
  addItem,
  fetchItem,
  closeNotifAction,
  fetchUnites
} from "../../../reducers/crudLogisticActions";
import Initial from "./Initial";
import Base from "./Base";
import Bancaire from "./Bancaire";
import Comptable from "./Comptable";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import FiberNew from "@material-ui/icons/FiberNew";

import Edit from "@material-ui/icons/Edit";
import GererFournisseur from "../GererFournisseur/index";
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
  done: {
    color: "#4db6ac",
    "&:hover": {
      color: "#009688"
    }
  },
  cancel: {
    marginRight: "1em",
    color: "#e57373",
    "&:hover": {
      color: "#f44336"
    }
  },
  copy: {
    marginRight: "1em",
    color: "white",
    backgroundColor: "#e0e0e0",
    "&:hover": {
      backgroundColor: "#9e9e9e"
    }
  },
  grid: {
    flexGrow: 1,
    marginTop: theme.spacing(1)
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
  }
});

class CreerFournisseur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: [
        "Données initiales",
        "Données de base",
        "Données bancaires",
        "Données comptables"
      ],
      data: {
        contacts: [],
        coord_bancaire: [],
        honoraire: false,
        identifiant_fiscale: "",
        ice: "",
        patente: "",
        cnss: "",
        regestre_commerce: "",
        taux_tva: ""
      }
    };
  }

  componentWillMount() {
    const { fetchUnites } = this.props;

    fetchUnites("configurationdebase/listesdebase/findPays", "pays", true);
    fetchUnites("configurationdebase/listesdebase/findVilles", "villes", true);
    fetchUnites(
      "configurationdebase/listesdebase/findBanques",
      "banques",
      true
    );
    fetchUnites(
      "configurationdebase/listesdebase/findLangues",
      "langues",
      true
    );
    fetchUnites(
      "configurationdebase/listesdebase/findHonorire",
      "honoraires",
      true
    );
    fetchUnites("configurationdebase/unites/findDevises", "devises", true);
  }

  addContact = contact => {
    let data = { ...this.state.data };
    data.contacts.push(contact);
    this.setState({ data });
  };

  removeContact = indexs => {
    let data = { ...this.state.data };
    let new_contacts = data.contacts;
    data.contacts = new_contacts.filter((_, idx) => !indexs.includes(idx));

    this.setState({ data });
  };

  removeCoordonne = indexs => {
    let data = { ...this.state.data };
    let new_coord_bancaire = data.coord_bancaire;

    data.coord_bancaire = new_coord_bancaire.filter(
      (_, idx) => !indexs.includes(idx)
    );
    this.setState({ data });
  };

  addCoordonneBancaire = coordonne => {
    let data = {
      ...this.state.data
    };
    if (data.coord_bancaire.length === 0) {
      data.coord_bancaire.push({
        id_compte: 1,
        ...coordonne
      });
    } else {
      let id_compte =
        data.coord_bancaire[data.coord_bancaire.length - 1].id_compte + 1;
      data.coord_bancaire.push({
        ...coordonne,
        id_compte
      });
    }

    this.setState({ data });
  };
  handleOpen = () => {
    const { code } = this.state.data;
    let url = `findByCode/${code}`;
    this.props.fetchFournisseur(url, "fournisseur", true);
    this.setState({ openForm: true });
  };
  handleClose = () => {
    this.setState({ openForm: false });
  };

  handleChange = event => {
    const { value, name } = event.target;
    let data = { ...this.state.data };
    const { honoraires } = this.props;
    switch (name) {
      case "pays":
        if (value === "Maroc") data.retenu_a_la_source = false;
        else delete data.retenu_a_la_source;
        data[name] = value;
        this.setState({ data });
        break;
      case "retenu_a_la_source":
        data.retenu_a_la_source = !data.retenu_a_la_source;
        this.setState({ data });
        break;
      case "condition_paiement":
        if (value === "Immédiat") delete data.nombre_jours;
        data[name] = value;
        this.setState({ data });
        break;
      case "honoraire":
        if (data.honoraire) {
          delete data.status_honoraire;
          delete data.taux_tva;
        }
        data.honoraire = !data.honoraire;
        this.setState({ data });
        break;

      case "status_honoraire":
        const honoraire = honoraires.filter(
          honoraire => honoraire.code === value
        );
        data.taux_tva = honoraire[0].tva;
        data.status_honoraire = value;

        this.setState({ data });
        break;
      default:
        this.setState({ data: { ...this.state.data, [name]: value } });
        break;
    }
    this.setState({
      formChanged: true
    });
  };

  getStepContent = stepIndex => {
    const {
      classes,
      loading,
      devises,
      pays,
      villes,
      langues,
      banques,
      honoraires
    } = this.props;

    if (loading)
      return (
        <center>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </center>
      );
    switch (stepIndex) {
      case 0:
        return (
          <Initial
            data={this.state.data}
            handleSubmit={this.handleSubmit}
            classes={classes}
            handleChange={this.handleChange}
          />
        );
      case 1:
        return (
          <Base
            data={this.state.data}
            handleSubmit={this.handleSubmit}
            classes={classes}
            handleChange={this.handleChange}
            addContact={this.addContact}
            removeContact={this.removeContact}
            pays={pays}
            villes={villes}
            langues={langues}
          />
        );
      case 2:
        return (
          <Bancaire
            data={this.state.data}
            handleSubmit={this.handleSubmit}
            classes={classes}
            handleChange={this.handleChange}
            addCoordonneBancaire={this.addCoordonneBancaire}
            removeCoordonne={this.removeCoordonne}
            pays={pays}
            villes={villes}
            banques={banques}
            devises={devises}
          />
        );
      default:
        return (
          <Comptable
            data={this.state.data}
            classes={classes}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            devises={devises}
            honoraires={honoraires}
          />
        );
    }
  };

  handleNext = () => {
    const activeStep = this.state.activeStep + 1;
    this.setState({ activeStep });
  };

  handleBack = () => {
    const activeStep = this.state.activeStep - 1;
    this.setState({ activeStep });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,

      data: { contacts: [], coord_bancaire: [], honoraire: false }
    });
  };

  handleSubmit = () => {
    const { data } = this.state;
    if (this.state.activeStep == 3)
      this.props.addFournisseur(data, "fournisseur");
    this.handleNext();
  };

  render() {
    const { classes, closeNotif, notifMsg } = this.props;
    const { activeStep } = this.state;
    const elements =
      this.state.activeStep === this.state.steps.length ? (
        <>
          <Tooltip
            title="
            Crééer un autre fournisseur"
          >
            <IconButton
              variant="contained"
              className={classes.done}
              color="primary"
              onClick={this.handleReset}
              size="small"
            >
              <FiberNew />
            </IconButton>
          </Tooltip>

          <Tooltip title="Gerer ce fournisseur">
            <IconButton
              variant="contained"
              // className={classes.done}
              color="primary"
              onClick={this.handleOpen}
              size="small"
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip
          title={
            this.state.activeStep === this.state.steps.length - 1
              ? "Sauvegarder"
              : "Suivant"
          }
        >
          <IconButton
            className={
              this.state.activeStep === this.state.steps.length - 1
                ? classes.done
                : classes.button
            }
            variant="contained"
            color="primary"
            type="submit"
            form="addfourni"
            size="small"
          >
            {this.state.activeStep === this.state.steps.length - 1 ? (
              <SaveIcon />
            ) : (
              <ArrowForward />
            )}
          </IconButton>
        </Tooltip>
      );

    const precedent = (
      <Tooltip title="Precedent">
        <IconButton
          // onClick={submitter}
          // className={classes.button}
          variant="outlined"
          color="primary"
          disabled={activeStep === 0}
          onClick={this.handleBack}
          className={classes.backButton}
          size="small"
        >
          <ArrowBack />
        </IconButton>
      </Tooltip>
    );

    return (
      <div>
        <PageTitle
          title="Ajouter fournisseur"
          pathname="/Logistique/Données de base/Fournisseur/Ajouter fournisseur"
          elements={elements}
          withBackOption={true}
          precedent={precedent}
          leftElements={activeStep !== this.state.steps.length}
          formChanged={this.state.formChanged}
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />

        <FloatingPanel
          title={"Gerer caisse"}
          openForm={this.state.openForm}
          closeForm={this.handleClose}
          branch=""
        >
          {this.state.openForm && (
            <GererFournisseur
              panelEditing={true}
              closeForm={this.handleClose}
              code={this.state.data.code}
            />
          )}
        </FloatingPanel>

        <Card small className="mb-4">
          <div>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
              {this.state.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className={classes.root}>
              {this.state.activeStep < this.state.steps.length && (
                <div>
                  <Typography className={classes.instructions}>
                    {this.getStepContent(this.state.activeStep)}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      // </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeNotif: () => dispatch(closeNotifAction()),
  addFournisseur: bindActionCreators(addItem, dispatch),
  fetchUnites: bindActionCreators(fetchUnites, dispatch),
  fetchFournisseur: bindActionCreators(fetchItem, dispatch)
});

const mapStateToProps = state => {
  return {
    notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
    loading: state.get("crudLogisticReducer").get("loading"),
    devises: state.get("crudLogisticReducer").get("devises"),
    pays: state.get("crudLogisticReducer").get("pays"),
    villes: state.get("crudLogisticReducer").get("villes"),
    langues: state.get("crudLogisticReducer").get("langues"),
    banques: state.get("crudLogisticReducer").get("banques"),
    honoraires: state.get("crudLogisticReducer").get("honoraires")
  };
};

// //const reducer = "initval";
const CreerFournisseurReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerFournisseur);

export default withStyles(styles)(CreerFournisseurReduxed);
