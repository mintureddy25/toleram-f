import React, { useEffect, useState } from "react";
import {
  useGetPlayerQuestionsQuery,
  useGetPlayersBetsQuery,
  useUpdatePlayerBetsMutation,
} from "../../../app/Services/playersApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import AllQuestions from "../../../Components/AllQuestions";
import { toast } from "react-toastify";
import BackButton from "../../../Components/BackButton";
import BackButtonWithRules from "../../../Components/BackButtonWithRules";

function Players() {
  const { data: questions, isLoading, isError } = useGetPlayerQuestionsQuery();

  const {
    data: bets,
    isLoading: betsLoading,
    isError: betsError,
  } = useGetPlayersBetsQuery();

  const [
    updatePlayerBets,
    { isLoading: updatePlayerBetsLoading, isError: updatePlayerBetsError },
  ] = useUpdatePlayerBetsMutation();

  const [formData, setFormData] = useState(bets ? bets?.bets : {});
  const [show, setShow] = useState(false);

  const onSubmit = async () => {
    const highestCanBet = import.meta.env.VITE_REACT_APP_PLAYERS_AMOUNT;
    let totalAmount = 0;
    Object.keys(formData)?.map((key) => {
      totalAmount += parseInt(formData[key].amount);
    });
    if (totalAmount > highestCanBet) {
      alert("You can't bet more than " + highestCanBet);
      return;
    }
    try {
      const res = await updatePlayerBets({
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
      <>
        <div className="mx-5 text-base lg:mx-50 xl:mx-50 leading-7 rounded">
          <BackButtonWithRules />
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Best Players:
          </h1>

          <AllQuestions
            questions={questions}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            show={show}
            setShow={setShow}
            totalBetAllowed={import.meta.env.VITE_REACT_APP_PLAYERS_AMOUNT}
          />
        </div>
      </>
    </>
  );
}

export default Players;
