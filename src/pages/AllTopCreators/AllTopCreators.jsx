import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CreatorCard from "../../components/Podcasts/TopCreators/CreatorCard";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";

import { useNavigate } from "react-router-dom";
import { fetchTopPodcastCreators } from "../../apis/fetchTopPodcastCreators";

const AllTopCreators = () => {
  const [topCreators, setTopCreators] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  useEffect(() => {
    scrollToTop();
    fetchTopPodcastCreators(setTopCreators);
  }, []);

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
          <div className="flex items-center justify-between md:pr-0 pr-4">
            <p className="md:text-2xl text-xl">{"All Top Creators"}</p>
          </div>
          <div className="my-5  flex flex-wrap gap-8 w-full ">
            {topCreators &&
              topCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() =>
                    navigate(`/creator/${creator.id}`, { state: { creator } })
                  }>
                  <CreatorCard info={creator} />
                </div>
              ))}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AllTopCreators;
