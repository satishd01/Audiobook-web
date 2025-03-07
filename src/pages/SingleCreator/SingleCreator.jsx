import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import CreatorImage from "../../components/SingleCreator/CreatorImage/CreatorImage";
import CreatorInfo from "../../components/SingleCreator/CreatorInfo/CreatorInfo";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import CreatorData from "./../../components/SingleCreator/CreatorData/CreatorData";
import { fetchPodcasts } from "./../../apis/fetchPodcasts";
import { fetchTopPodcastCreators } from "./../../apis/fetchTopPodcastCreators";
import { fetchrecommendedCreators } from "./../../apis/recomandedCreators";
import { fetchRecommendedPodcasts } from "./../../apis/recomondedpodcast";

const SingleCreator = () => {
  const [creator, setCreator] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [topCreators, setTopCreators] = useState([]);
  const [recommendedCreatorsList, setRecommendedCreatorsList] = useState([]);
  const [recommendedPodcastsList, setRecommendedPodcastsList] = useState([]);

  const location = useLocation();
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
    fetchPodcasts(setPodcasts);
    fetchTopPodcastCreators(setTopCreators);
  }, []);

  useEffect(() => {
    setCreator(location?.state?.creator);
    if (location?.state?.creator?.id) {
      fetchrecommendedCreators(location.state.creator.id, setRecommendedCreatorsList);
      fetchRecommendedPodcasts(location.state.creator.id, setRecommendedPodcastsList);
    }
  }, [location?.state?.creator]);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  console.log(recommendedCreatorsList, "recommendedCreatorsList");
  console.log(recommendedPodcastsList, "recommendedPodcastsList");

  return (
    creator && (
      <div>
        <Navbar />
        <div className="grid grid-cols-12">
          <SliderDiv />

          <div
            className={`${
              isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
            } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}>
            <div className="grid grid-cols-12  md:gap-10 gap-3">
              <CreatorImage creator={creator} />
              <div className="col-span-12 md:col-span-7">
                <CreatorInfo creator={creator} />
                <CreatorData creator={creator} />
              </div>
            </div>
            <div>
              {/* <LatestShows
                text={"Recommended Creators"}
                isTwoRows={true}
                data={recommendedCreatorsList}
                page="creator"
              /> */}
            </div>
            <div>
              {/* <TopCreators
                text={"Recommended Podcasts"}
                isTwoRows={true}
                data={recommendedPodcastsList}
                page="podcast"
              /> */}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  );
};

export default SingleCreator;