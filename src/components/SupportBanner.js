import React from 'react'
import content from '../content/footer-nav.json'

import OSFLogo from '../../static/img/osf-logo-outline.svg'

const SupportBanner = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <React.Fragment>
        <hr />
        <section>
          <div className="support-content">
            <h2 className="support-content-title">
              {content.productName} is supported by OSF
            </h2>
            <img src={OSFLogo} width='250px' />
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default SupportBanner
