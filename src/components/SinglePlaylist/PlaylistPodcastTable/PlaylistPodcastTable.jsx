import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaUser } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setActivePlayer } from "../../../app/slices/activePlayerSlice";

const PlaylistPodcastTable = ({ podcasts }) => {
  const dispatch = useDispatch();

  const handlePlayer = (podcast) => {
    dispatch(setActivePlayer(podcast));
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full mt-5">
        <thead className="w-full hidden md:block">
          <tr className="text-white grid grid-cols-12 md:grid-cols-[3fr_2fr_1fr]">
            <th className="py-3 text-light px-4 text-left border-b col-span-4 md:col-span-1">
              Title
            </th>
            <th className="py-3 text-light px-4 text-left border-b col-span-4 md:col-span-1">
              Creator
            </th>
            <th className="py-3 text-light px-4 text-left border-b col-span-4 md:col-span-1 whitespace-nowrap">
              Time
            </th>
          </tr>
        </thead>

        <tbody>
          {podcasts &&
            podcasts.map((pod) => (
              <tr
                key={pod._id}
                className="grid grid-cols-12 md:grid-cols-[3fr_2fr_1fr] border-b py-3">
                <td className="col-span-8 md:col-span-1 px-4 flex items-center gap-3 md:gap-5">
                  <img
                    alt={pod.name}
                    src={pod.imageUrl}
                    className="rounded-md w-12 h-12 md:w-16 md:h-16"
                  />
                  <div>
                    <p className="text-xs whitespace-nowrap md:text-base">
                      {pod.name}
                    </p>
                    <div className="flex gap-2 md:gap-3 items-center text-[10px] whitespace-nowrap md:text-sm font-light">
                      <FaUser />
                      <p>Pod.Studio</p>
                    </div>
                  </div>
                </td>
                <td className="col-span-4 md:col-span-1 px-4 text-xs md:text-sm flex items-center">
                  <p className="truncate">{pod.studio}</p>
                </td>
                <td className="col-span-12 md:mt-0 mt-2 md:col-span-1 px-4 flex items-center justify-between gap-2">
                  <p className="text-xs md:text-sm">{pod.time}</p>
                  <BsThreeDots className="text-lg md:text-xl" />
                  <div
                    className="p-2 md:p-3 rounded-full flex items-center justify-center bg-white"
                    onClick={() => handlePlayer(pod)}>
                    <IoPlay className="text-[#FF0000]" />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistPodcastTable;
