import React from "react";

const badgeStyles = {
  Won: "bg-green-900 text-green-300",
  Lost: "bg-red-900 text-red-300",
  NA: "bg-yellow-900 text-yellow-300",
};

const icons = {
  Won: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  ),
  Lost: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  ),
  NA: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  ),
};

const ResultBadge = ({ result }) => {
  const style = badgeStyles[result] || badgeStyles["NA"];
  return (
    <span className={`${style} px-2 py-1 rounded text-xs flex items-center w-16`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 mr-1"
      >
        {icons[result] || icons["NA"]}
      </svg>
      {result}
    </span>
  );
};

export default ResultBadge;
