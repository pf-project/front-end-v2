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
import Initiale from "./Initiale";
import Base from "./Base";
import Stockage from "./Stockage";
import Commerciale from "./Commerciale";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchCategorieDesignation,
  fetchCategorie,
  addArticle,
  closeNotifAction
} from "../../reducers/crudLogisticActions";
import { ValidatorForm } from "react-material-ui-form-validator";

import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import { Notification } from "enl-components";

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
  buttons: {
    marginTop: "30px"
  }
});

class CreerArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 3,
      steps: [
        "Données initiales",
        "Données de base",
        "Données de stockage",
        "Données commerciales"
      ],
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
  handleSubmitStockage = () => {
    this.handleNext();
  };
  handleSubmitCommerciale = () => {
    let data = this.state.data;
    let prix_de_vente_de_base_HT = parseFloat(
      data.prix_de_vente_de_base_HT
    ).toFixed(2);
    let prix_moyen_pendere = parseFloat(data.prix_moyen_pendere).toFixed(2);
    let prix_de_vente_de_base_TTC = parseFloat(
      data.prix_de_vente_de_base_TTC
    ).toFixed(2);
    this.props.addArticle(data);
    this.handleNext();
  };

  componentWillReceiveProps(nextProps) {
    let caracteristiques = [];
    try {
      const categorie = nextProps.categorie.toObject();

      const articlesMetaData = categorie.articlesMetaData.toArray();
      articlesMetaData.map((caracteristique, idx) => {
        caracteristique = caracteristique.toObject();
        caracteristiques.push({
          nom: caracteristique.nom,
          limite: caracteristique.limite,
          obligatoire: caracteristique.obligatoire,
          longueur: caracteristique.longueur
        });
      });
      this.setState({
        data: {
          ...this.state.data,
          caracteristiques: caracteristiques
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "controle_qualite_exige":
        this.setState({
          data: {
            ...this.state.data,
            controle_qualite_exige: !this.state.data.controle_qualite_exige
          }
        });
        break;
      case "gestion_par_lot":
        this.setState({
          data: {
            ...this.state.data,
            gestion_par_lot: !this.state.data.gestion_par_lot
          }
        });
        break;

      default:
        this.setState({ data: { ...this.state.data, [name]: value } });
        break;
    }
  };

  getStepContent = stepIndex => {
    const classes = this.props.classes;
    switch (stepIndex) {
      case 0:
        return (
          <Initiale
            handleChange={this.handleChange}
            state={this.state}
            designations={this.props.designations}
            handleSubmitInitial={this.handleSubmitInitial}
            classes={classes}
            handleDateChange={this.handleDateChange}
          />
        );
      case 1:
        return (
          <Base
            handleChange={this.handleChange}
            state={this.state}
            designations={this.props.designations}
            handleSubmitBase={this.handleSubmitBase}
            handleBack={this.handleBack}
            classes={classes}
            fetchCategorie={this.fetchCategorie}
            handleValeursChange={this.handleValeursChange}
          />
        );
      case 2:
        return (
          <Stockage
            handleChange={this.handleChange}
            state={this.state}
            handleSubmitStockage={this.handleSubmitStockage}
            handleBack={this.handleBack}
            classes={classes}
          />
        );
      default:
        return (
          <Commerciale
            loading={this.props.loading}
            handleChange={this.handleChange}
            state={this.state}
            handleSubmitCommerciale={this.handleSubmitCommerciale}
            handleBack={this.handleBack}
            classes={classes}
          />
        );
    }
  };

  handleNext = () => {
    let activeStep = this.state.activeStep + 1;
    this.setState({ activeStep });
  };

  handleBack = () => {
    let activeStep = this.state.activeStep - 1;
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
    this.props.fetchCategorie(this.state.data.categorie);
  };

  handleValeursChange = event => {
    const index = event.target.name;
    const valeur = event.target.value;
    const caracteristiques = this.state.data.caracteristiques;
    caracteristiques[index].valeur = valeur;
    this.setState({
      data: {
        ...this.state.data,
        caracteristiques
      }
    });
  };

  componentWillMount() {
    this.props.fetchCategorieDesignation();
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
        return this.handleSubmitStockage;
        break;
      case 3:
        return this.handleSubmitCommerciale;
        break;
      default:
        break;
    }
  };

  render() {
    const { classes, loading, closeNotif, notifMsg } = this.props;
    const { activeStep } = this.state;
    const submitter = this.getSubmitter();

    return (
      <Container>
        <ValidatorForm onSubmit={submitter} autoComplete="off">
          <Notification
            close={() => closeNotif()}
            message={notifMsg}
            branch=""
          />
          <Toolbar className={classes.toolbar}>
            <Grid justify="flex-end" container spacing={0}>
              <Grid item sm={8} lg={8}>
                {""}
              </Grid>
              <Grid item sm={2} lg={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Précedent
                </Button>
              </Grid>
              <Grid item sm={2} lg={2}>
                <Button variant="contained" color="primary" type="submit">
                  {this.state.activeStep === this.state.steps.length - 1
                    ? "Sauvegarder"
                    : "Suivant"}
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
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
                {this.state.activeStep === this.state.steps.length ? (
                  <div>
                    {/* <Typography className={classes.instructions}>L'article </Typography> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleReset}
                    >
                      Crééer un autre Article
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {this.getStepContent(this.state.activeStep)}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </ValidatorForm>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategorieDesignation: bindActionCreators(
    fetchCategorieDesignation,
    dispatch
  ),
  closeNotif: () => dispatch(closeNotifAction()),
  addArticle: bindActionCreators(addArticle, dispatch)
});

const mapStateToProps = state => {
  console.log(state.get("crudLogisticReducer"));
  return {
    notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
    loading: state.get("crudLogisticReducer").get("loading"),
    designations: state.get("crudLogisticReducer").get("designations"),
    categorie: state.get("crudLogisticReducer").get("categorie")
  };
};

// //const reducer = "initval";
const CreerCategorieReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerArticle);

export default withStyles(styles)(CreerCategorieReduxed);
