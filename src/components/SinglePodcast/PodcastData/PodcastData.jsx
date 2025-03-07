

import React, { useEffect, useState } from "react";
import SuggestionCard from "../../Search/Suggestions/SuggestionCard";
import { fetchPodcastEpisodes } from "../../../apis/fetchPodcastEpisodes";

const PodcastData = ({ podcast }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchPodcastEpisodes(podcast.id, setEpisodes);
  }, [podcast?.podcast_id]);

  return (
    <div className="w-full">
      <div className="flex gap-3 md:gap-16 items-center text-white md:text-base text-sm  md:mt-5 mt-3">
        <p> Episodes </p>
        {/* <p>Reviews</p>
        <p>More like this</p> */}
      </div>

      <div className="my-5">
        <p className="text-xl mb-4">Podcast</p>
        {episodes?.length > 0 ? (
          episodes.slice(0, 4).map((pod) => (
            <div key={pod.id || pod.podcast_id}>
              <SuggestionCard data={pod} />
            </div>
          ))
        ) : (
          <p>No episodes found</p>
        )}
      </div>
    </div>
  );
};

export default PodcastData;
