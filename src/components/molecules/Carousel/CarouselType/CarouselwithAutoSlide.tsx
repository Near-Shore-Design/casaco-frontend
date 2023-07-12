import "assets/styles/component.scss";
import { ReactNode, useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";

interface carouselAutoSlideProp {
  carouselBody: ReactNode;
  carouselSlides: Array<{ url: string }>;
}
const Caurousel: React.FC<carouselAutoSlideProp> = ({
  carouselBody,
  carouselSlides,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const delay = 6000;
  useEffect(() => {
    const timer = setTimeout(
      () =>
        setCurrentIndex((prev) =>
          prev === carouselSlides.length - 1 ? 0 : prev + 1
        ),
      delay
    );
    return () => clearTimeout(timer);
  }, [currentIndex]);
  const goToIndex = (slideIndex: number) => setCurrentIndex(slideIndex);

  return (
    <div className="max-w-[1400px] h-[500px] w-full m-auto px-1 relative group mt-10 md:pt-20">
      <div
        style={{ backgroundImage: `url(${carouselSlides[currentIndex].url})` }}
        className="carousel-container"
      >
        {carouselBody}
      </div>
      <div className="flex top-4 justify-center py-2">
        {carouselSlides.map((_, slideIndex) => {
          return (
            <div key={slideIndex} className="text-2xl cursor-pointer">
              <RxDotFilled onClick={() => goToIndex(slideIndex)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Caurousel;
