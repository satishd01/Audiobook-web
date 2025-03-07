import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestStoryShows } from "../../../../apis/Fetchlatestshows";
import { fetchTopPodcastCreators } from "../../../../apis/fetchTopPodcastCreators";
import { toggleSlider } from "../../../../app/slices/sliderSlice";
import Footer from "../../../../components/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";
import LatestShows from "../../../../components/Podcasts/LatestShows/LatestShows";
import StoryList from "../../../../components/Podcasts/Strorylist/Storylist";
import TopCreators from "../../../../components/Podcasts/TopCreators/TopCreators";
import SliderDiv from "../../../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../../../utils/constants";
import { FetchTopStoryCreator } from "../../../../apis/FetchTopStoryCreator";

const StoriesContent = () => {
  const [latestStoryShows, setLatestStoryShows] = useState([]);
  const [topCreators, setTopCreators] = useState([]);

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
    FetchTopStoryCreator(setTopCreators);
    fetchLatestStoryShows(setLatestStoryShows);
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
            data={topCreators}
            page="creator"
            contentType="story"
          />
          <LatestShows
            text={"Latest Story Shows"}
            data={latestStoryShows}
            page="story"
            contentType="story"
          />
          <StoryList
            text={"Stories"}
            data={latestStoryShows}
            page="story"
          />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StoriesContent;