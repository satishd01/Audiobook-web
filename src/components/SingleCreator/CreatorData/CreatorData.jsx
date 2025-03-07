import React, { useEffect, useState } from "react";
import SuggestionCard from "../../Search/Suggestions/SuggestionCard";
import { useNavigate } from "react-router-dom";
import { fetchPodcastsByCreatorId } from "./../../../apis/fetchPodcastsByCreatorId";

const CreatorData = ({ creator }) => {
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPodcastsByCreatorId(creator?.id, setPodcasts);
  }, [creator?.id]);

  return (
    <div className="w-full">
      <div className="my-5">
        <p className="text-xl mb-4">Podcast</p>
        {podcasts?.length > 0 ? (
          podcasts.slice(0, 4).map((pod) => (
            <div
              key={pod.podcast_id}
              onClick={() =>
                navigate(`/podcast/${pod.podcast_id}`, {
                  state: { podcast: pod },
                })
              }
              className="cursor-pointer">
              <SuggestionCard data={pod} page="podcast" />
            </div>
          ))
        ) : (
          <p>No podcasts found</p>
        )}
      </div>
    </div>
  );
};

export default CreatorData;
