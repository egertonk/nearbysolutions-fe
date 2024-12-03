import React from "react";

type Props = {
  steps: string[];
  currentStep: number;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
};

export const FormProgressBar: React.FC<Props> = ({
  steps,
  currentStep,
  handlePreviousStep,
  handleNextStep,
}) => {
  return (
    <div className="m-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        {steps.map((step, index) => (
          <div
            className={`${
              currentStep === index
                ? "bg-purple-600 h-2.5 rounded-full" // Highlight the current step
                : ""
            }`}
            style={
              currentStep === 0
                ? { width: "25%" }
                : currentStep === 1
                ? { width: "50%" }
                : currentStep === 2
                ? { width: "75%" }
                : { width: "100%" }
            }
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`${
              currentStep === index
                ? "text-purple-600 font-semibold" // Highlight the current step
                : "text-gray-500"
            }`}
          >
            {step}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousStep}
          className={`px-4 py-2 bg-gray-200 text-sm ${
            currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextStep}
          className={`px-4 py-2 bg-purple-600 text-white text-sm ${
            currentStep === steps.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
