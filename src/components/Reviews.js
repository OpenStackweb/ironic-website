import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import leftArrow from '../img/svg/arrow-left.svg'

const Reviews = class extends React.Component {

  render() {

    const { review: { title, text, opinions, bottom, display } } = this.props;

    // function SamplePrevArrow(props) {
    //   const { style, onClick } = props;
    //   return (        
    //     <a role="button" data-slide="prev" className="carousel-control-prev" style={{ ...style, display: 'flex' }} onClick={onClick}>
    //       <span aria-hidden="true" className="carousel-control-prev-icon"></span>
    //           <img src="/img/symbols/logo-arrow-left.svg" alt="Previous" className="home-s8-container-child" />
    //     </a>
    //   );
    // }

    // function SampleNextArrow(props) {
    //   const { style, onClick } = props;
    //   return (        
    //     <a role="button" data-slide="next" className="carousel-control-next" style={{ ...style, display: 'flex' }} onClick={onClick}>
    //       <span aria-hidden="true" className="carousel-control-next-icon"></span>
    //       <img src="/img/symbols/logo-arrow-right.svg" alt="Next" className="home-s8-container-child" />
    //     </a>
    //   );
    // }

    let slideSettings = {
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };

    if (display) {
      return (
        <React.Fragment>
          <hr />
          <section className="reviews">
            <div className="container">
              <h2>{title}</h2>
              <h4>{text}</h4>
              <div className="quote-slider">
              <Slider {...slideSettings}>
                {opinions.map((o, index) => {
                  return (
                    <div key={index}>
                      <h2 className="quote-text">{o.opinion}</h2>
                      <span className="quote-name">{`${o.person}, ${o.title}`}</span>
                      <h3 className="quote-company">{o.company}</h3>
                    </div>
                  )
                })}
              </Slider>
              </div>
            </div>
            {/* 
            <div className="bottom">
              <h3>{bottom.text}</h3>
              <a href={bottom.button.link} className="button is-primary is-inverted" style={{ margin: '0 5px' }}>
                <span>{bottom.button.text}</span> <span className="ico">
                <img src={leftArrow} alt="Learn More" style={({ filter: 'invert(36%) sepia(45%) saturate(953%) hue-rotate(170deg) brightness(98%) contrast(86%)' }, { WebkitFilter: 'invert(36%) sepia(45%) saturate(953%) hue-rotate(170deg) brightness(98%) contrast(86%)' })} />
                </span>
              </a>
              </div>
            */}

            <div className="quote-contact">Interested in highlighting your usage? <a href="">Contact Us</a></div>

          </section>
        </React.Fragment>
      )
    } else {
      return null;
    }
  }
}

export default Reviews