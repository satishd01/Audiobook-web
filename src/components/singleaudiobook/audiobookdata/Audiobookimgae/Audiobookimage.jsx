import React from "react";

const AudiobookImage = ({ audiobook }) => {
  return (
    <div className="col-span-5">
      <img
        alt={audiobook.name}
        src={audiobook.image}
        className="md:w-[400px] w-[200px] rounded-xl"
      />
    </div>
  );
};

export default AudiobookImage;