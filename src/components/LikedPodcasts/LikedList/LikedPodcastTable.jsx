import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { setActivePlayer } from "../../../app/slices/activePlayerSlice";
import { useDispatch } from "react-redux";

const LikedPodcastTable = ({ podcasts, toggleSort }) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const handlePlayer = (podcast) => {
    dispatch(setActivePlayer(podcast));
  };

  useEffect(() => {
    if (toggleSort) {
      const sorted = [...podcasts].sort(
        (a, b) => Number(a.time) - Number(b.time)
      );
      setData(sorted);
      console.log(sorted);
    } else {
      const sorted = [...podcasts].sort(
        (a, b) => Number(b.time) - Number(a.time)
      );
      setData(sorted);
    }
  }, [toggleSort]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full mt-5">
        <thead className="w-full">
          <tr className="text-white grid grid-cols-12 md:grid-cols-[3fr_1fr]">
            <th className="py-3 px-4 text-left border-b col-span-8 md:col-span-1">
              Title
            </th>
            <th className="py-3 px-4 text-left border-b col-span-4 md:col-span-1">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((pod) => (
              <tr
                key={pod._id}
                className="grid grid-cols-12 md:grid-cols-[3fr_1fr] border-b py-3">
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
                      <p>{pod.studio}</p>
                    </div>
                  </div>
                </td>
                <td className="col-span-12 md:col-span-1 px-4 flex items-center md:justify-between justify-end gap-5">
                  <p className="text-xs md:text-sm">{pod.time}</p>
                  <FaHeart className="text-red-600 text-base md:text-lg" />
                  <BsThreeDots className="text-lg md:text-xl" />
                  <div
                    className="p-2 md:p-3 rounded-full flex items-center justify-center bg-white"
                    onClick={() => handlePlayer(pod)}>
                    <IoPlay className="text-[#070707]" />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LikedPodcastTable;
