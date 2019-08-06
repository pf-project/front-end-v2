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
  fetch,
  fetchAction,
  closeNotifAction
} from "../reducers/crudTbActions";
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
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 40
        }
      }
    }
  }
});

class Articles extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            // width: 40
          }
        }
      }
    });

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
    let articles = [];
    if (dataTable)
      dataTable.toArray().map(element => {
        let article = element.toObject();
        articles.push([
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
            <CircularProgress size={24} className={classes.buttonProgress} />
          </center>
        ) : (
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              key={Math.random()}
              title=""
              data={articles}
              columns={Columns}
              options={Options}
              // fixedHeader={false}
              // resizableColumns
            />
          </MuiThemeProvider>
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

const reducer = "crudTbArticlesReducer";
const mapStateToProps = state => ({
  dataTable: state.get(reducer).get("dataTable"),
  loading: state.get(reducer).get("loading"),
  messageNotif: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  fetchdata: bindActionCreators(fetch, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const ArticlesMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);

export default withStyles(styles)(ArticlesMapped);
