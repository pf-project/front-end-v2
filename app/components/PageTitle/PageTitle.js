import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import { BreadCrumb } from "enl-components";

const styles = theme => ({
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

const PageTitle = ({ classes, title, pathname, elements }) => {
  return (
    <Card small className={classes.pageTitle}>
      <Typography component="h4" variant="h4">
        {/* {messages[place] !== undefined ? (
              <FormattedMessage {...messages[place]} />
            ) : (
              place
            )} */}
        {title}
      </Typography>
      <BreadCrumb
        separator=" / "
        theme="light"
        location={{
          pathname
        }}
      />
      <div>{elements}</div>
    </Card>
  );
};

export default withStyles(styles)(PageTitle);
