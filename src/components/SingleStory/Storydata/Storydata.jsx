import React, { useEffect, useState } from "react";
import SuggestionCard from "../../Search/Suggestions/SuggestionCard";
import { fetchStoryEpisodes } from "../../../apis/fetchstoryepisode";

const StoryData = ({ story }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    
      fetchStoryEpisodes(story.id, setEpisodes);
    
  }, [story?.id]);


  return (
    <div className="w-full">
      <div className="flex gap-3 md:gap-16 items-center text-white md:text-base text-sm  md:mt-5 mt-3">
        <p> Episodes </p>
        {/* <p>Reviews</p>
        <p>More like this</p> */}
      </div>

      <div className="my-5">
        {/* <p className="text-xl mb-4">Story Episodes</p> */}
        {episodes?.length > 0 ? (
          episodes.slice(0, 4).map((episode) => (
            <div key={episode.id || episode.episode_id}>
              <SuggestionCard data={episode} type="story" />
            </div>
          ))
        ) : (
          <p>No episodes found</p>
        )}
      </div>
    </div>
  );
};

export default StoryData;