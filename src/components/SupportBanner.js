import React from "react";
import content from "../content/footer-nav.json";

import OSFLogo from "../../static/img/OpenInfrastructureFoundation-logo-RGB-horiz2.svg";

const SupportBanner = () => (
  <React.Fragment>
    <hr />
    <section>
      <div className="support-content">
        <a href="https://openinfra.dev/">
          <img
            className="osf-logo"
            src={OSFLogo}
            width="250px"
            alt="OpenInfra Logo"
          />
        </a>
        <div className="support-content-info">
          {content.productName} is an{" "}
          <a className="osf-link" href={"https://openstack.org/"}>
            OpenStack
          </a>{" "}
          project supported by the{" "}
          <a className="osf-link" href={"https://openinfra.dev/"}>
            OpenInfra Foundation{" "}
          </a>
        </div>
      </div>
    </section>
  </React.Fragment>
);

export default SupportBanner;
