import React from "react";
import PropTypes from "prop-types";
import { IndexPageTemplate } from "../../templates/index-page";

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    // CMS preview doesn't have access to dynamic release data, so provide a fallback
    const mockReleaseData = {
      version: "34.0.0",
      releaseNotesUrl: "https://docs.openstack.org/releasenotes/ironic/2026.1.html#relnotes-34-0-0",
      publishedAt: null, // Actual release date not available
      htmlUrl: "https://github.com/openstack/releases/blob/master/deliverables/gazpacho/ironic.yaml",
      releaseSeries: "gazpacho",
    };

    return (
      <IndexPageTemplate
        header={data.header || {}}
        mainpitch={data.mainpitch || {}}
        promo={data.promo || {}}
        features={data.features || {}}
        review={data.review || {}}
        latestRelease={mockReleaseData}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default IndexPagePreview;
