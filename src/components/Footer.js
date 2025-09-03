import React from "react";
import { Link } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";

import content from "../content/footer-nav.json";

const Footer = () => (
  <footer className="footer">
    <div className="container container-medium">
      <div className="footer-inner">
        <div className="columns">
          <div className="column">
            <div className="columns is-mobile">
              <ul className="footer-list nobullet">
                <div className="footer-links">
                  {content.pages?.map((item, index) => (
                    <React.Fragment key={`footer-links-${item.link}`}>
                      <li className="item-no-bullet">
                        {item.link.match(/^https?:\/\//) ? (
                          <OutboundLink
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.text}
                          </OutboundLink>
                        ) : (
                          <Link to={item.link}>{item.text}</Link>
                        )}
                      </li>
                      {index < content.pages.length - 1 ? (
                        <li className="separator"> | </li>
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
              </ul>
            </div>
            <div className="footer-entry">
              <p>
                {content.productName} is an OpenStack project that is
                collaboratively developed under the{" "}
                <OutboundLink
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                >Apache 2 license
                </OutboundLink> and
                supported by the{" "}
                <OutboundLink
                  href="https://openinfra.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenInfra Foundation
                </OutboundLink>
                . Ironic is a trademark of the OpenInfra Foundation. The
                community follows the OpenInfra Foundation{" "}
                <OutboundLink
                  href="https://www.openstack.org/legal/community-code-of-conduct/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code of Conduct
                </OutboundLink>
                .
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
