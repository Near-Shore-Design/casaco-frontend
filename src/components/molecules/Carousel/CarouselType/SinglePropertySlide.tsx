import { useState } from "react";
import "assets/styles/component.scss";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

interface singlePropertyCarouselProp {
  carouselImages: string[];
}
const SinglePropertySlide: React.FC<singlePropertyCarouselProp> = ({
  carouselImages,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="max-w-[1400px] h-[600px] w-full m-auto px-1 relative group ">
      <div
        style={{
          backgroundImage: `url(${carouselImages[currentIndex]})`,
        }}
        className="carousel-container"
      ></div>
      <div className="flex top-4 justify-center py-2">
        <div className="flex top-4 justify-center py-2">
          {carouselImages.map((_, slideIndex) => {
            return (
              <div key={slideIndex} className="text-2xl cursor-pointer">
                <RxDotFilled onClick={() => setCurrentIndex(slideIndex)} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex justify-between absolute top-[75%]  mt-[-100px] z-10 pl-5 pr-7">
        <BsArrowLeftCircleFill
          color="#fff"
          onClick={() =>
            setCurrentIndex((prevState) =>
              prevState > 0 ? prevState - 1 : prevState
            )
          }
          size={25}
          className="cursor-pointer hover:scale-105 duration-150"
        />
        <BsArrowRightCircleFill
          color="#fff"
          onClick={() =>
            setCurrentIndex((prevState) =>
              prevState + 1 < carouselImages?.length ? prevState + 1 : prevState
            )
          }
          size={25}
          className="cursor-pointer hover:scale-110 duration-150"
        />
      </div>
    </div>
  );
};

export default SinglePropertySlide;
