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
  closeNotifAction,
  fetchItem
} from "../../../reducers/crudComptabiliteActions";
import { fetchUnites } from "../../../../Logistique/reducers/crudLogisticActions";
import Base from "./Base";
import Initiale from "./Initiale";

import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import FiberNew from "@material-ui/icons/FiberNew";
import Edit from "@material-ui/icons/Edit";
import GeererFromNotif from "../GererCaisse/index";

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
  done: {
    color: "#4db6ac",
    "&:hover": {
      color: "#009688"
    }
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
      data: { code: "CS-", compte: "5161", statu: "Ouvert" }
    };
  }

  componentWillMount() {
    this.props.fetchUnites(
      "configurationdebase/unites/findDevises",
      "devises",
      true
    );
    this.props.fetchUnites(
      "configurationdebase/listesdebase/findPays",
      "pays",
      true
    );
  }
  handleSubmitInitial = () => {
    this.handleNext();
  };

  handleSubmitBase = () => {
    const { data } = this.state;
    // console.log(data);
    this.props.addCaisse(data, "donneedebase/caisse");
    this.handleNext();
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      data: { ...this.state.data, [name]: value },
      formChanged: true
    });
  };

  // handleChangeWithIntitialValue = event => {
  //   const { value, name } = event.target;
  //   switch (name) {
  //     case "compte":
  //       if (value.length > 3 && value.length < 9) {
  //         this.setState({ data: { ...this.state.data, [name]: value } });
  //       }
  //       break;

  //     case "code":
  //       if (value.length > 2) {
  //         this.setState({ data: { ...this.state.data, [name]: value } });
  //       }
  //       break;
  //   }
  // };

  handleBlur = event => {
    let { value, name } = event.target;
    let level = 0;
    switch (name) {
      case "compte": {
        let length = value.length;
        if (length > 4) {
          while (8 - length) {
            value += "0";
            length++;
            level++;
          }

          this.setState({
            data: { ...this.state.data, [name]: value, niveau: 8 - level }
          });
        }

        break;
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
            // handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
            classes={classes}
            data={this.state.data}
          />
        );
      case 1:
        return (
          <Base
            handleBlur={this.handleBlur}
            // handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
            handleChange={this.handleChange}
            handleSubmitBase={this.handleSubmitBase}
            handleBack={this.handleBack}
            classes={classes}
            data={this.state.data}
            pays={this.props.pays}
            devises={this.props.devises}
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

      data: { code: "CS-", compte: "5161", statu: "Ouvert" }
    });
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

  handleOpen = () => {
    const { code } = this.state.data;
    let url = `findByCode/${code}`;
    this.props.fetchCompteGeneral(url, "donneedebase/caisse", true);
    this.setState({ openForm: true });
  };
  handleClose = () => {
    this.setState({ openForm: false });
  };

  render() {
    const { classes, closeNotif, notifMsg } = this.props;
    const { activeStep } = this.state;
    const submitter = this.getSubmitter();
    const elements =
      this.state.activeStep === this.state.steps.length ? (
        <>
          {" "}
          <Tooltip
            title="
            Créer une nouvelle caisse"
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
          <Tooltip title="Gerer cette caisse">
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
        <>
          {/* <Grid item sm={2} lg={2}> */}

          {/* </Grid> */}
          {/* <Grid item sm={2} lg={2}> */}
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
              form="addCaisse"
              size="small"
            >
              {this.state.activeStep === this.state.steps.length - 1 ? (
                <SaveIcon />
              ) : (
                <ArrowForward />
              )}
            </IconButton>
          </Tooltip>

          {/* </Grid> */}
        </>
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
    const { data } = this.state;

    return (
      <div>
        <PageTitle
          title="Créer Caisse"
          pathname="/Comptabilité/Données de base/Caisses/Créer Caisse"
          elements={elements}
          withBackOption={true}
          precedent={precedent}
          leftElements={activeStep !== this.state.steps.length}
          formChanged={this.state.formChanged}
          form="addCaisse"
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />

        <FloatingPanel
          title={"Gerer caisse"}
          openForm={this.state.openForm}
          closeForm={this.handleClose}
          branch=""
        >
          {this.state.openForm && (
            <GeererFromNotif
              panelEditing={true}
              closeForm={this.handleClose}
              code={this.state.data.code}
            />
          )}
        </FloatingPanel>

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
  closeNotif: () => dispatch(closeNotifAction()),
  addCaisse: bindActionCreators(addItem, dispatch),
  fetchUnites: bindActionCreators(fetchUnites, dispatch),
  fetchCompteGeneral: bindActionCreators(fetchItem, dispatch)
});
const reducer = "crudComptabiliteReducer";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg"),
  loading: state.get(reducer).get("loading"),
  devises: state.get("crudLogisticReducer").get("devises"),
  pays: state.get("crudLogisticReducer").get("pays")
});

const CreerCaisseReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerCaisse);

export default withStyles(styles)(CreerCaisseReduxed);
