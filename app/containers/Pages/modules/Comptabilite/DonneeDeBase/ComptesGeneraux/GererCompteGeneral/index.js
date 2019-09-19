import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Initial from "../CreerCompteGeneral/Initiale";
import Base from "../CreerCompteGeneral/Base";
import ChoisirCompteGeneral from "./ChoisirCompteGeneral";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PageTitle } from "enl-components";
import { Notification } from "enl-components";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  closeNotifAction,
  fetchItem,
  updateItem,
  fetchSuggestions,
  cleareStore,
  fetchUnites
} from "../../../reducers/crudComptabiliteActions";
const styles = theme => ({
  root: {
    width: "90%",

    margin: "2em",
    minHeight: 500
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
  valuesFields: {
    marginLeft: "8em"
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
  buttons: {
    marginTop: "30px"
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  submitdiv: {
    // marginLeft: "30%",
    // position: "absolute",
    // right: 50,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(20)
  },
  pageTitle: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(1),
    // width: "80",
    // display: "flex",
    // alignItems: "flex-end",
    // position: "fixed",
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
class GererArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      compteGeneralChoisi: false,
      errorMsg: "",
      steps: [
        { label: "Choisir le compte général", icon: "search" },
        { label: "Données initiales", icon: "perm_identity" }
        // { label: "Données de base", icon: "assignment" }
      ],
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
  componentWillUnmount() {
    this.props.cleareStore();
  }

  componentWillMount = () => {
    this.props.fetchCompteGeneralForSuggestion(
      "donneedebase/comptegeneral/getCodesAndDesignations"
    );
    // this.props.fetchUnites(
    //   "donneedebase/comptegeneral/findClasses",
    //   "lesclasses",
    //   true
    // );
    // this.props.fetchUnites(
    //   "donneedebase/comptegeneral/findRubriquesByClasse/1",
    //   "rubriques",
    //   true
    // );
    // this.props.fetchUnites(
    //   "donneedebase/comptegeneral/findPostesByRubrique/11",
    //   "postes",
    //   true
    // );

    // this.props.fetchUnites(
    //   "donneedebase/comptegeneral/findComptesByPoste/111",
    //   "comptes",
    //   true
    // );
  };

  changeStep = (event, activeStep) => {
    if (this.state.compteGeneralChoisi) this.setState({ activeStep });
    else
      this.setState({
        errorMsg: "Veuillez Choisir un compte général d'abord !"
      });
  };

  handleSelect = filterByDesignations => value => () => {
    let route = filterByDesignations ? "findByDesignation" : "findByCompte";
    let url = `${route}/${value}`;
    this.props.fetchCompteGeneral(url, "donneedebase/comptegeneral", true);
    this.setState({ activeStep: 1, compteGeneralChoisi: true });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,

      data: {
        caracteristiques: []
      }
    });
  };

  getStepContent = stepIndex => {
    const classes = this.props.classes;
    const { comptes, designations } = this.props.compteGeneralForSuggestion;
    const { loading } = this.props;
    if (this.props.loading)
      return (
        <center>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </center>
      );

    switch (stepIndex) {
      case 0:
        return (
          <ChoisirCompteGeneral
            handleSelect={this.handleSelect}
            codes={comptes}
            designations={designations}
            loading={this.props.loading}
          />
        );

      case 1:
        return (
          <Initial
            handleChange={this.handleChange}
            handleSubmitInitial={this.handleSubmitInitial}
            handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
            handleBlur={this.handleBlur}
            classes={classes}
            // lesclasses={this.props.lesclasses}
            // rubriques={this.props.rubriques}
            // postes={this.props.postes}
            // comptes={this.props.comptes}
            data={this.state.data}
            loading={loading}
            gerer={true}
          />
        );
      // case 2:
      //   return (
      //     <Base
      //       handleBlur={this.handleBlur}
      //       handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
      //       handleChange={this.handleChange}
      //       handleSubmitBase={this.handleSubmitBase}
      //       handleBack={this.handleBack}
      //       classes={classes}
      //       lesclasses={this.props.lesclasses}
      //       data={this.state.data}
      //     />
      //   );
    }
  };

  componentWillReceiveProps(nextProps) {
    const { compteGeneralInfo } = nextProps;
    if (compteGeneralInfo) {
      this.setState({
        data: { ...compteGeneralInfo }
      });
    }
  }

  handleCancel = () => {
    this.setState({
      activeStep: 0,
      compteGeneralChoisi: false,
      errorMsg: "",
      data: {}
    });
  };

  handleSubmit = () => {
    if (this.state.compteGeneralChoisi) {
      const { data } = this.state;
      // console.log(data);
      this.props.updateCompteGeneral(data, "donneedebase/comptegeneral");
      this.setState({
        activeStep: 0,
        compteGeneralChoisi: false,
        data: {}
      });
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
    const { data } = this.state;

    // switch (name) {
    //   case "classe":
    //     this.props.fetchUnites(
    //       "donneedebase/comptegeneral/findRubriquesByClasse/" + value,
    //       "rubriques",
    //       true
    //     );
    //     parseInt(value) > 5
    //       ? (data.typecompte = "Compte de résultat")
    //       : (data.typecompte = "Compte de bilan");

    //     this.setState({ data });
    //     break;
    //   case "rubrique":
    //     this.props.fetchUnites(
    //       "donneedebase/comptegeneral/findPostesByRubrique/" + value,
    //       "postes",
    //       true
    //     );
    //     break;
    //   case "poste":
    //     this.props.fetchUnites(
    //       "donneedebase/comptegeneral/findComptesByPoste/" + value,
    //       "comptes",
    //       true
    //     );
    //     break;
    //   case "comptepere":
    //     data.compte = value;
    //     this.setState({ data });

    //     break;
    // }
    this.setState({ data: { ...this.state.data, [name]: value } });
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

  render() {
    const { activeStep, errorMsg } = this.state;
    const { classes, closeNotif, notifMsg } = this.props;
    const elements = (
      <>
        {/* <Grid item sm={2} lg={2}> */}
        <Button
          className={classes.button}
          color="primary"
          onClick={this.handleCancel}
          className={classes.backButton}
        >
          Annuler
        </Button>
        {/* </Grid> */}
        {/* <Grid item sm={2} lg={2}> */}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          form="updatecompteGeneral"
        >
          Sauvegarder
        </Button>
        {/* </Grid> */}
      </>
    );
    return (
      <ValidatorForm
        id="addcompteGeneral"
        // ref={r => (this.form = r)}
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <PageTitle
          title="Gérer Compte général"
          pathname="/Comptabilite/Données de base/comptes généraux/Gérer compte général"
          elements={elements}
          withBackOption={true}
        />

        <Card>
          <Notification
            close={() => closeNotif()}
            message={notifMsg}
            branch=""
          />

          <Notification
            close={() => {
              this.setState({ errorMsg: "" });
              closeNotif();
            }}
            message={errorMsg}
            branch=""
          />
          <div className={classes.root}>
            <AppBar color="default" position="static">
              <Tabs
                value={activeStep}
                onChange={this.changeStep}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                entered
              >
                {this.state.steps.map(({ label, icon }) => (
                  <Tab
                    icon={<i class="material-icons">{icon}</i>}
                    label={label}
                  />
                ))}
              </Tabs>
            </AppBar>
            <Typography component="div" style={{ padding: 8 * 3 }}>
              {this.getStepContent(this.state.activeStep)}
            </Typography>

            {/* <div>{this.getStepContent(this.state.activeStep)}</div> */}
          </div>
        </Card>
      </ValidatorForm>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchCompteGeneralForSuggestion: bindActionCreators(
    fetchSuggestions,
    dispatch
  ),
  fetchCompteGeneral: bindActionCreators(fetchItem, dispatch),
  updateCompteGeneral: bindActionCreators(updateItem, dispatch),
  closeNotif: () => dispatch(closeNotifAction()),
  fetchUnites: bindActionCreators(fetchUnites, dispatch),
  cleareStore: bindActionCreators(cleareStore, dispatch)
});

const mapStateToProps = state => {
  return {
    notifMsg: state.get("crudComptabiliteReducer").get("notifMsg"),
    loading: state.get("crudComptabiliteReducer").get("loading"),
    compteGeneralInfo: state.get("crudComptabiliteReducer").get("item"),
    compteGeneralForSuggestion: state
      .get("crudComptabiliteReducer")
      .get("suggestions")
    // rubriques: state.get("crudComptabiliteReducer").get("rubriques"),
    // postes: state.get("crudComptabiliteReducer").get("postes"),
    // comptes: state.get("crudComptabiliteReducer").get("comptes"),
    // lesclasses: state.get("crudComptabiliteReducer").get("lesclasses")
  };
};

// //const reducer = "initval";
const GererArticleReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GererArticle);

export default withStyles(styles)(GererArticleReduxed);
