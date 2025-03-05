import React from "react";
import { checkMarkIcon } from "../../assets/svg/svgs";

type Props = {
  totalSteps: number;
  currentStep: number;
};

export const StepperProgress: React.FC<Props> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <div className="flex items-end max-w-screen-lg mx-auto">
      {Array.from({ length: totalSteps }, (_, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div key={index} className="w-full">
            <h6
              className={`text-base font-bold mb-2 mr-4 ${
                isCompleted
                  ? "text-green-500"
                  : isUpcoming
                  ? "text-gray-400"
                  : "text-blue-500"
              }`}
            >
              Step {index + 1}
            </h6>
            <div className="flex items-center w-full">
              <div
                className={`w-8 h-8 shrink-0 mx-[-1px] border-2 p-1.5 flex items-center justify-center rounded-full 
                ${
                  isCompleted
                    ? "border-green-500"
                    : isUpcoming
                    ? "border-gray-400"
                    : "border-blue-500"
                }`}
              >
                {isCompleted
                  ? checkMarkIcon
                  : isActive
                  ? activeCircle()
                  : stepNumber(index + 1)}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-full h-1 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const activeCircle = () => (
  <span className="w-3 h-3 bg-green-500 rounded-full" />
);

const stepNumber = (num: number) => (
  <span className="text-base text-gray-400 font-bold">{num}</span>
);
