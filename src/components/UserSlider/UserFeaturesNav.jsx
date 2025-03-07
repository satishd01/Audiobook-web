import React from "react";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FaFileAudio, FaHistory } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";
import { GiBookCover } from "react-icons/gi";
import { IoMdDownload } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const UserFeaturesNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const getNavItemClass = (path) => {
    return currentPath === path
      ? "bg-gray-200 text-black rounded-md mb-1"
      : "hover:bg-gray-200 hover:text-black mb-1";
  };

  return (
    <div className="md:my-8 my-5 flex flex-col justify-between px-3">
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/"
        )}`}
        onClick={() => navigate("/")}>
        <MdHome className="text-xl" />
        <p>Home</p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/downloaded-podcasts"
        )}`}
        onClick={() => navigate("/downloaded-podcasts")}>
        <IoMdDownload className="text-xl" />
        <p>Download</p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/library"
        )}`}
        onClick={() => navigate("/library")}>
        <BsCollectionPlayFill className="text-base" />
        <p>Library</p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/podcasts"
        )}`}
        onClick={() => navigate("/podcasts")}>
        <FaMicrophone className="text-lg" />
        <p>Podcast</p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/audio-book"
        )}`}
        onClick={() => navigate("/audio-book")}>
        <FaFileAudio className="text-lg" />
        <p>Audio Book</p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/stories"
        )}`}
        onClick={() => navigate("/stories")}>
        <GiBookCover className="text-lg" />
        <p>Stories</p>
      </div>
      <div
        className={`py-3 flex items-center gap-3 px-3 hover:rounded-lg cursor-pointer ${getNavItemClass(
          "/listening-history"
        )}`}
        onClick={() => navigate("/listening-history")}>
        <FaHistory className="text-lg" />
        <p>Listening History</p>
      </div>
    </div>
  );
};

export default UserFeaturesNav;
