import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreCard from "./GenreCard";
import { fetchGenres } from "../../../apis/fetchgenere";

const GenresPage = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres(setGenres);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between md:px-3 md:pr-5">
        <p className="text-white text-2xl mb-4">Genres</p>
        <p
          className="text-sm text-gray-400 cursor-pointer"
          onClick={() => navigate("/genres")}>
          See all
        </p>
      </div>
      <div className="flex md:grid md:grid-cols-3 gap-6 md:px-3 overflow-x-auto md:overflow-visible">
        {genres &&
          genres.slice(0, 6).map((genre) => (
            <div
              key={genre.id}
              className="min-w-[300px] flex-shrink-0 md:min-w-0 pb-3">
              <GenreCard genre={genre} />
            </div>
          ))}
      </div>
    </>
  );
};

export default GenresPage;