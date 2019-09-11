import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Columns from "./fournisseur/Columns";
import Options from "./fournisseur/Options";
import { fetch, closeNotifAction } from "../reducers/crudTbActions";
import { Notification } from "enl-components";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const styles = theme => ({
  table: {
    "& > div": {
      overflow: "auto"
    },
    "& table": {
      minWidth: 500,
      overflow: "scroll",
      [theme.breakpoints.down("lg")]: {
        "& td": {
          height: 40
        }
      }
    }
  }
});

class Fournisseurs extends React.Component {
  // getMuiTheme = () =>
  //   createMuiTheme({
  //     overrides: {
  //       MUIDataTableBodyCell: {
  //         root: {
  //           // width: 60,
  //           // fontSize: "8pt"
  //         }
  //       }
  //     }
  //   });

  state = {};

  componentWillMount() {
    this.props.fetchdata();
  }
  render() {
    const {
      classes,
      dataTable,
      closeNotif,
      messageNotif,
      loading
    } = this.props;
    let fournisseurs = [];
    if (dataTable)
      dataTable.toArray().map(element => {
        let fournisseur = element.toObject();
        console.log(fournisseur);
        fournisseurs.push([
          fournisseur.code,
          fournisseur.designation,
          fournisseur.group,
          fournisseur
          // fournisseur,
          // fournisseur
        ]);
      });
    return (
      <div className={classes.table}>
        <Notification close={() => closeNotif()} message={messageNotif} />

        {loading ? (
          <center>
            <CircularProgress size={24} className={classes.buttonProgress} />
          </center>
        ) : (
          // <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            key={Math.random()}
            title=""
            data={fournisseurs}
            columns={Columns}
            options={Options}
            // fixedHeader={false}
            // resizableColumns
          />
          // </MuiThemeProvider>
        )}
      </div>
    );
  }
}

Fournisseurs.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchdata: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired
};

const reducer = "crudTbFournisseurReducer";
const mapStateToProps = state => ({
  dataTable: state.get(reducer).get("dataTable"),
  loading: state.get(reducer).get("loading"),
  messageNotif: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  fetchdata: bindActionCreators(fetch, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const FournisseursMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fournisseurs);

export default withStyles(styles)(FournisseursMapped);
