import React from "react";
import podcasts from "../../../utils/json/podcasts.json";
import { IoPlay } from "react-icons/io5";
import { playerTitleLength } from "../../../utils/constants";

const PlaylistPodcasts = () => {
  return (
    <div>
      {podcasts?.length > 0 ? (
        podcasts.slice(0, 5).map((pod) => (
          <div
            key={pod.id}
            className="grid grid-cols-12 items-center gap-3 p-2 mt-2 rounded-lg">
            <div className="col-span-2 flex justify-center">
              <img
                alt={pod.name}
                src={pod.imageUrl}
                className="rounded-lg w-12 h-12 md:w-16 md:h-16"
              />
            </div>
            <div className="col-span-8">
              <p className="text-sm font-semibold truncate">
                {pod.name.length > playerTitleLength
                  ? `${pod.name.slice(0, playerTitleLength)}...`
                  : pod.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {pod.description.length > playerTitleLength
                  ? `${pod.description.slice(0, playerTitleLength)}...`
                  : pod.description}
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <button className="p-2 rounded-full bg-white text-red-600">
                <IoPlay />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No Liked podcasts found</p>
      )}
    </div>
  );
};

export default PlaylistPodcasts;
