import React from "react";
import { IoPlay } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./CreatorCard.css"; // Assuming you have custom styles

const CreatorCard = ({ data, type }) => {
  const navigate = useNavigate();

  // Function to handle navigation to the details page
  const handleCardClick = () => {
    navigate(`/${type}/${data.id}`); // Navigate to the details page
  };

  return (
    <div
      className="grid grid-cols-12 gap-4 items-center rounded-lg mb-4 cursor-pointer"
      onClick={handleCardClick} // Navigate to details page on card click
    >
      <div className="flex items-center gap-2 col-span-6">
        <img
          alt={data?.name || data?.show_title}
          src={data?.image}
          className="rounded-lg w-12 h-12 sm:w-16 sm:h-16"
        />
        <div className="text-xs sm:text-sm text-white">
          <p className="font-semibold whitespace-nowrap">
            {data?.name || data?.show_title}
          </p>
          <p className="text-gray-300 whitespace-nowrap">{data?.description}</p>
        </div>
      </div>

      <div className="flex justify-end col-span-6">
        <div className="inline-block p-2 rounded-full items-center justify-center bg-white cursor-pointer">
          <IoPlay className="text-[#FF0000]" />
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
