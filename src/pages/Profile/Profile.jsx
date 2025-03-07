import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";

import ProfileBody from "../../components/Profile/ProfileBody/ProfileBody";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import Navbar from "./../../components/Navbar/Navbar";

const Profile = () => {
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
          <ProfileBody />
        </div>
      </div>
    </div>
  );
};

export default Profile;
