import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PodcastCard = ({ podcast }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center md:gap-3   gap-2 shadow-lg hover:shadow-xl transform hover:scale-95 transition duration-300 ease-in-out  rounded-lg"
      onClick={() =>
        navigate(`/podcast/${podcast.podcast_id}`, { state: { podcast } })
      }>
      <div className="flex items-center md:gap-3 gap-2 cursor-pointer">
        <img
          alt={podcast.name}
          src={podcast.image}
          className="rounded-md w-14 h-14 md:w-20 md:h-20 object-cover"
        />
        <div className="flex flex-col justify-between text-sm">
          <p className="font-semibold text-whitw truncate">
            {podcast.show_title}
          </p>
          <p className="text-white">{`Season ${podcast.season}`}</p>
          <div className="flex items-center gap-3 text-whitw">
            <GoClockFill className="text-whitw" />
            <p className="text-xs whitespace-nowrap">
              {`${podcast.time} Minutes of listening`}
            </p>
          </div>
        </div>
      </div>
      <div className="ml-auto md:p-3 p-2 rounded-full flex items-center justify-center bg-white transition duration-200 cursor-pointer">
        <IoPlay className="text-[#FF0000] text-lg " />
      </div>
    </div>
  );
};

export default PodcastCard;
