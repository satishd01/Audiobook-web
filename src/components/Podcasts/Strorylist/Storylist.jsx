import React from "react";
import StoryCard from "./StoryCard.jsx";
import { useNavigate } from "react-router-dom";

const StoryList = ({ text, data, page }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between md:mt-14 mt-8 md:pr-0 pr-4">
        <p className="md:text-2xl text-xl">{text}</p>
        <p
          className="text-sm text-gray-400 cursor-pointer"
          onClick={() => navigate("/all-stories")}>
          See all
        </p>
      </div>
      <div className="overflow-x-auto w-full mt-6">
        <div className="grid grid-rows-3 grid-flow-col md:gap-x-10 gap-x-5 auto-cols-[270px] md:auto-cols-[300px] scrollbar-thin scrollbar-thumb-gray-400">
          {data &&
            data.map((story, index) => (
              <div
                key={story.id || index}
                className="flex-shrink-0 pb-3">
                <StoryCard story={story} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StoryList;