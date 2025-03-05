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
  // Calculate progress width based on step index
  const progressWidth = `${((currentStep + 1) / steps.length) * 100}%`;

  return (
    <div className="m-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 relative">
        <div
          className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`${
              currentStep === index
                ? "text-purple-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {step}
          </span>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousStep}
          className="px-4 py-2 bg-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextStep}
          className="px-4 py-2 bg-purple-600 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
