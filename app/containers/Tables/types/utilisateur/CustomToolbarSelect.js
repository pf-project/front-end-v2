import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { blockuser } from "../../reducers/crudTbActions";

const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: "24px"
  },
  inverseIcon: {
    transform: "rotate(90deg)"
  }
};

class CustomToolbarSelect extends React.Component {
  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce(
      (nextSelectedRows, _, index) => {
        if (
          !this.props.selectedRows.data.find(
            selectedRow => selectedRow.index === index
          )
        ) {
          nextSelectedRows.push(index);
        }

        return nextSelectedRows;
      },
      []
    );

    this.props.setSelectedRows(nextSelectedRows);
  };

  handleClickDeselectAll = () => {
    this.props.setSelectedRows([]);
  };

  handleClickBlockSelected = () => {
    this.props.selectedRows.data.map(row => {
      let id = this.props.displayData[row.index].data[0];
      this.changeStatus(id);
    });
  };

  delete = () => {
    //console.log(this.props.displayData)
    // let data = this.props.selectedRows.data;
    // data.map(el => {
    //   let index = el.index;
    //   let id = this.props.displayData[index].data[0];
    //   fetchApi({
    //     method: "DELETE",
    //     url: "/api/Cheques/delete/" + id,
    //     token: window.localStorage.getItem("token")
    //   }).then(data => {});
    //   Dispatcher.dispatch({
    //     actionType: Constants.TABLE_CHEQUE_UPDATED
    //   });
    // });
  };

  changeStatus = id => {
    const token = window.localStorage.getItem("token");
    this.props.blockuser(id);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.iconContainer}>
        <Tooltip title={"supprimer"}>
          <IconButton className={classes.iconButton} onClick={this.delete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Supprimer"}>
          <IconButton
            className={classes.iconButton}
            onClick={this.handleClickDeselectAll}
          >
            <IndeterminateCheckBoxIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Bloquer/Débloquer"}>
          <IconButton
            className={classes.iconButton}
            onClick={this.handleClickBlockSelected}
          >
            <BlockIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

const reducer = "crudTbReducer";
const mapStateToProps = state => ({
  data: state.get(reducer)
});

const mapDispatchToProps = dispatch => ({
  blockuser: bindActionCreators(blockuser, dispatch)
});

const CustomToolbarSelectMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomToolbarSelect);

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelectMapped);
