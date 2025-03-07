import React, { useState } from "react";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import Playlists from "../Playlists/Playlists";
import PlaylistPodcasts from "../PlaylistPodcasts/PlaylistPodcasts";
import AddPlaylist from "../AddPlaylist/AddPlaylist";

const PlaylistBody = () => {
  const [toggleSort, setToggleSort] = useState(true);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [name, setName] = useState("");

  const openCreatePlaylist = () => {
    setIsCreatePlaylistOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-5 mb-4 ">
        <p className="text-lg sm:text-xl font-semibold">Your Playlist</p>
        <div
          className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
          onClick={() => setToggleSort((prev) => !prev)}>
          {toggleSort ? (
            <BsSortUpAlt className="text-base sm:text-lg" />
          ) : (
            <BsSortDown className="text-base sm:text-lg" />
          )}
          <p className="whitespace-nowrap">Sort by</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <ul className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <li className="rounded-lg border px-2 py-1">Podcasts</li>
          <li className="rounded-lg border px-2 py-1 whitespace-nowrap">
            Audio Books
          </li>
          <li className="rounded-lg border px-2 py-1">Stories</li>
        </ul>
        <div
          className="flex items-center gap-2 sm:gap-3 bg-white text-black sm:text-sm px-3 py-1 rounded-md cursor-pointer mx-2 text-xs"
          onClick={openCreatePlaylist}>
          <FaPlus className="text-sm" />
          <p>Create playlist</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 sm:gap-16">
        <div className="col-span-12 sm:col-span-5">
          <Playlists />
        </div>
        <div className="col-span-12 sm:col-span-7">
          <p className="font-semibold mb-3">Motivation</p>
          <PlaylistPodcasts />
        </div>
      </div>
      {isCreatePlaylistOpen && (
        <AddPlaylist
          name={name}
          setName={setName}
          isCreatePlaylistOpen={isCreatePlaylistOpen}
          setIsCreatePlaylistOpen={setIsCreatePlaylistOpen}
        />
      )}
    </div>
  );
};

export default PlaylistBody;
