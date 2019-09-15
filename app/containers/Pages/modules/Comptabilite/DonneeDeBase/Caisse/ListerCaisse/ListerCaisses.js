import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PageTitle } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import Caisses from "./types/Caisses";

class ListerCaisses extends Component {
  render() {
    // const title = brand.name + " - Table";
    // const description = brand.desc;
    // const { intl } = this.props;
    return (
      <div>
        <PageTitle
          title="Liste Caisse"
          pathname="/Comptabilité/Données de base/Caisse/Liste Caisse"
          withBackOption={true}
        />
        <div>
          {" "}
          <Caisses />{" "}
        </div>
      </div>
    );
  }
}

ListerCaisses.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ListerCaisses);
