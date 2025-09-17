import React from "react";

import "react-medium-image-zoom/dist/styles.css";

const Mainpitch = ({
  mainpitch: { title, description, display },
}) => {
  if (!display) return null;
  return (
    <section className="section-article">
      <div className="container">
        <article className="article level">
          <div className="article-content">
            <div className="article__entry">
              <h2 id="about-template">{title}</h2>

              {description.map((desc, index) => {
                return (
                  <p
                    dangerouslySetInnerHTML={{ __html: desc.text }}
                    key={index}
                  ></p>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Mainpitch;
