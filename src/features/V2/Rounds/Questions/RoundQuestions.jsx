import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetRoundBetsQuery,
  useGetRoundQuestionsQuery,
  useGetRoundQuery,
  useUpdateRoundBetsMutation,
} from "../../../../app/Services/roundsApi";
import Loader from "../../../../Components/Loader";
import AllQuestions from "../../../../Components/AllQuestions";
import BackButton from "../../../../Components/BackButton";
import { toast } from "react-toastify";
import BackButtonWithRules from "../../../../Components/BackButtonWithRules";

function RoundQuestions() {
  const navigate = useNavigate();
  const { roundId } = useParams();
  const {
    data: questions,
    isLoading,
    isError,
  } = useGetRoundQuestionsQuery(roundId);
  const {data: round} = useGetRoundQuery(roundId);

  const {
    data: bets,
    isLoading: betsLoading,
    isError: betsError,
  } = useGetRoundBetsQuery(roundId);

  const [
    updateRoundBets,
    { isLoading: updateRoundBetsLoading, isError: updateRoundBetsError },
  ] = useUpdateRoundBetsMutation();

  const [formData, setFormData] = useState(bets ? bets?.bets : {});
  const [show, setShow] = useState(false);

  const onSubmit = async () => {
    const highestCanBet = round?.round?.max_bet_amount;
    let totalAmount = 0;
    Object.keys(formData)?.map((key) => {
      totalAmount += parseInt(formData[key].amount);
    });
    if (totalAmount > highestCanBet) {
      alert("You can't bet more than " + highestCanBet);
      return;
    }
    try {
      const res = await updateRoundBets({
        roundId,
        data: {
          bets: formData,
        },
      }).unwrap();
      toast.success(res?.message);
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
    setShow(false);
  };

  useEffect(() => {
    if (bets) {
      const newBets = {};
      const existingBets = bets?.bets;
      Object.keys(existingBets)?.map((key) => {
        if (
          existingBets?.[key]?.option != null &&
          existingBets?.[key]?.amount != 0
        ) {
          newBets[key] = existingBets[key];
        }
      });

      setFormData(newBets);
    }
  }, [bets]);

  if (isLoading || betsLoading) {
    return <Loader />;
  }

  return (
    <>
      <BackButtonWithRules />
      <div className="mx-5 max-w-3xl text-base leading-7 text-gray-700 mt-5">
        <AllQuestions
          questions={questions}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          show={show}
          setShow={setShow}
          totalBetAllowed={import.meta.env.VITE_REACT_APP_WINNERS_AMOUNT}
        />
      </div>
    </>
  );
}

export default RoundQuestions;
