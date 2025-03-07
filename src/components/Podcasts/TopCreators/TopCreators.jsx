import React from "react";
import { useNavigate } from "react-router-dom";
import CreatorCard from "./CreatorCard";

const TopCreators = ({ isTwoRows, text, noSeeAll, data, page }) => {
  const navigate = useNavigate();

  const rowCount = isTwoRows ? Math.ceil(data?.length / 2) : data?.length;
  const firstRowCreators = data?.slice(0, rowCount);
  const secondRowCreators = data?.slice(rowCount);

  return (
    <>
      <div className="flex items-center justify-between md:pr-0 pr-4">
        <p className="md:text-2xl text-xl">{text}</p>
        <p
          className="text-sm text-gray-400 cursor-pointer"
          onClick={() =>
            navigate(
              page === "podcast" ? "/all-latest-shows" : "/all-top-creators"
            )
          }>
          {noSeeAll ? "" : "See all"}
        </p>
      </div>

      <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-hidden">
        {firstRowCreators &&
          firstRowCreators?.map((info) => (
            <div
              key={info.id || info.podcast_id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() =>
                navigate(
                  `/${page}/${info.id || info.podcast_id}`,
                  page === "podcast"
                    ? { state: { podcast: info } }
                    : { state: { creator: info } }
                )
              }>
              <CreatorCard info={info} />
            </div>
          ))}
      </div>

      {isTwoRows && (
        <div className="my-5 overflow-x-auto flex space-x-4 w-full scrollbar-thumb-gray-400 scrollbar-hidden">
          {secondRowCreators &&
            secondRowCreators?.map((info) => (
              <div
                key={info.id || info.podcast_id}
                className="flex-shrink-0 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/${page}/${info.id || info.podcast_id}`,

                    page === "podcast"
                      ? { state: { podcast: info } }
                      : { state: { creator: info } }
                  )
                }>
                <CreatorCard info={info} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default TopCreators;
