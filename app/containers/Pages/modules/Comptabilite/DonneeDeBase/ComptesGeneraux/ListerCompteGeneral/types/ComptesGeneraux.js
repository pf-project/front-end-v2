import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Columns from "./comptesGeneraux/Columns";
import Options from "./comptesGeneraux/Options";
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

class ComptesGeneraux extends React.Component {
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
    this.props.fetchdata("find", "donneedebase/comptegeneral", true);
  }

  render() {
    const {
      classes,
      dataTable,
      closeNotif,
      messageNotif,
      loading
    } = this.props;
    let comptesgeneraux = [];
    if (dataTable)
      dataTable.map(comptegeneral => {
        comptesgeneraux.push([
          comptegeneral.id,
          comptegeneral.compte,
          comptegeneral.designation,
          comptegeneral.comptepere === 0
            ? String(comptegeneral.compte).slice(0, -1)
            : comptegeneral.comptepere,
          comptegeneral.classe,
          comptegeneral.niveau,
          comptegeneral.compteancien ? comptegeneral.compteancien : "---",
          comptegeneral.classe > 5 ? "Compte de résultat" : "Compte de bilan",
          comptegeneral.utilized === false ? "Non" : "Oui"
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
            data={comptesgeneraux}
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

ComptesGeneraux.propTypes = {
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

const ComptesGenerauxMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComptesGeneraux);

export default withStyles(styles)(ComptesGenerauxMapped);
