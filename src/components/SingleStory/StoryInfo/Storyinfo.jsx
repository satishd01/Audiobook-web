import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { useDispatch } from "react-redux";
import { followAudiobook, unfollowAudiobook } from "../../../apis/followapi";

const StoryInfo = ({ story }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [isFollowed, setIsFollowed] = useState(story.isFollowed || false);
  const [isLiked, setIsLiked] = useState(story.isLiked || false);
  const [heartAnimation, setHeartAnimation] = useState(false);

  const handleFollow = async () => {
    if (!userId || !token) {
      alert("Please login to follow content.");
      return;
    }

    try {
      const result = await followAudiobook(userId, "story", story.id, token);
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
      const result = await unfollowAudiobook(userId, "story", story.id, token);
      setIsFollowed(false);
      console.log(result.message);
    } catch (error) {
      console.error('Failed to unfollow:', error);
    }
  };

  const handleLike = async () => {
    if (!userId || !token) {
      alert("Please login to like content.");
      return;
    }

    try {
      const response = await fetch("https://audiobook.shellcode.cloud/api/likeStories/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          story_id: story.id,
        }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (response.ok) {
        setIsLiked(true);
        setHeartAnimation(true);
        setTimeout(() => setHeartAnimation(false), 1000); // Animation duration
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error('Failed to like:', error);
    }
  };

  const handleUnlike = async () => {
    if (!userId || !token) {
      alert("Please login to unlike content.");
      return;
    }

    try {
      const response = await fetch("https://audiobook.shellcode.cloud/api/likeStories/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          story_id: story.id,
        }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (response.ok) {
        setIsLiked(false);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error('Failed to unlike:', error);
    }
  };

  const handleShare = () => {
    const shareUrl = `https://your-app.com/story/${story.id}`;
    const shareData = {
      title: story.name,
      text: `Listen to this story: ${story.name}`,
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
      <p className="text-xl md:text-3xl font-semibold">{story.creator_name}</p>
      <p className="text-xl md:text-2xl mt-2 md:mt-4 font-light">
        {story.name}
      </p>
      <p className="text-sm md:text-sm mt-4 md:mt-8 font-light">
        {story.description}
      </p>
      <div className="flex gap-4 items-center text-white text-xl mt-4 md:mt-5">
        <button className="px-4 py-1 rounded-lg text-sm md:text-[15px] bg-white text-black font-semibold" onClick={isFollowed ? handleUnfollow : handleFollow}>
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
        <button className="px-4 py-1 rounded-lg text-sm md:text-[15px] bg-white text-black font-semibold" onClick={isLiked ? handleUnlike : handleLike}>
          {isLiked ? (
            <FaHeart className={`text-red-500 ${heartAnimation ? 'animate-pulse' : ''}`} size={20} />
          ) : (
            <FaRegHeart size={24} />
          )}
        </button>
        <IoMdShare className="cursor-pointer" size={24} onClick={handleShare} />
      </div>
    </div>
  );
};

export default StoryInfo;