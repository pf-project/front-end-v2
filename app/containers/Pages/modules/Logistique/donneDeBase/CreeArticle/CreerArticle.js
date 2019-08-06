import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Card, Row } from '@material-ui/core/';
import {
  lighten,
  darken,
  fade
} from '@material-ui/core/styles/colorManipulator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ValidatorForm } from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PageTitle, Notification } from 'enl-components';
import Grid from '@material-ui/core/Grid';
import {
  fetchCategorieDesignation,
  fetchCategorie,
  addArticle,
  closeNotifAction
} from '../../reducers/crudLogisticActions';
import Commerciale from './Commerciale';
import Stockage from './Stockage';
import Base from './Base';
import Initiale from './Initiale';


const styles = theme => ({
  root: {
    width: '90%',
    margin: '2em'
  },
  backButton: {
    marginRight: '1em'
  },
  instructions: {
    marginTop: '1em',
    marginBottom: '1em'
  },
  field: {
    width: '90%'
  },
  initialeFields: {
    width: '60%'
  },
  grid: {
    flexGrow: 1
  },
  checkBoxMarginTop: {
    marginTop: '20px'
  },
  toolbar: {
    marginTop: '1em',
    marginBottom: '1em',
    backgroundColor:
      theme.palette.type === 'dark'
        ? darken(theme.palette.primary.light, 0.6)
        : theme.palette.primary.light,
    minHeight: 60
  },
  title: {
    flex: '0 0 auto',
    '& h6': {
      fontSize: 16,
      color:
        theme.palette.type === 'dark'
          ? darken(theme.palette.primary.light, 0.2)
          : darken(theme.palette.primary.dark, 0.2)
    }
  },
  buttons: {
    marginTop: '30px'
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  submitdiv: {
    // marginLeft: "30%",

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
    position: 'sticky',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    zIndex: theme.zIndex.drawer + 10,
    // alignItems: "center",
    // marginBottom: theme.spacing(10),
    // [theme.breakpoints.up("sm")]: {
    //   // display: "flex",
    //   alignItems: "flex-end"
    // },
    '& h4': {
      fontWeight: 700,
      fontSize: 24,
      paddingLeft: 10,
      paddingRight: theme.spacing(1),
      // textTransform: "capitalize",
      color:
        theme.palette.type === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.primary.dark,
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(3)
      }
    }
  }
});

class CreerArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: [
        'Données initiales',
        'Données de base',
        'Données de stockage',
        'Données commerciales'
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
    const { data } = this.state;
    const prix_de_vente_de_base_HT = parseFloat(
      data.prix_de_vente_de_base_HT
    ).toFixed(3);
    const prix_moyen_pendere = parseFloat(data.prix_moyen_pendere).toFixed(3);
    const prix_de_vente_de_base_TTC = parseFloat(
      data.prix_de_vente_de_base_TTC
    ).toFixed(3);
    this.props.addArticle(data);
    this.handleNext();
  };

  componentWillReceiveProps(nextProps) {
    const caracteristiques = [];
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
          caracteristiques
        }
      });
    } catch (e) {
      // console.log(e);
    }
  }

  handleChange = event => {
    const { name } = event.target;
    const { value } = event.target;
    let data;
    switch (name) {
      case 'controle_qualite_exige':
        this.setState({
          data: {
            ...this.state.data,
            controle_qualite_exige: !this.state.data.controle_qualite_exige
          }
        });
        break;
      case 'gestion_par_lot':
        data = { ...this.state.data };

        if (data.gestion_par_lot) delete data.lot_standard;
        data.gestion_par_lot = !data.gestion_par_lot;
        this.setState({
          data
        });
        break;
      case 'utilite':
        data = { ...this.state.data };
        delete data.prix_de_vente_de_base_TTC;
        delete data.taux_tva;
        delete data.unite_de_vente;
        data.utilite = value;
        this.setState({
          data
        });
        break;

      default:
        this.setState({ data: { ...this.state.data, [name]: value } });
        break;
    }
  };

  getStepContent = stepIndex => {
    const { classes, loading } = this.props;

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
            loading={loading}
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
            loading={loading}
            // fetchCategorie={this.fetchCategorie}
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
            loading={loading}
          />
        );
      default:
        return (
          <Commerciale
            loading={loading}
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
        caracteristiques: [],
        controleexige: false,
        gestionparlot: false
      },
      designations: [],
      categorie: []
    });
  };

  fetchCategorie = () => {
    // this.props.fetchCategorie(this.state.data.categorie);
  };

  handleValeursChange = event => {
    const index = event.target.name;
    const valeur = event.target.value;
    const { caracteristiques } = this.state.data;
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
    const {
      classes, loading, closeNotif, notifMsg
    } = this.props;
    const { activeStep } = this.state;
    const submitter = this.getSubmitter();
    const elements = this.state.activeStep !== 4 ? (
      <div className={classes.submitdiv}>
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
          form="addArticle"
        >
          {this.state.activeStep === this.state.steps.length - 1
            ? 'Sauvegarder'
            : 'Suivant'}
        </Button>

        {/* </Grid> */}
      </div>
    ) : (
      <div />
    );

    return (
      <div>
        <PageTitle
          title="Créer Article"
          pathname="/Logistique/Données de base/Créer Article"
          elements={elements}
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
                    <ValidatorForm
                      id="addArticle"
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
  fetchCategorieDesignation: bindActionCreators(
    fetchCategorieDesignation,
    dispatch
  ),
  fetchCategorie: bindActionCreators(fetchCategorie, dispatch),
  closeNotif: () => dispatch(closeNotifAction()),
  addArticle: bindActionCreators(addArticle, dispatch)
});

const mapStateToProps = state => ({
  notifMsg: state.get('crudLogisticReducer').get('notifMsg'),
  loading: state.get('crudLogisticReducer').get('loading'),
  designations: state.get('crudLogisticReducer').get('designations'),
  categorie: state.get('crudLogisticReducer').get('categorie')
});

// //const reducer = "initval";
const CreerCategorieReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreerArticle);

export default withStyles(styles)(CreerCategorieReduxed);
