import React from "react";

import leftArrow from "../img/svg/arrow-left.svg";

const Header = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { title, subTitle, image, buttons, display } = this.props;
    if (display) {
      return (
        <section
          className="hero-main hero hero-image"
          style={{
            backgroundImage: `url(${
              image && !!image.childImageSharp
                ? image.childImageSharp.fluid.src
                : image
            })`,
          }}
        >
          <div className="hero-body">
            <div className="container">
              <div className="hero-content">
                <div className="hero-logo">
                  <img src="/img/Ironic_horizontal-white.svg" />
                </div>
                <h1 className="hero-title">{title}</h1>
                <div className="hero-subhead">
                  {subTitle.map((line, index) => {
                    return (
                      <React.Fragment key={index}>
                        <span>{line.text}</span>
                        {index === subTitle.length - 1 ? "" : <br />}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="hero-actions">
                  {buttons.map((button, index) => {
                    return (
                      <a
                        href={button.link}
                        className="button is-primary-dark"
                        key={index}
                      >
                        <span>{button.text}</span>{" "}
                        <span className="ico">
                          <img
                            src={leftArrow}
                            alt="Learn More"
                            style={
                              ({
                                filter:
                                  "invert(36%) sepia(45%) saturate(953%) hue-rotate(170deg) brightness(98%) contrast(86%)",
                              },
                              {
                                WebkitFilter:
                                  "invert(36%) sepia(45%) saturate(953%) hue-rotate(170deg) brightness(98%) contrast(86%)",
                              })
                            }
                          />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
};

export default Header;
