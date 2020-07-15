import React from 'react'
import content from '../content/subscribe.json'
import leftArrow from '../img/svg/arrow-left.svg'

const NewsletterSubscribe = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    if (content.subscribe.display) {
      return (
        <React.Fragment>
          <hr />
          <section className="section search-content">
            <div className="search-content">
              <h3 className="search-content-title">
                {content.subscribe.title}
              </h3>
              <div className="search-content-subtitle">
                {content.subscribe.subTitle}
              </div>
            </div>
            <div className="field has-addons-centered">
              <form method="post" id="e2ma_signup" onSubmit="return signupFormObj.checkForm(this)" action="https://app.e2ma.net/app2/audience/signup/1900237/1771360/">
                <input id="id_prev_member_email" name="prev_member_email" type="hidden" />
                <input id="id_source" name="source" type="hidden" />
                <input id="id_group_4036448" name="group_4036448" type="hidden" value="4036448" />
                <input type="hidden" name="private_set" value="{num_private}" />
                <input placeholder="Email Address" aria-label="Email Address" id="id_email" name="email" type="email" required="required" size="is-large" className="search-container-input" />
                <button href="#" onClick="document.getElementById('e2ma_signup').submit();" className="button is-primary border-search-submit">
                  <span>SUBMIT</span>
                  <span className="ico">
                    <img src={leftArrow} alt="Learn More" />
                  </span>
                </button>
              </form>
            </div>
          </section>
        </React.Fragment>
      )
    } else {
      return null;
    }
  }
}

export default NewsletterSubscribe