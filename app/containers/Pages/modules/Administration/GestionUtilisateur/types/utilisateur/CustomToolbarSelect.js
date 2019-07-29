import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { blockuser } from "../../reducers/crudTbActions";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ModifierUtilisateur from "./ModifierUtilisateur";

import PropTypes from "prop-types";

import { FloatingPanel, Notification } from "enl-components";

import { injectIntl, intlShape } from "react-intl";

import {
  //addAction,
  openEditAction,
  closeEditAction,
  closeNotifAction
} from "../../reducers/crudTbActions";

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

  handleClickBlockSelected = () => {
    this.props.selectedRows.data.map(row => {
      const id = this.props.displayData[row.index].data[0];
      this.changeStatus(id);
    });
  };

  delete = () => {
    // console.log(this.props.displayData)
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
  handleClick = () => {
    this.props.openEditAction();
  };

  editUser = values => {
    console.log(values);
  };

  changeStatus = id => {
    const token = window.localStorage.getItem("token");
    this.props.blockuser(id);
  };

  render() {
    const {
      classes,
      openEditForm,
      closeEditAction,
      closeNotif,
      notifMsg,
      intl
    } = this.props;
    let edit;
    if (this.props.selectedRows.data.length == 1) {
      let index = this.props.selectedRows.data[0].index;
      let data = this.props.displayData[index].data;
      edit = (
        <>
          <Tooltip title={"Modifier"}>
            <IconButton
              className={classes.iconButton}
              onClick={this.handleClick}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Notification
            close={() => closeNotif()}
            message={notifMsg}
            branch=""
          />
          <FloatingPanel
            title={""}
            openForm={openEditForm}
            closeForm={closeEditAction}
          >
            <ModifierUtilisateur data={data} />
          </FloatingPanel>
        </>
      );
    }

    return (
      <div className={classes.iconContainer}>
        <Tooltip title="Supprimer">
          <IconButton className={classes.iconButton} onClick={this.delete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Bloquer/Débloquer">
          <IconButton
            className={classes.iconButton}
            onClick={this.handleClickBlockSelected}
          >
            <BlockIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        {edit}
      </div>
    );
  }
}

CustomToolbarSelect.propTypes = {
  openEditForm: PropTypes.bool.isRequired,
  //add: PropTypes.func.isRequired,
  openEditAction: PropTypes.func.isRequired,
  closeEditAction: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  notifMsg: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

const reducer = "crudTbReducer";
const mapStateToProps = state => ({
  data: state.get(reducer),
  openEditForm: state.get(reducer).get("openEditForm"),
  notifMsg: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  blockuser: bindActionCreators(blockuser, dispatch),
  openEditAction: () => dispatch(openEditAction),
  closeEditAction: () => dispatch(closeEditAction),
  closeNotif: () => dispatch(closeNotifAction)
});

const CustomToolbarSelectMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomToolbarSelect);

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelectMapped);
