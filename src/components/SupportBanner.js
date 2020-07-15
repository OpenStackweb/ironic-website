import React from "react";
import content from "../content/footer-nav.json";

import OSFLogo from "../../static/img/OSF_Logo_RGB_Horiz_Badge.svg";

const SupportBanner = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <hr />
        <section>
          <div className="support-content">
            <a href="https://osf.dev/">
              <img
                className="osf-logo"
                src={OSFLogo}
                width="250px"
                alt="OSF Logo"
              />
            </a>
            <div className="support-content-info">
              {content.productName} is an{" "}
              <a className="osf-link" href={"https://openstack.org/"}>
                OpenStack
              </a>{" "}
              project supported by the{" "}
              <a className="osf-link" href={"https://osf.dev/"}>
                OSF{" "}
              </a>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
};

export default SupportBanner;
