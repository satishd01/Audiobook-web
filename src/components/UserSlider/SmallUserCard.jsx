import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { user } from "./../../utils/constants";

const SmallUserCard = () => {
  const { name, email, imageUrl } = user;

  const navigate = useNavigate();

  return (
    <div
      className="w-full py-4 px-3 flex items-center justify-between rounded-md  shadow-md cursor-pointer"
      onClick={() => navigate("/profile")}>
      <img
        alt={`${name}'s profile`}
        src={imageUrl}
        className="h-12 w-12 md:h-14 md:w-14 rounded-md object-cover"
      />
      <div className="flex flex-col ml-3 text-left">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <MdOutlineKeyboardArrowRight className="text-xl text-gray-500 hidden md:block" />
    </div>
  );
};

export default SmallUserCard;
