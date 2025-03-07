import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import StoryData from "../../components/SingleStory/Storydata/Storydata";
import StoryImage from "../../components/SingleStory/Storyimage/StoryImage";
import StoryInfo from "../../components/SingleStory/StoryInfo/Storyinfo";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import { fetchStories } from "../../apis/FetchStories";

const SingleStory = () => {
  const [story, setStory] = useState(null);
  const [stories, setStories] = useState(null);
  console.log(story, "story");

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setStory(location.state.story);
    fetchStories(setStories);
  }, [location.state.story]);

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
    story && (
      <div>
        <Navbar />
        <div className="grid grid-cols-12">
          <SliderDiv />

          <div
            className={`${
              isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
            } col-span-12 text-white bg-black relative h-auto px-4 md:px-5 py-10`}>
            <div className="grid grid-cols-12 md:px-5 md:gap-10 gap-3">
              <StoryImage story={story} />
              <div className="col-span-12 md:col-span-7">
                <StoryInfo story={story} />
                <StoryData story={story} />
              </div>
            </div>
            {/* <div className="px-4">
              <TopCreators
                text={"Recommended Stories"}
                isTwoRows={true}
                data={stories}
                page="story"
                contentType="story"
              />
            </div> */}
              <div>
              <LatestShows
                text={"Recomanded Shows"}
                data={stories}
                page="story"
                contentType="story"
              />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  );
};

export default SingleStory;