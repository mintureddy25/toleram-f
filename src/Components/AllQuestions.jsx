import React, { useState } from "react";
import QuestionWithOptions from "./QuetionWithOptions";
import BetSlip from "./PopUp/BetSlip";
import { isEmptyObject } from "../Utils/Helpers";

function AllQuestions({ questions, formData, setFormData, onSubmit, show, setShow,totalBetAllowed }) {
  // const [show, setShow] = useState(false);
  const onChange = (i) => {
    setFormData({
      ...formData,
      [i.questionId]: { option: i.id, amount: 0 },
    });
  };
  if (!questions?.questions) {
    return (
      <>
        <div className="flex justify-center items-center">
          <div className="text-2xl text-white">No Questions available</div>
        </div>
      </>
    );
  }
  return (
    <div className="mt-2 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl overscroll-auto mx-auto bg-gray-900 text-white p-4 sm:p-8 rounded">
      {questions?.questions?.map((question) => {
        return (
          <QuestionWithOptions
            key={question.id}
            id={question.id}
            question={question.question}
            options={question.options}
            onChange={onChange}
            formData={formData}
          />
        );
      })}
      <button
        onClick={() => setShow(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 fixed right-0 bottom-10"
        // disabled={Object.keys(formData).length == 0}
      >
        <span className="px-2 py-1 rounded-full text-white bg-red-600">
          {" "}
          {isEmptyObject(formData).length}{" "}
        </span>
        <br />
        BET SLIP
      </button>
      {show && (
        <BetSlip
          show={show}
          setShow={setShow}
          questions={questions}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          totalBetAllowed={totalBetAllowed}
        />
      )}
    </div>
  );
}

export default AllQuestions;
