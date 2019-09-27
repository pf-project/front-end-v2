import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import { Field, reduxForm } from "redux-form/immutable";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Ionicon from "react-ionicons";
import brand from "enl-api/dummy/brand";
import logo from "enl-images/tilda.svg";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { closeMsgAction } from "enl-redux/actions/authActions";
import { CheckboxRedux, TextFieldRedux } from "./ReduxFormMUI";
import MessagesForm from "./MessagesForm";
import messages from "./messages";
import styles from "./user-jss";

// validation functions
const required = value => (value == null ? "Required" : undefined);
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength5 = maxLength(5);
class LoginForm extends React.Component {
  // eslint-disable-line
  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      intl,
      messagesAuth,
      closeMsg,
      loading,
      isError
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Paper className={classes.sideWrap}>
        <div className={classes.topBar}>
          <Hidden mdUp>
            <div className={classes.headLogo}>
              <NavLink to="/" className={classes.brand}>
                <img src={logo} alt={brand.name} />
                {brand.name}
              </NavLink>
            </div>
          </Hidden>
          <Typography variant="h4" className={classes.title}>
            <FormattedMessage {...messages.login} />
          </Typography>
        </div>
        {messagesAuth !== null || "" ? (
          <MessagesForm
            variant={isError ? "error" : "success"}
            className={classes.msgUser}
            message={messagesAuth}
            onClose={closeMsg}
          />
        ) : (
          ""
        )}
        <section className={classes.pageFormSideWrap}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="username"
                  component={TextFieldRedux}
                  placeholder={intl.formatMessage(messages.loginFieldUsername)}
                  label={intl.formatMessage(messages.loginFieldUsername)}
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type={showPassword ? "text" : "password"}
                  label={intl.formatMessage(messages.loginFieldPassword)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>

            <div className={classes.btnArea}>
              <Button
                variant="contained"
                disabled={loading}
                fullWidth
                color="primary"
                size="large"
                type="submit"
              >
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                <FormattedMessage {...messages.loginButtonContinue} />
                {!loading && (
                  <ArrowForward
                    className={classNames(
                      classes.rightIcon,
                      classes.iconSmall,
                      classes.signArrow
                    )}
                    disabled={submitting || pristine}
                  />
                )}
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  messagesAuth: PropTypes.string,
  loading: PropTypes.bool,
  closeMsg: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  messagesAuth: null,
  loading: false
};

const LoginFormReduxed = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(LoginForm);

const mapDispatchToProps = {
  closeMsg: closeMsgAction
};

const reducerAuth = "authReducer";
const mapStateToProps = state => ({
  messagesAuth: state.get(reducerAuth).message,
  loading: state.get(reducerAuth).loading,
  isError: state.get(reducerAuth).isError,
  ...state
});

const LoginFormMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormReduxed);

export default withStyles(styles)(injectIntl(LoginFormMapped));
