import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";

const StoryInfo = ({ story }) => {
  return (
    <>
      <p className="text-xl md:text-3xl font-semibold">{story.creator_name}</p>
      <p className="text-xl md:text-2xl mt-2 md:mt-4 font-light">
        {story.name}
      </p>
      <p className="text-sm md:text-lg font-light">{`Total ${story.episodes} episodes`}</p>

      <p className="text-sm md:text-sm mt-4 md:mt-8 font-light">
        {story.description}
      </p>
      <div className="flex gap-4 items-center text-white text-xl mt-4 md:mt-5">
        <button className="px-4 py-1 rounded-lg text-sm md:text-[15px] bg-white text-black font-semibold">
          Follow
        </button>
        <FaBell className="text-lg" />
        <IoMdShare />
        <IoArrowDownCircleSharp />
        <AiFillPlusCircle />
      </div>
    </>
  );
};

export default StoryInfo;