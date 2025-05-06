import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import BackButton from "./Components/BackButton";
import Dream11ScoringRules from "./features/Dream11/Dream11ScoringRules";

export default function Rules() {
  const rules = [
    {
      title: "General Rules:",
      points: [
        <div>
          Your bets will be submitted once you have saved your response. You
          will however be allowed to make edits to your bets before the time
          ends (5 minutes before the toss)
        </div>,
        <div>
          Please do not share your user credentials with anyone to ensure the
          sanctity of your bets. Bets once finalized will not be cancelled.
        </div>,
        <div>
          <span className="font-bold">Winning Calculation:</span> For example,
          if you bet 10,000 on the odds of 1.9, your total winnings on a
          favorable outcome would be 10,000 * 1.9 (bet amount * odds) = 19,000,
          resulting in a profit of 9,000.
        </div>,
        <div>
          <span className="font-bold">Female Player Runs:</span> For calculation
          of female player runs, negative runs scored will also be included in
          the final tally of runs for the match / tournament.{" "}
        </div>,
        <div>
          <span className="font-bold">Player Odds:</span> There are player odds
          next to a few named players for different events. In case you want to
          bet on a player that is not named on the odds list, the player will
          fall under the Other category and will have respective odds next to it
          (All players not showing up in the list have been clubbed together as
          Other).
        </div>,
        <div>
          <span className="font-bold">1st Innings Runs:</span> In case you bet
          on a team scoring X runs in 1st innings, and that team bats 2nd, then
          the bet will be considered void, i.e. no profit no loss.
        </div>,
        <div>
          The decision of the betting committee will be final in case of any
          concerns.
        </div>,
      ],
    },
    {
      title: "Match Rules:",
      points: [
        <div>The maximum bet amount allowed per match is 500,000.</div>,
        <div>
          The link to bet on a match will close 5 minutes before the toss of
          that match.
        </div>,
        <div>
          • 6s Explanation: For betting on the number of sixes in a match, there
          are two options with respective odds next to them, please select the
          option you think is favorable.
          <br />
          ◦ Option A: Over 14.5 – Means 15 or more sixes will be hit
          <br />◦ Option B: Under 12.5 – Means 12 or less sixes will be hit
        </div>,
        <div>
          In case of a super over, the winner of the super over will be declared
          the winner of the match for the purpose of betting.
        </div>,
        <div>
          Player Odds: There are player odds next to a few named players for
          different events. In case you want to bet on a player that is not
          named on the odds list, the player will fall under the Other category
          and will have respective odds next to it.
        </div>,
        <div>
          1st Innings Runs: In case you bet on a team scoring X runs in 1st
          innings, and that team bats 2nd, then the bet will be considered void,
          i.e. no profit no loss.
        </div>,
      ],
    },
    {
      title: "Tournament: Winners Rules",
      points: [
        <div>The maximum bet amount allowed per round is 500,000.</div>,
        <div>
          A maximum of 2 bets will be allowed per individual for the outcome of
          the winners of the tournament. There will be a fresh set of odds
          before Round 1 and Semi-finals.
        </div>,
        <div>
          The bets for each round will be frozen before the 1st match of that
          round begins.
        </div>,
      ],
    },
    {
      title: "Tournament: Top Players Rules",
      points: [
        <div>The maximum bet amount allowed for this section is 500,000.</div>,
        <div>The bets will be frozen before the start of the tournament.</div>,
        <div>
          Player Odds: There are player odds next to a few named players for
          different events. In case you want to bet on a player that is not
          named on the odds list, the player will fall under the Other category
          and will have respective odds next to it.
        </div>,
      ],
    },
  ];
  return (
    <>
      <BackButton />
      <div className=" px-6 py-7 lg:px-8">
        {rules.map((rule, index) => {
          return (
            <div className="mx-auto max-w-3xl text-base leading-7 mt-4">
              <div className="bg-green-600 px-4 py-3 m-2 rounded-md">
                <h1 className="text-lg font-bold text-white">{rule.title}</h1>
              </div>
              <p className="mt-6 text-xl leading-8"></p>
              <div className="mt-10 max-w-2xl">
                <ul role="list" className="mt-8 max-w-xl space-y-8  text-left">
                  {rule.points.map((point) => {
                    return <li className="flex gap-x-3">{point}</li>;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <Dream11ScoringRules />
    </>
  );
}
