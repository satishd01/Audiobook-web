import React from "react";
import { FaHeart } from "react-icons/fa";
import { TbMusicPlus } from "react-icons/tb";
import { MdQueueMusic } from "react-icons/md";
import { RiAlbumFill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";

import { IoArrowDownCircle } from "react-icons/io5";

import { HiBellAlert } from "react-icons/hi2";
import { RiScissorsCutLine } from "react-icons/ri";

const PlayerOptions = () => {
  return (
    <div className="bg-[#222222] py-5 absolute flex flex-col gap-2 md:right-8 right-2 md:top-[-18rem] top-[-9rem] text-white text-base rounded-lg p-4 md:w-56 w-48">
      <div className="flex gap-3  md:gap-5 items-center">
        <FaHeart />
        <p>Like</p>
      </div>
      <div className="flex gap-3  md:gap-5 items-center">
        <TbMusicPlus />
        <p>Add to playlist</p>
      </div>
      <div className="flex gap-3  md:gap-5 items-center">
        <MdQueueMusic />
        <p>Add to Queue</p>
      </div>
      <div className="flex gap-3  md:gap-5 items-center">
        <RiAlbumFill />
        <p>View album</p>
      </div>
      <div className="flex gap-3  md:gap-5 items-center">
        <IoMdShare />
        <p>Share</p>
      </div>
      <div className="flex gap-3  md:gap-5 items-center">
        <IoArrowDownCircle />
        <p>Download </p>
      </div>
      <div className="flex gap-3  md:gap-5 items-center">
        <HiBellAlert />
        <p>Alert</p>
      </div>
      <div className="flex gap-3  md:gap-5 items-center">
        <RiScissorsCutLine />

        <p>Trimer</p>
      </div>
    </div>
  );
};

export default PlayerOptions;
