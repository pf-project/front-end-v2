import React, { Component } from "react";
import { PageTitle, Notification, SimpleTable } from "enl-components";
import { withStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import { Container, Grid, Card, MenuItem, Toolbar } from "@material-ui/core";
import {
  closeNotifAction,
  fetchItem
} from "../../reducers/crudComptabiliteActions";

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

class GrandLivre extends Component {
  constructor(props) {
    super(props);
    this.state = { journal: "Complet" };
  }

  componentWillMount = () => {
    const { fetch_ecritures_comptable } = this.props;
    fetch_ecritures_comptable(
      "find",
      "comptabilitegenerale/ecriturecomptable",
      true
    );
  };

  compare = (a, b) => {
    if (a.comptegeneral < b.comptegeneral) {
      return -1;
    }
    if (a.comptegeneral > b.comptegeneral) {
      return 1;
    }
    return 0;
  };

  handleChange = event => {
    const { name, value } = event.target;

    const dataTable = [];
    const { ecritures_comptable } = this.props;
    if (ecritures_comptable) {
      ecritures_comptable.map(ecriture =>
        ecriture.dataTable.map(element => {
          const { journal, dateComptable, libelleOperation } = ecriture;
          const {
            comptegeneral,
            designation,
            montant,
            debit,
            credit
          } = element;

          // check if element witj same compte comptable already exists
          const index = dataTable.findIndex(
            element => element.comptegeneral === comptegeneral
          );
          if (journal === value || value === "Complet") {
            if (index > -1) {
              const existingElement = { ...dataTable[index] };
              existingElement.montant =
                parseInt(existingElement.montant) + parseInt(montant);
              existingElement.debit =
                parseInt(existingElement.debit) + parseInt(debit);
              existingElement.credit =
                parseInt(existingElement.credit) + parseInt(credit);
              dataTable[index] = existingElement;
            } else {
              dataTable.push({
                comptegeneral,
                designation,
                dateComptable,
                journal,

                libelleOperation,
                debit,
                credit,
                montant
              });
            }
          }

          dataTable.sort(this.compare);
        })
      );

      this.setState({ [name]: value, dataTable });
    }
  };

  componentWillReceiveProps = nextProps => {
    const dataTable = [];
    const { ecritures_comptable } = nextProps;
    if (ecritures_comptable) {
      ecritures_comptable.map(ecriture =>
        ecriture.dataTable.map(element => {
          const { journal, dateComptable, libelleOperation } = ecriture;
          const {
            comptegeneral,
            designation,
            montant,
            debit,
            credit
          } = element;
          // check if element witj same compte comptable already exists
          const index = dataTable.findIndex(
            element => element.comptegeneral === comptegeneral
          );
          // if (journal === value || value === "Complet")
          if (index > -1) {
            const existingElement = { ...dataTable[index] };
            existingElement.montant =
              parseInt(existingElement.montant) + parseInt(montant);
            existingElement.debit =
              parseInt(existingElement.debit) + parseInt(debit);
            existingElement.credit =
              parseInt(existingElement.credit) + parseInt(credit);
            existingElement.libelleOperation =
              existingElement.libelleOperation +
              "    <  >  " +
              libelleOperation;
            dataTable[index] = existingElement;
          } else {
            dataTable.push({
              comptegeneral,
              designation,
              dateComptable,
              journal,

              libelleOperation,
              debit,
              credit,
              montant
            });
          }
        })
      );
    }
    dataTable.sort(this.compare);
    this.setState({ dataTable });
  };

  render() {
    const { classes, closeNotif, notifMsg, ecritures_comptable } = this.props;
    const { dataTable, journal } = this.state;
    return (
      <div>
        <PageTitle
          title="Grand livre"
          pathname="/Comptabilité/Comptablité générale/Grand livre"
          withBackOption
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <div className={classes.root}>
          <Card small className="mb-4">
            <Grid
              container
              //   spacing={1}
              className={classes.grid}
              direction="column"
            >
              <ValidatorForm>
                <SelectValidator
                  onChange={this.handleChange}
                  className={classes.field}
                  value={journal}
                  name="journal"
                  validators={["required"]}
                  errorMessages={["champ obligatoire"]}
                  label="Journal *:"
                >
                  <MenuItem value="Complet">Complet</MenuItem>
                  <MenuItem value="Ventes">Ventes</MenuItem>

                  <MenuItem value="Achats">Achats</MenuItem>
                  <MenuItem value="Opérations diverses">
                    Opérations diverses
                  </MenuItem>

                  <MenuItem value="Trésorerie">Trésorerie</MenuItem>
                </SelectValidator>
              </ValidatorForm>
              {ecritures_comptable && (
                <SimpleTable
                  data={dataTable}
                  // selectedRows={selectedRows}
                  // handleSelect={this.handleSelect}
                  // headers={headers}
                  allows_select={false}
                />
              )}
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeNotif: () => dispatch(closeNotifAction()),
  fetch_ecritures_comptable: bindActionCreators(fetchItem, dispatch)
});
const reducer = "crudComptabiliteReducer";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg"),
  loading: state.get(reducer).get("loading"),
  ecritures_comptable: state.get(reducer).get("item")
});

const GrandLivreReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrandLivre);

export default withStyles(styles)(GrandLivreReduxed);
