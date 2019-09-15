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
          title="Liste services"
          pathname="/Logistique/Données de base/Service/liste services"
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
