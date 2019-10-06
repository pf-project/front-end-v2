import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Initial from "../CreeCaisse/Initiale";
import Base from "../CreeCaisse/Base";
import ChoisirCaisse from "./ChoisirCaisse";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
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
  cleareStore
} from "../../../reducers/crudComptabiliteActions";
import { Undo } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import { fetchUnites } from "../../../../Logistique/reducers/crudLogisticActions";
import Tooltip from "@material-ui/core/Tooltip";
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
  btnArea: {
    margin: 20
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
      caisseChoisi: false,
      errorMsg: "",
      steps: [
        { label: "Choisir la caisse", icon: "search" },
        { label: "Données initiales", icon: "perm_identity" },
        { label: "Données de base", icon: "assignment" }
      ],
      data: { code: "CS-", compte: "5161", statu: "Ouvert" }
    };
  }
  componentWillUnmount() {
    this.props.cleareStore();
  }

  componentWillMount = () => {
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
    this.props.fetchCaisseForSuggestion(
      "donneedebase/caisse/getCodesAndDesignations"
    );

    const { panelEditing } = this.props;
    if (panelEditing)
      this.setState({
        activeStep: 1,
        caisseChoisi: true,
        panelEditing
      });
  };

  changeStep = (event, activeStep) => {
    if (this.state.caisseChoisi) this.setState({ activeStep });
    else this.setState({ errorMsg: "Veuillez Choisir une caisse d'abord !" });
  };

  handleSelect = filterByDesignations => value => () => {
    let route = filterByDesignations ? "findByDesignation" : "findByCode";
    let url = `${route}/${value}`;
    this.props.fetchCaisse(url, "donneedebase/caisse", true);
    this.setState({ activeStep: 1, caisseChoisi: true });
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
    const { codes, designations } = this.props.caisseForSuggestion;
    if (this.props.loading)
      return (
        <center>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </center>
      );

    switch (stepIndex) {
      case 0:
        return (
          <ChoisirCaisse
            handleSelect={this.handleSelect}
            codes={codes}
            designations={designations}
            loading={this.props.loading}
          />
        );

      case 1:
        return (
          <Initial
            handleChange={this.handleChange}
            handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
            classes={classes}
            data={this.state.data}
          />
        );
      case 2:
        return (
          <Base
            handleBlur={this.handleBlur}
            handleChangeWithIntitialValue={this.handleChangeWithIntitialValue}
            handleChange={this.handleChange}
            classes={classes}
            data={this.state.data}
            pays={this.props.pays}
            devises={this.props.devises}
          />
        );
    }
  };

  componentWillReceiveProps(nextProps) {
    const { caisseInfo } = nextProps;

    if (caisseInfo) {
      this.setState({
        data: { ...caisseInfo }
      });
    }
  }

  handleCancel = () => {
    this.setState({
      activeStep: 0,
      caisseChoisi: false,
      errorMsg: "",
      data: {}
    });
  };

  handleSubmit = () => {
    if (this.state.caisseChoisi) {
      const { data } = this.state;
      this.props.updateCaisse(data, "donneedebase/caisse");
      if (!this.state.panelEditing)
        this.setState({
          activeStep: 0,
          caisseChoisi: false,
          data: {}
        });
      else this.props.closeForm();
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
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

      case "code":
        if (value.length > 2) {
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
    const { activeStep, errorMsg, panelEditing } = this.state;
    const { classes, closeNotif, notifMsg } = this.props;
    const elements = (
      <>
        {/* <Grid item sm={2} lg={2}> */}
        <Tooltip title="Annuler">
          <IconButton
            className={classes.cancel}
            onClick={this.handleCancel}
            variant="contained"
            color="primary"
            size="small"
          >
            <Undo />
          </IconButton>
        </Tooltip>
        {/* </Grid> */}
        {/* <Grid item sm={2} lg={2}> */}
        <Tooltip title="Sauvegarder">
          <IconButton
            className={classes.done}
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            form="updateCaisse"
            size="small"
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        {/* </Grid> */}
      </>
    );
    return (
      <ValidatorForm
        id="addCaisse"
        // ref={r => (this.form = r)}
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        {!panelEditing && (
          <PageTitle
            title="Gérer Caisse"
            pathname="/Comptabilite/Données de base/caisse/Gérer Caisse"
            elements={elements}
            withBackOption={true}
            formChanged={this.state.formChanged}
          />
        )}

        <Card>
          {!panelEditing && (
            <Notification
              close={() => closeNotif()}
              message={notifMsg}
              branch=""
            />
          )}

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
        <div className={classes.btnArea}>
          {this.state.panelEditing && elements}
        </div>
      </ValidatorForm>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchCaisseForSuggestion: bindActionCreators(fetchSuggestions, dispatch),
  fetchCaisse: bindActionCreators(fetchItem, dispatch),
  updateCaisse: bindActionCreators(updateItem, dispatch),
  closeNotif: () => dispatch(closeNotifAction()),
  fetchUnites: bindActionCreators(fetchUnites, dispatch),
  cleareStore: bindActionCreators(cleareStore, dispatch)
});

const mapStateToProps = state => {
  return {
    notifMsg: state.get("crudComptabiliteReducer").get("notifMsg"),
    loading: state.get("crudComptabiliteReducer").get("loading"),
    caisseInfo: state.get("crudComptabiliteReducer").get("item"),
    caisseForSuggestion: state
      .get("crudComptabiliteReducer")
      .get("suggestions"),
    devises: state.get("crudLogisticReducer").get("devises"),
    pays: state.get("crudLogisticReducer").get("pays")
  };
};

// //const reducer = "initval";
const GererArticleReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GererArticle);

export default withStyles(styles)(GererArticleReduxed);
