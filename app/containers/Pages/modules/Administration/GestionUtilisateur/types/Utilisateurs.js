import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Columns from "./utilisateur/Columns";
import Options from "./utilisateur/Options";
import {
  fetch,
  fetchAction,
  closeNotifAction
} from "../reducers/crudTbActions";
import { Notification } from "enl-components";

const styles = theme => ({
  table: {
    "& > div": {
      overflow: "auto"
    },
    "& table": {
      minWidth: 500,
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 40
        }
      }
    }
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class Utilisateurs extends React.Component {
  state = {
    users: []
  };

  componentWillMount() {
    this.props.fetchdata();
  }
  render() {
    const { classes, dataTable, closeNotif, messageNotif } = this.props;
    let users = [];
    if (dataTable)
      dataTable.toArray().map(element => {
        let user = element.toObject();
        users.push([
          user.id,
          user.username,
          user.authority,
          user.enabled ? "Débloqué" : "Bloqué"
        ]);
      });

    return (
      <div className={classes.table}>
        <Notification close={() => closeNotif()} message={messageNotif} />
        <MUIDataTable
          key={Math.random()}
          title="Liste des utilisateurs"
          data={users}
          columns={Columns}
          options={Options}
        />
      </div>
    );
  }
}

Utilisateurs.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchdata: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired
};

const reducer = "crudTbReducer";
const mapStateToProps = state => ({
  dataTable: state.get(reducer).get("dataTable"),
  messageNotif: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  fetchdata: bindActionCreators(fetch, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const UtilisateursMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Utilisateurs);

export default withStyles(styles)(UtilisateursMapped);
