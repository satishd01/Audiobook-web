import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { followAudiobook, unfollowAudiobook } from "../../../apis/followapi";

const PodcastInfo = ({ podcast }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [isFollowed, setIsFollowed] = useState(podcast.isFollowed || false);

  const handleFollow = async () => {
    try {
      const result = await followAudiobook(userId, "podcast", podcast.id, token);
      setIsFollowed(true);
      console.log(result.message);
    } catch (error) {
      console.error('Failed to follow:', error);
    }
  };

  const handleUnfollow = async () => {
    if (!userId || !token) {
      alert("Please login to unfollow content.");
      return;
    }

    try {
      const result = await unfollowAudiobook(userId, "podcast", podcast.id, token);
      setIsFollowed(false);
      console.log(result.message);
    } catch (error) {
      console.error('Failed to unfollow:', error);
    }
  };

  const handleShare = () => {
    const shareUrl = `https://your-app.com/podcast/${podcast.id}`;
    const shareData = {
      title: podcast.name,
      text: `Listen to this podcast: ${podcast.name}`,
      url: shareUrl,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Share was successful'))
        .catch((error) => console.log('Share was not successful', error));
    } else {
      alert('Web Share API is not supported by this browser.');
    }
  };

  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{podcast.studio}</p>
      <p className="text-xl md:text-2xl mt-2 md:mt-4 font-light">
        {podcast.name}
      </p>
      {/* <p className="text-sm md:text-lg font-light">{`Total ${podcast.episodes} episodes`}</p> */}

      <p className="text-sm md:text-sm mt-4 md:mt-8 font-light">
        {podcast.description}
      </p>
      <div className="flex gap-4 items-center text-white text-xl mt-4 md:mt-5">
        <button className="px-4 py-1 rounded-lg text-sm md:text-[15px] bg-white text-black font-semibold" onClick={isFollowed ? handleUnfollow : handleFollow}>
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
        {/* <FaBell className="text-lg" /> */}
        <IoMdShare className="cursor-pointer" onClick={handleShare} />
        {/* <IoArrowDownCircleSharp />
        <AiFillPlusCircle /> */}
      </div>
    </div>
  );
};

export default PodcastInfo;