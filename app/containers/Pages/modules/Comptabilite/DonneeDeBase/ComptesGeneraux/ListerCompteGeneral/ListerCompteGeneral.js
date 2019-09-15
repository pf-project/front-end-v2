import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PageTitle } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import ComptesGeneraux from "./types/ComptesGeneraux";

class ListerCompteGerenal extends Component {
  render() {
    // const title = brand.name + " - Table";
    // const description = brand.desc;
    // const { intl } = this.props;
    return (
      <div>
        <PageTitle
          title="Liste comptes généraux"
          pathname="/Comptabilité/Données de base/Caisse/Liste comptes généraux"
          withBackOption={true}
        />
        <div>
          {" "}
          <ComptesGeneraux />{" "}
        </div>
      </div>
    );
  }
}

ListerCompteGerenal.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ListerCompteGerenal);
