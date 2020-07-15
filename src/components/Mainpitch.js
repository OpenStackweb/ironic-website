import React from 'react'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Mainpitch = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let { mainpitch: { title, description, display, image, link } } = this.props;
    if (display) {
      return (
        <React.Fragment>
          <section className="section-article">
            <div className="container">
              <article className="article level">
                {image &&
                  <figure className="article-image level-item level-right">
                    <div>
                      <a href={link}>
                        <Zoom>
                          <img src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} alt={title} />
                        </Zoom>
                      </a>
                    </div>
                  </figure>
                }
                <div className="article-content">
                  <div className="article__entry">
                    <h2 id="about-template">
                      <a href="#about-template" aria-hidden="true" className="header-anchor">#</a>
                      {title}
                    </h2>
                    {description.map((desc, index) => {
                      return (
                        <h4 key={index}>
                          {desc.text}
                        </h4>
                      )
                    })}
                  </div>
                </div>
              </article>
            </div>
          </section>
        </React.Fragment>
      )
    } else {
      return null;
    }

  }
}

export default Mainpitch
