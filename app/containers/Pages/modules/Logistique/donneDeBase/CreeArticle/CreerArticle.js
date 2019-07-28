import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Card, Row } from "@material-ui/core/";
// import PageTitle from "../../../components/common/PageTitle";
import Initiale from "./Initiale";
import Base from "./Base";
import Stockage from "./Stockage";
import Commerciale from "./Commerciale";
// import fetchApi from "../../../utils/fetchApi";
// import SnackBar from "../../../utils/SnackBar";

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
  }
});

class CreerArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: [
        "Données initiales",
        "Données de base",
        "Données de stockage",
        "Données commerciales"
      ],
      data: { controleexige: false, gestionparlot: false },
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
  handleSubmitCommerciale = async () => {
    this.handleNext();
    // const data = await fetchApi({
    //   method: "POST",
    //   url: "/api/logistic/article/create",
    //   token: window.localStorage.getItem("token"),
    //   body: this.state.data
    // });
  };
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "controleexige":
        this.setState({
          data: {
            ...this.state.data,
            controleexige: !this.state.data.controleexige
          }
        });
        break;
      case "gestionparlot":
        this.setState({
          data: {
            ...this.state.data,
            gestionparlot: !this.state.data.gestionparlot
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
            handleSubmitInitial={this.handleSubmitInitial}
            classes={classes}
          />
        );
      case 1:
        return (
          <Base
            handleChange={this.handleChange}
            state={this.state}
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

  fetchCategorie = async () => {
    // const categorie = await fetchApi({
    //   method: "GET",
    //   url: "/api/logistic/categorie/find/" + this.state.data.categorie,
    //   token: window.localStorage.getItem("token")
    // });
    // this.setState({
    //   categorie
    // });
    // let caracteristiques = [];
    // categorie.articlesMetaData.map((caracteristique, idx) => {
    //   caracteristiques.push({
    //     nom: caracteristique.nom,
    //     limite: caracteristique.limite,
    //     obligatoire: caracteristique.obligatoire,
    //     longueur: caracteristique.longueur
    //   });
    // });
    // this.setState({
    //   data: {
    //     ...this.state.data,
    //     caracteristiques: caracteristiques
    //   }
    // });
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

  async componentWillMount() {
    // const designations = await fetchApi({
    //   method: "GET",
    //   url: "/api/logistic/categorie/find",
    //   token: window.localStorage.getItem("token")
    // });
    // this.setState({
    //   designations
    // });
  }

  render() {
    const classes = this.props.classes;
    return (
      <Container>
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
      </Container>
    );
  }
}

export default withStyles(styles)(CreerArticle);
