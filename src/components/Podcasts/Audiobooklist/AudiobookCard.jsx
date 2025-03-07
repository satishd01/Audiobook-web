import React from "react";
import { useNavigate } from "react-router-dom";

const AudiobookCard = ({ audiobook }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/audiobook/${audiobook.id}`);
  };

  return (
    <div
      className="relative shadow-lg hover:shadow-xl transform hover:scale-90 transition duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick}>
      <img
        src={audiobook.image}
        alt={audiobook.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
        <h3 className="text-lg font-semibold">{audiobook.name}</h3>
        <p className="text-sm">{audiobook.description}</p>
      </div>
    </div>
  );
};

export default AudiobookCard;