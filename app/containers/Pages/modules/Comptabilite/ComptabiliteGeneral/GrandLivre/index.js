import React, { Component } from "react";
import { PageTitle, Notification } from "enl-components";
import { withStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import { Chip, Grid, Card, MenuItem, Toolbar } from "@material-ui/core";
import {
  closeNotifAction,
  fetchItem
} from "../../reducers/crudComptabiliteActions";
import LivreElement from "./LivreElement";

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
  chip: {
    margin: theme.spacing(0.5)
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

  LivreElement: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // width: "80",
    // display: "flex",
    // alignItems: "flex-end",

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
    this.state = { filters: {} };
  }

  componentWillMount = () => {
    const { fetch_ecritures_comptable } = this.props;
    fetch_ecritures_comptable(
      "find",
      "comptabilitegenerale/ecriturecomptable",
      true
    );
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ filters: { ...this.state.filters, [name]: value } });
  };

  deleteFromFilters = element => () => {
    let { filters } = this.state;
    delete filters[element];
    this.setState({ filters });
  };

  componentWillReceiveProps = nextProps => {
    const dataTable = [];
    const { ecritures_comptable } = nextProps;
    if (ecritures_comptable) {
      ecritures_comptable.map(ecriture => dataTable.push(ecriture));
    }

    this.setState({ dataTable });
  };

  findSimilarLettrage = lettrage => () => {
    const { filters } = this.state;
    filters["lettrageManuel"] = lettrage;
    this.setState({ filters });
  };

  render() {
    const { classes, closeNotif, notifMsg, ecritures_comptable } = this.props;
    const { journal, Lettrage, filters } = this.state;
    let dataTable;
    if (ecritures_comptable)
      dataTable = ecritures_comptable.filter(element => {
        for (var key in filters) {
          if (element[key] === undefined || element[key] != filters[key])
            return false;
        }
        return true;
      });

    const appliyedFilter = [];
    let keys = Object.keys(filters);
    keys.map(element =>
      appliyedFilter.push(
        <Chip
          label={element + ": " + filters[element]}
          onDelete={this.deleteFromFilters(element)}
          className={classes.chip}
        />
      )
    );

    return (
      <div>
        <PageTitle
          title="Grand livre"
          pathname="/Comptabilité/Comptablité générale/Grand livre"
          withBackOption
        />

        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <div className={classes.root}>
          <Grid
            container
            //   spacing={1}
            className={classes.grid}
            direction="column"
          >
            <Card className={classes.LivreElement}>
              <ValidatorForm>
                <Grid container direction="row">
                  <Grid item sm={6}>
                    <SelectValidator
                      onChange={this.handleChange}
                      className={classes.field}
                      value={filters.journal}
                      name="journal"
                      validators={["required"]}
                      errorMessages={["champ obligatoire"]}
                      label="Journal "
                    >
                      <MenuItem value="Ventes">Ventes</MenuItem>

                      <MenuItem value="Achats">Achats</MenuItem>
                      <MenuItem value="Opérations diverses">
                        Opérations diverses
                      </MenuItem>

                      <MenuItem value="Trésorerie">Trésorerie</MenuItem>
                    </SelectValidator>
                  </Grid>
                  <Grid item sm={6}>
                    <TextValidator
                      name="lettrageManuel"
                      onBlur={this.handleChange}
                      value={filters.lettrageManuel}
                      label="Lettrage manuel"
                      className={classes.field}
                      value={Lettrage}
                    />
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Card>
          </Grid>
          <Toolbar className={classes.toolbar}>
            filters :{appliyedFilter}
          </Toolbar>
          {dataTable &&
            dataTable.map(element => (
              <>
                {" "}
                <LivreElement
                  findSimilarLettrage={this.findSimilarLettrage}
                  ecritureData={element}
                  classes={classes}
                />{" "}
              </>
            ))}
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
