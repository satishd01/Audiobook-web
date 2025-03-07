import React, { useEffect } from "react";
import { IoDownload } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";

import DownloadedList from "../../components/DownloadedPodcasts/DownloadedList/DownloadedList";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import Navbar from "./../../components/Navbar/Navbar";

const DownloadedPodcasts = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const dispatch = useDispatch();

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12">
        <SliderDiv />

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative   py-10 h-auto`}>
          <div className="flex items-center gap-7 px-4 md:px-10">
            <div className="p-12 rounded-md border border-white">
              <IoDownload className="text-5xl text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Your Downloads</p>
              {/* <p className="text-sm mt-2 text-gray-500">10 Downloads</p> */}
            </div>
          </div>

          <DownloadedList />
        </div>
      </div>
    </div>
  );
};

export default DownloadedPodcasts;
