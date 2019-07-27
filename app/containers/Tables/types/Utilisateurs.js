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
import { fetch, fetchAction } from "../reducers/crudTbActions";

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
  componentWillReceiveProps() {
    let data = this.props.users;
    let users = [];

    data.map(user => {
      users.push([
        user.id,
        user.username,
        user.authority,
        user.enabled ? "Débloqué" : "Bloqué"
      ]);
    });
    this.setState({
      users
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.table}>
        <MUIDataTable
          key={Math.random()}
          title="Liste des utilisateurs"
          data={this.state.users}
          columns={Columns}
          options={Options}
        />
      </div>
    );
  }
}

Utilisateurs.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchdata: PropTypes.func.isRequired
};

const reducer = "crudTbReducer";
const mapStateToProps = state => ({
  users: state.get(reducer)
});

const mapDispatchToProps = dispatch => ({
  fetchdata: bindActionCreators(fetch, dispatch)
});

const UtilisateursMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Utilisateurs);

export default withStyles(styles)(UtilisateursMapped);