import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Columns from "./caisse/Columns";
import Options from "./caisse/Options";
import {
  closeNotifAction,
  fetchItem
} from "../../../../reducers/crudComptabiliteActions";

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
  },
  progress: {
    marginTop: "5em"
  },
  encours: {
    marginTop: "1em"
  }
});

class Caisses extends React.Component {
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
    this.props.fetchdata("find", "donneedebase/caisse", true);
  }
  render() {
    const {
      classes,
      dataTable,
      closeNotif,
      messageNotif,
      loading
    } = this.props;
    let caisses = [];
    if (dataTable)
      dataTable.map(caisse => {
        caisses.push([
          caisse.id,
          caisse.code,
          caisse.designation,
          caisse.pays,
          caisse.statu,
          caisse.devise,
          caisse.compte,
          caisse.codeJournal
        ]);
      });
    return (
      <div className={classes.table}>
        <Notification close={() => closeNotif()} message={messageNotif} />

        {loading ? (
          <center>
            <div className={classes.progress}>
              <CircularProgress
                size={100}
                thickness={1.2}
                className={classes.buttonProgress}
              />{" "}
              <div className={classes.encours}>En cours de chargement</div>
            </div>
          </center>
        ) : (
          // <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            key={Math.random()}
            title=""
            data={caisses}
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

Caisses.propTypes = {
  classes: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired
};

const reducer = "crudComptabiliteReducer";
const mapStateToProps = state => ({
  dataTable: state.get(reducer).get("item"),
  loading: state.get(reducer).get("loading"),
  messageNotif: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  fetchdata: bindActionCreators(fetchItem, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const CaissesMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Caisses);

export default withStyles(styles)(CaissesMapped);
