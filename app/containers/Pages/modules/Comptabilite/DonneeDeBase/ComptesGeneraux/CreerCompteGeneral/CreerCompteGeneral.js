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
  fetchUnites,
  fetchItem,
  fetchSuggestions
} from "../../../reducers/crudComptabiliteActions";
import Base from "./Base";
import Initiale from "./Initiale";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import SaveIcon from "@material-ui/icons/Save";
import FiberNew from "@material-ui/icons/FiberNew";
import Tooltip from "@material-ui/core/Tooltip";

import Edit from "@material-ui/icons/Edit";
import GererCompteGeneral from "../GererCompteGeneral/index";
import withWidth from "@material-ui/core/withWidth";

const styles = theme => ({
  root: {
    width: "90%",
    margin: "2em"
  },
  done: {
    color: "#4db6ac",
    "&:hover": {
      color: "#009688"
    }
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
    width: "90%"
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

class CreerCompteGeneral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      errorMsg: "",
      steps: ["Données initiales", "Données de base"],
      data: {
        classe: "1",
        rubrique: "11",
        poste: "111",
        comptepere: "1111",
        compte: "1111",
        typecompte: "Compte de bilan"
      }
    };
  }

  handleSubmitInitial = () => {
    if (this.props.codesDesignations) {
      const comptes = this.props.codesDesignations.comptes;
      const designations = this.props.codesDesignations.designations;
      const { compte, designation } = this.state.data;
      if (comptes.includes(compte)) {
        this.setState({ errorMsg: "compte deja existe !!!!" });
      } else if (designations.includes(designation)) {
        this.setState({ errorMsg: "designation deja existe !!!!" });
      } else {
        this.handleNext();
      }
    }
  };

  handleSubmitBase = () => {
    const { data } = this.state;
    // console.log(data);

    this.props.addCompteGeneral(data, "donneedebase/comptegeneral");
    this.handleNext();
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

    this.props.fetchCompteGeneralForSuggestion(
      "donneedebase/comptegeneral/getCodesAndDesignations"
    );
  }

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
        parseInt(value) > 5
          ? (data.typecompte = "Compte de résultat")
          : (data.typecompte = "Compte de bilan");

        this.setState({ data });
        break;
      case "rubrique":
        this.props.fetchUnites(
          "donneedebase/comptegeneral/findPostesByRubrique/" + value,
          "postes",
          true
        );
        break;
      case "poste":
        this.props.fetchUnites(
          "donneedebase/comptegeneral/findComptesByPoste/" + value,
          "comptes",
          true
        );
        break;
      case "comptepere":
        data.compte = value;
        this.setState({ data });

        break;
    }
    this.setState({
      data: { ...this.state.data, [name]: value },
      formChanged: true
    });
  };

  handleChangeWithIntitialValue = event => {
    const { value, name } = event.target;
    switch (name) {
      case "compte":
        if (value.length > 3 && value.length < 9) {
          this.setState({ data: { ...this.state.data, [name]: value } });
        }
        break;
    }
  };

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

    switch (stepIndex) {
      case 0:
        return (
          <Initiale
            handleChange={this.handleChange}
            handleSubmitInitial={this.handleSubmitInitial}
            handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
            handleBlur={this.handleBlur}
            classes={classes}
            lesclasses={this.props.lesclasses}
            rubriques={this.props.rubriques}
            postes={this.props.postes}
            comptes={this.props.comptes}
            data={this.state.data}
            loading={loading}
          />
        );
      case 1:
        return (
          <Base
            handleBlur={this.handleBlur}
            handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
            handleChange={this.handleChange}
            handleSubmitBase={this.handleSubmitBase}
            handleBack={this.handleBack}
            classes={classes}
            lesclasses={this.props.lesclasses}
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

      data: {
        classe: "1",
        rubrique: "11",
        poste: "111",
        comptepere: "1111",
        compte: "1111",
        typecompte: "Compte de bilan"
      }
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
    const { compte } = this.state.data;
    let url = `findByCompte/${compte}`;
    this.props.fetchCompteGeneral(url, "donneedebase/comptegeneral", true);
    this.setState({ openForm: true });
  };
  handleClose = () => {
    this.setState({ openForm: false });
  };

  render() {
    const { classes, closeNotif, notifMsg, width } = this.props;
    const { activeStep, errorMsg } = this.state;
    const submitter = this.getSubmitter();
    // change buttons props based on breakpoints xs/sm/lg ...
    const isSmallScreen = /xs|sm/.test(width);

    const buttonProps = {
      size: isSmallScreen ? "small" : "medium"
    };
    const elements =
      this.state.activeStep === this.state.steps.length ? (
        <>
          <Tooltip
            title="
            Créer un nouveau compte comptable"
          >
            <IconButton
              variant="contained"
              className={classes.done}
              color="primary"
              onClick={this.handleReset}
              {...buttonProps}
            >
              <FiberNew />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gerer ce compte">
            <IconButton
              variant="contained"
              // className={classes.done}
              color="primary"
              onClick={this.handleOpen}
              {...buttonProps}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
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
              {...buttonProps}
              color="primary"
              type="submit"
              form="addCompteGeneral"
            >
              {this.state.activeStep === this.state.steps.length - 1 ? (
                <SaveIcon />
              ) : (
                <ArrowForward />
              )}
            </IconButton>
          </Tooltip>
        </>
      );
    const precedent = (
      <Tooltip title="Precedent">
        <IconButton
          // onClick={submitter}
          // className={classes.button}
          variant="outlined"
          color="primary"
          {...buttonProps}
          disabled={activeStep === 0}
          onClick={this.handleBack}
          className={classes.backButton}
        >
          <ArrowBack />
        </IconButton>
      </Tooltip>
    );
    return (
      <div>
        <PageTitle
          title="Créer compte comptable"
          pathname="/Comptabilité/Données de base/comptes comptables/Créer compte comptable"
          elements={elements}
          withBackOption={true}
          precedent={precedent}
          leftElements={activeStep !== this.state.steps.length}
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

        <FloatingPanel
          title={"Gerer compte comptable"}
          openForm={this.state.openForm}
          closeForm={this.handleClose}
          branch=""
        >
          {this.state.openForm && (
            <GererCompteGeneral
              panelEditing={true}
              closeForm={this.handleClose}
              code={this.state.data.compte}
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
                    <ValidatorForm
                      id="addCompteGeneral"
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
  addCompteGeneral: bindActionCreators(addItem, dispatch),
  fetchUnites: bindActionCreators(fetchUnites, dispatch),
  fetchCodesDesignations: bindActionCreators(fetchItem, dispatch),
  fetchCompteGeneralForSuggestion: bindActionCreators(
    fetchSuggestions,
    dispatch
  )
});
const reducer = "crudComptabiliteReducer";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg"),
  loading: state.get(reducer).get("loading"),
  rubriques: state.get(reducer).get("rubriques"),
  postes: state.get(reducer).get("postes"),
  comptes: state.get(reducer).get("comptes"),
  lesclasses: state.get(reducer).get("lesclasses"),
  codesDesignations: state.get(reducer).get("suggestions")
});

const CreerCompteGeneralReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerCompteGeneral);

export default withStyles(styles)(withWidth()(CreerCompteGeneralReduxed));
