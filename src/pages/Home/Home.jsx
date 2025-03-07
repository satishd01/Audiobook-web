import React, { useEffect, useState } from "react";
import GenresPage from "../GenresPage/GenresPage";
import Navbar from "../../components/Navbar/Navbar";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import PodcastList from "../../components/Podcasts/PodcastList/PodcastList";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import Footer from "../../components/Footer/Footer";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import { fetchTopPodcastCreators } from "./../../apis/fetchTopPodcastCreators";
import { fetchPodcasts } from "./../../apis/fetchPodcasts";

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);

  const [topCreators, setTopCreators] = useState([]);

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
    fetchTopPodcastCreators(setTopCreators);
    fetchPodcasts(setPodcasts);
  }, []);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>

      <div className="sticky top-0 z-20">
      <Navbar />

      </div>
      <div className="grid grid-cols-12">
        <SliderDiv />


        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
          <TopCreators
            text={"Top Podcast Creators"}
            data={topCreators}
            page="creator"
          />
          <TopCreators text={"Top Stories Creators"} />
          <TopCreators text={"Top Audio Book Creators"} />
          {/* <LatestShows
            text={"Latest Podcasts"}
            data={podcasts}
            page="podcast"
          /> */}
          {/* <LatestShows text={"Latest Stories"} />
          <LatestShows text={"Latest Audio Books"} />
          <PodcastList text={"Podcasts"} />
          <PodcastList text={"Stories"} />
          <PodcastList text={"Audio Books"} /> */}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
