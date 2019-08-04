import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { FloatingPanel, Notification } from "enl-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { injectIntl, intlShape } from "react-intl";

import {
  //addAction,
  openAddAction,
  closeAddAction,
  closeNotifAction
} from "../../reducers/crudTbActions";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  handleClick = () => {
    this.props.openAddAction();
  };

  render() {
    const {
      classes,
      openAddForm,
      closeAddForm,
      closeNotif,
      notifMsg,
      intl
    } = this.props;

    return (
      <React.Fragment>
        <Tooltip title="Ajouter un utilisateur">
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <FloatingPanel
          title={""}
          openForm={openAddForm}
          closeForm={closeAddForm}
          branch=""
        >
          <AjouterUtilisateur />
        </FloatingPanel>
      </React.Fragment>
    );
  }
}

CustomToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddForm: PropTypes.bool.isRequired,
  closeAddForm: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  notifMsg: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

const reducer = "crudTbReducer";
const mapStateToProps = state => {
  return {
    openAddForm: state.get(reducer).get("openAddForm"),
    notifMsg: state.get(reducer).get("notifMsg")
  };
};

const constDispatchToProps = dispatch => ({
  openAddAction: () => dispatch(openAddAction),
  closeAddForm: () => dispatch(closeAddAction),
  closeNotif: () => dispatch(closeNotifAction)
});

const CustomToolbarMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(CustomToolbar);

export default withStyles({})(injectIntl(CustomToolbarMapped));
