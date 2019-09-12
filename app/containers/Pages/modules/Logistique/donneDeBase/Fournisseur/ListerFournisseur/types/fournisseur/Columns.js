import React from "react";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import BaseModal from "./Modals/BaseModal";
import ComptableModal from "./Modals/ComptableModal";
import Button from "@material-ui/core/Button";
import BancaireModal from "./Modals/BancaireModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class More extends React.Component {
  state = {
    open: false,
    fullScreen: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFullscreen = () => {
    let fullScreen = !this.state.fullScreen;
    this.setState({ fullScreen });
  };

  render() {
    const { classes, value } = this.props;
    const { open, fullScreen } = this.state;
    let modal;
    switch (this.props.modal) {
      case "base":
        modal = <BaseModal value={value} />;
        break;
      case "bancaires":
        modal = <BancaireModal value={value} />;
        break;
      case "comptables":
        modal = <ComptableModal value={value} />;
        break;
    }

    return (
      <div>
        <IconButton aria-label="details" onClick={this.handleOpen} size="small">
          <i className="material-icons">more_horiz</i>
        </IconButton>

        <Dialog
          maxWidth={"md"}
          fullWidth={!fullScreen}
          fullScreen={fullScreen}
          open={open}
          keepMounted
          onClose={this.handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {fullScreen && (
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Fermer"
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={this.handleFullscreen}
                  aria-label="FullScreen"
                >
                  <i class="material-icons">minimize</i>
                </IconButton>
              </Toolbar>
            </AppBar>
          )}
          <DialogTitle id="alert-dialog-title">
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Fermer"
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={this.handleFullscreen}
              aria-label="FullScreen"
            >
              <i class="material-icons">fullscreen</i>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {modal}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const reducer = "crudLogisticReducer";
const mapStateToProps = state => ({
  dataTable: state.get(reducer).get("item")
  // messageNotif: state.get(reducer).get("notifMsg")
});

const mapDispatchToProps = dispatch => ({
  // fetchdata: bindActionCreators(fetch, dispatch),
  // closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const MoreMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(More);

const MoreWithModal = withStyles(null)(MoreMapped);
// );

export default [
  {
    name: "code",
    label: "Code",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "designation",
    label: "Désignation",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "groupe",
    label: "groupe",
    options: {
      filter: true,
      sort: true
    }
  },

  {
    name: "Donnees_de_base",
    label: "D_base",
    options: {
      filter: false,
      customBodyRender: value => <MoreWithModal modal={"base"} value={value} />
    }
  },
  {
    name: "Donnees_bancaires",
    label: "D_bancaires",
    options: {
      filter: false,
      customBodyRender: value => (
        <MoreWithModal modal={"bancaires"} value={value} />
      )
    }
  },
  {
    name: "donnees_comptables",
    label: "D_comptables",
    options: {
      filter: false,
      customBodyRender: value => (
        <MoreWithModal modal={"comptables"} value={value} />
      )
    }
  }
];
