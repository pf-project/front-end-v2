/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from "react-intl";

export const scope = "boilerplate.components.Forms";

export default defineMessages({
  createNewAccount: {
    id: `${scope}.Login.create`,
    defaultMessage: "Create new account"
  },
  login: {
    id: `${scope}.Login.signin`,
    defaultMessage: "Se Connecter "
  },
  loginOr: {
    id: `${scope}.Login.or`,
    defaultMessage: "Or sign in with"
  },
  registerOr: {
    id: `${scope}.Register.or`,
    defaultMessage: "Or register with"
  },
  loginFieldName: {
    id: `${scope}.Register.field.name`,
    defaultMessage: "Nom D'utilisateur"
  },
  loginFieldEmail: {
    id: `${scope}.Login.field.email`,
    defaultMessage: "Your Email"
  },
  loginFieldUsername: {
    id: `${scope}.Login.field.username`,
    defaultMessage: "Nom d'utilisateur "
  },
  loginFieldPassword: {
    id: `${scope}.Login.field.password`,
    defaultMessage: "Mot de Pass"
  },
  loginFieldRetypePassword: {
    id: `${scope}.Register.field.retypePassword`,
    defaultMessage: "Rentrer le mot de pass"
  },
  loginForgotPassword: {
    id: `${scope}.Login.field.forgot`,
    defaultMessage: "Forgot Password"
  },
  loginRemember: {
    id: `${scope}.Login.field.remember`,
    defaultMessage: "Remember"
  },
  loginButtonContinue: {
    id: `${scope}.Login.button.continue`,
    defaultMessage: "Continuer"
  },
  toAccount: {
    id: `${scope}.Register.create`,
    defaultMessage: "Already have account ?"
  },
  register: {
    id: `${scope}.Register.signup`,
    defaultMessage: "Register"
  },
  tabEmail: {
    id: `${scope}.Register.tab.email`,
    defaultMessage: "With Email"
  },
  tabSocial: {
    id: `${scope}.Register.tab.social`,
    defaultMessage: "With Social Media"
  },
  aggree: {
    id: `${scope}.Register.agree`,
    defaultMessage: "Agree with"
  },
  terms: {
    id: `${scope}.Register.terms`,
    defaultMessage: "Terms & Condition"
  },
  resetTitle: {
    id: `${scope}.Reset.title`,
    defaultMessage: "Reset Password"
  },
  resetSubtitle: {
    id: `${scope}.Reset.subtitle`,
    defaultMessage: "Send reset password link to Your email"
  },
  resetButton: {
    id: `${scope}.Reset.button`,
    defaultMessage: "Send Reset Link"
  },
  lockHint: {
    id: `${scope}.Lock.hint`,
    defaultMessage: "Hint: Entrer votre mot de pass!"
  },
  requiredForm: {
    id: `${scope}.Required.text`,
    defaultMessage: "Champ Obligatoir ! "
  }
});
