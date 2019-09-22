import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { BreadCrumb } from "enl-components";

const styles = theme => ({
  elements: {
    position: "absolute",
    right: theme.spacing(1),
    // top: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(30)
  },
  elementsLeft: {
    position: "absolute",
    left: theme.spacing(1),
    // top: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(30)
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  pageTitle: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(1),

    top: 0,
    position: "sticky",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "flex-end"
    },
    zIndex: theme.zIndex.drawer + 100,

    "& h4": {
      fontWeight: 700,
      fontSize: 24,
      paddingLeft: 10,
      paddingRight: theme.spacing(1),

      color:
        theme.palette.type === "dark"
          ? theme.palette.secondary.light
          : theme.palette.primary.dark,
      [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(3)
      }
    }
  }
});

const PageTitle = ({
  withBackOption,
  classes,
  title,
  pathname,
  elements,
  cleareStore
}) => {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLeave = () => {
    window.history.back();
  };

  return (
    <Card small className={classes.pageTitle}>
      <Grid container spacing={2}>
        {withBackOption && (
          <Grid xs={1}>
            <div className={classes.elementsLeft}>
              <Button onClick={handleOpen} className={classes.button}>
                <i class="material-icons">keyboard_backspace</i>
              </Button>
            </div>
          </Grid>
        )}
        <Grid xs={7}>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"voulez vous vraiment quitter cette page ?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Tout travail non enregistré sera perdu ...
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Non , Rester .
              </Button>
              <Button onClick={handleLeave} color="primary" autoFocus>
                Oui , Quitter la page
              </Button>
            </DialogActions>
          </Dialog>

          <Typography component="h4" variant="h4">
            {title}
          </Typography>
          <BreadCrumb
            separator=" / "
            theme="light"
            location={{
              pathname
            }}
          />
        </Grid>
        <Grid>
          <div className={classes.elements}>{elements}</div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(PageTitle);
