/*
 * CommingSoon Messages
 *
 * This contains all the text for the CommingSoon.
 */
import { defineMessages } from "react-intl";

export const scope = "boilerplate.containers.FirstLogin";

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Coming Soon"
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: "Will come with performance in design"
  },
  field1: {
    id: `${scope}.field1`,
    defaultMessage: "Entre Un nouveau mot de pass"
  },
  field2: {
    id: `${scope}.field2`,
    defaultMessage: "Virifier votre mot de pass"
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: "VChamp Obligatoir "
  },
  notMatch: {
    id: `${scope}.notMatch`,
    defaultMessage: "Mots de pass differents !"
  },
  button: {
    id: `${scope}.button`,
    defaultMessage: "Notify Me"
  }
});
