import React from 'react'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import content from '../content/footer-nav.json'

const Footer = class extends React.Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container container-medium">
            <div className="footer-inner">
              <div className="columns">
                <div className="column">
                  <div className="columns is-mobile">
                    <ul className="footer-list nobullet">
                      <div className="footer-links">
                        {content.pages.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <li className="item-no-bullet">
                                {item.link.match(/^https?:\/\//) ?
                                  <OutboundLink href={item.link} target="_blank" rel="noopener noreferrer">{item.text}</OutboundLink>
                                  :
                                  <Link to={item.link}>
                                    {item.text}
                                  </Link>
                                }
                              </li>
                              {index < content.pages.length - 1 ? <li className="separator"> | </li> : null}
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </ul>
                  </div>
                  <div className="footer-entry">
                    <p>
                      {content.productName} is an independent open source community collaboratively developing code under the Apache 2 license.
                      Supported by the <OutboundLink href="https://osf.dev/" target="_blank" rel="noopener noreferrer">OpenStack Foundation</OutboundLink>.
                      The community follows the OpenStack Foundation <OutboundLink href="https://www.openstack.org/legal/community-code-of-conduct/" target="_blank" rel="noopener noreferrer">Code of Conduct</OutboundLink>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

export default Footer
