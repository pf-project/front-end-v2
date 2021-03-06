import React from "react";
import { Map, fromJS } from "immutable";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Initiale from "./Initiale";
import Base from "../CreeService/Base";
import Commerciale from "../CreeService/Commerciale";
import ChoisirService from "./ChoisirService";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ValidatorForm } from "react-material-ui-form-validator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PageTitle } from "enl-components";
import { Notification } from "enl-components";
import {
  closeNotifAction,
  fetchItem,
  updateItem,
  fetchSuggestions,
  fetchUnites
} from "../../../reducers/crudLogisticActions";
import Tooltip from "@material-ui/core/Tooltip";
import { Undo } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import { withWidth } from "@material-ui/core";
const styles = theme => ({
  root: {
    width: "90%",

    margin: "2em",
    minHeight: 500
  },
  backButton: {
    marginRight: "1em"
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
class GererService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      serviceChoisi: false,
      errorMsg: "",
      steps: [
        { label: "Choisir l'service", icon: "search" },
        { label: "Données initiales", icon: "perm_identity" },
        { label: "Données de base", icon: "assignment" },
        { label: "Données commerciales", icon: "business" }
      ],
      data: {
        caracteristiques: []
        // controleexige: false,
        // gestionparlot: false
        // marge: false,
        // unite_vente: "",
        // devise_vente: "",
        // taux_tva_vente: "",
        // prix_achat_HT: "",
        // prix_achat_TTC: "",
        // prix_vente_HT: "",
        // prix_vente_TTC: ""
      },
      designations: [],
      categorie: []
    };
  }

  componentWillMount = () => {
    const {
      fetchServicesForSuggestion,
      fetchUnites,
      panelEditing
    } = this.props;
    fetchServicesForSuggestion("service/getCodesAndDesignations");
    fetchUnites("configurationdebase/unites/findDurees", "temps", true);
    fetchUnites("configurationdebase/unites/findDevises", "devise", true);
    if (panelEditing)
      this.setState({
        activeStep: 1,
        articleChoisi: true,
        panelEditing
      });
  };

  changeStep = (event, activeStep) => {
    if (this.state.serviceChoisi) this.setState({ activeStep });
    else this.setState({ errorMsg: "Veuillez Choisir un service d'abord !" });
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
        this.setState({
          data: { ...this.state.data, [name]: value },
          formChanged: true
        });
        break;
    }
  };

  handleSelect = filterByDesignations => value => () => {
    let route = filterByDesignations ? "findByDesignation" : "findByCode";
    let url = `${route}/${value}`;
    this.props.fetchService(url, "service", true);
    this.setState({ activeStep: 1, serviceChoisi: true });
    // this.changeStep(null, 1);

    //
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

  // convert object to map
  xah_obj_to_map = obj => {
    const mp = new Map();
    Object.keys(obj).forEach(k => {
      mp.set(k, obj[k]);
    });
    return mp;
  };

  getStepContent = stepIndex => {
    const classes = this.props.classes;
    const { codes, designations } = this.props.servicesForSuggestion;
    const { temps, devise, loading } = this.props;
    if (loading)
      return (
        <center>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </center>
      );

    switch (stepIndex) {
      case 0:
        return (
          <ChoisirService
            handleSelect={this.handleSelect}
            codes={codes}
            designations={designations}
            loading={this.props.loading}
          />
        );
      case 1:
        return (
          <Initiale
            handleChange={this.handleChange}
            data={this.state.data}
            designations={this.props.designations}
            handleSubmitInitial={this.handleSubmitInitial}
            classes={classes}
            handleDateChange={this.handleDateChange}
          />
        );
      case 2:
        // simulate getting categorie from redcucer (to let toArray and to Object work )
        // let state = fromJS(this.state);
        // let categorie = state.get("categorie");
        return (
          <Base
            handleChange={this.handleChange}
            data={this.state.data}
            categorie={this.state.categorie}
            classes={classes}
            handleFixPrecisionValeurs={this.handleFixPrecisionValeurs}
            loading={this.props.loading}
            handleValeursChange={this.handleValeursChange}
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
  handlSubmit = () => {
    if (this.state.serviceChoisi) {
      let service = this.state.data;
      this.props.updateService(service, "service");
      if (!this.state.panelEditing)
        this.setState({
          activeStep: 0,
          serviceChoisi: false,
          data: {
            caracteristiques: [],
            controleexige: false,
            gestionparlot: false
          }
        });
      else this.props.closeForm();
    }
  };

  componentWillReceiveProps(nextProps) {
    const { serviceInfo } = nextProps;

    if (serviceInfo) {
      this.setState({
        data: { ...serviceInfo }
      });
    }
  }

  handleCancel = () => {
    this.setState({
      activeStep: 0,
      serviceChoisi: false,
      errorMsg: "",
      data: {
        caracteristiques: [],
        controleexige: false,
        gestionparlot: false
      }
    });
  };

  render() {
    const { activeStep, errorMsg } = this.state;
    const { classes, closeNotif, notifMsg, width } = this.props;
    // change buttons props based on breakpoints xs/sm/lg ...
    const isSmallScreen = /xs|sm/.test(width);

    const buttonProps = {
      size: isSmallScreen ? "small" : "medium"
    };

    const elements = (
      <>
        {/* <Grid item sm={2} lg={2}> */}
        <Tooltip title="Annuler">
          <IconButton
            className={classes.cancel}
            variant="contained"
            color="primary"
            onClick={this.handleCancel}
            {...buttonProps}
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
            type="submit"
            form="gererService"
            {...buttonProps}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        {/* </Grid> */}
      </>
    );
    return (
      <div>
        {!this.state.panelEditing && (
          <PageTitle
            title="Gérer Service"
            pathname="/Logistique/Données de base/Service/Gérer Service"
            elements={elements}
            withBackOption={true}
            formChanged={this.state.formChanged}
          />
        )}

        <Card>
          {!this.state.panelEditing && (
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
              <ValidatorForm
                id="gererService"
                // ref={r => (this.form = r)}
                onSubmit={this.handlSubmit}
                autoComplete="off"
              >
                {this.getStepContent(this.state.activeStep)}
              </ValidatorForm>
            </Typography>

            {/* <div>{this.getStepContent(this.state.activeStep)}</div> */}
          </div>
        </Card>
        <div className={classes.btnArea}>
          {this.state.panelEditing && elements}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchServicesForSuggestion: bindActionCreators(fetchSuggestions, dispatch),
  fetchService: bindActionCreators(fetchItem, dispatch),
  updateService: bindActionCreators(updateItem, dispatch),
  closeNotif: () => dispatch(closeNotifAction()),
  fetchUnites: bindActionCreators(fetchUnites, dispatch)
});

const mapStateToProps = state => {
  return {
    notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
    loading: state.get("crudLogisticReducer").get("loading"),
    serviceInfo: state.get("crudLogisticReducer").get("item"),
    servicesForSuggestion: state.get("crudLogisticReducer").get("suggestions"),
    temps: state.get("crudLogisticReducer").get("temps"),
    devise: state.get("crudLogisticReducer").get("devise")
  };
};

// //const reducer = "initval";
const GererServiceReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GererService);

export default withStyles(styles)(withWidth()(GererServiceReduxed));
