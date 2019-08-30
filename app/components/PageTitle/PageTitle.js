import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card, Button, Grid } from "@material-ui/core";
import { BreadCrumb } from "enl-components";

const styles = theme => ({
  elements: {
    position: "absolute",
    right: theme.spacing(1),
    // top: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(30)
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

const PageTitle = ({ withBackOption, classes, title, pathname, elements }) => {
  return (
    <Card small className={classes.pageTitle}>
      <Grid container>
        <Grid xs={6}>
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
        <Grid xs={6}>
          <div className={classes.elements}>
            {elements}
            {withBackOption && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => window.history.back()}
                className={classes.button}
              >
                {" "}
                Quitter
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(PageTitle);
