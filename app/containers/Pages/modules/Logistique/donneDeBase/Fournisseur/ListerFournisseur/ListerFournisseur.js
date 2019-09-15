import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PageTitle } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import messages from "./messages";
import Fournisseurs from "./types/Fournisseurs";

class ListerFournisseur extends Component {
  render() {
    // const title = brand.name + " - Table";
    // const description = brand.desc;
    // const { intl } = this.props;
    return (
      <div>
        <PageTitle
          title="Liste Fournisseurs"
          pathname="/Logistique/Données de base/Article/Liste Fournisseurs"
          withBackOption={true}
        />
        <div>
          <Fournisseurs />
        </div>
      </div>
    );
  }
}

ListerFournisseur.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ListerFournisseur);
