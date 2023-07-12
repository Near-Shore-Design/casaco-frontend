import React from "react";

const ProgressBar = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const stepWidth = (currentStep / totalSteps) * 100;
  return (
    <div className="bg-gray-200 h-4 w-full rounded">
      <div className="relative flex items-center">
        <div
          className="h-full bg-blue-500 rounded-l"
          style={{ width: `${stepWidth}%` }}
        ></div>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`flex-shrink-0 relative flex items-center justify-center duration-150 rounded-full h-10 w-10 border-2 border-violet-blue ${
              index === currentStep - 1 ? "bg-violet-blue" : "bg-white"
            }`}
            style={{ flexBasis: `${100 / totalSteps}%` }}
          >
            <span
              className={`${
                currentStep === index + 1 ? "text-white" : "text-violet-blue"
              } text-sm font-bold`}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
