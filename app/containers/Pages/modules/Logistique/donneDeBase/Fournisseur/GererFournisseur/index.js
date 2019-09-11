import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Initial from "../creeFournisseur/Initial";
import Base from "../creeFournisseur/Base";
import Bancaire from "../creeFournisseur/Bancaire";
import Comptable from "../creeFournisseur/Comptable";
import ChoisirFournisseur from "./ChoisirFournisseur";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PageTitle } from "enl-components";
import { Notification } from "enl-components";
import {
  closeNotifAction,
  fetchItem,
  updateItem,
  fetchSuggestions
} from "../../../reducers/crudLogisticActions";
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
      fournisseurChoisi: false,
      errorMsg: "",
      steps: [
        { label: "Choisir le fournisseur", icon: "search" },
        { label: "Données initiales", icon: "perm_identity" },
        { label: "Données de base", icon: "assignment" },
        { label: "Données bancaires", icon: "storage" },
        { label: "Données comptable", icon: "business" }
      ],
      data: {
        caracteristiques: []
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
    let data = { ...this.state.data };
    data.coord_bancaire.push(coordonne);
    this.setState({ data });
  };

  componentWillMount = () => {
    this.props.fetchFournisseurForSuggestion(
      "fournisseur/getCodesAndDesignations"
    );
  };

  changeStep = (event, activeStep) => {
    if (this.state.fournisseurChoisi) this.setState({ activeStep });
    else
      this.setState({ errorMsg: "Veuillez Choisir un fournisseur d'abord !" });
  };

  handleChange = event => {
    const { value, name } = event.target;
    let data = { ...this.state.data };
    switch (name) {
      case "pays":
        if (!value === "Maroc") delete data.retenu_a_la_source;
        data[name] = value;
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

  handleSelect = filterByDesignations => value => () => {
    let route = filterByDesignations ? "findByDesignation" : "findByCode";
    let url = `${route}/${value}`;
    this.props.fetchFournisseur(url, "fournisseur", true);
    this.setState({ activeStep: 1, fournisseurChoisi: true });
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
    const { codes, designations } = this.props.fournisseurForSuggestion;
    if (this.props.loading)
      return (
        <center>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </center>
      );

    switch (stepIndex) {
      case 0:
        return (
          <ChoisirFournisseur
            handleSelect={this.handleSelect}
            codes={codes}
            designations={designations}
            loading={this.props.loading}
          />
        );

      case 1:
        return (
          <Initial
            data={this.state.data}
            handleSubmit={this.handleSubmit}
            classes={classes}
            handleChange={this.handleChange}
          />
        );
      case 2:
        return (
          <Base
            data={this.state.data}
            handleSubmit={this.handleSubmit}
            classes={classes}
            handleChange={this.handleChange}
            addContact={this.addContact}
            removeContact={this.removeContact}
            addCopyContact={this.addCopyContact}
          />
        );
      case 3:
        return (
          <Bancaire
            data={this.state.data}
            handleSubmit={this.handleSubmit}
            classes={classes}
            handleChange={this.handleChange}
            addCoordonneBancaire={this.addCoordonneBancaire}
            removeCoordonne={this.removeCoordonne}
            addCopyCoordonne={this.addCopyCoordonne}
          />
        );
      default:
        return (
          <Comptable
            data={this.state.data}
            classes={classes}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
    }
  };

  handleSubmit = () => {
    if (this.state.fournisseurChoisi) {
      let fournisseur = this.state.data;
      this.props.updateFournisseur(fournisseur, "fournisseur");
      this.setState({
        activeStep: 0,
        fournisseurChoisi: false,
        data: {}
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    const { fournisseurInfo } = nextProps;

    if (fournisseurInfo) {
      this.setState({
        data: { ...fournisseurInfo }
      });
    }
  }

  handleCancel = () => {
    this.setState({
      activeStep: 0,
      fournisseurChoisi: false,
      errorMsg: "",
      data: {}
    });
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
          type="submit"
          form="addfourni"
        >
          Sauvegarder
        </Button>
        {/* </Grid> */}
      </>
    );
    return (
      <div>
        <PageTitle
          title="Gérer fournisseur"
          pathname="/Logistique/Données de base/Fournisseur/Gérer fournisseur"
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
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchFournisseurForSuggestion: bindActionCreators(fetchSuggestions, dispatch),
  fetchFournisseur: bindActionCreators(fetchItem, dispatch),
  updateFournisseur: bindActionCreators(updateItem, dispatch),
  closeNotif: () => dispatch(closeNotifAction())
});

const mapStateToProps = state => {
  return {
    notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
    loading: state.get("crudLogisticReducer").get("loading"),
    fournisseurInfo: state.get("crudLogisticReducer").get("item"),
    fournisseurForSuggestion: state
      .get("crudLogisticReducer")
      .get("suggestions")
  };
};

// //const reducer = "initval";
const GererArticleReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GererArticle);

export default withStyles(styles)(GererArticleReduxed);
