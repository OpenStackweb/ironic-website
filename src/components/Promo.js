import React from "react";

import "react-medium-image-zoom/dist/styles.css";

const Promo = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {
      promo: { title, description, button, display },
    } = this.props;
    if (display) {
      return (
        <React.Fragment>
          <section className="section-promo">
            <div className="container">
              <div class="columns is-multiline">
                <div class="column promo-left">
                  <h4 className="promo-title">{title}</h4>
                  {description.map((desc, index) => {
                    return <p key={index}>{desc.text}</p>;
                  })}
                </div>
                <div class="column promo-right">
                  {button.map((button, index) => {
                    return (
                      <a
                        href={button.link}
                        className="button is-primary-dark"
                        key={index}
                      >
                        <span>{button.text}</span>{" "}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
};

export default Promo;
