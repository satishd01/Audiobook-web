import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestAudiobooks } from "../../../../apis/Fetchlatestshows";
import { FetchTopAudiobookCreators } from "../../../../apis/fetchTopaudiobookcreators";
import { toggleSlider } from "../../../../app/slices/sliderSlice";
import Footer from "../../../../components/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";
import LatestShows from "../../../../components/Podcasts/LatestShows/LatestShows";
import PodcastList from "../../../../components/Podcasts/PodcastList/PodcastList";
import TopCreators from "../../../../components/Podcasts/TopCreators/TopCreators";
import SliderDiv from "../../../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../../../utils/constants";
import AudiobookList from "../../../../components/Podcasts/Audiobooklist/Audiobooklist";

const AudioBooksContent = () => {
  const [latestAudiobooks, setLatestAudiobooks] = useState([]);
  const [topAudiobookCreators, setTopAudiobookCreators] = useState([]);

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
    FetchTopAudiobookCreators(setTopAudiobookCreators);
    fetchLatestAudiobooks(setLatestAudiobooks);
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
          <TopCreators
            text={"Top Creators"}
            data={topAudiobookCreators}
            page="creator"
            contentType="audiobook"
          />
          <LatestShows
            text={"Latest Audiobooks"}
            data={latestAudiobooks}
            page="audiobook"
            contentType="audiobook"
          />
          <AudiobookList
            text={"Audiobooks"}
            data={latestAudiobooks}
            page="audiobook"
            contentType="audiobook"
          />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AudioBooksContent;