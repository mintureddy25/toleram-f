import React, { useEffect, useRef, useState } from "react";
import PopUpStructure from "./PopUpStructure";
import Text from "../Text";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Cog8ToothIcon, CogIcon } from "@heroicons/react/20/solid";
import numeral from "numeral";
import { isEmptyObject } from "../../Utils/Helpers";

function BetSlip({
  show,
  setShow,
  questions,
  formData,
  setFormData,
  onSubmit,
  totalBetAllowed
}) {
  const cancelButtonRef = useRef();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  const onAmountChange = (e, questionId) => {
    let val = e.target.value
    if (isNaN(e.target.value)) {
      val = 0
    }
    setFormData({
      ...formData,
      [questionId]: {
        ...formData[questionId],
        amount: parseInt(val),
      },
    });
    clearErrors()
  };

  const deleteAnswer = (key) => {
    // remmove the question from the form data
    const newFormData = { ...formData };
    delete newFormData[key];
    setFormData(newFormData);
    if (isEmptyObject(newFormData)) {
      setShow(false);
    }
  };
  const [amounts, setAmounts] = useState({
    totalAmount: 0,
    potentialAmount: 0,
  });
  useEffect(() => {
    // calculate the total amount
    let amount = 0;
    Object.keys(formData)?.map((key) => {
      const val = isNaN(formData[key].amount) ? 0 : formData[key].amount
      amount += parseInt(val);
    });

    let potentialAmount = 0;
    Object.keys(formData)?.map((key) => {
      let odds = questions?.questions
        ?.find((i) => i.id == key)
        ?.options.find((i) => i.id == formData[key].option)?.odds;

      odds = parseFloat(odds);
      const val = isNaN(formData[key].amount) ? 0 : parseInt(formData[key].amount)
      potentialAmount += val * odds - val;
    });
    setAmounts({ totalAmount: amount, potentialAmount: potentialAmount });
  }, [formData]);
  return (
    <PopUpStructure
      cancelButtonRef={cancelButtonRef}
      canShowPopUp={show}
      dismissPopUP={() => {
        setShow(false);
      }}
    >
      <div className="bg-gray-900 p-2 sm:p-4 md:p-6 relative">
        <button
          onClick={() => setShow(false)}
          className="absolute text-white p-1 rounded-full bg-red-600"
        >
          <div className="flex items-center space-x-1 ">
            <span className="text-xs">Close Bet</span>
          </div>
        </button>
        <ul role="list" className="divide-y divide-gray-100 m-2 sm:m-4 md:m-6">
          <form className="" onSubmit={handleSubmit(onSubmit)} id="bets">
            {Object.keys(formData).length > 0 ? (
              Object.keys(formData)?.map((key, index) => {
                const question = questions?.questions?.find((i) => i.id == key);
                const option = questions?.questions
                  ?.find((i) => i.id == key)
                  .options.find((i) => i.id == formData[key].option);

                return (
                  <li
                    key={index}
                    className="flex-col justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <XMarkIcon
                        className="h-10 w-10 text-gray-400"
                        onClick={() => deleteAnswer(key)}
                      />
                      <div className="min-w-0 flex-auto text-xl">
                        <p className=" font-medium leading-6 ">
                          <CogIcon className="h-6 w-6 inline-block" />{" "}
                          {question?.question}
                        </p>
                        <p className="mt-1 truncate  leading-5 text-green-500 text-base">
                          {option?.option + " X " + option?.odds}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div className="text-sm leading-6">
                        <div className="">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-right"
                          >
                            Enter Bet Amount
                          </label>
                          <Text
                            register={register}
                            name={"number" + key}
                            type="number"
                            value={formData?.[key]?.amount}
                            onChange={(i) => {
                              onAmountChange(i, key);
                            }}
                            // withCheck={true}
                            options={{
                              min: {
                                value: 1000,
                                message: "Minimum amount is 1000",
                              },
                            }}
                            errors={errors}
                            className={
                              "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-gray-800 text-white"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="text-sm ">No Bets Selected</p>
              </div>
            )}
          </form>
        </ul>
        <div className=" border-t-2">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-base font-semibold leading-6 flex justify-between px-4 py-2">
              <div>Total bet allowed: </div>
              <div className="text-sm ">{numeral(parseFloat(totalBetAllowed)).format('0,0.00')}</div>
            </div>
            <div className="text-base font-semibold leading-6 flex justify-between px-4 py-2">
              <div>Total Amount</div>
              <div className="text-sm ">{numeral(parseFloat(amounts?.totalAmount)).format('0,0.00')}</div>
            </div>
            <div className="text-lg font-semibold leading-6 flex justify-between bg-green-800 px-4 py-2 rounded">
              <div>Potential Win </div>
              <div className="text-sm ">{numeral(parseFloat(amounts.potentialAmount)).format('0,0.00')}</div>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              form="bets"
              className="bg-green-500 font-semibold text-lg text-white w-full py-2 rounded-b-xl"
            >
              Place Bet
            </button>
          </div>
        </div>
      </div>
    </PopUpStructure>
  );
}

export default BetSlip;
