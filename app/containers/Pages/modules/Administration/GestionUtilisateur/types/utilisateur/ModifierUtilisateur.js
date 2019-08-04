import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import css from "enl-styles/Form.scss";
import MenuItem from "@material-ui/core/MenuItem";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

import {
  editUser,
  closeEditAction,
  blockuser
} from "../../reducers/crudTbActions";

import CircularProgress from "@material-ui/core/CircularProgress";

import { injectIntl, intlShape, FormattedMessage } from "react-intl";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: "100%",
    marginBottom: 20
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row"
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: "center"
  }
});

class ModifierUtilisateur extends Component {
  state = { loadingBlock: false, loadingEdit: false };

  handleClick = () => {
    this.props.closeEditAction();
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.setState({ loadingEdit: true });
    const { password, authority } = this.state;
    let username = this.props.data[1];
    let id = this.props.data[0];
    this.props.editUser({ id, username, password, authority });
  };

  block = () => {
    this.setState({ loadingBlock: true });
    let id = this.props.data[0];
    this.props.blockuser(id);
  };
  render() {
    const trueBool = true;
    let {
      username,
      password,
      authority,
      loadingBlock,
      loadingEdit
    } = this.state;
    const { classes, data } = this.props;
    username = data[1];
    let blockButton = data[3].props.label === "Bloqué" ? "Débloqué" : "Bloqué";
    return (
      <div>
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          direction="row"
          justify="left"
        >
          <Grid item>
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                Modifer utilisateur
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          // onError={errors => console.log(errors)}
        >
          <section className={css.bodyForm}>
            <TextValidator
              inputProps={{ readOnly: true }}
              autoComplete="off"
              style={{ width: "100%" }}
              label="Nom d'utilisateur"
              onChange={this.handleChange}
              name="username"
              value={username}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />
            <TextValidator
              style={{ width: "100%" }}
              label="Mot de passe"
              onChange={this.handleChange}
              name="password"
              type="password"
              value={password}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />
            <SelectValidator
              value={authority}
              onChange={this.handleChange}
              name="authority"
              label="Role"
              style={{ width: "100%", textAlign: "left" }}
              validators={["required"]}
              errorMessages={["Ce Champ est Obligatoire"]}
            >
              <MenuItem value={"ROLE_ADMIN"}>Administrateur</MenuItem>
              <MenuItem value={"ROLE_USER"}>Staff</MenuItem>
            </SelectValidator>
          </section>
          <div className={css.buttonArea}>
            <>
              <Button
                disabled={loadingBlock}
                variant="contained"
                color="danger"
                onClick={this.block}
              >
                {loadingBlock && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                {blockButton}
              </Button>
            </>
            <div>
              <Button
                disabled={loadingEdit}
                variant="contained"
                color="secondary"
                type="submit"
                onSubmit={this.handleSubmit}
              >
                {loadingEdit && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                Modifer
              </Button>
              <Button color="secondary" onClick={this.handleClick}>
                Annuler
              </Button>
            </div>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

ModifierUtilisateur.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  blockuser: bindActionCreators(blockuser, dispatch),
  editUser: bindActionCreators(editUser, dispatch),
  closeEditAction: () => dispatch(closeEditAction)
});

const mapStateToProps = state => ({});

//const reducer = "initval";
const FormInit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifierUtilisateur);

export default withStyles(styles)(FormInit);
