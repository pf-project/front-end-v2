import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  Box,
  Button,
  IconButton,
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
import ExitToApp from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
const styles = theme => ({
  elements: {
    position: "absolute",
    right: theme.spacing(2),
    // top: theme.spacing(1),
    marginTop: 13,
    marginLeft: theme.spacing(30)
  },
  elementsLeft: {
    position: "absolute",
    left: theme.spacing(2),
    // top: theme.spacing(1),
    marginTop: 13,
    marginRight: theme.spacing(30)
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  TypographyH6: {
    color: theme.palette.primary.dark,
    margin: 10
  },
  pageTitle: {
    padding: theme.spacing(),
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
  precedent,
  leftElements,
  rightElements,
  formChanged
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
      <Grid container spacing={1}>
        {leftElements && (
          <Grid md={1} xs={2}>
            <div className={classes.elementsLeft}>{precedent}</div>
          </Grid>
        )}
        <Grid xs={8} md={7}>
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

          <Box component="BreadCrumb" display={{ xs: "none", md: "inline" }}>
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
          </Box>
          <Box component="Typography" display={{ xs: "inline", md: "none" }}>
            <Typography
              component="h6"
              variant="h6"
              className={classes.TypographyH6}
            >
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <div className={classes.elements}>
            {elements}
            {withBackOption && (
              <Tooltip title="Quitter">
                <IconButton
                  size="small"
                  onClick={formChanged ? handleOpen : handleLeave}
                  className={classes.button}
                  variant="contained"
                >
                  {/* <i class="material-icons">keyboard_backspace</i> */}
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

PageTitle.defaultProps = {
  title: "",
  pathname: ""
};

export default withStyles(styles)(PageTitle);
