import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const LibraryCard = ({ item }) => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center mt-4 w-full cursor-pointer">
      <div className="flex items-center gap-3 col-span-6">
        <div className="border border-white p-4 rounded-md">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>
        <div>
          <p className="md:text-base whitespace-nowrap text-[14px]">
            {item.name}
          </p>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <GoClockFill className="text-red-600" />
            <p className="md:text-xs text-xs whitespace-nowrap">
              {item.duration} mins
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3 text-lg flex gap-3 items-center justify-end">
        <IoMdShare />
        <RiEdit2Fill />
      </div>
      <div className="col-span-3 text-2xl flex justify-end md:pr-5">
        <MdKeyboardArrowRight />
      </div>
    </div>
  );
};

export default LibraryCard;