import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Navbar from "../../components/Navbar/Navbar";

import SubscriptionPlans from "../../components/Subscription/SubscriptionPlans/SubscriptionPlans";
import Footer from "./../../components/Footer/Footer";

import SliderDiv from "../../components/SliderDiv/SliderDiv";
import PlanComparisonTable from "../../components/Subscription/PlanComparisonTable/PlanComparisonTable";
import subsBg from "../../images/subsBG.png";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";

const Subscription = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  const dispatch = useDispatch();

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
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
          <div className=" flex flex-col justify-center items-center mb-5">
            <div className="flex md:flex-row flex-col   md:items-end items-center gap-3">
              <p className="md:text-4xl text-xl font-semibold">
                Get 7 Days Free trial
              </p>
              <p className="md:text-xl text-sm"> ( For new users ) </p>
            </div>
            <p className="md:text-xl text-sm mt-3">
              {" "}
              ( Discount for students 10% and 20% off on yearly plans ){" "}
            </p>
          </div>
          <div className="relative w-full">
            <img
              alt="subscription background"
              src={subsBg}
              className="absolute md:block hidden top-0 left-0 w-full h-full object-cover z-0"
            />

            <div className="relative z-10 ">
              <SubscriptionPlans />
            </div>
          </div>
          <PlanComparisonTable />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
