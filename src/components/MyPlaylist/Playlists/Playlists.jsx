import React from "react";
import { playlistData } from "../../../utils/constants";
import { GiBookCover } from "react-icons/gi";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
  const navigate = useNavigate();

  return (
    <>
      {playlistData &&
        playlistData.map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center justify-between bg-[#2F2F2F] mb-4 rounded-md"
            onClick={() =>
              navigate(`/your-playlist/${playlist?.name.toLowerCase()}`)
            }>
            <div className="flex items-center gap-4">
              <div className="bg-black p-4 rounded-md border border-white">
                <GiBookCover className="text-2xl text-red-600" />
              </div>
              <div className="text-sm">
                <p>{playlist?.name}</p>
                {playlist?.episodes > 0 && (
                  <p className="text-xs">{`${playlist?.episodes} episodes`}</p>
                )}
              </div>
            </div>
            <MdOutlineKeyboardArrowRight className="mr-4 text-xl" />
          </div>
        ))}
    </>
  );
};

export default Playlists;
