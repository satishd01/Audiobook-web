import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";

import { GiBookCover } from "react-icons/gi";
import { useParams } from "react-router-dom";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  playlistData,
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import Breadcrumbs from "./../../components/Breadcrumbs/Breadcrumbs";
import Navbar from "./../../components/Navbar/Navbar";

import { IoShareSocial } from "react-icons/io5";

import { RiEdit2Fill } from "react-icons/ri";
import PlaylistPodcast from "../../components/SinglePlaylist/PlaylistPodcast/PlaylistPodcast";

const SinglePlaylist = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const dispatch = useDispatch();

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  const params = useParams();

  const playlist = playlistData.find(
    (play) => play.name.toLowerCase() === params.playlist.toLowerCase()
  );

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-12 ">
        <SliderDiv />

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative  py-10 h-auto`}>
          <div className="px-4 md:px-10 ">
            <Breadcrumbs />
          </div>
          <div className="flex items-center gap-4 mt-5 px-4 md:px-10 ">
            <div className="bg-black p-10 rounded-md border border-white">
              <GiBookCover className="text-5xl text-red-600" />
            </div>
            <div className="text-sm">
              <p className="text-2xl font-semibold ">{playlist?.name}</p>
              <p className="text-xs text-[#DBDBDB] mt-3">{`${playlist?.episodes} episodes`}</p>
              <p className="text-xs text-[#DBDBDB]">{`03hr 45min`}</p>
              <div className="flex items-center gap-4 mt-4 text-lg">
                <IoShareSocial />
                <RiEdit2Fill />
              </div>
            </div>
          </div>
          <PlaylistPodcast />
        </div>
      </div>
    </div>
  );
};

export default SinglePlaylist;
