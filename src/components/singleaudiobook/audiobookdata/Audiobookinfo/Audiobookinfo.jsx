import React, { useState } from "react";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { followAudiobook, unfollowAudiobook } from "../../../../apis/followapi";
import { useLocation } from "react-router-dom";

const AudiobookInfo = ({ audiobook }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [isFollowed, setIsFollowed] = useState(audiobook.isFollowed || false);

  // Extract media_type from URL
  const pathname = location.pathname;
  const media_type = pathname.includes('/audiobook') ? 'audiobook' : 'podcast';

  const handleFollow = async () => {
    if (!userId || !token) {
      alert("Please login to follow content.");
      return;
    }

    try {
      const result = await followAudiobook(userId, "audiobook", audiobook.id, token);
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
      const result = await unfollowAudiobook(userId, "audiobook", audiobook.id, token);
      setIsFollowed(false);
      console.log(result.message);
    } catch (error) {
      console.error('Failed to unfollow:', error);
    }
  };

  const handleShare = () => {
    const shareUrl = `https://your-app.com/audiobook/${audiobook.id}`;
    const shareData = {
      title: audiobook.name,
      text: `Listen to this audiobook: ${audiobook.name}`,
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
      <p className="text-xl md:text-3xl font-semibold">{audiobook.creator_name}</p>
      <p className="text-xl md:text-2xl mt-2 md:mt-4 font-light">
        {audiobook.name}
      </p>
      {/* <p className="text-sm md:text-lg font-light">{`Total ${audiobook.episodes} episodes`}</p> */}

      <p className="text-sm md:text-sm mt-4 md:mt-8 font-light">
        {audiobook.description}
      </p>
      <div className="flex gap-4 items-center text-white text-xl mt-4 md:mt-5">
        <button className="px-4 py-1 rounded-lg text-sm bg-white text-black font-semibold" onClick={isFollowed ? handleUnfollow : handleFollow}>
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
        <IoMdShare className="share-button" onClick={handleShare} />
      </div>
    </div>
  );
};

export default AudiobookInfo;