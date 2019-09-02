import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PageTitle } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import messages from "./messages";
import Services from "./types/Services";

class ListerService extends Component {
  render() {
    return (
      <div>
        <PageTitle
          title="Lister service"
          pathname="/Logistique/Données de base/Service/lister-service"
          withBackOption={true}
        />
        <div>
          <Services />
        </div>
      </div>
    );
  }
}

ListerService.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ListerService);
