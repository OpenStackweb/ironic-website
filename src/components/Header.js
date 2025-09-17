import React from "react";

import leftArrow from "../img/svg/arrow-left.svg";

const Header = ({ title, subTitle, bottomtext, image, buttons, display }) => {
  if (!display) return null

  return (
    <section
      className="hero-main hero hero-image"
      style={{
        ...(image ? { backgroundImage: `url(${image})` } : {}),
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
                        className="btn-icon"
                      />
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="bottom-text-wrapper">
              <h2>{bottomtext.title}</h2>
              <a href={bottomtext.link} className="release-link">
                {bottomtext.linktext}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
