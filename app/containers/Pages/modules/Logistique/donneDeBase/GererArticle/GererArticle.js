import React from "react";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Initiale from "./Initiale";
import Base from "./Base";
import Stockage from "./Stockage";
import Commerciale from "./Commerciale";
import ChoisirArticle from "./ChoisirArticle";
import Button from "@material-ui/core/Button";
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
  fetchArticlesForSuggestion,
  closeNotifAction,
  fetchArticle
} from "../../reducers/crudLogisticActions";
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
  grid: {
    flexGrow: 1
  },
  checkBoxMarginTop: {
    marginTop: "20px"
  },

  // title: {
  //   flex: "0 0 auto",
  //   "& h6": {
  //     fontSize: 16,
  //     color:
  //       theme.palette.type === "dark"
  //         ? darken(theme.palette.primary.light, 0.2)
  //         : darken(theme.palette.primary.dark, 0.2)
  //   }
  // },
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
      articleChoisi: false,
      errorMsg: "",
      steps: [
        { label: "Choisir l'article", icon: "search" },
        { label: "Données initiales", icon: "perm_identity" },
        { label: "Données de base", icon: "assignment" },
        { label: "Données de stockage", icon: "storage" },
        { label: "Données commerciales", icon: "business" }
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

  componentWillMount = () => {
    this.props.fetchArticlesForSuggestion();
  };

  changeStep = (event, activeStep) => {
    if (this.state.articleChoisi) this.setState({ activeStep });
    else this.setState({ errorMsg: "Veuillez Choisir un article d'abord !" });
  };

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

  handleSelect = filterByDesignations => value => () => {
    let route = filterByDesignations ? "findByDesignation" : "findByCode";
    let url = `${route}/${value}`;
    this.props.fetchArticle(url);
    this.setState({ activeStep: 1, articleChoisi: true });
    // this.changeStep(null, 1);

    //
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

  getStepContent = stepIndex => {
    const classes = this.props.classes;
    const { codes, designations } = this.props.articlesForSuggestion;
    if (this.props.loading)
      return (
        <center>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </center>
      );

    switch (stepIndex) {
      case 0:
        return (
          <ChoisirArticle
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
            loading={this.props.loading}
            // designations={this.props.designations}
            // handleSubmitInitial={this.handleSubmitInitial}
            classes={classes}
          />
        );
      case 2:
        return (
          <Base
            handleChange={this.handleChange}
            data={this.state.data}
            categorie={this.state.categorie}
            // designations={this.props.designations}
            // handleSubmitBase={this.handleSubmitBase}
            // handleBack={this.handleBack}
            classes={classes}
            // fetchCategorie={this.fetchCategorie}
            loading={this.props.loading}
            handleValeursChange={this.handleValeursChange}
          />
        );
      case 3:
        return (
          <Stockage
            handleChange={this.handleChange}
            data={this.state.data}
            // handleSubmitStockage={this.handleSubmitStockage}
            // handleBack={this.handleBack}
            classes={classes}
          />
        );
      default:
        return (
          <Commerciale
            loading={this.props.loading}
            handleChange={this.handleChange}
            data={this.state.data}
            // handleSubmitCommerciale={this.handleSubmitCommerciale}
            // handleBack={this.handleBack}
            classes={classes}
          />
        );
    }
  };

  handlSubmit = () => {
    if (this.state.articleChoisi) {
      let article = this.state.data;
      console.log(article);
      this.setState({
        activeStep: 0,
        articleChoisi: false,
        data: {
          caracteristiques: [],
          controleexige: false,
          gestionparlot: false
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    const { articleInfo } = nextProps;

    if (articleInfo) {
      let caracteristiques = [];
      try {
        const categorie = articleInfo.categorie;

        const articlesMetaData = categorie.articlesMetaData;
        articlesMetaData.map((caracteristique, idx) => {
          caracteristique = caracteristique;
          caracteristiques.push({
            nom: caracteristique.nom,
            limite: caracteristique.limite,
            obligatoire: caracteristique.obligatoire,
            longueur: caracteristique.longueur
          });
        });
      } catch (e) {
        // console.log(e);
      }
      this.setState({
        data: { ...articleInfo.article, caracteristiques },
        categorie: articleInfo.categorie
      });
      // console.log(articleInfo.article);
      // this.setState({
      //   data: articleInfo.article,
      //   categorie: articleInfo.categorie
      //   // activeStep: 1,
      //   // articleChoisi: true
      // });
      // }
    }
  }

  render() {
    const { activeStep, errorMsg } = this.state;
    const { classes, closeNotif, notifMsg } = this.props;
    const elements = (
      <div className={classes.submitdiv}>
        {/* <Grid item sm={2} lg={2}> */}
        <Button
          // onClick={submitter}
          className={classes.button}
          // variant="contained"
          color="primary"
          // disabled={activeStep === 0}
          // onClick={this.handleBack}
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
          form="gererArticle"
        >
          Sauvegarder
        </Button>
        {/* </Grid> */}
      </div>
    );
    return (
      <div>
        <PageTitle
          title="Gérer Article"
          pathname="/Logistique/Données de base/Gérer Article"
          elements={elements}
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
                variant="fullWidth"
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
                id="gererArticle"
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
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchArticlesForSuggestion: bindActionCreators(
    fetchArticlesForSuggestion,
    dispatch
  ),
  fetchArticle: bindActionCreators(fetchArticle, dispatch),
  closeNotif: () => dispatch(closeNotifAction())
});

const mapStateToProps = state => {
  return {
    notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
    loading: state.get("crudLogisticReducer").get("loading"),
    articleInfo: state.get("crudLogisticReducer").get("article"),
    articlesForSuggestion: state
      .get("crudLogisticReducer")
      .get("articlesForSuggestion")
  };
};

// //const reducer = "initval";
const GererArticleReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GererArticle);

export default withStyles(styles)(GererArticleReduxed);
