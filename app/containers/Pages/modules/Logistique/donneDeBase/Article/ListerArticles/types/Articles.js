import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import MUIDataTable from "mui-datatables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Columns from "./article/Columns";
import Options from "./article/Options";
import {
  closeNotifAction,
  fetchItem
} from "../../../../reducers/crudLogisticActions";

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

class Articles extends React.Component {
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
    this.props.fetchdata("find", "article", true);
  }
  render() {
    const {
      classes,
      dataTable,
      closeNotif,
      messageNotif,
      loading
    } = this.props;
    let articles = [];
    if (dataTable)
      dataTable.map(article => {
        articles.push([
          // article.id,
          article.code,
          article.designation,
          article.categorie,
          article.utilite,
          article.findvalidite ? article.findvalidite : "---",
          article,
          article,
          article
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
            data={articles}
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

Articles.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchdata: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired
};

const reducer = "crudLogisticReducer";
const mapStateToProps = state => ({
  dataTable: state.get(reducer).get("item"),
  loading: state.get(reducer).get("loading"),
  messageNotif: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  fetchdata: bindActionCreators(fetchItem, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const ArticlesMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);

export default withStyles(styles)(ArticlesMapped);
