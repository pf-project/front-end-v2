import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  lighten,
  darken,
  fade
} from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PageTitle, Notification } from "enl-components";
import Grid from "@material-ui/core/Grid";

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
class Unites extends React.Component {
  render() {
    const { classes, notifMsg, closeNotif } = this.props;
    const elements = (
      <>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          form="addArticle"
        >
          Sauvegarder
        </Button>
      </>
    );

    return (
      <div>
        <PageTitle
          title="Listes de base"
          pathname="/Logistique/Paramétrage/Configuration de base/Unites"
          elements={elements}
          withBackOption={true}
        />
        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeNotif: () => dispatch(closeNotifAction())
});

const mapStateToProps = state => ({
  notifMsg: state.get("crudLogisticReducer").get("notifMsg"),
  loading: state.get("crudLogisticReducer").get("loading")
});

// //const reducer = "initval";
const UnitesReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Unites);

export default withStyles(styles)(UnitesReduxed);
