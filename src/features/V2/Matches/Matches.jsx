import React from "react";
import { Link } from "react-router-dom";
import { useGetMatchesQuery } from "../../../app/Services/matchesApi";
import Loader from "../../../Components/Loader";
import MenuTabs from "../../Layout/MenuTabs";
import { FireIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import AddPopup from "../../../Components/PopUp/AddPopup";
import CommentsSection from "../../../Components/comments/CommentsSection";
// import "../../../styles/matches.css";

function Matches() {
  const { data: matches, isLoading, isError } = useGetMatchesQuery();

  if (isLoading) {
    return <Loader />;
  }
  const formatDateTime = (dateTimeStr) => {
    const date = (
      <span>
        <span>{moment(dateTimeStr).utc().format("h:mm a")}</span>
        <br />
        <span>{moment(dateTimeStr).utc().format("Do MMM")}</span>
      </span>
    );
    return date;
  };
  const filteredMatches = matches?.matches.filter(
    (match) => match.can_show == "1"
  );

  return (
    <>
      <MenuTabs>
        {filteredMatches?.length == 0 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-500">
              🥷 No battles in progress. Our warriors are preparing!
            </h1>
          </div>
        )}
        <div className="matches-container grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto mt-0 sm:mt-2">
          {filteredMatches?.map((match) => {
            if (match.can_bet == "0") {
              return <></>;
            }
            return (
              <div
                key={match.id}
                className="match flex align-middle justify-center flex-col p-4 md:max-w-2xl "
              >
                <Link
                  to={`/matches/${match.id}`}
                  className="bg-gray-800 rounded-xl relative"
                >
                  {match.can_bet == "1" && (
                    <div className="relative">
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 animate-ping" />
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 " />
                    </div>
                  )}

                  <div className="py-4 mx-7 ">{match.match_title}</div>
                  <div className="shadow-xl px-1 grid grid-cols-3">
                    <div className="team flex flex-col align-middle my-3">
                      <img
                        className="inline-block h-24 w-20 rounded-lg mx-auto"
                        src={match.team_one_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words freeman-regular">
                        {match.team_one_name}
                      </p>
                    </div>
                    <div>
                      <div className="vs flex justify-center align-middle">
                        <img src="/vs.png" alt="VS" className="vs-image w-16" />
                      </div>
                      <div className="match-details">
                        <p className="match-date-time m-0 text-center text-sm text-green-600 font-semibold">
                          {formatDateTime(match.match_time)}
                        </p>
                      </div>
                    </div>
                    <div className="team flex flex-col align-middle my-3 justify-center">
                      <img
                        className="inline-block h-24 w-20 rounded-lg mx-auto"
                        src={match.team_two_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words">
                        {match.team_two_name}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`${
                      match.can_bet == "1"
                        ? "bg-gradient-to-r from-yellow-500 to-amber-600 bg-transparent font-bold text-lg"
                        : " bg-gray-500 "
                    } text-white w-full py-2 rounded-b-xl`}
                  >
                    {" "}
                    {match.can_bet == "1" ? "Bet Now" : "View Bets"}{" "}
                  </button>
                </Link>
              </div>
            );
          })}
          {filteredMatches?.map((match) => {
            if (match.can_bet == "1") {
              return <></>;
            }
            return (
              <div
                key={match.id}
                className="match flex align-middle justify-center flex-col p-4 md:max-w-2xl "
              >
                <div
                  to={`/matches/${match.id}`}
                  className="bg-gray-800 rounded-xl relative"
                >
                  {match.can_bet == "1" && (
                    <div className="relative">
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 animate-ping" />
                      <FireIcon className=" absolute h-6 w-6 text-green-500  top-2 right-2 " />
                    </div>
                  )}

                  <div className="py-4">{match.match_title}</div>
                  <div className="shadow-xl grid grid-cols-3 px-1">
                    <div className="team flex flex-col align-middle">
                      <img
                        className="inline-block h-24 w-20 rounded-lg mx-auto"
                        src={match.team_one_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words">
                        {match.team_one_name}
                      </p>
                    </div>
                    <div>
                      <div className="vs flex justify-center align-middle">
                        <img src="/vs.png" alt="VS" className="vs-image w-16" />
                      </div>
                      <div className="match-details">
                        <p className="match-date-time m-0 text-center text-green-600 font-semibold">
                          {formatDateTime(match.match_time)}
                        </p>
                      </div>
                    </div>
                    <div className="team flex flex-col align-middle my-3">
                      <img
                        className="inline-block h-24 w-20 rounded-lg mx-auto"
                        src={match.team_two_logo}
                        alt=""
                      />
                      <p className="team-name mt-1 text-center text-gray-200 overflow-auto break-words">
                        {match.team_two_name}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`${
                      match.can_bet == "1"
                        ? "bg-green-500 font-semibold text-lg"
                        : "bg-gray-600 text-gray-300 text-lg"
                    } text-white w-full py-2 rounded-b-xl`}
                  >
                    {" "}
                    {match.can_bet == "1"
                      ? "Bet Now"
                      : "Bet closed Please check bet history"}{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </MenuTabs>
      <AddPopup />
    </>
  );
}

export default Matches;
