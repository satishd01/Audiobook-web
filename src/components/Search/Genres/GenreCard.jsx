import React from "react";

const GenreCard = ({ genre }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={genre.image}
        alt={genre.genre_name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <p className="text-lg font-semibold mt-4">{genre.genre_name}</p>
    </div>
  );
};

export default GenreCard;