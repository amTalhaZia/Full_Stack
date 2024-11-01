import heroSection1 from "../../assets/1.webp";
import heroSection2 from "../../assets/2.webp";
import heroSection3 from "../../assets/3.webp";
import "./herosection.css";

const HeroSection = () => {
  return (
    <div className="slide-wrapper">
      <div className="slide">
        <img src={heroSection1} alt="Slide 1" className="slide-image" />
        <img src={heroSection2} alt="Slide 2" className="slide-image" />
        <img src={heroSection3} alt="Slide 3" className="slide-image" />
      </div>
    </div>
  );
};

export default HeroSection;
