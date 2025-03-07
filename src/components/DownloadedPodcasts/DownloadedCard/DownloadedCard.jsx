// src/components/DownloadedCard/DownloadedCard.jsx
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { playerTitleLength } from "../../../utils/constants";

const DownloadedCard = ({ podcast }) => {
  return (
    <div className="bg-[#101010] rounded-lg p-4 mb-4">
      <div className="flex items-center gap-5">
        <img
          alt={podcast.title}
          src={podcast.image}
          className="rounded-md w-12 h-12 md:w-16 md:h-16"
        />
        <div className="text-sm flex flex-col justify-between gap-2">
          <p>
            {podcast.title.length > playerTitleLength
              ? `${podcast.title.slice(0, playerTitleLength)}....`
              : podcast.title}
          </p>
          <div className="flex items-center gap-2">
            <GoClockFill className="text-white" />
            <p className="text-xs"> {`${podcast.time} Minutes of listening`}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between md:items-center md:flex-row flex-col">
        <p className="text-xs text-[#D9D9D9CC]">{podcast.description}</p>

        <div className="flex md:justify-between justify-end items-center md:gap-10 gap-5 md:mt-0 mt-3">
          <FaCircleCheck className="text-red-600 text-lg" />
          <RiDeleteBin6Fill className="text-white text-lg" />
          <div className="md:p-2 p-2 rounded-full flex items-center justify-center bg-white">
            <IoPlay className="text-[#FF0000]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadedCard;