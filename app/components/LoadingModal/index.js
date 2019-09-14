import React from "react";
import { PropTypes } from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
const styles = theme => ({
  circularProgress: {
    position: "fixed",
    top: "calc(50% - 45px)",
    left: "calc(50% - 45px)"
  },
  paper: {
    position: "absolute",
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4)
  }
});

function LoadingModal(props) {
  const { classes } = props;
  const [modalStyle] = React.useState(getModalStyle);
  const getModalStyle = () => {
    return {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    };
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      // open={props.loading}
      open={true}
    >
      <center>
        <div style={getModalStyle()} className={classes.paper}>
          <CircularProgress disableShrink /> En cours de chargement ...
        </div>
      </center>
    </Modal>
  );
}

LoadingModal.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(LoadingModal);
