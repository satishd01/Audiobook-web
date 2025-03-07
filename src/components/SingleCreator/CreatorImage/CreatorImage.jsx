import React from "react";

const CreatorImage = ({ creator }) => {
  return (
    <div className="col-span-5">
      <img
        alt={creator?.creatorName}
        src={creator?.image}
        className="md:w-[400px] w-[200px] rounded-xl"
      />
    </div>
  );
};

export default CreatorImage;
