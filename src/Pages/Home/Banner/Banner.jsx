import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <AwesomeSlider className="desktop-max slider-container">
        <div>
          <h1 className="banner-title">
            Learn martial art and self defense from
            <br />
            from anywhere and anytime
          </h1>
          <p className="banner-description">
            An easy solution to learn martial art and self defense online and
            <br />
            offline anywhere anytime
          </p>
          <button className="banner-cta">Get Started</button>
        </div>

        <div>
          <h1 className="banner-title">
            Learn martial art and self defense from
            <br />
            from anywhere and anytime
          </h1>
          <p className="banner-description">
            An easy solution to learn martial art and self defense online and
            <br />
            offline anywhere anytime
          </p>
          <button className="banner-cta">Get Started</button>
        </div>

        <div>
          <h1 className="banner-title">
            Learn martial art and self defense from
            <br />
            from anywhere and anytime
          </h1>
          <p className="banner-description">
            An easy solution to learn martial art and self defense online and
            <br />
            offline anywhere anytime
          </p>
          <button className="banner-cta">Get Started</button>
        </div>
      </AwesomeSlider>
    </div>
  );
};

export default Banner;
