import React, { useState } from "react";
import { IoPlay } from "react-icons/io5";

import podcasts from "../../../utils/json/podcasts.json";
import PlaylistPodcastTable from "../PlaylistPodcastTable/PlaylistPodcastTable";

const PlaylistPodcast = () => {
  return (
    <div className="bg-[#101010] py-4 md:mx-2 mt-5 md:px-8 px-4">
      <div className="inline-block ">
        <div className="md:p-4 p-2 rounded-full flex items-center justify-center bg-white">
          <IoPlay className="text-[#FF0000]" />
        </div>
      </div>

      <PlaylistPodcastTable podcasts={podcasts} />
    </div>
  );
};

export default PlaylistPodcast;
