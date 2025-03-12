import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import { resizeHandler, scrollToTop, userSliderHandler } from "../../utils/constants";

const SingleStory = () => {
  const { storyId } = useParams(); // Get the story ID from URL params
  const [story, setStory] = useState(null);
  const [relatedEpisodes, setRelatedEpisodes] = useState([]);
  const [recommendedStories, setRecommendedStories] = useState([]);
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://audiobook.shellcode.cloud/api/stories/${storyId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch story: ${res.status}`);
        }

        const data = await res.json();
        console.log(data); // Log the entire response data
        setStory(data.story);
        setRelatedEpisodes(data.relatedEpisodes);
        setRecommendedStories(data.recommendedStories);
      } catch (error) {
        console.error(`Failed to fetch story: ${error.message}`);
      }
    };

    fetchStoryData();
  }, [storyId]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
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
          <div>
            <LatestShows
              text={"Recommended Stories"}
              data={recommendedStories}
              page="story"
              contentType="story"
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SingleStory;