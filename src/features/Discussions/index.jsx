import React from "react";
import CommentsSection from "../../Components/comments/CommentsSection";

function Discussions() {
    console.log("Discussions");
  return (
    <div className="px-4 sm:px-8 mt-2">
      <CommentsSection
        roomName={"tolaram-discussions"}
        title="Discussions"
        description=" Join the conversation! Share your thoughts"
      />
    </div>
  );
}

export default Discussions;
