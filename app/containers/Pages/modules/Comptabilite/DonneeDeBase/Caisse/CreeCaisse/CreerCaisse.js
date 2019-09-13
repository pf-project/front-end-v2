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
// import {
//   fetchItem,
//   addItem,
//   fetchSuggestions,
//   closeNotifAction
// } from "../../../reducers/crudLogisticActions";
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

class CreerCaisse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: ["Données initiales", "Données de base"],
      data: { code: "CS-", comptegeneral: "5161", statu: "Ouvert" }
    };
  }

  handleSubmitInitial = () => {
    this.handleNext();
  };

  handleSubmitBase = () => {
    this.handleNext();
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleChangeCompteGeneral = event => {
    const { value, name } = event.target;
    switch (name) {
      case "comptegeneral":
        if (value.length > 3 && value.length < 9) {
          this.setState({ data: { ...this.state.data, [name]: value } });
        }
    }
  };

  handleBlur = event => {
    let { value, name } = event.target;
    switch (name) {
      case "comptegeneral": {
        let length = value.length;

        while (8 - length) {
          value += "0";
          length++;
        }
        this.setState({ data: { ...this.state.data, [name]: value } });
      }
    }
  };

  getStepContent = stepIndex => {
    const { classes, loading } = this.props;
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
            handleChange={this.handleChange}
            handleSubmitInitial={this.handleSubmitInitial}
            classes={classes}
            data={this.state.data}
          />
        );
      case 1:
        return (
          <Base
            handleBlur={this.handleBlur}
            handleChangeCompteGeneral={this.handleChangeCompteGeneral}
            handleChange={this.handleChange}
            handleSubmitBase={this.handleSubmitBase}
            handleBack={this.handleBack}
            classes={classes}
            data={this.state.data}
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

      data: {}
    });
  };

  fetchCategorie = () => {
    // this.props.fetchCategorie(this.state.data.categorie);
  };

  getSubmitter = () => {
    switch (this.state.activeStep) {
      case 0:
        return this.handleSubmitInitial;
        break;
      case 1:
        return this.handleSubmitBase;
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
            Création d'une nouvelle caisse
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
            form="addCaisse"
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
          title="Créer Article"
          pathname="/Comptabilité/Données de base/Caisses/Créer Caisse"
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
                      id="addCaisse"
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
  closeNotif: () => dispatch(closeNotifAction())
});

const mapStateToProps = state => ({
  notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
  loading: state.get("crudLogisticReducer").get("loading"),
  designations: state.get("crudLogisticReducer").get("suggestions"),
  categorie: state.get("crudLogisticReducer").get("item")
});

// //const reducer = "initval";
const CreerCaisseReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerCaisse);

export default withStyles(styles)(CreerCaisseReduxed);
