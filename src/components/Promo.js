import React from "react";

import "react-medium-image-zoom/dist/styles.css";

const Promo = ({
  promo: { title, description, button, display },
}) => {
  if (!display)
    return null;
  return (
    <section className="section-promo">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column promo-left">
            <h4 className="promo-title">{title}</h4>
            {description.map((desc, index) => {
              return <p key={index}>{desc.text}</p>;
            })}
          </div>
          <div className="column promo-right">
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
  );
};

export default Promo;
