import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PageTitle } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import messages from "./messages";
import Articles from "./types/Articles";

class ListerService extends Component {
  render() {
    // const title = brand.name + " - Table";
    // const description = brand.desc;
    // const { intl } = this.props;
    return (
      <div>
        <PageTitle
          title="Lister Service"
          pathname="/Logistique/Données de base/Service/Lister Service"
          withBackOption={true}
        />
        <div>
          <Articles />
        </div>
      </div>
    );
  }
}

ListerService.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ListerService);
