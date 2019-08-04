import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { SourceReader, PapperBlock } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import messages from "./messages";
import Articles from "./types/Articles";

class ListerArticles extends Component {
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
          <Articles />
        </div>
      </div>
    );
  }
}

ListerArticles.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ListerArticles);
