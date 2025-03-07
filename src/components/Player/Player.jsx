import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaPause } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoIosBookmark, IoMdShuffle } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious, MdThumbsUpDown } from "react-icons/md";
import { RiForward15Fill, RiReplay15Fill } from "react-icons/ri";
import { TbPlaylist, TbRepeat, TbRepeatOnce } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import PlayerOptions from "./PlayerOptions/PlayerOptions";
import PlayNext from "./PlayNext/PlayNext";
import ProgressBar from "./ProgressBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  addToHistory,
  removeFromPlayNext,
  setActivePlayer,
  togglePlayMode,
} from "../../app/slices/activePlayerSlice";

const Player = () => {
  const [isPlayerOptionOpen, setIsPlayerOptionOpen] = useState(false);
  const [isPlayNextOpen, setIsPlayNextOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const playNext = useSelector((state) => state.activePlayer.playNext);
  const activePlayer = useSelector((state) => state.activePlayer.activePlayer);
  const playMode = useSelector((state) => state.activePlayer.playMode);
  const history = useSelector((state) => state.activePlayer.history);

  useEffect(() => {
    if (audioRef.current && activePlayer) {
      audioRef.current.src = activePlayer.audioUrl || activePlayer.audio_file;
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration || 0);
      };
    }
  }, [activePlayer]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      const newTime = Math.max(
        0,
        Math.min(audioRef.current.currentTime + seconds, duration)
      );
      handleSeek(newTime);
    }
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    setSpeed(
      (prevSpeed) => speeds[(speeds.indexOf(prevSpeed) + 1) % speeds.length]
    );
  };

  const playNextSong = async () => {
    if (playNext.length === 0) {
      console.log("No songs in the queue.");
      return;
    }

    let nextSong;

    if (playMode === 1) {
      const randomIndex = Math.floor(Math.random() * playNext.length);
      nextSong = playNext[randomIndex];
    } else {
      const currentIndex = playNext.findIndex(
        (song) => song.id === activePlayer.id
      );

      if (currentIndex === -1 || currentIndex === playNext.length - 1) {
        nextSong = playNext[0];
      } else {
        nextSong = playNext[currentIndex + 1];
      }
    }

    dispatch(setActivePlayer(nextSong));
    dispatch(addToHistory(nextSong));

    // Ensure the audio source is properly loaded and ready
    if (audioRef.current) {
      try {
        audioRef.current.load();
        await audioRef.current.play(); // Wait for play to succeed
      } catch (error) {
        console.error("Error trying to play audio:", error);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && activePlayer) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [activePlayer]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        playNextSong();
      };
    }
  }, [audioRef.current, playNext, playMode]);

  const playPreviousSong = () => {
    if (history.length > 1) {
      const previousSong = history[history.length - 2];
      dispatch(setActivePlayer(previousSong));
      dispatch(addToHistory(previousSong));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        if (playMode === 2) {
          audioRef.current.play();
        } else {
          playNextSong();
        }
      };
    }
  }, [audioRef.current, playMode]);

  const handleRemoveSong = (id) => {
    if (activePlayer?.id === id) {
      playNextSong();
    }
    dispatch(removeFromPlayNext(id));
  };

  const handlePlayModeChange = () => {
    dispatch(togglePlayMode());
  };

  return (
    activePlayer?.name && (
      <div className="bg-black z-30 py-4 sticky bottom-0 flex flex-col sm:flex-row justify-between text-white px-4">
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
        <div className="flex items-center gap-3 mb-1">
          <img
            alt={activePlayer?.name || "No Song"}
            src={activePlayer?.imageUrl || activePlayer?.image || ""}
            className="rounded-md w-12 h-12 md:w-16 md:h-16"
          />
          <div className="text-sm">
            <p>{activePlayer?.title || activePlayer?.name || "No Song"}</p>
            <div className="flex items-center gap-2">
              <GoClockFill className="text-white" />
              <p className="text-xs">
                {`${Math.floor((duration - currentTime) / 60)}:${String(
                  Math.floor((duration - currentTime) % 60)
                ).padStart(2, "0")} Remaining`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 mb-0">
          <div className="flex items-center gap-5 md:gap-20 px-8">
            <IoIosBookmark className="text-xl" />
            <RiReplay15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(-15)}
            />
            <MdSkipPrevious
              className="text-xl cursor-pointer"
              onClick={playPreviousSong}
            />
            <div
              className="p-2 rounded-full bg-white cursor-pointer"
              onClick={togglePlayPause}>
              {isPlaying ? (
                <FaPause className="text-red-600" />
              ) : (
                <IoPlay className="text-red-600" />
              )}
            </div>
            <MdSkipNext
              className="text-xl cursor-pointer"
              onClick={playNextSong}
            />
            <RiForward15Fill
              className="text-xl cursor-pointer"
              onClick={() => skipTime(15)}
            />
            {playMode === 0 ? (
              <TbRepeat
                className="text-xl cursor-pointer"
                onClick={handlePlayModeChange}
              />
            ) : playMode === 1 ? (
              <IoMdShuffle
                className="text-xl cursor-pointer"
                onClick={handlePlayModeChange}
              />
            ) : (
              <TbRepeatOnce
                className="text-xl cursor-pointer"
                onClick={handlePlayModeChange}
              />
            )}
          </div>
          <div className="w-full">
            <ProgressBar
              duration={duration}
              currentTime={currentTime}
              onSeek={handleSeek}
            />
          </div>
        </div>
        <div className="flex items-center justify-center md:gap-5 gap-10">
          <p onClick={toggleSpeed} className="cursor-pointer">
            {speed}x
          </p>

          <TbPlaylist
            className="cursor-pointer"
            onClick={() => setIsPlayNextOpen((prev) => !prev)}
          />
          <FaHeart />
          <MdThumbsUpDown />

          <BsThreeDotsVertical
            onClick={() => setIsPlayerOptionOpen((prev) => !prev)}
          />
        </div>
        {isPlayNextOpen && <PlayNext onRemoveSong={handleRemoveSong} />}
        {isPlayerOptionOpen && <PlayerOptions />}
      </div>
    )
  );
};

export default Player;
