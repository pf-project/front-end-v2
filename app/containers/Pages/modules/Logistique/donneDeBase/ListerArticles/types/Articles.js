import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
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

class Articles extends React.Component {
  state = {
    users: []
  };

  componentWillMount() {
    this.props.fetchdata();
  }
  render() {
    const { classes, dataTable, closeNotif, messageNotif } = this.props;
    let articles = [];
    if (dataTable)
      dataTable.toArray().map(element => {
        let article = element.toObject();
        articles.push([
          article.id,
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
        <MUIDataTable
          key={Math.random()}
          title="Liste des articles"
          data={articles}
          columns={Columns}
          options={Options}
          fixedHeader
          resizableColumns
        />
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
