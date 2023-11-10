import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
const client = () => {
  return (
    <>
      {/* Start Clients Area */}
      <section className="clients-section">
        <div className="container">
          <div className="section-title">
            <h2>What Our Clients Says</h2>
            <div className="bar" />
          </div>
          <div className="clients-slider ">
          <Slider {...settings}>
            <div className="clients-item">
              <div className="icon">
                <i className="flaticon-left-quotes-sign" />
              </div>
              <p>
               These platform is providing a genuine and verified startup companies and investors to deal with.The educational resources provided are extremely helpful and have given me a better understanding of investing and the market.
              </p>
              <div className="clients-content">
                <h3>Moris Jacker</h3>
                <span>HTPL Pvt. Ltd.</span>
              </div>
            </div>
            <div className="clients-item">
              <div className="icon">
                <i className="flaticon-left-quotes-sign" />
              </div>
              <p>
              I love how user-friendly and intuitive the platform is, making it easy for even a beginner investor like myself to navigate and invest with confidence.I really like it.
              </p>
              <div className="clients-content">
                <h3>Alex Maxwel</h3>
                <span>TechnoSoft Technologies</span>
              </div>
            </div>
            <div className="clients-item">
              <div className="icon">
                <i className="flaticon-left-quotes-sign" />
              </div>
              <p>
              The portfolio management tools are fantastic, allowing me to track my investments and make informed decisions to maximize my returns and one more thing it is user-friendly web-app.
              </p>
              <div className="clients-content">
                <h3>Edmond Halley</h3>
                <span>Steelo.com</span>
              </div>
            </div>
            </Slider>
          </div>
        </div>
      </section>
      {/* End Clients Area */}
    </>
  );
};

export default client;
