import React from "react";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Mainpitch = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {
      mainpitch: { title, description, display },
    } = this.props;
    if (display) {
      return (
        <React.Fragment>
          <section className="section-article">
            <div className="container">
              <article className="article level">
                <div className="article-content">
                  <div className="article__entry">
                    <h2 id="about-template">{title}</h2>
                    {description.map((desc, index) => {
                      return <p key={index}>{desc.text}</p>;
                    })}
                  </div>
                </div>
              </article>
            </div>
          </section>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
};

export default Mainpitch;
