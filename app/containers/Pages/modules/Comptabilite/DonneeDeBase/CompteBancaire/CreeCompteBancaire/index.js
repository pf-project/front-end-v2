import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
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
import { PageTitle, Notification } from "enl-components";
import Grid from "@material-ui/core/Grid";
import {
  addItem,
  closeNotifAction
} from "../../../reducers/crudComptabiliteActions";
import { fetchUnites } from "../../../../Logistique/reducers/crudLogisticActions";

import Initial from "./Initial";
import Base from "./Base";
// import Bancaire from "./Bancaire";
// import Comptable from "./Comptable";
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
  Fullfield: {
    width: "95%"
  },
  initialeFields: {
    width: "60%"
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

class CreerCompteBancaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      steps: ["Données initiales", "Données de base", "Comptes intermédiares"],
      data: {
        code: "BNQ-",
        compte_general_standard: "5141",
        avec_compte_special: false,
        generer_des_comptes_intermidieres: false
      }
    };
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

  handleChange = event => {
    const { value, name } = event.target;
    let data = { ...this.state.data };
    switch (name) {
      case "generer_des_comptes_intermidieres":
        data.generer_des_comptes_intermidieres = !data.generer_des_comptes_intermidieres;
        this.setState({ data });
        break;
      case "avec_compte_special":
        if (data.avec_compte_special) delete data.compte_general_special;
        data.avec_compte_special = !data.avec_compte_special;
        this.setState({ data });
        break;
      case "pays":
        if (value === "Maroc") data.retenu_a_la_source = false;
        else delete data.retenu_a_la_source;
        delete data.ville;
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
      default:
        this.setState({ data: { ...this.state.data, [name]: value } });
        break;
    }
  };

  getStepContent = stepIndex => {
    const { classes, loading, pays, banques, villes } = this.props;
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
            pays={pays}
            banques={banques}
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
            banques={banques}
            villes={villes}
          />
        );
      // case 2:
      //   return (
      //     <Bancaire
      //       data={this.state.data}
      //       handleSubmit={this.handleSubmit}
      //       classes={classes}
      //       handleChange={this.handleChange}
      //       addCoordonneBancaire={this.addCoordonneBancaire}
      //       removeCoordonne={this.removeCoordonne}
      //     />
      //   );
      // default:
      //   return (
      //     <Comptable
      //       data={this.state.data}
      //       classes={classes}
      //       handleChange={this.handleChange}
      //       handleSubmit={this.handleSubmit}
      //     />
      //   );
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

  componentDidMount = () => {
    this.props.fetchUnites(
      "configurationdebase/listesdebase/findPays",
      "pays",
      true
    );
    this.props.fetchUnites(
      "configurationdebase/listesdebase/findBanques",
      "banques",
      true
    );
    this.props.fetchUnites(
      "configurationdebase/listesdebase/findVilles",
      "villes",
      true
    );
  };

  handleSubmit = () => {
    const { data, activeStep } = this.state;
    if (activeStep == 1) console.log(data);
    if (activeStep == 2) this.props.addCompteBancaire(data, "compte-bancaire");
    this.handleNext();
  };

  render() {
    const { classes, closeNotif, notifMsg, pays } = this.props;
    const { activeStep } = this.state;
    const elements =
      this.state.activeStep === this.state.steps.length ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReset}
          >
            Crééer un autre Compte bancaire
          </Button>
        </>
      ) : (
        <>
          {/* <Grid item sm={2} lg={2}> */}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={activeStep === 0}
            onClick={this.handleBack}
            className={classes.backButton}
          >
            Précedent
          </Button>
          {/* </Grid> */}
          {/* <Grid item sm={2} lg={2}> */}

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            form="addCompteBancaire"
          >
            {this.state.activeStep === this.state.steps.length - 1
              ? "Sauvegarder"
              : "Suivant"}
          </Button>

          {/* </Grid> */}
        </>
      );

    return (
      <div>
        <PageTitle
          title="Ajouter compte bancaire"
          pathname="/Comptabilité/Données de base/Compte bancaire/Ajouter compte bancaire"
          elements={elements}
          withBackOption={true}
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />

        <Card small className="mb-4">
          <div className={classes.root}>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
              {this.state.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {this.state.activeStep < this.state.steps.length && (
                <div>
                  <Typography className={classes.instructions}>
                    <ValidatorForm
                      id="addCompteBancaire"
                      onSubmit={this.handleSubmit}
                      autoComplete="off"
                    >
                      {this.getStepContent(this.state.activeStep)}
                    </ValidatorForm>
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
  addCompteBancaire: bindActionCreators(addItem, dispatch),
  fetchUnites: bindActionCreators(fetchUnites, dispatch)
});

const mapStateToProps = state => {
  return {
    notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
    loading: state.get("crudLogisticReducer").get("loading"),
    pays: state.get("crudLogisticReducer").get("pays"),
    banques: state.get("crudLogisticReducer").get("banques"),
    villes: state.get("crudLogisticReducer").get("villes")
  };
};

// // //const reducer = "initval";
const CreerCompteBancaireReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerCompteBancaire);

export default withStyles(styles)(CreerCompteBancaireReduxed);
