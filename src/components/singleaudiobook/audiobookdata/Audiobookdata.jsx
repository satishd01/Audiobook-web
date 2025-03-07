import React, { useEffect, useState } from "react";
import SuggestionCard from "../../Search/Suggestions/SuggestionCard";
import { fetchaudiobookepisodes } from "../../../apis/Fetchaudiobookepisodes";

const AudiobookData = ({ audiobook }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (audiobook?.id) {
      fetchaudiobookepisodes(audiobook.id, setEpisodes);
    }
  }, [audiobook?.id]);

  return (
    <div className="w-full">
      <div className="flex gap-3 md:gap-16 items-center text-white md:text-base text-sm md:mt-5 mt-3">
        <p>Episodes</p>
        {/* <p>Reviews</p>
        <p>More like this</p> */}
      </div>

      <div className="my-5">
        <p className="text-xl mb-4">Audiobook Episodes</p>
        {episodes?.length > 0 ? (
          episodes.slice(0, 4).map((episode) => (
            <div key={episode.id || episode.episode_id}>
              <SuggestionCard data={episode} />
            </div>
          ))
        ) : (
          <p>No episodes found</p>
        )}
      </div>
    </div>
  );
};

export default AudiobookData;