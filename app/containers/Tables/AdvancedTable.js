import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { SourceReader, PapperBlock } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import messages from "./messages";
import Utilisateurs from "./types/Utilisateurs";

class AdvancedTable extends Component {
  render() {
    const title = brand.name + " - Table";
    const description = brand.desc;
    const docSrc = "containers/Tables/demos/";
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

AdvancedTable.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(AdvancedTable);
