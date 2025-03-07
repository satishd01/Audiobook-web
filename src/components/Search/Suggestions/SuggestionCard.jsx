import React from "react";
import { GoClockFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import { IoArrowDownCircleSharp, IoPlay } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setActivePlayer } from "../../../app/slices/activePlayerSlice";
import { downloadApi } from "../../../apis/downloadApi";
import "./SuggestionCard.css"; // Import your CSS file if it's in a separate file

const SuggestionCard = ({ data }) => {
  const dispatch = useDispatch();

  function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60); // Whole minutes
    const remainingSeconds = seconds % 60; // Remaining seconds
    return `${minutes}:${remainingSeconds}`;
  }

  const playerHandler = () => {
    dispatch(setActivePlayer(data));
  };

  const handleDownload = async () => {
    try {
      const blob = await downloadApi('audiobook', data.audiobook_id, data.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title}.mp3`; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download:', error);
    }
  };

  const handleShare = () => {
    const shareUrl = `https://your-app.com/audiobook/${data.audiobook_id}/episode/${data.id}`;
    const shareData = {
     title: data.title,
     text: `Listen to this episode: ${data.title}`,
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
    <div className="grid grid-cols-12 gap-4 items-center  rounded-lg mb-4">
      <div className="flex items-center gap-2 col-span-6">
        <img
          alt={data?.name || data?.creator_name}
          src={data?.image}
          className="rounded-lg w-12 h-12 sm:w-16 sm:h-16"
        />
        <div className="text-xs sm:text-sm text-white">
          <p className="font-semibold whitespace-nowrap">
            {data?.title || data?.show_title}
          </p>
          <p className="text-gray-300 whitespace-nowrap">{`Season ${data?.season}`}</p>
          <div className="flex items-center gap-1 text-gray-400">
            <GoClockFill />
            <p className="whitespace-nowrap">{`${convertSecondsToMinutes(
              data?.duration && data?.duration
            )} min`}</p>
          </div>
        </div>
      </div>

      <div className="col-span-3 flex gap-1 sm:gap-3 items-center justify-end text-white text-lg sm:text-xl">
        <IoMdShare className="share-button" onClick={handleShare} />
        <IoArrowDownCircleSharp className="download-button" onClick={handleDownload} />
      </div>

      <div className="flex justify-end col-span-3" onClick={playerHandler}>
        <div className=" inline-block p-2 rounded-full  items-center justify-center bg-white cursor-pointer">
          <IoPlay className="text-[#FF0000]" />
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;