import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import PropTypes from "prop-types";

import { FloatingPanel, Notification, ConfirmeDialog } from "enl-components";

import { injectIntl, intlShape } from "react-intl";

import {
  deleteItem,
  closeNotifAction
} from "../../../../../reducers/crudComptabiliteActions";

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
  state = {
    open: false
  };
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

  delete = () => {
    this.props.selectedRows.data.map(row => {
      const id = this.props.displayData[row.index].data[0];
      this.props.deleteItem(id, "donneedebase/caisse");
    });
  };

  render() {
    const { classes, notifMsg, intl } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.iconContainer}>
        <Tooltip title="Supprimer">
          <IconButton
            className={classes.iconButton}
            onClick={() => this.setState({ open: true })}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <ConfirmeDialog
          open={open}
          handleDelete={this.delete}
          closeDialog={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

CustomToolbarSelect.propTypes = {
  closeNotif: PropTypes.func.isRequired,
  notifMsg: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

const reducer = "crudComptabiliteReducer";
const mapStateToProps = state => ({
  notifMsg: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  deleteItem: bindActionCreators(deleteItem, dispatch),
  closeNotif: () => dispatch(closeNotifAction)
});

const CustomToolbarSelectMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomToolbarSelect);

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelectMapped);
