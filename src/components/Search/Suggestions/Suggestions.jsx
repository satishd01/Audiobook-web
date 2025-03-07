import React from "react";
import { useSelector } from "react-redux";

import data from "../../../utils/json/podcasts.json";
import SuggestionCard from "./SuggestionCard";
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
  const navigate = useNavigate();
  const searchedText = useSelector((state) => state.search.searchedText);

  const filteredPodcasts = data.filter((podcast) =>
    podcast.name.toLowerCase().includes(searchedText.toLowerCase())
  );

  return (
    <div className="md:px-5">
      {filteredPodcasts &&
        filteredPodcasts.map((podcast) => (
          <div
            key={podcast._id}
            onClick={() => navigate(`/podcast/${podcast._id}`)}
            className="cursor-pointer">
            <SuggestionCard podcast={podcast} />
          </div>
        ))}
    </div>
  );
};

export default Suggestions;
