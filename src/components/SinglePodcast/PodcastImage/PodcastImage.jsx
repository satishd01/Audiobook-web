import React from "react";

const PodcastImage = ({ podcast }) => {
  return (
    <div className="col-span-5">
      <img
        alt={podcast.name}
        src={podcast.image}
        className="md:w-[400px] w-[200px] rounded-xl"
      />
    </div>
  );
};

export default PodcastImage;
