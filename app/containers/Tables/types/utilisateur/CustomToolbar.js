import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { FloatingPanel, Notification } from "enl-components";
// import { injectIntl, intlShape } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AjouterUtilisateur from "./AjouterUtilisateur";

import { injectIntl, intlShape } from "react-intl";

import {
  //addAction,
  openAction,
  closeAction,
  closeNotifAction
} from "../../reducers/crudTbActions";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {
  handleClick = () => {
    this.props.open();
  };

  addUser = values => {
    console.log(values);
  };

  render() {
    const {
      classes,
      openForm,
      // add,
      open,
      closeForm,
      closeNotif,
      notifMsg,
      intl
    } = this.props;
    let add_user = {
      id: "boilerplate.containers.Administration.ajouter_utilisateur",
      defaultMessage: "Ajouter un utilisateur"
    };
    return (
      <React.Fragment>
        <Tooltip title={intl.formatMessage(add_user)}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Notification close={() => closeNotif()} message={notifMsg} branch="" />
        <FloatingPanel title={""} openForm={openForm} closeForm={closeForm}>
          <AjouterUtilisateur onSubmit={this.addUser} />
        </FloatingPanel>
      </React.Fragment>
    );
  }
}

CustomToolbar.propTypes = {
  openForm: PropTypes.bool.isRequired,
  //add: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  notifMsg: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

const reducer = "crudTbReducer";
const mapStateToProps = state => {
  return {
    openForm: state.get(reducer).get("openForm"),
    notifMsg: state.get(reducer).get("notifMsg")
  };
};

const constDispatchToProps = dispatch => ({
  //   add: () => dispatch(addAction),
  open: () => dispatch(openAction),
  closeForm: () => dispatch(closeAction),
  closeNotif: () => dispatch(closeNotifAction)
});

const CustomToolbarMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(CustomToolbar);

// export default withStyles(styles)(CustomToolbar);
export default withStyles({})(injectIntl(CustomToolbarMapped));
