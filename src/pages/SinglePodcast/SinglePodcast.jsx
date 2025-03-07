import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import PodcastData from "../../components/SinglePodcast/PodcastData/PodcastData";
import PodcastImage from "../../components/SinglePodcast/PodcastImage/PodcastImage";
import PodcastInfo from "../../components/SinglePodcast/PodcastInfo/PodcastInfo";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import { fetchPodcasts } from "../../apis/fetchPodcasts";

const SinglePodcast = () => {
  const [podcast, setPodcast] = useState(null);
  const [podcasts, setPodcasts] = useState(null);
  console.log(podcast,"podcast");
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    setPodcast(location.state.podcast);
    fetchPodcasts(setPodcasts);
  }, [location.state.podcast]);



  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    podcast && (
      <div>
        <Navbar />
        <div className="grid grid-cols-12">
          <SliderDiv />

          <div
            className={`${
              isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
            } col-span-12 text-white bg-black relative h-auto px-4 md:px-5 py-10`}>
            <div className="grid grid-cols-12 md:px-5 md:gap-10 gap-3">
              <PodcastImage podcast={podcast} />
              <div className="col-span-12 md:col-span-7">
                <PodcastInfo podcast={podcast} />

                <PodcastData podcast={podcast} />
              </div>
            </div>
            <div className="px-4">
              <TopCreators
                text={"Recommended Podcast"}
                isTwoRows={true}
                data={podcasts}
                page="podcast"
                contentType="podcast"
              />
            </div>
            
            {/* <div>
              <LatestShows
                text={"Latest Shows"}
                data={podcasts}
                page="podcast"
              />
            </div> */}
            <Footer />
          </div>
        </div>
      </div>
    )
  );
};

export default SinglePodcast;
