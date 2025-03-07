import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { IoPlaySharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

const CreatorInfo = ({ creator }) => {
  return (
    <>
      <p className="text-xl md:text-3xl font-semibold">
        {creator?.creatorName}
      </p>
      <p className="text-xl md:text-xl  font-light">{creator?.showTitle}</p>
      <div className="text-sm md:text-sm font-light mt-5 px-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm bg-gray-100 inline-block text-black px-1 font-medium">{` ${creator?.ageRestriction} +`}</p>
          <IoPlaySharp className="text-white text-xl" />
          <p>{`${creator?.listens} Listens`}</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="bg-white rounded-full p-1">
            <IoIosStar className="text-[#FF0000] p-[2px]" />
          </div>
          <p>{creator?.starRating}</p>
        </div>
      </div>
      <div className="text-sm md:text-[15px] font-light mt-2 px-2 flex items-center justify-between">
        <p>Full Podcast: {creator?.genre}</p>
        <p>{creator?.duration}</p>
      </div>

      <p className="text-sm md:text-sm mt-4 md:mt-8 font-light text-[#D9D9D9CC]">
        {creator?.description}
      </p>
    </>
  );
};

export default CreatorInfo;
