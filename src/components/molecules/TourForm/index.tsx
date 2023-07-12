import Button from "components/atoms/Button";
import { useRef, useState } from "react";
import Select from "react-select";
import dayjs from "dayjs";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import { Option, requestFormProp } from "./types";
import { requestForTour } from "utilities/reduxSlices/HomePropertySlice";
import ErrorMessage from "components/atoms/ErrorMessage";
import { generateTimeList } from "utilities/helper-functions";
import { PacmanLoader } from "react-spinners";

const TourForm: React.FC<requestFormProp> = ({ closeForm }) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { singleProperty, singlePropertySchedule } = useAppSelector(
    (state: RootState) => state.home
  );
  const timeFrame = generateTimeList();

  const scheduledTimes = singlePropertySchedule.map((data: any) => {
    const timeParts = data.scheduled_time.split(":");
    const hours = timeParts[0];
    const minutes = timeParts[1];
    return `${hours}:${minutes}`;
  });

  const filteredTimes = timeFrame.filter(
    (time) => !scheduledTimes.includes(time.value)
  );

  const { userData } = useAppSelector((state: RootState) => state.auth);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  const [active, setActive] = useState<number>(-1);
  const [choosenDate, setChoosenDate] = useState<any>(-1);
  const [selectedTime, setSelectedtime] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const today = new Date();
  const fiveDays = [...Array(5)].map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i + 1);

    return date;
  });
  const handleChange = (option: Option | null) => {
    setSelectedtime(option);
    setErrorMessage(false);
  };
  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  //Form Validations

  const dateCheck = choosenDate < 0;
  const timeCheck = selectedTime === null;
  const textValidation = !dateCheck && timeCheck;
  const messageValidation = message === "";
  const buttonDisabled =
    dateCheck || timeCheck || textValidation || messageValidation;

  const pickedDate = dayjs(choosenDate).format("YYYY-MM-DD");
  const handleSubmit = (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const formattedDate = pickedDate.toString();
    const formattedTime = selectedTime.value.toString();
    const data = {
      property_id: singleProperty?.property_id,
      user_id: userData?.user_id,
      scheduled_time: formattedTime,
      scheduled_date: formattedDate,
      message: message,
    };
    dispatch(requestForTour(data)).then((data) => {
      if (data) {
        setIsLoading(false);
        closeForm();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-auto h-full max-h-[470px] pb-3 px-3"
    >
      <div className="w-full max-w-[425px]">
        <h2 className="text-xl py-3 font-semibold">Select a preferred date</h2>
        <div className="relative w-full flex justify-center mb-10">
          <div className="absolute w-full  top-[40%] left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2 flex justify-between">
            <BsFillArrowLeftCircleFill
              size={25}
              onClick={handleScrollLeft}
              className="cursor-pointer"
            />

            <BsFillArrowRightCircleFill
              size={25}
              onClick={handleScrollRight}
              className="cursor-pointer"
            />
          </div>

          <div
            ref={scrollRef}
            className="flex gap-2 text-xl font-medium overflow-auto w-[350px] px-2 pb-5 scrollbar-hidden"
          >
            {fiveDays.map((day, idx) => {
              return (
                <div
                  className={`border ${
                    active == idx
                      ? "border-violet-blue bg-violet-blue/30 cursor-default"
                      : "border-violet-blue/20 cursor-pointer"
                  } w-fit py-5 px-10 rounded-xl text-center z-10`}
                  key={day.toISOString()}
                  onClick={() => {
                    setActive(idx);
                    setChoosenDate(day);
                  }}
                >
                  <div>
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div>
                    {day.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="text-xl py-3 font-semibold">Select a preferred Time</h2>
        <Select
          options={filteredTimes}
          className="mb-10"
          onChange={handleChange}
          isDisabled={dateCheck}
        />
        <textarea
          id="message"
          className="block p-2.5 w-full h-20 mb-2 text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none focus:ring-violet-blue duration-200 focus:border-violet-blue resize-none"
          onChange={handleMessageChange}
          placeholder="Send a message..."
          disabled={textValidation}
        ></textarea>

        {errorMessage && (
          <ErrorMessage field="You must select a date and time" />
        )}
        <Button
          text={
            isLoading ? (
              <PacmanLoader color="#fff" size={5} />
            ) : (
              "Request a tour"
            )
          }
          type="submit"
          disabled={buttonDisabled}
          className="w-full mt-3 py-2.5 justify-center text-xl font-bold"
        />
      </div>
    </form>
  );
};

export default TourForm;
