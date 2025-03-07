import React, { useState } from "react";
import { IoPlay } from "react-icons/io5";
import LikedPodcastTable from "./LikedPodcastTable";

import { BsSortDown } from "react-icons/bs";
import { BsSortUpAlt } from "react-icons/bs";

import podcasts from "../../../utils/json/podcasts.json";

const LikedList = () => {
  const [toggleSort, setToggleSort] = useState(true);

  return (
    <div className="bg-[#101010] py-4 md:mx-2 mt-5 md:px-8 px-4">
      <div className="flex items-center justify-between">
        <ul className="flex items-center md:gap-4 gap-2 md:text-sm text-[10px]">
          <li className="rounded-lg border border-white px-2 py-1">Podcasts</li>
          <li className="rounded-lg border border-white px-2 py-1 whitespace-nowrap">
            Audio Books
          </li>
          <li className="rounded-lg border border-white px-2 py-1">Stories</li>
        </ul>
        <div
          className="flex items-center md:text-base gap-3 text-sm"
          onClick={() => setToggleSort((prev) => !prev)}>
          {toggleSort ? (
            <BsSortUpAlt className="text-lg" />
          ) : (
            <BsSortDown className="text-lg" />
          )}
          <p className="md:text-base text-[10px] whitespace-nowrap">Sort by</p>
        </div>
      </div>
      <div className="inline-block mt-5">
        <div className="md:p-4 p-2 rounded-full flex items-center justify-center bg-white">
          <IoPlay className="text-[#FF0000]" />
        </div>
      </div>

      <div className="max-h-[400px] flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        <LikedPodcastTable podcasts={podcasts} toggleSort={toggleSort} />
      </div>
    </div>
  );
};

export default LikedList;
