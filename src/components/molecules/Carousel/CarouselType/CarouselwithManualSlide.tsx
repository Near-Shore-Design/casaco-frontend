import "assets/styles/component.scss";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  nextHomeProperty,
  prevHomeProperty,
  updateIndex,
} from "utilities/reduxSlices/HomePropertySlice";

interface manualCarouselprop {
  carouselSlides: Array<{ images: string }>;
  currentIndex: number;
}
const CarouselwithManualSlide: React.FC<manualCarouselprop> = ({
  carouselSlides,
  currentIndex,
}) => {
  const dispatch = useDispatch();
  const nextSlide = () => {
    dispatch(nextHomeProperty());
  };
  const prevSlide = () => {
    dispatch(prevHomeProperty());
  };
  return (
    <div className="max-w-[1400px] h-[400px] w-full m-auto px-1 relative group ">
      <div
        style={{
          backgroundImage: `url(${carouselSlides[currentIndex]?.images[0]})`,
        }}
        className="carousel-container"
      ></div>
      <div className="flex top-4 justify-center py-2">
        <div className="flex top-4 justify-center py-2">
          {carouselSlides.map((_, slideIndex) => {
            return (
              <div key={slideIndex} className="text-2xl cursor-pointer">
                <RxDotFilled
                  onClick={() => dispatch(updateIndex(slideIndex))}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex justify-between absolute top-[75%]  mt-[-100px] z-10 pl-5 pr-7">
        <BsArrowLeftCircleFill
          color="#fff"
          onClick={prevSlide}
          size={25}
          className="cursor-pointer hover:scale-105 duration-150"
        />
        <BsArrowRightCircleFill
          color="#fff"
          onClick={nextSlide}
          size={25}
          className="cursor-pointer hover:scale-110 duration-150"
        />
      </div>
    </div>
  );
};

export default CarouselwithManualSlide;
