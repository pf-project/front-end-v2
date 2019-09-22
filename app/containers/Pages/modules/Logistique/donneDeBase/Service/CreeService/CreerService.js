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
  fetchItem,
  addItem,
  fetchSuggestions,
  closeNotifAction,
  fetchUnites
} from "../../../reducers/crudLogisticActions";
import Commerciale from "./Commerciale";
import Base from "./Base";
import Initiale from "./Initiale";

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

class CreerService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: ["Données initiales", "Données de base", "Données commerciales"],
      data: {
        caracteristiques: [],
        controleexige: false,
        gestionparlot: false
      },
      designations: [],
      categorie: []
    };
  }

  handleSubmitInitial = () => {
    this.handleNext();
  };

  handleSubmitBase = () => {
    this.handleNext();
  };

  handleSubmitCommerciale = () => {
    const { data } = this.state;
    this.props.addService(data, "service");
    this.handleNext();
  };

  // when leaving a price filed this function is executed
  handle_price_leaving = ({ achat, ht }) => event => {
    const { data } = this.state;
    const { name, value } = event.target;
    let taux_tva;
    // if leaving a achat price (ht or ttc)
    if (achat) {
      taux_tva = parseFloat(data.taux_tva_achat);
      // if leaving a hors tax field
      if (ht) {
        // take the price value
        let prix_HT = parseFloat(value);
        // if taux tva achat filled . fill ttc
        if (data.taux_tva_achat) {
          data.prix_achat_TTC = this.calculTTC({ prix_HT, taux_tva });
        }
        // if price with marge fill the marge
        if (data.marge) {
          this.onLeavingMarge({ montant: false })();
        }
        // round the price
        data.prix_achat_HT = prix_HT.toFixed(3);
      } else {
        // if ttc is filled take value
        let prix_TTC = parseFloat(value);
        // if tva is filled fill automaticly the ht
        if (data.taux_tva_achat) {
          data.prix_achat_HT = this.calculHT({ prix_TTC, taux_tva });
          // after filling the ht if marge adjust the marge
          if (data.marge) this.onLeavingMarge({ montant: false })();
        }

        data.prix_TTC = prix_TTC.toFixed(3);
      }
    } // if leaving a vente price (ht or ttc)
    else {
      taux_tva = parseFloat(data.taux_tva_vente);
      // if leaving a hors tax field
      if (ht) {
        // if vente ht is leaved  take the value
        let prix_HT = parseFloat(value);
        // if tva vente is filled fill automaticly the vent ttc
        if (data.taux_tva_vente) {
          data.prix_vente_TTC = this.calculTTC({ prix_HT, taux_tva });
        }
        // round the value
        data.prix_vente_HT = prix_HT.toFixed(3);
        // adjust the marge
        if (data.marge) {
          data.montant_marge = (prix_HT - data.prix_achat_HT).toFixed(3);
          data.taux_marge = (
            (data.montant_marge / data.prix_achat_HT) *
            100
          ).toFixed(3);
        }
      } else {
        // if vente ttc is leaved  get the value
        let prix_TTC = parseFloat(value);
        // if tva vente if filled fill automaticly the ht
        if (data.taux_tva_vente)
          data.prix_vente_HT = this.calculHT({ prix_TTC, taux_tva });
        // round the value
        data.vente_TTC = prix_TTC.toFixed(3);

        // if marge adjust the marge
        if (data.marge) {
          data.montant_marge = parseFloat(
            data.prix_vente_HT - data.prix_achat_HT
          ).toFixed(3);
          data.taux_marge = parseFloat(
            (data.montant_marge / data.prix_achat_HT) * 100
          ).toFixed(3);
        }
      }
    }
    this.setState({
      data
    });
  };

  // Marge function
  // when leaving marge% field or montant marge this function is excuted :
  onLeavingMarge = ({ montant }) => event => {
    const { data } = this.state;
    let prix_achat_HT = parseFloat(data.prix_achat_HT);
    // if the montant fild leaved
    if (montant) {
      let montant = parseFloat(data.montant_marge);
      data.taux_marge = (montant / prix_achat_HT) * 100;

      data.prix_vente_HT = parseFloat(montant + prix_achat_HT).toFixed(3);
    }
    // if the % field is leaved
    else {
      let taux_marge = parseFloat(data.taux_marge) / 100;
      data.montant_marge = parseFloat(prix_achat_HT * taux_marge).toFixed(3);
      data.prix_vente_HT = parseFloat(prix_achat_HT * (1 + taux_marge)).toFixed(
        2
      );
    }
    // if taux tva vent is filled , fill automaticly prix vente ttc
    if (data.taux_tva_vente)
      data.prix_vente_TTC = this.calculTTC({
        taux_tva: parseFloat(data.taux_tva_vente),
        prix_HT: parseFloat(data.prix_vente_HT)
      });
    this.setState({
      data
    });
  };

  // calcul TTC
  calculTTC = ({ taux_tva, prix_HT }) => {
    if (prix_HT && !(prix_HT === "")) {
      return parseFloat(prix_HT + prix_HT * taux_tva).toFixed(3);
    }
    return null;
  };

  // Calcul HT

  calculHT = ({ taux_tva, prix_TTC }) => {
    if (prix_TTC && !(prix_TTC === "")) {
      return parseFloat(prix_TTC / (1 + taux_tva)).toFixed(3);
    }
    return null;
  };

  handleChange = event => {
    const { value, name } = event.target;
    let data;
    let taux_tva;
    let prix_HT;
    switch (name) {
      case "devise_achat":
        data = { ...this.state.data };
        if (data.utilite === "FCTR" && !data.devise_vente)
          data.devise_vente = value;
        data.devise_achat = value;
        this.setState({
          data
        });
        break;
      case "unite_achat":
        data = { ...this.state.data };
        if (data.utilite === "FCTR" && !data.unite_vente)
          data.unite_vente = value;
        data.unite_achat = value;
        this.setState({
          data
        });
        break;
      case "taux_tva_achat":
        data = { ...this.state.data };

        taux_tva = parseFloat(value);
        prix_HT = parseFloat(data.prix_achat_HT);
        data.taux_tva_achat = value;
        data.prix_achat_TTC = this.calculTTC({ taux_tva, prix_HT });
        if (data.utilite === "FCTR" && !data.taux_tva_vente) {
          data.taux_tva_vente = value;
          if (data.prix_vente_HT)
            data.prix_vente_TTC = parseFloat(
              this.calculTTC({
                taux_tva,
                prix_HT: parseFloat(data.prix_vente_HT)
              })
            ).toFixed(3);
        }

        this.setState({
          data
        });

        break;
      case "taux_tva_vente":
        data = { ...this.state.data };

        taux_tva = parseFloat(value);
        prix_HT = parseFloat(data.prix_vente_HT);
        data.taux_tva_vente = value;
        data.prix_vente_TTC = this.calculTTC({ taux_tva, prix_HT });
        this.setState({
          data
        });

        break;
      case "controle_qualite_exige":
        this.setState({
          data: {
            ...this.state.data,
            controle_qualite_exige: !this.state.data.controle_qualite_exige
          }
        });
        break;
      case "gestion_par_lot":
        data = { ...this.state.data };

        if (data.gestion_par_lot) delete data.lot_standard;
        data.gestion_par_lot = !data.gestion_par_lot;
        this.setState({
          data
        });
        break;
      case "marge":
        data = { ...this.state.data };
        if (value === "false") {
          delete data.taux_marge;
          delete data.montant_marge;
        }

        data.marge = !data.marge;
        this.setState({
          data
        });
        break;
      case "utilite":
        data = { ...this.state.data };
        switch (value) {
          case "MRCH":
            delete data.marge,
              delete data.prix_achat_HT,
              delete data.prix_achat_TTC,
              delete data.devise_achat,
              delete data.taux_tva_achat,
              delete data.unite_achat,
              (data.prix_vente_HT = ""),
              (data.prix_vente_TTC = "");
            break;
          case "CONS":
            delete data.marge,
              delete data.unite_vente,
              delete data.devise_vente,
              delete data.taux_tva_vente,
              delete data.prix_vente_HT,
              delete data.prix_vente_TTC;
            (data.prix_achat_HT = ""), (data.prix_achat_TTC = "");
            break;
          default:
            (data.marge = false),
              (data.unite_vente = ""),
              (data.devise_vente = ""),
              (data.taux_tva_vente = "");
            break;
        }

        data.utilite = value;
        this.setState({
          data
        });
        break;

      default:
        this.setState({ data: { ...this.state.data, [name]: value } });
        break;
    }
  };

  getStepContent = stepIndex => {
    const {
      classes,
      loading,
      categorie,
      fetchCategorie,
      temps,
      devise
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
          <Initiale
            fetchCategorie={fetchCategorie}
            handleChange={this.handleChange}
            data={this.state.data}
            designations={this.props.designations}
            handleSubmitInitial={this.handleSubmitInitial}
            classes={classes}
            handleDateChange={this.handleDateChange}
            loading={loading}
          />
        );
      case 1:
        return (
          <Base
            handleChange={this.handleChange}
            handleFixPrecisionValeurs={this.handleFixPrecisionValeurs}
            data={this.state.data}
            designations={this.props.designations}
            handleSubmitBase={this.handleSubmitBase}
            handleBack={this.handleBack}
            classes={classes}
            handleValeursChange={this.handleValeursChange}
            categorie={categorie}
          />
        );

      default:
        return (
          <Commerciale
            onLeavingMarge={this.onLeavingMarge}
            handle_price_leaving={this.handle_price_leaving}
            handleFixPrecisionValeurs={this.handleFixPrecisionValeurs}
            handleChange={this.handleChange}
            data={this.state.data}
            handleSubmitCommerciale={this.handleSubmitCommerciale}
            handleBack={this.handleBack}
            classes={classes}
            temps={temps}
            devise={devise}
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

      data: {
        caracteristiques: [],
        controleexige: false,
        gestionparlot: false
      },
      designations: [],
      categorie: []
    });
  };

  fetchCategorie = () => {
    // this.props.fetchCategorie(this.state.data.categorie);
  };

  handleValeursChange = index => event => {
    const { value, name } = event.target;
    const caracteristiques = this.state.data.caracteristiques;
    if (typeof caracteristiques[index] === "undefined")
      caracteristiques[index] = {};

    caracteristiques[index] = { value, name };
    this.setState({
      data: {
        ...this.state.data,
        caracteristiques
      }
    });
  };

  handleFixPrecisionValeurs = index => precision => event => {
    const { name } = event.target;
    if (index) {
      const caracteristiques = this.state.data.caracteristiques;

      if (typeof caracteristiques[index] === "undefined") return null;

      caracteristiques[index].value = parseFloat(
        caracteristiques[index].value
      ).toFixed(precision);
      this.setState({
        data: {
          ...this.state.data,
          caracteristiques
        }
      });
    } else {
      let value = parseFloat(this.state.data[name]).toFixed(precision);
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
  };

  componentWillMount() {
    const { fetchUnites, fetchCategorieDesignation } = this.props;
    fetchUnites("configurationdebase/unites/findDurees", "temps", true);
    fetchUnites("configurationdebase/unites/findDevises", "devise", true);
    fetchCategorieDesignation("categorie/service/find");
  }

  getSubmitter = () => {
    switch (this.state.activeStep) {
      case 0:
        return this.handleSubmitInitial;
        break;
      case 1:
        return this.handleSubmitBase;
        break;

      case 2:
        return this.handleSubmitCommerciale;
        break;
      default:
        break;
    }
  };

  render() {
    const { classes, closeNotif, notifMsg } = this.props;
    const { activeStep } = this.state;
    const submitter = this.getSubmitter();
    const elements =
      this.state.activeStep === this.state.steps.length ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReset}
          >
            Crééer un autre Service
          </Button>
        </>
      ) : (
        <>
          {/* <Grid item sm={2} lg={2}> */}
          <Button
            // onClick={submitter}
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
            form="addService"
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
          title="Créer Service"
          pathname="/Logistique/Données de base/Service/Créer Service"
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
                      id="addService"
                      // ref={r => (this.form = r)}
                      onSubmit={submitter}
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
  fetchCategorieDesignation: bindActionCreators(fetchSuggestions, dispatch),
  fetchCategorie: bindActionCreators(fetchItem, dispatch),
  closeNotif: () => dispatch(closeNotifAction()),
  addService: bindActionCreators(addItem, dispatch),
  fetchUnites: bindActionCreators(fetchUnites, dispatch)
});

const mapStateToProps = state => ({
  notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
  loading: state.get("crudLogisticReducer").get("loading"),
  designations: state.get("crudLogisticReducer").get("suggestions"),
  categorie: state.get("crudLogisticReducer").get("item"),
  temps: state.get("crudLogisticReducer").get("temps"),
  devise: state.get("crudLogisticReducer").get("devise")
});

// //const reducer = "initval";
const CreerCategorieReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerService);

export default withStyles(styles)(CreerCategorieReduxed);
