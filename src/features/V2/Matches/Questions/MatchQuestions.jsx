import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../../../../Components/Loader";
import {
  useGetMatchBetsQuery,
  useGetMatchQuestionsQuery,
  useUpdateMatchBetsMutation,
} from "../../../../app/Services/matchesApi";
import AllQuestions from "../../../../Components/AllQuestions";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BackButton from "../../../../Components/BackButton";
import BackButtonWithRules from "../../../../Components/BackButtonWithRules";
import CommentsSection from "../../../../Components/comments/CommentsSection";

function MatchQuestions() {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const {
    data: questions,
    isLoading,
    isError,
  } = useGetMatchQuestionsQuery(matchId);

  const {
    data: bets,
    isLoading: betsLoading,
    isError: betsError,
  } = useGetMatchBetsQuery(matchId);

  const [
    updateMatchBets,
    {
      isLoading: updateMatchBetsLoading,
      isError: updateMatchBetsError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateMatchBetsMutation();

  const [formData, setFormData] = useState(bets ? bets?.bets : {});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const highestCanBet = import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT;
    let totalAmount = 0;
    Object.keys(formData)?.map((key) => {
      totalAmount += parseInt(formData[key].amount);
    });
    if (totalAmount > highestCanBet) {
      alert("You can't bet more than " + highestCanBet);
      return;
    }
    if (totalAmount == 0) {
      alert("You can't bet 0");
      return;
    }
    try {
      const res = await updateMatchBets({
        matchId,
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
      <div className="max-w-3xl text-base leading-7  rounded bg-gray-900 h-screen md:max-w-7xl w-screen mx-auto pb-24">
        <BackButtonWithRules />
        {/* <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Match Questions:
        </h1> */}
        <AllQuestions
          questions={questions}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          show={show}
          setShow={setShow}
          totalBetAllowed={import.meta.env.VITE_REACT_APP_TOTAL_AMOUNT}
        />
        <CommentsSection roomName={`match-${matchId}`} />
        
      </div>
    </>
  );
}

export default MatchQuestions;
