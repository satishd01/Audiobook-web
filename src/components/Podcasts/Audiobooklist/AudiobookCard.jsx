import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AudiobookCard = ({ audiobook }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center md:gap-3 gap-2 shadow-lg hover:shadow-xl transform hover:scale-95 transition duration-300 ease-in-out rounded-lg"
      onClick={() => navigate(`/audiobook/${audiobook.id}`, { state: { audiobook } })}>
      <div className="flex items-center md:gap-3 gap-2 cursor-pointer">
        <img
          alt={audiobook.name}
          src={audiobook.image}
          className="rounded-md w-14 h-14 md:w-20 md:h-20 object-cover"
        />
        <div className="flex flex-col justify-between text-sm">
          <p className="font-semibold text-white truncate">
            {audiobook.name}
          </p>
          {/* <p className="text-white">{`Duration: ${audiobook.duration} minutes`}</p> */}
          <div className="flex items-center gap-3 text-white">
            {/* <GoClockFill className="text-white" />
            <p className="text-xs whitespace-nowrap">
              {`${audiobook.duration} Minutes of listening`}
            </p> */}
          </div>
        </div>
      </div>
      {/* <div className="ml-auto md:p-3 p-2 rounded-full flex items-center justify-center bg-white transition duration-200 cursor-pointer">
        <IoPlay className="text-[#FF0000] text-lg " />
      </div> */}
    </div>
  );
};

export default AudiobookCard;