import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { injectIntl, intlShape } from "react-intl";
import messages from "./messages";
import Utilisateurs from "./types/Utilisateurs";

class GestionUtilisateur extends Component {
  render() {
    const title = brand.name + " - Table";
    const description = brand.desc;
    const { intl } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div>
          <Utilisateurs />
        </div>
      </div>
    );
  }
}

GestionUtilisateur.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(GestionUtilisateur);
