import Button from "components/atoms/Button";
import { subHero } from "utilities/data/subHeroSection";
import NewsTellerForm from "./sections/NewsTellerForm";
import Caurousel from "components/molecules/Carousel/CarouselType/CarouselwithAutoSlide";
import CarouselBody from "./sections/CarouselBody";
import { carouselSlides } from "utilities/data/carouselSlides";
import { useNavigate } from "react-router-dom";
import Footer from "components/molecules/Footer";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Caurousel
          carouselBody={<CarouselBody />}
          carouselSlides={carouselSlides}
        />
        <div className="flex flex-wrap justify-evenly py-20 text-center ">
          {subHero?.map(({ icon, text, subText }, idx) => (
            <div key={idx} className="flex flex-col items-center mt-5">
              {icon}
              <h2 className="text-2xl font-bold mb-4">{text}</h2>
              <p className="text-base">{subText}</p>
            </div>
          ))}
        </div>
        <div className=" flex flex-col justify-center rounded-xl items-center text-center font-semibold py-16 bg-violet-blue text-2xl lg:text-3xl text-white">
          <p> Let's Get You Started</p>
          <Button
            type="button"
            text="Get Started"
            onClick={() => navigate("/dashboard")}
            light
            className="max-w-[250px] mt-3 hover:scale-95"
          />
        </div>
        <NewsTellerForm />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
