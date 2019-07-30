import React from "react";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import brand from "enl-api/dummy/brand";
import logo from "enl-images/logo.svg";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import styles from "enl-components/Forms/user-jss";
import messages from "./messages";
import { changePassword } from "../../../redux/actions/authActions";
import MessagesForm from "../../../components/Forms/MessagesForm";
import { closeMsgAction } from "enl-redux/actions/authActions";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";

class ChangePassword extends React.Component {
  state = {
    password: "",
    password2: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  handleSubmit = () => {
    const { token, id } = this.props;
    this.props.handleChangePassword({
      password: this.state.password,
      token,
      id
    });
  };

  render() {
    const title = brand.name + " - Coming Soon";
    const description = brand.desc;
    const { classes, intl, messagesAuth, closeMsg } = this.props;
    const { password, password2 } = this.state;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className={classes.container}>
          <div className={classes.fullFormWrap}>
            <Paper className={classNames(classes.fullWrap, classes.centerV)}>
              <div className={classes.brandCenter}>
                <div className={classNames(classes.brand, classes.invert)}>
                  <img src={logo} alt={brand.name} />
                  {brand.name}
                </div>
              </div>
              <Typography
                variant="h2"
                className={classes.titleColor}
                gutterBottom
              >
                <FormattedMessage {...messages.title} />
              </Typography>
              <Typography
                variant="h6"
                className={classes.subtitleBig}
                gutterBottom
                align="center"
              >
                <FormattedMessage {...messages.subtitle} />
              </Typography>
              {/* <section className={classes.pageFormWrap}> */}
              <div
                className={classNames(
                  classes.notifyForm,
                  classes.centerAdornment
                )}
              >
                <ValidatorForm onSubmit={this.handleSubmit} autoComplete="off">
                  {messagesAuth !== null || "" ? (
                    <MessagesForm
                      variant="error"
                      className={classes.msgUser}
                      message={messagesAuth}
                      onClose={closeMsg}
                    />
                  ) : (
                    ""
                  )}
                  <FormControl>
                    <TextValidator
                      type="password"
                      name="password"
                      label={intl.formatMessage(messages.field1)}
                      validators={["required"]}
                      errorMessages={[intl.formatMessage(messages.required)]}
                      className={classes.textField}
                      value={password}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <p />
                  <FormControl>
                    <TextValidator
                      style={{ width: "100" }}
                      type="password"
                      name="password2"
                      label={intl.formatMessage(messages.field2)}
                      className={classes.textField}
                      value={password2}
                      validators={["required", "isPasswordMatch"]}
                      errorMessages={[
                        intl.formatMessage(messages.required),
                        intl.formatMessage(messages.notMatch)
                      ]}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <p />
                  <aside>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"
                      margin="normal"
                    >
                      <FormattedMessage {...messages.button} />
                    </Button>
                  </aside>
                </ValidatorForm>
              </div>
              {/* </section> */}
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

const reducerAuth = "authReducer";
const mapStateToProps = state => ({
  token: state.get(reducerAuth).token,
  id: state.get(reducerAuth).uid,
  messagesAuth: state.get(reducerAuth).message
});

const mapDispatchToProps = dispatch => ({
  handleChangePassword: bindActionCreators(changePassword, dispatch),
  closeMsg: closeMsgAction
});

const ChangePasswordMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default withStyles(styles)(injectIntl(ChangePasswordMapped));
