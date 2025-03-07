import React from "react";
import { useNavigate } from "react-router-dom";
import ShowCard from "./ShowCard";

const LatestShows = ({ isTwoRows = false, text, data, page, contentType }) => {
  const navigate = useNavigate();

  const rowCount = isTwoRows ? Math.ceil(data?.length / 2) : data?.length;
  const firstRowShows = data?.slice(0, rowCount);
  const secondRowShows = data?.slice(rowCount);

  const handleSeeAllClick = () => {
    if (contentType === "podcast") {
      navigate("/all-latest-shows");
    } else if (contentType === "story") {
      navigate("/all-stories");
    } else if (contentType === "audiobook") {
      navigate("/all-audiobooks");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between md:mt-14 mt-8 md:pr-0 pr-4">
        <p className="md:text-2xl text-xl">{text}</p>
        <p
          className="text-sm text-gray-400 cursor-pointer"
          onClick={handleSeeAllClick}>
          See all
        </p>
      </div>

      <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-400">
        {firstRowShows &&
          firstRowShows.map((show) => (
            <div
              key={show.id || show[`${contentType}_id`]}
              className="flex-shrink-0 pb-3">
              <ShowCard show={show} page={page} contentType={contentType} />
            </div>
          ))}
      </div>

      {isTwoRows && (
        <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-400">
          {secondRowShows &&
            secondRowShows.map((show) => (
              <div
                key={show.id || show[`${contentType}_id`]}
                className="flex-shrink-0 pb-3">
                <ShowCard show={show} page={page} contentType={contentType} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default LatestShows;