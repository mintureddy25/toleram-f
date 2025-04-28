import React from "react";
import CustomButton from "../../../Components/CustomButton";

const NavigationBar = ({
  step,
  goBack,
  goToNextStep,
  handleSubmit,
  buttonLoading,
  isTeamValid,
  captain,
  viceCaptain,
  usedCredits,
  totalCredits,
}) => {
  const isNextDisabled =
    (step === 1 && !isTeamValid()) ||
    (step === 2 && (!captain || !viceCaptain));

  return (
    <div className="flex justify-between items-center py-2 px-3 border-t bg-gray-900">
      <button
        onClick={goBack}
        className="px-2 py-2 rounded-md bg-gray-800 border border-gray-100 text-xs font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-50 hover:text-gray-900"
      >
        {step > 1 ? "Back" : "Cancel"}
      </button>
      <div className="text-sm font-semibold text-gray-100">
        Points: <span className="text-green-400"> {usedCredits}</span> /{" "}
        {totalCredits}
      </div>

      {step < 3 ? (
        <button
          onClick={goToNextStep}
          disabled={isNextDisabled}
          className={`px-3 py-2 rounded-lg text-xs flex items-center ${
            isNextDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }`}
        >
          {step === 1 ? "Next" : "Preview Team"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      ) : (
        <CustomButton
          isLoading={buttonLoading}
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Team
        </CustomButton>
      )}
    </div>
  );
};

export default NavigationBar;
